import Header from '@/components/header'
import Head from 'next/head'

import { useState } from 'react'

const Home = () => {
	const [currentForm, setCurrentForm] = useState<string>('inputForm')
	const [message1, setMessage1] = useState<string>('')

	const [inputText, updateInputText] = useState<string>('')
	const [password, updatePassword] = useState<string>('')

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

	const cryptText = async (type: string) => {
		if (inputText.length === 0 || password.length === 0) {
			return setMessage1('Text or Password should not be empty')
		}

		setMessage1('Loading...')
		updateResultText('')
		changeCurrentForm('outputForm')
		const dataObj = {
			type: type,
			text: inputText,
			password: password
		}

		const resp0 = await fetch(`/api/crypt`, {
			method: 'POST',
			body: JSON.stringify(dataObj)
		})

		if (resp0.status === 400) {
			return setMessage1('Text and Password combination is wrong')
		}

		setMessage1('')
		const resp1 = await resp0.json()

		updateResultText(resp1.result)
	}

	const copyText = (text: string) => {
		navigator.clipboard.writeText(text)
		alert(`Copied: \n${text}`)
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

			<form style={currentForm === 'inputForm' ? {} : { display: 'none' }}>
				<label> Text: </label>
				<textarea value={inputText} onChange={e => updateInputText(e.target.value)} ></textarea>

				<label> Password: </label>
				<input type='text' value={password} onChange={e => updatePassword(e.target.value)} />

				<input type='button' value='Encrypt' onClick={() => cryptText('encrypt')} />

				<input type='button' value='Decrypt' onClick={() => cryptText('decrypt')} />

				<input type='button' value='Clear' onClick={() => {
					updateInputText('')
					updatePassword('')
					updateResultText('')
				}} />
			</form>


			<form style={currentForm === 'outputForm' ? {} : { display: 'none' }}>
				<label> Result: </label>
				<textarea value={resultText} readOnly></textarea>

				<input type='button' value='Copy' onClick={() => copyText(resultText)} />
			</form>


		</main>
	)
}

export default Home