import React from 'react'
import { sceneNames } from '.'
import { StatKeys } from '../functions/stat'
import { useGlobalState } from '../GlobalStateProvider'
import { ChangeAmountActions } from '../types'

const HarborPub = () => {
	const { updateScene, changeStat, checkIfEnoughMoney, changeMoney, addMins, addHours, changeEnergy, checkIfEnoughEnergy } = useGlobalState()

	const drinkBeer = () => {
		if (checkIfEnoughMoney(10)) {
			changeStat({
				statKey: StatKeys.alcohol,
				action: ChangeAmountActions.add,
				value: 10
			})
			changeMoney({
				action: ChangeAmountActions.add,
				value: -20
			})
			addMins(20)
		}
	}

	const work = () => {
		if (checkIfEnoughEnergy(25)) {
			changeEnergy({
				action: ChangeAmountActions.subtract,
				value: 25
			})
			changeMoney({
				action: ChangeAmountActions.add,
				value: 10
			})
			addHours(3)
		}
	}

	return <>
		<h1>Harbor Pubs</h1>
		<p>You enter the pub. It have a large array of types in here. It is not hard to see that this pub use used by a lot of the local workers</p>
		<p>Shipworkers drinking, singing, arm wrestling and dice playing. All men with big arms and big chests</p>
		<p>To keep the patrons of the hydrated, are multiple young lads zooming around, talking orders and bringing beer.</p>
		<p>In the bar is a older man standing, poring beer and talk to what looks like to be the more old patrons.</p>
		<hr />
		<p>Beer - 20 Buck</p>
		<button onClick={drinkBeer} >Buy and drink</button>
		<hr />
		<p>Work - 25 Energy - 3 Hour</p>
		<button onClick={work} >Work</button>
		<hr />
		<button onClick={() => updateScene(sceneNames.harbor)} >Leave</button>
	</>
}

export default HarborPub
