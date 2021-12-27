import React from 'react'
import { sceneNames } from '.'
import { statActions, statKeys, useGlobalState } from '../GlobalStateProvider'

const HarborPub = () => {
	const { updateScene, changeState } = useGlobalState()

	return <>
		<h1>Harbor Pubs</h1>
		<p>You enter the pub...</p>
		<hr />
		<p>Beer - 20 Buck</p>
		<button onClick={() => changeState({ statKey: statKeys.alcohol, action: statActions.add, value: 10 })} >Buy and drink</button>
		<hr />
		<button onClick={() => updateScene(sceneNames.harbor)} >Leave</button>
	</>
}

export default HarborPub
