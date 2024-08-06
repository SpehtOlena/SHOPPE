import { getFirebase } from 'react-redux-firebase'
import './Authorization.scss'

const Authorization = () => {
	const userCollection = getFirebase().firestore().collection('users')
	const registerUserWithEmailAndPassword = async (email, password) => {
		try {
			const userCredential = await getFirebase()
				.auth()
				.createUserWithEmailAndPassword(email, password)
			await userCredential.user.updateProfile({
				displayName: ''
			})
		} catch (error) {
			console.log(error);
		}
	}

	const loginWithEmailAndPassword = async (email, password) => {
		try {
			const userCredential = await getFirebase()
				.auth()
				.signInWithEmailAndPassword(email, password)
			await userCollection.doc(userCredential.user.uid).update({
				status: 'online'
			})

		} catch (error) {
			console.log(error);
		}
	}

	const signInWithProvider = async (provider) => {
		try {
			const userCredential = await getFirebase()
				.login({
					provider,
					type: "popup"
				})
			const { uid, displayName, photoURL } = userCredential.user
			await userCollection.doc(uid).update({
				status: "online",
				displayName,
				photoURL
			})
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div>
			Authorization
		</div>
	)
}
export default Authorization