import React from 'react'
import { sceneNames } from '../..'
import { AttributeKeys } from '../../../functions/attribute'
import { StatKeys } from '../../../functions/stat'
import { useGlobalState } from '../../../GlobalStateProvider'
import { getSoberingUpEvent } from '../../../prefabs/events'
import { ChangeAmountActions } from '../../../types'

const HarborPub = () => {
	const { state, updateScene, changeStat, checkIfEnoughMoney, changeMoney, addMins, addHours, changeEnergy, checkIfEnoughEnergy, addUniqueEvent, getAttribute, changeAttributeXP } = useGlobalState()

	const drinkBeer = () => {
		if (checkIfEnoughMoney(10)) {
			changeStat({
				statKey: StatKeys.alcohol,
				action: ChangeAmountActions.add,
				value: 8
			})
			changeMoney({
				action: ChangeAmountActions.add,
				value: -20
			})
			addMins(20)
			addUniqueEvent(getSoberingUpEvent(state))
		}
	}

	const workWaiter = () => {
		if (checkIfEnoughEnergy(25)) {
			changeEnergy({
				action: ChangeAmountActions.subtract,
				value: 25
			})
			changeMoney({
				action: ChangeAmountActions.add,
				value: 10 + getAttribute(AttributeKeys.charisma).currentLevel
			})
			changeAttributeXP({
				attributeKey: AttributeKeys.charisma,
				action: ChangeAmountActions.add,
				value: 1
			})
			addHours(3)
		}
	}

	const sleep = () => {
		changeEnergy({
			action: ChangeAmountActions.add,
			value: 50
		})
		addHours(4)
	}

	return <>
		<h1>Harbor Pubs</h1>
		<p>You enter the pub. It have a large array of types in here. It is not hard to see that this pub use used by a lot of the local workers</p>
		<p>Ship workers drinking, singing, arm wrestling and dice playing. All men with big arms and big chests</p>
		<p>To keep the patrons of the hydrated, are multiple young lads zooming around, talking orders and bringing beer.</p>
		<p>In the bar is a older man standing, poring beer and talk to what looks like to be the more old patrons.</p>
		<hr />
		<p>Beer - 20 Buck</p>
		<button onClick={drinkBeer} >Buy and drink</button>
		<hr />
		<p>Work - Waiter - 25 Energy - 3 Hour</p>
		<button onClick={() => updateScene(sceneNames.harbor_pub_work_tables)} >Work</button>
		<br />
		<p>Work - Bartender - 25 Energy - 3 Hour</p>
		<button onClick={() => updateScene(sceneNames.harbor_pub_work_bar)} >Work</button>
		<hr />
		<p>Sleep - 4 Hour - 50 Energy</p>
		<button onClick={sleep} >Sleep</button>
		<hr />
		<button onClick={() => updateScene(sceneNames.harbor)} >Leave</button>
	</>
}

export default HarborPub
