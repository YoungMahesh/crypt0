import { useState } from 'react'
import Header from '@/components/header'
import InputForm from '@/components/inputForm'
import OutputForm from '@/components/outputForm'
import Head from 'next/head'


const Home = () => {
	const [currentForm, setCurrentForm] = useState<string>('inputForm')
	const [message1, setMessage1] = useState<string>('')

	const [resultText, updateResultText] = useState<string>('')

	const [inBtnColor, updateInBtnColor] = useState<string>('white')
	const [inBtnBack, updateInBtnBack] = useState<string>('black')
	const [outBtnColor, updateOutBtnColor] = useState<string>('black')
	const [outBtnBack, updateOutBtnBack] = useState<string>('white')

	const changeCurrentForm = (currentForm: string) => {
		if (currentForm === 'inputForm') {
			setCurrentForm('inputForm')
			updateInBtnColor('white')
			updateInBtnBack('black')
			updateOutBtnColor('black')
			updateOutBtnBack('white')
		} else if (currentForm === 'outputForm') {
			setCurrentForm('outputForm')
			updateInBtnColor('black')
			updateInBtnBack('white')
			updateOutBtnColor('white')
			updateOutBtnBack('black')
		}
	}

	const toggleFrom = (e: React.MouseEvent, currentBtn: string) => {
		e.preventDefault();

		if (currentBtn === 'inputBtn') {
			changeCurrentForm('inputForm')
		} else if (currentBtn === 'outputBtn') {
			changeCurrentForm('outputForm')
		}
	}

	return (
		<main>
			<Head>
				<title>Encrypt-Decrypt Text</title>
				<link rel='stylesheet' href='styles/crypt.css' />
			</Head>

			<Header title='Encrypt-Decrypt Text' />

			<div className='toggle-form' >
				<h4
					className='form-btn'
					onClick={(e) => toggleFrom(e, 'inputBtn')}
					style={{ color: inBtnColor, backgroundColor: inBtnBack }}
				> Input </h4>
				<h4
					className='form-btn'
					onClick={e => toggleFrom(e, 'outputBtn')}
					style={{ color: outBtnColor, backgroundColor: outBtnBack }}
				> Result </h4>
			</div>

			<p>{message1}</p>

			<div style={currentForm === 'inputForm' ? {} : { display: 'none' }}>
				<InputForm updateResultText={updateResultText} setMessage1={setMessage1} changeCurrentForm={changeCurrentForm} />
			</div >

			<div style={currentForm === 'outputForm' ? {} : { display: 'none' }}>
				<OutputForm resultText={resultText} />
			</div>

		</main>
	)
}

export default Home