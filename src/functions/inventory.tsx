import { GlobalStateInterface } from '../GlobalStateProvider'
import { DeepPartial } from '../types'

export enum AmountActions {
	'add',
	'subtract',
}

export interface MoneyChange {
	action: AmountActions,
	value: number
}

export const changeMoney = (state: GlobalStateInterface, updateState: (newState: DeepPartial<GlobalStateInterface>) => void) => (change: MoneyChange) => {
	let newMoneyAmount: number
	switch (change.action) {
	case AmountActions.add:
		newMoneyAmount = state.inventory.money + change.value
		break
	case AmountActions.subtract:
		newMoneyAmount = state.inventory.money - change.value
		break
	}

	updateState({ inventory: { money: newMoneyAmount } })
}
