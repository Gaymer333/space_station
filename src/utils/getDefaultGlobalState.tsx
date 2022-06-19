import { Attribute, AttributeKeys } from '../functions/attribute'
import { StatKeys } from '../functions/stat'
import { GlobalStateInterface } from '../GlobalStateProvider'
import { sceneNames } from '../scenes'

const newAttribute = (attributeKey: AttributeKeys, attributeName: string): Attribute => ({
	attributeName,
	attributeKey,
	currentLevel: 1,
	xp: 0,
	maxLevel: 10,
	levelupXpTarget: 100
})

const getDefaultGlobalState = (): GlobalStateInterface => {
	const attributes = [
		newAttribute(AttributeKeys.strength, 'Strength'),
		newAttribute(AttributeKeys.agility, 'Agility'),
		newAttribute(AttributeKeys.endurance, 'Endurance'),
		newAttribute(AttributeKeys.charisma, 'Charisma'),
		newAttribute(AttributeKeys.intelligence, 'Intelligence'),
		newAttribute(AttributeKeys.luck, 'Luck')
	]
	return {
		meta: {
			gameStarted: false
		},
		time: {
			days: 0,
			hours: 10,
			mins: 0
		},
		stage: {
			scene: sceneNames.pregame
		},
		events: [],
		player: {
			firstName: 'Max',
			lastName: 'Power',
			age: 20,
			energy: {
				currentValue: 100,
				minValue: 0,
				maxValue: 100
			},
			stats: [
				{
					stateKey: StatKeys.alcohol,
					currentValue: 0,
					minValue: 0,
					maxValue: 100
				}
			],
			inventory: {
				money: 200
			},
			attributes
		},
		stateUpdatedAt: new Date()
	}
}

export default getDefaultGlobalState
