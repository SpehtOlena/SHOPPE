import { Col, Collapse, Form, Input, Tooltip, Row, Select, Space, Table, Typography, Divider, Alert } from 'antd';
import { useEffect, useState, useRef } from 'react';
import './ShoppingCart.scss';
import Counter from '../../components/Counter/Counter';
import { useDispatch, useSelector } from 'react-redux';
import { clearShoppingCart, deleteProductFromShoppingCart, editProductToShoppingCard } from '../../redux/actions';
import { CloseOutlined } from "@ant-design/icons";
import axios from 'axios';
import Button from '../../components/Button/Button';
import { promoCodes } from '../../data/promo';
import { Link } from 'react-router-dom';


const ShoppingCart = () => {
	const [data, setData] = useState([]);
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [countryData, setCountryData] = useState([]);
	const [cityData, setCityData] = useState([]);
	const [selectedValueCountry, setSelectedValueCountry] = useState();
	const [selectedValueCity, setSelectedValueCity] = useState([]);
	const [zipValue, setZipValue] = useState('');
	const [calculateValue, setCalculateValue] = useState(false);
	const [alertVisible, setAlertVisible] = useState(false);
	const [couponValue, setCouponValue] = useState('');
	const [discountValue, setDiscountValue] = useState(null);
	const [couponError, setCouponError] = useState(false);
	const shoppingCartProducts = useSelector(state => state.shoppingCartProducts.data);
	const zipInputRef = useRef(null);

	useEffect(() => {
		setData(shoppingCartProducts);
	}, [shoppingCartProducts, couponValue]);

	useEffect(() => {
		axios
			.get('https://countriesnow.space/api/v0.1/countries')
			.then((res) => {
				setCountryData(res.data.data);
			});
	}, []);

	useEffect(() => {
		if (countryData.length) {
			setSelectedValueCountry([]);
		}
	}, [countryData]);

	useEffect(() => {
		const selectedCountry = countryData.find(value => value.country === selectedValueCountry);
		if (selectedCountry) {
			const uniqueCities = [...new Set(selectedCountry.cities)];
			const options = uniqueCities.map((value) => ({
				value: value,
				label: value
			}));
			setCityData(options);
		} else {
			setCityData([]);
		}
	}, [selectedValueCountry, countryData]);

	const columns = [
		{
			title: "",
			dataIndex: "",
			key: "image",
			render: (value) =>
				<div className={'product-image'}>
					<img src={value.image} alt="product photo" style={{ width: "100%" }} />
				</div>
		},
		{
			title: "",
			dataIndex: "",
			key: "product",
			render: (value) =>
				<Space direction={'vertical'} style={{ width: "100%" }}>
					<Typography.Title level={4}>{value.name}</Typography.Title>
					<div>
						<Space>
							<div>{value.preciousMetal}</div>/
							<div>{value.gemStone}</div>
						</Space>
					</div>
					<div className={'product-price'}>$ {(value.price).toFixed(2)}</div>
				</Space>
		},
		{
			title: "",
			dataIndex: "",
			key: "quantity",
			render: (value) => {
				return <Counter counterValue={value.quantity} setCounterValue={(quantity) => {
					dispatch(editProductToShoppingCard(value, quantity));
				}} />;
			}
		},
		{
			title: "",
			dataIndex: "deleteProduct",
			key: "deleteProduct",
			render: (value, valueId) => {
				return (
					<div className={'icon-container'} style={{ width: "100%", cursor: 'pointer' }}>
						<CloseOutlined onClick={() => dispatch(deleteProductFromShoppingCart(valueId))} />
					</div>
				);
			}
		}
	];

	const onFinish = () => {
		if (selectedValueCountry && selectedValueCity.length > 0 && zipValue) {
			setCalculateValue(true);
			setAlertVisible(false);
		} else {
			setCalculateValue(false);
			setAlertVisible(true);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const formatNumber = (value) => new Intl.NumberFormat().format(value);

	const NumericInput = (props) => {
		const { value, onChange } = props;

		const handleChange = (e) => {
			const { value: inputValue } = e.target;
			const reg = /^-?\d*(\.\d*)?$/;
			if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
				onChange(inputValue);
			}
		};

		const handleBlur = () => {
			let valueTemp = value;
			if (value.charAt(value.length - 1) === '.' || value === '-') {
				valueTemp = value.slice(0, -1);
			}
			onChange(valueTemp.replace(/0*(\d+)/, '$1'));
		};

		const title = value ? (
			<span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
		) : (
			'POST CODE/ZIP'
		);

		return (
			<Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
				<Input
					{...props}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="POST CODE/ZIP"
					maxLength={16}
					ref={zipInputRef}
				/>
			</Tooltip>
		);
	};

	const collapseItems = [
		{
			key: '1',
			label: 'CALCULATE SHIPPING',
			children: <Space direction={'vertical'} style={{
				width: "100%"
			}}>
				<Form
					form={form}
					className={'shopping-cart-form'}
					name={'base'}
					initialValues={{
						remember: false,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						rules={[
							{
								required: true,
								message: 'Your Review',
							},
							{
								type: 'string'
							}
						]}>
						<Select
							placeholder={'SELECT A COUNTRY'}
							defaultActiveFirstOption={true}
							onChange={(value) => setSelectedValueCountry(value)}
							options={countryData.map((value) => ({
								value: value.country,
								label: value.country
							}))}
							value={selectedValueCountry}
						/>
					</Form.Item>
					<Divider style={{ marginBottom: 23 }} />
					<Form.Item
						colon={false}
						required={true}
					>
						<Select
							placeholder={'SELECT A CITY'}
							defaultActiveFirstOption={true}
							onChange={(value) => setSelectedValueCity(value)}
							value={selectedValueCity}
							options={cityData}
						/>
					</Form.Item>
					<Divider style={{ marginBottom: 23 }} />
					<Form.Item
						required={true}
						style={{
							borderBottom: "1px solid $dark-gray",
						}}>
						<NumericInput
							style={{
								width: 120,
							}}
							value={zipValue}
							onChange={setZipValue}
						/>
					</Form.Item>
					<Divider style={{ marginBottom: 23 }} />
					<div className={'cart-button-container'}>
						<Button>UPDATE TOTALS</Button>
					</div>
				</Form>
				{alertVisible && (
					<Alert message="Please fill in all the fields" type="error" showIcon />
				)}
			</Space>
		}
	];

	useEffect(() => {
		if (zipInputRef.current) {
			zipInputRef.current.focus();
		}
	}, [zipValue]);

	const handleApplyCoupon = () => {
		const foundPromo = promoCodes.find(promo => promo.promoCode === couponValue);
		if (foundPromo) {
			setDiscountValue(foundPromo.discountPercentage);
			setCouponError(false);
		} else {
			setDiscountValue('');
			setCouponError(true);
		}
	}

	return (
		<div className={'shopping-cart-container'}>
			<Typography.Title level={2}>Shopping Cart</Typography.Title>
			{
				!!data.length ?
					<Row justify={'space-around'}>
						<Col span={12} style={{ width: '100%' }}>
							<Space direction={'vertical'} style={{ width: '100%' }} size={'large'}>
								<Table
									dataSource={data}
									rowKey={value => value.id}
									columns={columns}
									size={'large'}
									showHeader={false}
									pagination={false}
									style={{ width: '100%' }}
								/>
								<Row justify={'end'} style={{ marginBottom: 40 }}>
									<Button onClick={() => dispatch(clearShoppingCart())}>CLEAR SHOPPING CART</Button>
								</Row>
								<Row justify={'space-between'} align={'bottom'}>
									<Form name={'coupon'}>
										<Form.Item style={{ marginBottom: 0 }}>
											<Input placeholder='Coupon Code' onChange={(e) => setCouponValue(e.target.value)} value={couponValue} className={"coupon-input"} />
										</Form.Item>
									</Form>
									{couponError && (
										<Alert message="Promo code is not valid" type="error" showIcon />
									)}
									<Button type={'black'} onClick={handleApplyCoupon}>APPLY COUPON</Button>
								</Row>
							</Space>
						</Col>
						<Col span={8} className={'shopping-calculate-container'}>
							<Space direction={'vertical'} size={'large'} style={{ width: "100%" }}>
								<Typography.Title level={3}>Cart totals</Typography.Title>
								<Row>
									<Col span={8}>
										<Typography.Title level={5}>SUBTOTAL</Typography.Title>
									</Col>
									<Col span={16}>
										<Typography.Text>
											$ {data.reduce((sum, item) => sum + item.price * item.quantity * (1 - discountValue / 100), 0).toFixed(2)}
										</Typography.Text>
									</Col>
								</Row>
								<Row>
									<Col span={8}>
										<Typography.Title level={5}>SHIPPING</Typography.Title>
									</Col>
									<Col span={16}>
										<Typography.Text>Shipping costs will be calculated once you have provided address.</Typography.Text>
									</Col>
								</Row>
								<Row>
									<Col span={8}></Col>
									<Col span={16}>
										<Collapse items={collapseItems} expandIconPosition={'end'} />
									</Col>
								</Row>
								<Divider style={{ marginBottom: 23, marginTop: 23, lineWidth: 28 }} />
								<Row justify={'space-between'}>
									<Col span={8}>
										<Typography.Title level={4}>TOTAl</Typography.Title>
									</Col>
									<Col span={16}>
										<Typography.Title level={4} style={{ textAlign: "right" }}>
											{
												!!calculateValue
													? `$ ${data.reduce((sum, item) => sum + item.price * item.quantity * 1.2 * (1 - discountValue / 100), 0).toFixed(2)}`
													: `$ ${data.reduce((sum, item) => sum + item.price * item.quantity * (1 - discountValue / 100), 0).toFixed(2)}`
											}

										</Typography.Title>
									</Col>
									<div className={'cart-button-container'}>
										<Link to={'/shopping_cart/checkout'}>
											<Button type={'black'}>PROCEED TO CHECKOUT</Button>
										</Link>
									</div>
								</Row>
							</Space>
						</Col>
					</Row>
					:
					<div>Shopping cart is empty</div>
			}
		</div>
	);
};

export default ShoppingCart;
