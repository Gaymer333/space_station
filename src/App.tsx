import React from 'react'
import SideBar from './components/SideBar'
import Stage from './components/Stage'
import { GlobalStateProvider } from './GlobalStateProvider'
import ReactTest from './reactTest'

function App () {
	return (
		<GlobalStateProvider >
			<div className="App">
				<ReactTest />
				{/* <SideBar />
				<Stage /> */}
			</div>
		</GlobalStateProvider>
	)
}

export default App
