import React from 'react'
import { sceneNames } from '../..'
import { ChangeStageButton } from '../../../components/Buttons'
import { StatKeys } from '../../../functions/stat'
import { useGlobalState } from '../../../GlobalStateProvider'
import { getSoberingUpEvent } from '../../../prefabs/events'
import { BaseChangeAmountActions } from '../../../types'

const HarborPub = () => {
	const { state, updateScene, changeStat, checkIfEnoughMoney, changeMoney, addMins, addHours, changeEnergy, checkIfEnoughEnergy, addUniqueEvent, getLifeEvent } = useGlobalState()

	const drinkBeer = () => {
		if (checkIfEnoughMoney(10)) {
			changeStat({
				statKey: StatKeys.alcohol,
				action: BaseChangeAmountActions.add,
				value: 8
			})
			changeMoney({
				action: BaseChangeAmountActions.add,
				value: -20
			})
			addMins(20)
			addUniqueEvent(getSoberingUpEvent(state))
		}
	}

	const sleep = () => {
		changeEnergy({
			action: BaseChangeAmountActions.add,
			value: 50
		})
		addHours(4)
	}

	const gotJobStatus = getLifeEvent('gotJobInPub')

	const JobOptions = () => {
		if (gotJobStatus) {
			return <>
				<p>Work - Waiter - 25 Energy - 3 Hour</p>
				<ChangeStageButton sceneName={sceneNames.harbor_pub_work_tables} disableCheck={!checkIfEnoughEnergy(25)} buttonText="Work" />
				<br />
				<p>Work - Bartender - 25 Energy - 3 Hour</p>
				<ChangeStageButton sceneName={sceneNames.harbor_pub_work_bar} disableCheck={!checkIfEnoughEnergy(25)} buttonText="Work" />
			</>
		} else {
			return <>
				<p>Get a job</p>
				<ChangeStageButton sceneName={sceneNames.harbor_pub_get_job} buttonText="Get a job" />
			</>
		}
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
		<JobOptions />
		<hr />
		<p>Sleep - 4 Hour - 50 Energy</p>
		<button onClick={sleep} >Sleep</button>
		<hr />
		<button onClick={() => updateScene(sceneNames.harbor)} >Leave</button>
	</>
}

export default HarborPub
