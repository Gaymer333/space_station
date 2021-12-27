import React from 'react'
import { sceneNames } from '.'
import { useGlobalState } from '../GlobalStateProvider'

const Intro = () => {
	const { updateScene } = useGlobalState()

	return <>
		<h1>Intro</h1>
		<p>The spaceship docks. You stand there, in the harbor with only your back, and your cloth to your name.</p>
		<p>You are surrounded by and busy space habor, where cargo is being tranported around, ships are being worked on and a lot of new arrivals are making there way into the station.</p>
		<p>The station is huge! Hosting over 250,000 resident, SSBD have everything you would need from a city.</p>
		<p>First order of business, is to get you groundings. You have only a few bucks to your name, and will need to get job or a way of living.</p>
		<p>A roof over your head, would propperly also be a good idea.</p>
		<hr />
		<p>Where do you go?</p>
		<button onClick={() => updateScene(sceneNames.harbor)} >Take a look around the harbor.</button>
		<button >Go towards the city.</button>
	</>
}

export default Intro
