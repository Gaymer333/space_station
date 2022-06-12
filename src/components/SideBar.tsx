import React from 'react'
import { Attribute, AttributeKeys } from '../functions/attribute'
import { StatKeys } from '../functions/stat'
import { daysAsString } from '../functions/time'
import { useGlobalState } from '../GlobalStateProvider'

const AttributeLine = ({ attributeKey }: {attributeKey: AttributeKeys}) => {
	const { getAttribute } = useGlobalState()
	const attribute = getAttribute(attributeKey)

	return <p>{attribute.attributeName}: {attribute.currentValue}<br />XP: {attribute.xp}</p>
}

const SideBar = () => {
	const { state, resetGame, addMins, getStat, getAttribute } = useGlobalState()
	const { player } = state
	const alcohol = getStat(StatKeys.alcohol)

	return <div className="sideBar">
		<div className='player_details'>
			<h2>{player.firstName} {player.lastName}</h2>
			<p>Age: {player.age}</p>
			<p>Bucks: {player.inventory.money}</p>
			<p>Energy: {player.energy.currentValue} / {player.energy.maxValue}</p>
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
			<h2>Attributes</h2>
			<AttributeLine attributeKey={AttributeKeys.strength} />
			<AttributeLine attributeKey={AttributeKeys.agility} />
			<AttributeLine attributeKey={AttributeKeys.intelligence} />
			<AttributeLine attributeKey={AttributeKeys.endurance} />
			<AttributeLine attributeKey={AttributeKeys.charisma} />
			<AttributeLine attributeKey={AttributeKeys.luck} />

			<button onClick={() => resetGame()} >Reset game</button>
		</div>
	</div>
}

export default SideBar
