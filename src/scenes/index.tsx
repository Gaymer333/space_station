import React from 'react'
import Harbor from './harbor'
import HarborPub from './harbor/pub'
import Intro from './intro'
import Pregame from './pregame'

export enum sceneNames {
	'pregame',
	'intro',
	'harbor',
	'harbor_pub'
}

export const getScene = (scene: sceneNames | undefined) => {
	if (scene === undefined) throw new Error('Scene missing')

	switch (scene) {
	case sceneNames.pregame:
		return Pregame

	case sceneNames.intro:
		return Intro

	case sceneNames.harbor:
		return Harbor

	case sceneNames.harbor_pub:
		return HarborPub

	default:
		return Pregame
	}
}
