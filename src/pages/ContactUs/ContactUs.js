import './ContactUs.scss';
import { Row, Col, Typography, Form, Select, Input } from 'antd';
import Button from '../../components/Button/Button';
import { db } from "../../firebase/firebase";
import { collection, addDoc } from 'firebase/firestore';


const ContactUs = () => {
	const [form] = Form.useForm();
	const onFinish = async (values) => {
		try {
			await addDoc(collection(db, 'emails'), values);
			alert('Your message has been sent successfully')
			form.resetFields();
		} catch (error) {
			console.error('Failed to save email data:', error);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	const optionsItems =
		[
			{
				value: 'jack',
				label: 'Jack',
			},
			{
				value: 'lucy',
				label: 'Lucy',
			},
			{
				value: 'Yiminghe',
				label: 'yiminghe',
			},
			{
				value: 'disabled',
				label: 'Disabled',
				disabled: true,
			},
		]
	return (
		<div className={'contact-container'} >
			<Typography.Title level={3} style={{ marginBottom: 16 }}>
				Contact Us
			</Typography.Title>
			<Typography.Title level={5} className={'contact-description'}>Say Hello send us your thoughts about our products or share
				your ideas with our Team!</Typography.Title>
			<Form
				form={form}
				name="contactUs"
				colon={false}
				style={{
					width: "100%",
				}}
				initialValues={{
					remember: false,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Row justify={'space-between'}>
					<Col span={10}>
						<Form.Item
							className={'contact-item'}
							name="firstName"
							rules={[
								{
									required: true,
									message: 'Enter your first name',
								},
								{
									type: 'string'
								}
							]}
						>
							<Input placeholder={"First name"} />
						</Form.Item><Form.Item
							className={'contact-item'}
							name="email"
							rules={[
								{
									required: true,
									message: 'Enter your email',
								},
								{
									type: 'email'
								}
							]}
						>
							<Input placeholder={"Email"} />
						</Form.Item>
					</Col>
					<Col span={10}>
						<Form.Item
							className={'contact-item'}
							name="lastName"
							rules={[
								{
									required: true,
									message: 'Enter your last name',
								},
								{
									type: 'string'
								}
							]}
						>
							<Input placeholder={"Last name"} />
						</Form.Item>
						<Form.Item
							className={'contact-item'}
							name="subject"
							rules={[
								{
									required: true,
									message: 'Choose subject',
								},
							]}
						>
							<Select
								placeholder={'Subject'}
								style={{
									width: '100%'
								}}
								options={optionsItems}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Form.Item
					className={'contact-item'}
					name="message"
					rules={[
						{
							required: true,
							message: 'Message',
						},
						{
							type: 'string'
						}
					]}
				>
					<Input.TextArea placeholder={'Message'} />
				</Form.Item>
				<Form.Item className={'contact-button'}>
					<Button htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
export default ContactUs