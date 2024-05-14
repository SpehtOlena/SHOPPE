import { CgClose } from "react-icons/cg";
import './DeleteItem.scss';

const DeleteItem = ({ children, onClick }) => {
	return (
		<div onClick={onClick} className={'delete-item'}>
			{children}
			<span>
				<CgClose size={18} />
			</span>
		</div>
	)
}
export default DeleteItem