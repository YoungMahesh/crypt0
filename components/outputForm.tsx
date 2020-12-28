
interface ListProps {
	resultText: string
}

const OutputForm = ({ resultText }: ListProps) => {

	const copyText = (text: string) => {
		navigator.clipboard.writeText(text)
		alert(`Copied: \n${text}`)
	}

	return (
		<form>
			<label> Result: </label>
			<textarea value={resultText} readOnly></textarea>

			<input type='button' value='Copy' onClick={() => copyText(resultText)} />
		</form>
	)
}

export default OutputForm