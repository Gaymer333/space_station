import { GlobalStateInterface } from '../GlobalStateProvider'
import { ChangeAmountActions, DeepPartial } from '../types'

export interface MoneyChange {
	action: ChangeAmountActions,
	value: number
}

export const changeMoney = (state: GlobalStateInterface, updateState: (newState: DeepPartial<GlobalStateInterface>) => void) => (change: MoneyChange) => {
	let newMoneyAmount: number
	switch (change.action) {
	case ChangeAmountActions.add:
		newMoneyAmount = state.player.inventory.money + change.value
		break
	case ChangeAmountActions.subtract:
		newMoneyAmount = state.player.inventory.money - change.value
		break
	}

	updateState({ player: { inventory: { money: newMoneyAmount } } })
}

export const checkIfEnoughMoney = (state: GlobalStateInterface) => (value: number) => {
	return state.player.inventory.money >= value
}
