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
	events: Array<Event>,
	stateUpdatedAt: Date
}

export enum statKeys {
	'alcohol'
}

export enum statActions {
	'add',
	'subtract',
}

interface StatChange {
	statKey: statKeys,
	action: statActions,
	value: number
}

interface Event {
	timeInMinutes: number,
	change: Array<StatChange>
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
	},
	stateUpdatedAt: new Date()
}

const defaultGlobalState = { ..._defaultGlobalState }

const getDateInMinutes = (value: Time) => {
	return value.mins + value.hours * 60 + value.days * 1440
}

interface GlobalStateHandlerInterface {
	state: GlobalStateInterface,
	updateState: (newState: DeepPartial<GlobalStateInterface>) => void,
	updateScene: (scene: sceneNames) => void,
	updatePlayer: (player: Partial<PlayerData>) => void,
	resetGame: () => void,
	addMins: (mins: number) => void,
	getStat: (statKey: statKeys) => Stat,
	changeStat: (change: StatChange) => void
}

const initiateGlobalState = () => {
	const localGlobalStateString = localStorage.getItem('GlobalState')
	if (localGlobalStateString) {
		const localGlobalState = JSON.parse(localGlobalStateString) as Partial<GlobalStateInterface>
		const test = _.merge({ ...defaultGlobalState }, localGlobalState)
		return test
	}
	return { ...defaultGlobalState }
}

const GlobalStateContext = createContext<GlobalStateHandlerInterface | undefined>(undefined)

const GlobalStateProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const [state, _setState] = useState(initiateGlobalState())

	const updateState = (newState: DeepPartial<GlobalStateInterface>): void => {
		const newTime = new Date().getTime()
		const newGlobalState = _.merge(state, { ...newState, stateUpdatedAt: newTime })
		localStorage.setItem('GlobalState', JSON.stringify(newGlobalState))
		_setState((prevState) => ({ ...prevState, ...newGlobalState }))
	}

	const addMins = (mins: number) => {
		const newDateAsMinutes = (getDateInMinutes(state.time) + mins) % 10080
		const minutesLeftAfterDays = newDateAsMinutes % 1440
		const newDays = Math.floor(newDateAsMinutes / 1440)
		const newHours = Math.floor(minutesLeftAfterDays / 60)
		const newMins = minutesLeftAfterDays % 60

		updateState({ time: { days: newDays, hours: newHours, mins: newMins } })
	}

	const resetGame = () => {
		updateState(defaultGlobalState)
	}

	const updateScene = (scene: sceneNames) => {
		updateState({ stage: { scene } })
	}

	const updatePlayer = (playerData: Partial<PlayerData>) => {
		updateState({ player: { ...state.player, ...playerData } })
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
		updateState({ player: { stats } })
	}

	const changeStat = (change: StatChange) => {
		const stat = getStat(change.statKey)
		switch (change.action) {
		case statActions.add:
			return setStat(change.statKey, stat.currentValue + change.value)

		case statActions.subtract:
			return setStat(change.statKey, stat.currentValue - change.value)

		default:
			throw new Error('Unknown statActions')
		}
	}

	const contextValue = {
		state,
		updateState,
		updateScene,
		updatePlayer,
		resetGame,
		addMins,
		getStat,
		changeStat
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

export { GlobalStateProvider, useGlobalState }
