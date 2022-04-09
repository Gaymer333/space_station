import React from 'react'
import { daysAsString } from '../funktions/time'
import { StatKeys, useGlobalState } from '../GlobalStateProvider'

const SideBar = () => {
	const { state, resetGame, addMins, getStat } = useGlobalState()
	const { player, inventory } = state
	const alcohol = getStat(StatKeys.alcohol)

	return <div className="sideBar">
		<div className='player_details'>
			<h2>{player.firstName} {player.lastName}</h2>
			<p>Age: {player.age}</p>
			<p>Bucks: {inventory.money}</p>
			<hr />
			<p>{daysAsString[state.time.days]} - {state.time.hours.toString().padStart(2, '0')}:{state.time.mins.toString().padStart(2, '0')}</p>
			<hr />
			<h2>Stats</h2>
			{alcohol.currentValue ? <p>Alcohol: {alcohol.currentValue} / {alcohol.maxValue}</p> : undefined}
			<hr />
			<button onClick={() => addMins(15)} >Wait 15 mins</button>
			<button onClick={() => addMins(60)} >Wait 1 hour</button>
			<button onClick={() => addMins(600)} >Wait 10 hour</button>
			<hr />
		</div>
		<div>
			<button onClick={() => resetGame()} >Reset game</button>
		</div>
	</div>
}

export default SideBar
