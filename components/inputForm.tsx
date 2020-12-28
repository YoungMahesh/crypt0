import { useState } from "react"

interface ListProps {
	currentForm: string,
	updateResultText: Function,
	setMessage1: Function,
	changeCurrentForm: Function
}

const InputForm = ({ currentForm, updateResultText, setMessage1, changeCurrentForm }: ListProps) => {

	const [inputText, updateInputText] = useState<string>('')
	const [password, updatePassword] = useState<string>('')

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

	return (
		<form style={currentForm === 'inputForm' ? {} : { display: 'none' }}>
			<div className='form-left-part'>
				<label> Text: </label>
				<textarea value={inputText} onChange={e => updateInputText(e.target.value)} ></textarea>
			</div>

			<div className='form-right-part'>
				<label> Password: </label>
				<input type='text' value={password} onChange={e => updatePassword(e.target.value)} />

				<input type='button' value='Encrypt' onClick={() => cryptText('encrypt')} />

				<input type='button' value='Decrypt' onClick={() => cryptText('decrypt')} />

				<input type='button' value='Clear' onClick={() => {
					updateInputText('')
					updatePassword('')
					updateResultText('')
				}} />
			</div>
		</form>
	)
}

export default InputForm