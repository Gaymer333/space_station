import { GlobalStateInterface } from '../GlobalStateProvider'
import { ChangeAmountActions, DeepPartial } from '../types'

export enum AttributeKeys {
	'strength',
	'agility',
	'endurance',
	'charisma',
	'intelligence',
	'luck'
}

export interface AttributeChange {
	attributeKey: AttributeKeys,
	action: ChangeAmountActions,
	value: number
}

export interface Attribute {
	attributeName: string,
	attributeKey: AttributeKeys,
	currentValue: number,
	xp: number
}

export const getAttribute = (state: GlobalStateInterface) => (attributeKey: AttributeKeys) => {
	const attribute = state.player.attributes.find(stat => stat.attributeKey === attributeKey)
	if (attribute) return attribute
	throw new Error('Attribute missing')
}

export const setAttribute = (
	state: GlobalStateInterface,
	updateState: (newState: DeepPartial<GlobalStateInterface>) => void
) => (attributeKey: AttributeKeys, newValue: number) => {
	const attributes = [...state.player.attributes]
	const index = attributes.findIndex(stat => stat.attributeKey === attributeKey)
	attributes[index].currentValue = newValue
	updateState({ player: { attributes } })
}

export const changeAttributeXP = (
	state: GlobalStateInterface,
	updateState: (newState: DeepPartial<GlobalStateInterface>) => void
) => (change: AttributeChange) => {
	const attribute = getAttribute(state)(change.attributeKey)
	let newValue = attribute.xp
	switch (change.action) {
	case ChangeAmountActions.add:
		newValue = attribute.xp + change.value
		break
	case ChangeAmountActions.subtract:
		newValue = Math.max(attribute.xp - change.value, 0)
		break

	default:
		throw new Error('Unknown statActions')
	}
	setAttribute(state, updateState)(change.attributeKey, newValue)
}
