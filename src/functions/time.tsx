import React from 'react'
import { useGlobalState } from '../GlobalStateProvider'
import { GameEvent, generateAllEvents } from './event'

export interface Time {
	days: number,
	hours: number,
	mins: number
}

export const daysAsString = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const getTimeFromTimeInMinutes = (timeInMinutes: number): Time => {
	const newDateAsMinutes = timeInMinutes % 10080
	const minutesLeftAfterDays = newDateAsMinutes % 1440
	const newDays = Math.floor(newDateAsMinutes / 1440)
	const newHours = Math.floor(minutesLeftAfterDays / 60)
	const newMins = minutesLeftAfterDays % 60

	return { days: newDays, hours: newHours, mins: newMins }
}

export const getTimeInMinutes = (value: Time) => {
	return value.mins + value.hours * 60 + value.days * 1440
}

export const getEventsBetweenTimesInMinutes = (startTime: number, endTime: number, events: Array<GameEvent>): Array<GameEvent> => {
	const allEvents = generateAllEvents(events)
	const findEventsBetweenTimes = startTime < endTime

	const eventsBetweenTimes = allEvents.filter(event => {
		const eventTimeInMinutes = getTimeInMinutes(event.time)

		if (findEventsBetweenTimes) return eventTimeInMinutes > startTime && eventTimeInMinutes <= endTime
		else return eventTimeInMinutes > startTime || eventTimeInMinutes <= endTime
	})

	return eventsBetweenTimes
}
