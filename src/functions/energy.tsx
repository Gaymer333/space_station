import { GlobalStateInterface } from '../GlobalStateProvider'
import { BaseChangeAmountActions, DeepPartial } from '../types'

export interface EnergyChange {
	action: BaseChangeAmountActions,
	value: number
}

export const changeEnergy = (state: GlobalStateInterface, updateState: (newState: DeepPartial<GlobalStateInterface>) => void) => (change: EnergyChange) => {
	let newEnergyAmount: number
	switch (change.action) {
	case BaseChangeAmountActions.add:
		newEnergyAmount = Math.min(state.player.energy.currentValue + change.value, state.player.energy.maxValue)
		break
	case BaseChangeAmountActions.subtract:
		newEnergyAmount = Math.max(state.player.energy.currentValue - change.value, state.player.energy.minValue)
		break
	}
	updateState({ player: { energy: { currentValue: newEnergyAmount } } })
}

export const checkIfEnoughEnergy = (state: GlobalStateInterface) => (value: number) => {
	return state.player.energy.currentValue >= value
}
