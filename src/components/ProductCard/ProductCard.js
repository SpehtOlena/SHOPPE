import './ProductCard.scss';
import { useState } from 'react';
import Button from '../Button/Button';

const ProductCard = ({ value, index }) => {
	const [activeImage, setActiveImage] = useState('');
	return (
		<div className={'product-card-container'}>
			<div span={20} className={'product-card-main-photo'}>
				<img src={value.images[1]} alt="" />
				<Button type={'half-opacity'} children={'Add to cart'} />
			</div>
			<h3>{value.name}</h3>
			<h4>{value.price.toFixed(2)}$</h4>
		</div>
	)
}
export default ProductCard