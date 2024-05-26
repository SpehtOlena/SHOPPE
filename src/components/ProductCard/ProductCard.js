import './ProductCard.scss';
import { useState } from 'react';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const ProductCard = ({ value, index }) => {
	const [activeImage, setActiveImage] = useState('');
	return (
		<div className={'product-card-container'}>
			<div span={20} className={'product-card-main-photo'}>
				<Link to={`/${value.id}`}>
					<img src={value.images[0]} alt="" />
				</Link>
				<Button type={'half-opacity'} children={'Add to cart'} />
			</div>
			<h3>{value.name}</h3>
			<h4>{value.price.toFixed(2)}$</h4>
		</div>
	)
}
export default ProductCard