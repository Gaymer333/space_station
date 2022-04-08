import React, { createContext, useContext, useState } from 'react'

interface ContextData {
	contextData: string
	setContextData: (newContextData: string) => void
}

const Context = createContext<ContextData | undefined>(undefined)

const TestOneContext = () => {
	let levelOneCalls = 0
	let levelTwoCalls = 0
	let levelThreeCalls = 0

	const LevelThree = () => {
		console.log(`Level three calls: ${++levelThreeCalls}`)
		const context = useContext(Context)
		if (!context) return <></>

		return (
			<div>
				<button onClick={() => context.setContextData('goodbye')}>
					Change context
				</button>
				{context.contextData}
			</div>
		)
	}

	const LevelTwo = () => {
		console.log(`Level two calls: ${++levelTwoCalls}`)
		return <LevelThree />
	}

	const LevelOne = () => {
		const [contextData, setContextData] = useState('hello')
		console.log(`Level One calls: ${++levelOneCalls}`)
		return (
			<Context.Provider value={{ contextData, setContextData }}>
				<LevelTwo />
			</Context.Provider>
		)
	}

	return <div>
		<h1>Test One Context</h1>
		<div className='test'>
			<LevelOne />
		</div>
	</div>
}

export default TestOneContext
