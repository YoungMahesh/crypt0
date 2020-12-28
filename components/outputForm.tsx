
interface ListProps {
	currentForm: string,
	resultText: string
}

const OutputForm = ({ currentForm, resultText }: ListProps) => {

	const copyText = (text: string) => {
		navigator.clipboard.writeText(text)
		alert(`Copied: \n${text}`)
	}

	return (
		<form style={currentForm === 'outputForm' ? {} : { display: 'none' }}>
			<div className='form-left-part'>
				<label> Result: </label>
				<textarea value={resultText} readOnly></textarea>
			</div>

			<div className='form-right-part'>
				<input type='button' value='Copy' onClick={() => copyText(resultText)} />
			</div>

		</form>
	)
}

export default OutputForm