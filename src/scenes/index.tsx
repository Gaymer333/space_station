import React from 'react'
import Harbor from './harbor'
import HarborPub from './harbor/pub'
import HarborPubWorkingBar from './harbor/pub/workingBar'
import HarborPubWorkingTables from './harbor/pub/workingTables'
import Intro from './intro'
import Pregame from './pregame'

export enum sceneNames {
	'pregame',
	'intro',
	'harbor',
	'harbor_pub',
	'harbor_pub_work_bar',
	'harbor_pub_work_tables'
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

	case sceneNames.harbor_pub_work_bar:
		return HarborPubWorkingBar

	case sceneNames.harbor_pub_work_tables:
		return HarborPubWorkingTables

	default:
		return Pregame
	}
}
