import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { Col, Row, Typography, Table, Divider } from 'antd'
import './Confirmation.scss'
import { FaCircleCheck } from "react-icons/fa6";

const Confirmation = () => {
	const [data, setData] = useState();
	const shoppingCartProducts = useSelector(state => state.shoppingCartProducts.data)

	useEffect(() => {
		setData(shoppingCartProducts);
	}, [shoppingCartProducts]);

	const columns = [
		{
			title: "PRODUCT",
			dataIndex: "",
			align: 'left',
			key: "title",
			render: (value) =>
				<Typography.Title level={5}>{value.name}</Typography.Title>
		},
		{
			title: "TOTAL",
			dataIndex: "",
			align: 'right',
			key: "price",
			render: (product) =>
				<Typography.Title level={5}>
					${(product.price * product.quantity)}
				</Typography.Title>
		}
	]

	return (
		<div className={'confirmation-container'}>
			<div className={'confirmation-result'}>
				<FaCircleCheck color='#A18A68' size={20} />
				<Typography.Title level={4}>We’ve received your order</Typography.Title>
			</div>
			<Row justify={'space-between'}>
				<Col span={11}>
					<Typography.Title level={3}>Order Details</Typography.Title>
				</Col>
				<Col span={11}>
					<Typography.Title level={3}>Order Summary</Typography.Title>
					<div className={'order-container'}>
						<div className={'confirmation-order-header'}>
							<Typography.Title level={4}>PRODUCT</Typography.Title>
							<Typography.Title level={4}>TOTAL</Typography.Title>
						</div>
						<Divider className={'confirmation-divider'} />
						<Table
							dataSource={data}
							showHeader={false}
							rowKey={value => value.id}
							columns={columns}
							pagination={false}
							bordered={false}
							style={{ width: '100%' }}
						/>
						<Divider className={'confirmation-divider'} />
						<div className={'confirmation-order-header'}>
							<Typography.Title level={4}>SUBTOTAL</Typography.Title>
							<Typography.Title level={5}>
								$ {data?.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
							</Typography.Title>
						</div>
						<Divider className={'confirmation-divider'} />
						<div className={'confirmation-order-header'}>
							<Typography.Title level={4}>SHIPPING</Typography.Title>
							<Typography.Title level={5}>Free shipping</Typography.Title>
						</div>
						<Divider className={'confirmation-divider'} />
						<div className={'confirmation-order-header'}>
							<Typography.Title level={4} className={'title-bold'}>TOTAL</Typography.Title>
							<Typography.Title level={4} className={'title-bold'}>
								$ {data?.reduce((sum, item) => sum + item.price * item.quantity * 1.2, 0).toFixed(2)}
							</Typography.Title>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}
export default Confirmation