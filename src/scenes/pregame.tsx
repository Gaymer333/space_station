import React from 'react'
import { useGlobalState } from '../GlobalStateProvider'
import _ from 'lodash'
import { sceneNames } from '.'

const Pregame = () => {
	const { state, updateScene, updatePlayer } = useGlobalState()

	const saveName = () => {
		const playerName = (document.getElementById('player_name') as HTMLInputElement).value
		updatePlayer({ firstname: playerName })
	}

	return <>
		<h1>Space Station BD</h1>
		<p>Welcome to my RPG prototype. As of time of writing, do this prototype not have any meningfull content, and is purely an playground.</p>
		<p>You will play as a young man, that, with what you have on your body, are on a transport to a space station, obiting the moon.</p>
		<p><strong>Your goal:</strong> To start a new life.</p>
		<p>The setting is high fantasy and sci fi.</p>
		<hr />
		<h2>About you.</h2>
		<p>What is your first name?</p>
		<input type="text" name='player_name' id='player_name' defaultValue={state.player.firstname} />
		<button onClick={saveName} >Save name</button>
		<hr />
		<p>Ready? Lets get your new life onboard of <strong>SSBD</strong></p>
		<button onClick={() => updateScene(sceneNames.intro)}>Take off!</button>
	</>
}

export default Pregame
