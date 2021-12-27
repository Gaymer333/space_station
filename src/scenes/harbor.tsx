import React from 'react'
import { sceneNames } from '.'
import { useGlobalState } from '../GlobalStateProvider'

const Harbor = () => {
	const { updateScene } = useGlobalState()

	return <>
		<h1>Harbor</h1>
		<p>The Harbor is hosted in what seems like to be the lower decks of the station.</p>
		<p>It host no living areas. Only offices, storages, workshops, and pubs.</p>
		<p>The workers moving around in the Harbor is of the hardworking type. Big musces and worn out cloth. Even the overseers and administrative persernal</p>
		<p>In the work hours, stresset are busy of the working people, but in the evening, will the people start to gather in the the pubs and allyes for beer and dicegames.</p>
		<p>If you keep your wits about you and stick to the main road, then this is a safe place. But be carefull in the back allyes or looking like an easy target at night.</p>
		<hr />
		<button onClick={() => updateScene(sceneNames.harbor_pub)} >Check out the pubs</button>
		<button >Look at the starships docked</button>
		<button >Check out the workshops and offices</button>
		<button >Go towards the city.</button>
	</>
}

export default Harbor
