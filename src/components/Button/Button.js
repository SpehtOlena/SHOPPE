import './Button.scss'

const Button = ({ children, type, icon, onClick }) => {
	switch (type) {
		default: {
			return <button onClick={onClick} className={'button'}>{children}</button>
		}
		case 'primary': {
			return <button onClick={onClick} className={'button-primary'}>{children}</button>
		}
		case 'black': {
			return <button onClick={onClick} className={'button-black'}>{children}</button>
		}
		case 'w-100': {
			return <button onClick={onClick} className={'button-w-100'}>{children}</button>
		}
		case 'half-opacity': {
			return <button onClick={onClick} className={'button-half-opacity'}>{children}</button>
		}
		case "icon": {
			return <button onClick={onClick} className={'button-icon'}>{icon}{children}</button>
		}
		case "link": {
			return <button onClick={onClick} className={'button-link'}>{icon}{children}</button>
		}
	}
}
export default Button