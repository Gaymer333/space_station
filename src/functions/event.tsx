import { GlobalStateInterface } from '../GlobalStateProvider'
import { DeepPartial } from '../types'
import { StatChange } from './stat'
import { daysAsString, Time } from './time'

interface deleteIfProps {
	state?: GlobalStateInterface
}
interface BaseEvent {
	name: string
	deleteIf?: (props?: deleteIfProps) => boolean,
	unique?: boolean
	replaceOnConflict?: boolean
}

interface OneTimeEvent extends BaseEvent {
	type: 'onetime'
	time: Time,
	changes: Array<StatChange>
}
interface RepeatingHourlyEvent extends BaseEvent {
	type: 'repeatingHourly',
	minuteInTheHour: number,
	changes: Array<StatChange>
}

export type GameEvent = (OneTimeEvent | RepeatingHourlyEvent)

export const generateAllEvents = (gameEvents: Array<GameEvent>): Array<OneTimeEvent> => {
	const allGameEvents: Array<OneTimeEvent> = []

	for (const gameEvent of gameEvents) {
		if (gameEvent.type === 'repeatingHourly') {
			for (let dayIndex = 0; dayIndex < daysAsString.length; dayIndex++) {
				for (let hour = 0; hour < 24; hour++) {
					allGameEvents.push({
						name: gameEvent.name,
						type: 'onetime',
						time: {
							days: dayIndex,
							hours: hour,
							mins: gameEvent.minuteInTheHour
						},
						changes: gameEvent.changes,
						deleteIf: gameEvent.deleteIf
					})
				}
			}
		}
	}

	return allGameEvents
}

export const removeEvent = (state: GlobalStateInterface, updateState: (newState: DeepPartial<GlobalStateInterface>) => void) => (event: GameEvent) => {
	updateState({ events: state.events.filter(e => e.name !== event.name) })
}

const _addEvent = (state: GlobalStateInterface, updateState: (newState: DeepPartial<GlobalStateInterface>) => void) => (event: GameEvent) => {
	updateState({ events: [...state.events, event] })
}

export const addUniqueEvent = (state: GlobalStateInterface, updateState: (newState: DeepPartial<GlobalStateInterface>) => void) => (event: GameEvent) => {
	const existingEvent = state.events.find(e => e.name === event.name)
	if (!existingEvent) {
		_addEvent(state, updateState)(event)
	} else if (event.replaceOnConflict) {
		removeEvent(state, updateState)(event)
		_addEvent(state, updateState)(event)
	}
}

export const addEvent = (state: GlobalStateInterface, updateState: (newState: DeepPartial<GlobalStateInterface>) => void) => (event: GameEvent) => {
	if (event.unique) addUniqueEvent(state, updateState)(event)
	else _addEvent(state, updateState)(event)
}
