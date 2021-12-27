import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { sceneNames } from './scenes'
import _ from 'lodash'
import { DeepPartial } from './types'

interface Stat {
	stateKey: statKeys,
	currentValue: number,
	minValue: number,
	maxValue: number
}

export interface PlayerData {
	firstname: string;
	lastname: string;
	age: number;
	stats: Array<Stat>
}

interface Time {
	days: number,
	hours: number,
	mins: number
}

export interface GlobalStateInterface {
	meta: {
		gameStarted: boolean
	},
	time: Time,
	stage: {
		scene: sceneNames
	},
	inventory: {
		money: number
	},
	player: PlayerData,
	events: Array<Event>
}

export enum statKeys {
	'alcohol'
}

export enum statActions {
	'add',
	'subtract',
}

interface StateChange {
	statKey: statKeys,
	action: statActions,
	value: number
}

interface Event {
	timeInMinutes: number,
	change: Array<StateChange>
}

const _defaultGlobalState: GlobalStateInterface = {
	meta: {
		gameStarted: false
	},
	time: {
		days: 0,
		hours: 10,
		mins: 0
	},
	stage: {
		scene: sceneNames.pregame
	},
	inventory: {
		money: 200
	},
	events: [],
	player: {
		firstname: 'Max',
		lastname: 'Power',
		age: 20,
		stats: [
			{
				stateKey: statKeys.alcohol,
				currentValue: 0,
				minValue: 0,
				maxValue: 100
			}
		]
	}
}

const defaultGlobalState = { ..._defaultGlobalState }

const GlobalStateContext = createContext({
	state: {} as GlobalStateInterface,
	setState: {} as Dispatch<SetStateAction<GlobalStateInterface>>,
	updateScene: {} as (scene: sceneNames) => void,
	updatePlayer: {} as (playerData: Partial<PlayerData>) => void,
	resetGame: {} as () => void,
	addMins: {} as (mins: number) => void,
	getStat: {} as (statKey: statKeys) => Stat,
	changeState: {} as (change: StateChange) => void
})

const getDateInMinutes = (value: Time) => {
	return value.mins + value.hours * 60 + value.days * 1440
}

const GlobalStateProvider = ({
	children,
	value = {} as GlobalStateInterface
}: {
	children: React.ReactNode;
	value: GlobalStateInterface;
}) => {
	const [state, setState] = useState(value)

	const mergeState = (newData: DeepPartial<GlobalStateInterface>): GlobalStateInterface => {
		return _.merge(state, newData)
	}

	useEffect(() => {
		localStorage.setItem('GlobalState', JSON.stringify(state))
	}, [state])

	const addMins = (mins: number) => {
		const newDateAsMinutes = (getDateInMinutes(state.time) + mins) % 10080
		const minutesLeftAfterDays = newDateAsMinutes % 1440
		const newDays = Math.floor(newDateAsMinutes / 1440)
		const newHours = Math.floor(minutesLeftAfterDays / 60)
		const newMins = minutesLeftAfterDays % 60

		setState((prev) => ({ ...prev, ...mergeState({ time: { days: newDays, hours: newHours, mins: newMins } }) }))
	}

	const resetGame = () => {
		setState((prev) => ({ ...prev, ...defaultGlobalState }))
	}

	const updateScene = (scene: sceneNames) => {
		setState((prev) => ({ ...prev, ...{ stage: { scene } } }))
	}

	const updatePlayer = (playerData: Partial<PlayerData>) => {
		setState((prev) => ({ ...prev, ...{ player: { ...state.player, ...playerData } } }))
	}

	const getStat = (statKey: statKeys) => {
		const stat = state.player.stats.find(stat => stat.stateKey === statKey)
		if (stat) return stat
		throw new Error('Stat missing')
	}

	const setStat = (statKey: statKeys, newValue: number) => {
		const stats = [...state.player.stats]
		const index = stats.findIndex(stat => stat.stateKey === statKey)
		stats[index].currentValue = newValue
		setState((prev) => ({ ...prev, ...mergeState({ player: { stats } }) }))
	}

	const changeState = (change: StateChange) => {
		const stat = getStat(change.statKey)
		switch (change.action) {
		case statActions.add:
			return setStat(change.statKey, stat.currentValue + change.value)

		case statActions.subtract:
			return setStat(change.statKey, stat.currentValue - change.value)

		default:
			throw new Error('Unknown StatKey')
		}
	}

	const contextValue = {
		state,
		setState,
		updateScene,
		updatePlayer,
		resetGame,
		addMins,
		getStat,
		changeState
	}

	return (
		<GlobalStateContext.Provider value={contextValue}>
			{children}
		</GlobalStateContext.Provider>
	)
}

const useGlobalState = () => {
	const context = useContext(GlobalStateContext)
	if (!context) {
		throw new Error('useGlobalState must be used within a GlobalStateContext')
	}
	return context
}

const initiateGlobalState = () => {
	const localGlobalState = localStorage.getItem('GlobalState')
	console.log('localGlobalState', localGlobalState)
	if (localGlobalState) {
		const test = _.merge({ ...defaultGlobalState }, JSON.parse(localGlobalState))
		console.log('test:', test)
		return test
	}
	return { ...defaultGlobalState }
}

export { GlobalStateProvider, useGlobalState, initiateGlobalState }
