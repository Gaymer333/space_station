import React, { useEffect } from 'react'
import { useGlobalState } from '../GlobalStateProvider'
import { sceneNames } from '../scenes'

interface IChangeStageButtonProps {
	sceneName: sceneNames,
	disableCheck: boolean
}

const ChangeStageButton = (props: IChangeStageButtonProps) => {
	const { updateScene } = useGlobalState()
	const { sceneName, disableCheck } = props

	return <button onClick={() => updateScene(sceneName)} disabled={disableCheck} >Work</button>
}

export { ChangeStageButton }
