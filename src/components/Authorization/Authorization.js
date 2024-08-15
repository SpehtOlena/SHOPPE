import { useState } from 'react';
import { getFirebase } from 'react-redux-firebase';
import './Authorization.scss';
import { Form, Input, Typography, notification } from 'antd';
import Button from "../Button/Button";

const Authorization = () => {
	const [form] = Form.useForm();
	const getFirestoreCollection = (collectionName) => {
		return getFirebase().firestore().collection(collectionName);
	};

	const userCollection = getFirestoreCollection('users');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const registerUserWithEmailAndPassword = async (email, password) => {
		try {
			const userCredential = await getFirebase()
				.auth()
				.createUserWithEmailAndPassword(email, password)
			await userCredential.user.updateProfile({
				displayName: ''
			})
			const newUser = {
				email: userCredential.user.email,
				displayName: '',
				status: 'online',
				photoURL: userCredential.user.photoURL,
				role: 'user',
				orders: []
			}
			await userCollection.doc(userCredential.user.uid).set(newUser)
		} catch (error) {
			console.log(error);
		}
	}

	const loginWithEmailAndPassword = async (email, password) => {
		try {
			const userCredential = await getFirebase()
				.auth()
				.signInWithEmailAndPassword(email, password);
			await userCollection.doc(userCredential.user.uid).update({
				status: 'online'
			});
		} catch (error) {
			console.log(error);
		}
	};

	const signInWithProvider = async (provider) => {
		try {
			const userCredential = await getFirebase()
				.login({
					provider,
					type: "popup"
				});
			const { uid, displayName, photoURL } = userCredential.user;
			await userCollection.doc(uid).update({
				status: "online",
				displayName,
				photoURL
			});
		} catch (error) {
			console.log(error);
		}
	};

	const onFinish = async (values) => {
		if (isSubmitting) return;
		setIsSubmitting(true);
		await registerUserWithEmailAndPassword(values.email, values.password);
		setIsSubmitting(false);
	};

	return (
		<div className={'auth-container'}>
			<Typography.Title level={3}>My account</Typography.Title>
			<Form
				form={form}
				name={'auth'}
				onFinish={onFinish}
			>
				<Form.Item
					name={'email'}
					className={'auth-item'}
					rules={[
						{
							required: true,
							type: "email"
						}
					]}
				>
					<Input placeholder='Email' />
				</Form.Item>
				<Form.Item
					name={'password'}
					className={'auth-item'}
					rules={[
						{
							required: true,
						},
						{
							min: 6,
						}
					]}
				>
					<Input.Password placeholder='Password' />
				</Form.Item>
				<Form.Item>
					<div className={'auth-button'}>
						<Button onClick={form.submit} type={'black'}>Register</Button>
						<Button onClick={() => signInWithProvider('google')} type={'black'}>Google</Button>
					</div>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Authorization;
