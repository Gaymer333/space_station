import { GlobalStateInterface } from '../GlobalStateProvider'
import { BaseChangeAmountActions, DeepPartial } from '../types'

export interface MoneyChange {
	action: BaseChangeAmountActions,
	value: number
}

export const changeMoney = (state: GlobalStateInterface, updateState: (newState: DeepPartial<GlobalStateInterface>) => void) => (change: MoneyChange) => {
	let newMoneyAmount: number
	switch (change.action) {
	case BaseChangeAmountActions.add:
		newMoneyAmount = state.player.inventory.money + change.value
		break
	case BaseChangeAmountActions.subtract:
		newMoneyAmount = state.player.inventory.money - change.value
		break
	}

	updateState({ player: { inventory: { money: newMoneyAmount } } })
}

export const checkIfEnoughMoney = (state: GlobalStateInterface) => (value: number) => {
	return state.player.inventory.money >= value
}
