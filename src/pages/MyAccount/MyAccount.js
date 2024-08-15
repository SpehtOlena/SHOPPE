import { useSelector } from 'react-redux'
import './MyAccount.scss'
import { getFirebase, isEmpty } from 'react-redux-firebase'
import Authorization from '../../components/Authorization/Authorization'
import Button from '../../components/Button/Button'

const MyAccount = () => {
	const auth = useSelector(state => state.firebase.auth)
	return (
		<div>
			{
				isEmpty(auth) && <Authorization />
			}
			{
				!isEmpty(auth) && <Button onClick={() => getFirebase().auth().signOut()}>Exit</Button>
			}
		</div>
	)
}
export default MyAccount