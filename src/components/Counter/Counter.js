import './Counter.scss';
import Button from "../Button/Button"

const Counter = ({ counterValue, setCounterValue }) => {

	const plus = () => {
		setCounterValue(counterValue + 1)
	}
	const minus = () => {
		if (counterValue > 1) {
			setCounterValue(counterValue - 1)
		}
	}
	return (
		<div className={'counter-container'}>
			<Button type={'icon'} disabled={counterValue <= 1} onClick={minus}>–</Button>
			{counterValue}
			<Button type={'icon'} onClick={plus}>+</Button>
		</div>
	)
}
export default Counter