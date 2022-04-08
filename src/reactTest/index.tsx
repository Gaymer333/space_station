import React, { useState } from 'react'
import TestOneContext from './test1/context'
import './style.scss'

const ReactTest = () => {
	const [showTestOneContext, setShowTestOneContext] = useState(false)

	return <div className='reactTest'>
		<h1>React Test</h1>
		<hr />
		<button onClick={() => setShowTestOneContext(!showTestOneContext)}>Show Test 1</button>
		<div className='testWrapper'>
			{showTestOneContext && <TestOneContext />}

		</div>
	</div>
}

export default ReactTest
