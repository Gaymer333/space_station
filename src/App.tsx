import React from 'react'
import SideBar from './components/SideBar'
import Stage from './components/Stage'
import { GlobalStateProvider } from './GlobalStateProvider'

function App () {
	return (
		<GlobalStateProvider >
			<div className="App">
				<SideBar />
				<Stage />
			</div>
		</GlobalStateProvider>
	)
}

export default App
