import React, { useEffect } from 'react'
import { sceneNames } from '../..'
import { AttributeKeys } from '../../../functions/attribute'
import { useGlobalState } from '../../../GlobalStateProvider'
import { BaseChangeAmountActions } from '../../../types'
import { images } from '../../../media/images'

const WorkingWaiter = () => {
	const { changeMoney, addHours, changeEnergy, checkIfEnoughEnergy, getAttribute, changeAttributeXP, updateScene } = useGlobalState()

	const working = () => {
		if (checkIfEnoughEnergy(25)) {
			changeEnergy({
				action: BaseChangeAmountActions.subtract,
				value: 25
			})
			changeMoney({
				action: BaseChangeAmountActions.add,
				value: 10 + getAttribute(AttributeKeys.charisma).currentLevel
			})
			changeAttributeXP({
				attributeKey: AttributeKeys.charisma,
				action: BaseChangeAmountActions.add,
				value: 1
			})
			addHours(3)
		}
	}

	useEffect(() => working(), [])

	return <>
		<h1>Working Tables</h1>
		{images.pubWaiterWork}
		<br />
		<button onClick={() => updateScene(sceneNames.harbor_pub)} >Finish shift</button>
	</>
}

export default WorkingWaiter
