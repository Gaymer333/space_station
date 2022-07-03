import React, { useEffect } from 'react'
import { sceneNames } from '../..'
import { useGlobalState } from '../../../GlobalStateProvider'

const GetJob = () => {
	const { updateScene, addLifeEvent } = useGlobalState()

	useEffect(() => {
		addLifeEvent({
			name: 'gotJobInPub'
		})
	}, [])

	return <>
		<p>So you want a job?</p>
		<button onClick={() => updateScene(sceneNames.harbor_pub)} >You just got a job</button>
	</>
}

export default GetJob
