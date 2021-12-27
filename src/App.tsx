import React from 'react'
import SideBar from './components/SideBar'
import Stage from './components/Stage'
import { GlobalStateProvider, initiateGlobalState } from './GlobalStateProvider'

function App () {
	return (
		<GlobalStateProvider value={initiateGlobalState()} >
			<div className="App">
				<SideBar />
				<Stage />
			</div>
		</GlobalStateProvider>
	)
}

export default App
