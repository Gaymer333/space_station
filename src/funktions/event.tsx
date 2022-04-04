import { StatChange } from '../GlobalStateProvider'
import { daysAsString, Time } from './time'

interface OneTimeEvent {
	type: 'onetime'
	time: Time,
	changes: Array<StatChange>
}
interface RepeatingHourlyEvent {
	type: 'repeatingHourly',
	minuteInTheHour: number,
	changes: Array<StatChange>
}

export type GameEvent = OneTimeEvent | RepeatingHourlyEvent

export const generateAllEvents = (gameEvents: Array<GameEvent>): Array<OneTimeEvent> => {
	const allGameEvents: Array<OneTimeEvent> = []

	for (const gameEvent of gameEvents) {
		if (gameEvent.type === 'repeatingHourly') {
			for (let dayIndex = 0; dayIndex < daysAsString.length; dayIndex++) {
				for (let hour = 0; hour < 24; hour++) {
					allGameEvents.push({
						type: 'onetime',
						time: {
							days: dayIndex,
							hours: hour,
							mins: gameEvent.minuteInTheHour
						},
						changes: gameEvent.changes
					})
				}
			}
		}
	}

	return allGameEvents
}
