import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { sceneNames } from './scenes'
import _ from 'lodash'
import { DeepPartial } from './types'
import { getEventsBetweenTimesInMinutes, getTimeFromTimeInMinutes, getTimeInMinutes, Time } from './functions/time'
import { GameEvent } from './functions/event'
import { changeStat, getStat, StatActions, StatChange, StatKeys } from './functions/stat'

interface Stat {
	stateKey: StatKeys,
	currentValue: number,
	minValue: number,
	maxValue: number
}

export interface PlayerData {
	firstName: string;
	lastName: string;
	age: number;
	stats: Array<Stat>
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
	events: Array<GameEvent>,
	stateUpdatedAt: Date
}

const getDefaultGlobalState = (): GlobalStateInterface => ({
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
	events: [{
		type: 'repeatingHourly',
		minuteInTheHour: 0,
		changes: [{
			statKey: StatKeys.alcohol,
			action: StatActions.subtract,
			value: 10
		}]
	}],
	player: {
		firstName: 'Max',
		lastName: 'Power',
		age: 20,
		stats: [
			{
				stateKey: StatKeys.alcohol,
				currentValue: 0,
				minValue: 0,
				maxValue: 100
			}
		]
	},
	stateUpdatedAt: new Date()
})

interface GlobalStateHandlerInterface {
	state: GlobalStateInterface,
	updateState: (newState: DeepPartial<GlobalStateInterface>) => void,
	updateScene: (scene: sceneNames) => void,
	updatePlayer: (player: Partial<PlayerData>) => void,
	resetGame: () => void,
	addMins: (mins: number) => void,
	getStat: (statKey: StatKeys) => Stat,
	changeStat: (change: StatChange) => void
}

const initiateGlobalState = () => {
	const localGlobalStateString = localStorage.getItem('GlobalState')
	if (localGlobalStateString) {
		const localGlobalState = JSON.parse(localGlobalStateString) as Partial<GlobalStateInterface>
		const test = _.merge(getDefaultGlobalState(), localGlobalState)
		return test
	}
	return getDefaultGlobalState()
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

	const resetGame = () => {
		updateState(getDefaultGlobalState())
	}

	const updateScene = (scene: sceneNames) => {
		updateState({ stage: { scene } })
	}

	const updatePlayer = (playerData: Partial<PlayerData>) => {
		updateState({ player: { ...state.player, ...playerData } })
	}

	const addMins = (mins: number) => {
		const oldTimeInMinutes = getTimeInMinutes(state.time)

		const newTime = getTimeFromTimeInMinutes(oldTimeInMinutes + mins)

		const gameEvents = getEventsBetweenTimesInMinutes(oldTimeInMinutes, getTimeInMinutes(newTime), state.events)

		for (const gameEvent of gameEvents) {
			for (const change of gameEvent.changes) {
				changeStat(state, updateState)(change)
			}
		}

		updateState({ time: newTime })
	}

	const contextValue = {
		state,
		updateState,
		updateScene,
		updatePlayer,
		resetGame,
		addMins,
		getStat: getStat(state),
		changeStat: changeStat(state, updateState)
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
