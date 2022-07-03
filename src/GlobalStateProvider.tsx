import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { sceneNames } from './scenes'
import _ from 'lodash'
import { DeepPartial } from './types'
import { getEventsBetweenTimesInMinutes, getTimeFromTimeInMinutes, getTimeInMinutes, Time } from './functions/time'
import { addEvent, addUniqueEvent, GameEvent, removeEvent } from './functions/event'
import { changeStat, getStat, Stat, StatChange, StatKeys } from './functions/stat'
import { changeMoney, checkIfEnoughMoney, MoneyChange } from './functions/inventory'
import { changeEnergy, checkIfEnoughEnergy, EnergyChange } from './functions/energy'
import { Attribute, AttributeChange, AttributeKeys, changeAttributeXP, getAttribute } from './functions/attribute'
import getDefaultGlobalState from './utils/getDefaultGlobalState'
import { addLifeEvent, getLifeEvent, LifeEventAction, LifeEvents } from './functions/lifeEvent'

export interface PlayerData {
	firstName: string;
	lastName: string;
	age: number;
	energy: {
		currentValue: number;
		minValue: number;
		maxValue: number;
	}
	stats: Array<Stat>;
	inventory: {
		money: number
	},
	attributes: Array<Attribute>
}

export interface GlobalStateInterface {
	meta: {
		gameStarted: boolean
	},
	time: Time,
	stage: {
		scene: sceneNames
	},
	player: PlayerData,
	events: Array<GameEvent>,
	lifeEvents: LifeEvents,
	stateUpdatedAt: Date
}

interface GlobalStateHandlerInterface {
	state: GlobalStateInterface,
	updateState: (newState: DeepPartial<GlobalStateInterface>) => void,
	updateScene: (scene: sceneNames) => void,
	updatePlayer: (player: Partial<PlayerData>) => void,
	resetGame: () => void,
	addMins: (mins: number) => void,
	addHours: (hours: number) => void,
	getStat: (statKey: StatKeys) => Stat,
	changeStat: (change: StatChange) => void,
	getAttribute: (attributeKey: AttributeKeys) => Attribute,
	changeAttributeXP: (change: AttributeChange) => void,
	checkIfEnoughMoney: (cost: number) => boolean,
	changeMoney: (change: MoneyChange) => void
	changeEnergy: (change: EnergyChange) => void
	checkIfEnoughEnergy: (value: number) => boolean
	addEvent: (event: GameEvent) => void
	addUniqueEvent: (event: GameEvent) => void
	getLifeEvent: (name: string) => number
	addLifeEvent: (event: LifeEventAction) => void
	removeEvent: (event: GameEvent) => void
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
		const mergeCustomizer = (objValue: any, srcValue: any) => {
			if (_.isArray(objValue)) {
				return srcValue
			}
		}

		const newGlobalState = _.mergeWith(state, { ...newState, stateUpdatedAt: newTime }, mergeCustomizer)
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
			if (gameEvent.deleteIf && gameEvent.deleteIf({ state })) {
				removeEvent(state, updateState)(gameEvent)
			}
		}

		updateState({ time: newTime })
	}

	const addHours = (hours: number) => {
		addMins(hours * 60)
	}

	const contextValue = {
		state,
		updateState,
		updateScene,
		updatePlayer,
		resetGame,
		addMins,
		addHours,
		getStat: getStat(state),
		changeStat: changeStat(state, updateState),
		getAttribute: getAttribute(state),
		changeAttributeXP: changeAttributeXP(state, updateState),
		checkIfEnoughMoney: checkIfEnoughMoney(state),
		changeMoney: changeMoney(state, updateState),
		changeEnergy: changeEnergy(state, updateState),
		checkIfEnoughEnergy: checkIfEnoughEnergy(state),
		addEvent: addEvent(state, updateState),
		addUniqueEvent: addUniqueEvent(state, updateState),
		getLifeEvent: getLifeEvent(state),
		addLifeEvent: addLifeEvent(state, updateState),
		removeEvent: removeEvent(state, updateState)
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
