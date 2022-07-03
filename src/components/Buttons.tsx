import React, { useEffect } from 'react'
import { useGlobalState } from '../GlobalStateProvider'
import { sceneNames } from '../scenes'

interface IChangeStageButtonProps {
	sceneName: sceneNames,
	buttonText: string,
	disableCheck?: boolean
}

const ChangeStageButton = (props: IChangeStageButtonProps) => {
	const { updateScene } = useGlobalState()
	const { sceneName, buttonText, disableCheck = false } = props

	return <button onClick={() => updateScene(sceneName)} disabled={disableCheck} >{buttonText}</button>
}

export { ChangeStageButton }
