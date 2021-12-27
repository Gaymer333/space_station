import React from 'react'
import { useGlobalState } from '../GlobalStateProvider'
import background from '../images/bg.png'
import { getScene } from '../scenes'

const Stage = () => {
	const { state } = useGlobalState()
	const Scene = getScene(state.stage?.scene)
	return <div className="stage" style={{ backgroundImage: `url(${background})` }} >
		<Scene />
	</div>
}

export default Stage
