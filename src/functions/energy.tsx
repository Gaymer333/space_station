import { GlobalStateInterface } from '../GlobalStateProvider'
import { ChangeAmountActions, DeepPartial } from '../types'

export interface EnergyChange {
	action: ChangeAmountActions,
	value: number
}

export const changeEnergy = (state: GlobalStateInterface, updateState: (newState: DeepPartial<GlobalStateInterface>) => void) => (change: EnergyChange) => {
	let newEnergyAmount: number
	switch (change.action) {
	case ChangeAmountActions.add:
		newEnergyAmount = Math.min(state.player.energy.currentValue + change.value, state.player.energy.maxValue)
		break
	case ChangeAmountActions.subtract:
		newEnergyAmount = Math.max(state.player.energy.currentValue - change.value, state.player.energy.minValue)
		break
	}
	updateState({ player: { energy: { currentValue: newEnergyAmount } } })
}

export const checkIfEnoughEnergy = (state: GlobalStateInterface) => (value: number) => {
	return state.player.energy.currentValue >= value
}
