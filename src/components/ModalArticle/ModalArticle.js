import './ModalArticle.scss';
import ReactDOM from 'react-dom';
import Button from "../Button/Button";

const ModalArticle = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null
	return ReactDOM.createPortal(
		<div className={'modal-overlay'}>
			<div className={'modal'}>
				{children}
				<Button onClick={onClose} $primary>Back</Button>
			</div>
		</div>,
		document.getElementById('modal-root')
	)
}
export default ModalArticle