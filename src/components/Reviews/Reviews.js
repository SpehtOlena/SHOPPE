import { Row, Col, Typography, Form, Rate, Checkbox, Input } from 'antd';
import './Reviews.scss';
import Button from "../Button/Button";
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Reviews = ({ product, productId }) => {
	const [value, setValue] = useState(0);
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const submitFormToFirestore = (productId, formData) => {
		return (dispatch, getState, { getFirebase }) => {
			const firestore = getFirebase().firestore();
			const productRef = firestore.collection('products').doc(productId);
			return productRef.get().then((doc) => {
				if (doc.exists) {
					const productData = doc.data();
					const customerReview = productData.customerReview || [];

					if (formData && formData.review && formData.name && formData.email && formData.rate) {
						setIsLoading(true);
						customerReview.push({
							userReview: formData.review,
							userName: formData.name,
							userEmail: formData.email,
							userRate: formData.rate
						});

						return productRef.update({ customerReview }).then(() => {
							console.log('Customer review added to product successfully');
						}).catch((error) => {
							console.error('Error updating product with customer review: ', error);
						}).finally(() => {
							setIsLoading(false);
						});
					} else {
						setIsLoading(false);
					}
				} else {
					console.error('Product with productId does not exist');
					setIsLoading(false);
				}
			}).catch((error) => {
				console.error('Error getting product document: ', error);
				setIsLoading(false);
			});
		};
	};

	const onFinish = (formData) => {
		dispatch(submitFormToFirestore(productId, formData));
		form.resetFields();
		setValue(0);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Row className={'reviews-container'} justify={'space-between'}>
			{isLoading ? (
				<div>Loading</div>
			) : (
				<>
					<Col span={11}>
						<Typography.Title level={5} style={{ marginBottom: 76 }}>
							{product?.customerReview.length} Reviews for {product?.name}
						</Typography.Title>
						<div className={'review-items'} >
							{
								product && product.customerReview && product.customerReview.map((value, index) =>
									<div key={index} value={value} className={'review-item'}>
										<Typography.Title level={5}>{value.userName}</Typography.Title>
										<Rate disabled value={value.userRate} allowHalf className={'product-rate'} />
										<div>
											{value.userReview}
										</div>
									</div>
								)
							}
						</div>
					</Col>
					<Col span={11} className={'review-container'}>
						<Typography.Title level={5} style={{ marginBottom: 16 }}>
							Add a Review
						</Typography.Title>
						<Typography.Text className={'review-container-description'}>Your email address will not be published. Required fields are marked *</Typography.Text>
						<Form
							form={form}
							name="formData"
							colon={false}
							layout={'vertical'}
							style={{
								maxWidth: "100%",
							}}
							initialValues={{
								remember: false,
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
						>
							<Form.Item
								className={'review-container-item'}
								label="Your Review"
								name="review"
								hasFeedback
								rules={[
									{
										required: true,
										message: 'Your Review',
									},
									{
										type: 'string'
									}
								]}
							>
								<Input.TextArea />
							</Form.Item>

							<Form.Item
								className={'review-container-item'}
								label="Enter your name"
								name="name"
								hasFeedback
								rules={[
									{
										required: true,
										message: 'Enter your name',
									},
									{
										type: 'string'
									}
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								className={'review-container-item'}
								label="Enter your Email"
								name="email"
								hasFeedback
								rules={[
									{
										required: true,
										message: 'Enter your Email',
										type: "email"
									},
									{
										type: 'email'
									}
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								name="remember"
								valuePropName="checked"
							>
								<Checkbox>Save my name, email, and website in this browser for the next time I comment</Checkbox>
							</Form.Item>

							<Form.Item
								label="Your Rating"
								name="rate"
								rules={[
									{
										required: true,
										message: 'Enter your rate',
									},
								]}
							>
								<Rate allowClear onChange={setValue} value={value} className={'product-ratting'} />
							</Form.Item>
							<Form.Item>
								<Button htmlType="submit">
									Submit
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</>
			)}
		</Row>
	)
}

export default Reviews;
