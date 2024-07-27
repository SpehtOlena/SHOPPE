import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import './Checkout.scss'
import { Checkbox, Col, Form, Input, Row, Table, Typography } from 'antd';

const Checkout = () => {
	const [data, setData] = useState();
	const [form] = Form.useForm();
	const shoppingCartProducts = useSelector(state => state.shoppingCartProducts.data)

	useEffect(() => {
		setData(shoppingCartProducts);
	}, [shoppingCartProducts]);

	const columns = [
		{
			title: "PRODUCT",
			dataIndex: "",
			key: "title",
			render: (value) =>
				<Typography.Title level={5}>{value.name}</Typography.Title>
		},
		{
			title: "TOTAL",
			dataIndex: "",
			key: "price",
			render: (product) =>
				<Typography.Title level={5}>
					${(product.price * product.quantity)}
				</Typography.Title>
		}
	]

	const onFinish = () => {
		console.log('form');
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<div className={'checkout-container'}>
			<Typography.Title level={2}>Checkout</Typography.Title>
			<Row justify={'space-between'} style={{ width: "100%" }}>
				<Col span={11}>
					<Typography.Title level={3}>Billing Details</Typography.Title>
					<Form
						form={form}
						name="checkoutForm"
						colon={false}
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}>
						<Row justify={'space-between'}>
							<Col span={11}>
								<Form.Item
									className={'billing-form-item'}
									label="First name"
									name="first name"
									rules={[
										{
											required: true,
											message: 'Enter your First name',
										},
										{
											type: 'string'
										}
									]}>
									<Input />
								</Form.Item>
							</Col>
							<Col span={11}>
								<Form.Item
									className={'billing-form-item'}
									label="Last name"
									name="last name"
									hasFeedback
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
									<Input />
								</Form.Item>
							</Col>
						</Row>
						<Form.Item
							className={'billing-form-item'}
							label="Company name"
							name="company name"
							hasFeedback
							rules={[
								{
									type: 'string'
								}
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							className={'billing-form-item'}
							label="Country"
							name="country"
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Enter Country',
								},
								{
									type: 'string'
								}
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							className={'billing-form-item'}
							label="Street Address"
							name="street address"
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Enter Street Address',
								},
								{
									type: 'string'
								}
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							className={'billing-form-item'}
							label="Postcode / ZIP"
							name="zip"
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Enter ZIP',
								}
							]}
						>
							<Input
								onKeyDown={(event) => {
									if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
										event.preventDefault();
									}
								}}
							/>
						</Form.Item>
						<Form.Item
							className={'billing-form-item'}
							label="Town / City"
							name="town"
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Enter Town / City',
								},
								{
									type: 'string'
								}
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							className={'billing-form-item'}
							label="Phone"
							name="phone"
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Enter Phone',
								},
								{
									type: 'string'
								}
							]}
						>
							<Input
								onKeyDown={(event) => {
									if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
										event.preventDefault();
									}
								}}
							/>
						</Form.Item>
						<Form.Item
							className={'billing-form-item'}
							label="Email"
							name="email"
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Enter Email',
								},
								{
									type: 'email'
								}
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							className={'billing-form-checkbox'}
							name="createAccount"
							valuePropName="checked"
							hasFeedback
						>
							<Checkbox className={'billing-form-checkbox-item'}>Create an account?</Checkbox>
						</Form.Item>
						<Form.Item
							className={'billing-form-checkbox'}
							name="shipToDifferentAddress"
							valuePropName="checked"
							hasFeedback
						>
							<Checkbox className={'billing-form-checkbox-item'}>Ship to a different address?</Checkbox>
						</Form.Item>
						<Form.Item
							className={'billing-form-item'}
							label="Order notes"
							name="notes"
							hasFeedback
							rules={[
								{
									type: 'string'
								}
							]}
						>
							<Input />
						</Form.Item>
					</Form>
				</Col>
				<Col span={11}>
					<Typography.Title level={3}>Your Order</Typography.Title>
					<div className={'order-container'}>
						<Table
							dataSource={data}
							rowKey={value => value.id}
							columns={columns}
							pagination={false}
							style={{ width: '100%' }}
						/>
					</div>
				</Col>
			</Row>
		</div>
	)
}
export default Checkout