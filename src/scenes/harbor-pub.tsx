import React from 'react'
import { sceneNames } from '.'
import { AmountActions } from '../functions/inventory'
import { StatActions, StatKeys } from '../functions/stat'
import { useGlobalState } from '../GlobalStateProvider'

const HarborPub = () => {
	const { updateScene, changeStat, checkIfEnoughMoney, changeMoney, addMins } = useGlobalState()

	const drinkBeer = () => {
		if (checkIfEnoughMoney(10)) {
			changeStat({
				statKey: StatKeys.alcohol,
				action: StatActions.add,
				value: 10
			})
			changeMoney({
				action: AmountActions.add,
				value: -20
			})
			addMins(20)
		}
	}

	return <>
		<h1>Harbor Pubs</h1>
		<p>You enter the pub...</p>
		<hr />
		<p>Beer - 20 Buck</p>
		<button onClick={drinkBeer} >Buy and drink</button>
		<hr />
		<button onClick={() => updateScene(sceneNames.harbor)} >Leave</button>
	</>
}

export default HarborPub
