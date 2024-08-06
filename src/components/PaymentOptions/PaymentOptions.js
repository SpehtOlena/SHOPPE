import React, { useState } from 'react';
import { Radio, Typography } from 'antd';
import './PaymentOptions.scss';
import { FaPaypal } from "react-icons/fa";

const { Paragraph } = Typography;

const PaymentOptions = () => {
	const [activeKey, setActiveKey] = useState('1');

	const handleRadioChange = (e) => {
		setActiveKey(e.target.value);
	};

	return (
		<div>
			<Radio.Group onChange={handleRadioChange} value={activeKey} className="custom-radio-group">
				<div>
					<Radio value="1" className="custom-radio">Direct bank transfer</Radio>
					{activeKey === '1' && (
						<Paragraph className={'radio-description'}>
							Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
						</Paragraph>
					)}
				</div>
				<div>
					<Radio value="2" className="custom-radio">Check payments</Radio>
					{activeKey === '2' && (
						<Paragraph className={'radio-description'}>
							Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
						</Paragraph>
					)}
				</div>
				<div>
					<Radio value="3" className="custom-radio">Cash on delivery</Radio>
					{activeKey === '3' && (
						<Paragraph className={'radio-description'}>
							Pay with cash upon delivery.
						</Paragraph>
					)}
				</div>
				<div>
					<Radio value="4" className="custom-radio"><div className={'radio-label-group'}>PayPal <FaPaypal size={16} /></div></Radio>
					{activeKey === '4' && (
						<Paragraph>
							Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.
						</Paragraph>
					)}
				</div>
			</Radio.Group>
		</div>
	);
};

export default PaymentOptions;
