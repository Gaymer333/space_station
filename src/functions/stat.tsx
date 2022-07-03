import { GlobalStateInterface } from '../GlobalStateProvider'
import { BaseChangeAmountActions, DeepPartial } from '../types'

export interface Stat {
	stateKey: StatKeys,
	currentValue: number,
	minValue: number,
	maxValue: number
}

export enum StatKeys {
	'alcohol'
}

export interface StatChange {
	statKey: StatKeys,
	action: BaseChangeAmountActions,
	value: number
}

export const getStat = (state: GlobalStateInterface) => (statKey: StatKeys) => {
	const stat = state.player.stats.find(stat => stat.stateKey === statKey)
	if (stat) return stat
	throw new Error('Stat missing')
}

export const setStat = (
	state: GlobalStateInterface,
	updateState: (newState: DeepPartial<GlobalStateInterface>) => void
) => (statKey: StatKeys, newValue: number) => {
	const stats = [...state.player.stats]
	const index = stats.findIndex(stat => stat.stateKey === statKey)
	stats[index].currentValue = newValue
	updateState({ player: { stats } })
}

export const changeStat = (
	state: GlobalStateInterface,
	updateState: (newState: DeepPartial<GlobalStateInterface>) => void
) => (change: StatChange) => {
	const stat = getStat(state)(change.statKey)
	let newValue = stat.currentValue
	switch (change.action) {
	case BaseChangeAmountActions.add:
		newValue = Math.min(stat.currentValue + change.value, stat.maxValue)
		break

	case BaseChangeAmountActions.subtract:
		newValue = Math.max(stat.currentValue - change.value, stat.minValue)
		break

	default:
		throw new Error('Unknown statActions')
	}
	setStat(state, updateState)(change.statKey, newValue)
}
