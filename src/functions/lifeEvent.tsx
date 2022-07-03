import { GlobalStateInterface } from '../GlobalStateProvider'
import { AdvancedChangeAmountActions, DeepPartial } from '../types'

export interface LifeEventAction {
	name: string,
	changeMethod?: AdvancedChangeAmountActions
	changeAmount?: number
}

export interface LifeEvents {
	[key: string]: number
}

export const getLifeEvent = (
	state: GlobalStateInterface
) => (
	name: string
) => {
	const lifeEvent = state.lifeEvents[name]
	if (!lifeEvent) return 0
	return lifeEvent
}

export const addLifeEvent = (
	state: GlobalStateInterface,
	updateState: (newState: DeepPartial<GlobalStateInterface>) => void
) => ({
	name,
	changeMethod = AdvancedChangeAmountActions.set,
	changeAmount = 1
}: LifeEventAction) => {
	let amount = getLifeEvent(state)(name)

	switch (changeMethod) {
	case AdvancedChangeAmountActions.add:
		amount += changeAmount
		break

	case AdvancedChangeAmountActions.subtract:
		amount -= changeAmount
		break

	case AdvancedChangeAmountActions.set:
		amount = changeAmount
		break

	default:
		throw new Error('Invalid change method')
	}

	updateState({ lifeEvents: { ...state.lifeEvents, [name]: amount } })
}
