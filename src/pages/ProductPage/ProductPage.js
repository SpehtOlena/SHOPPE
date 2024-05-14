import { Row, Col, } from 'antd';
import './ProductPage.scss';
import Button from "../../components/Button/Button";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


const ProductPage = () => {
	const [activeImage, setActiveImage] = useState(null);
	const products = useSelector((state) => state.firestore.ordered.products);
	const [product, setProduct] = useState();

	useEffect(() => {
		if (product !== undefined) {
			window.scrollTo(0, 0);

		}
	}, [product]);
	useEffect(() => {
		if (product?.images.length) {
			setActiveImage(product?.images[0]);
		}
	}, [activeImage]);
	return (
		<div>
			yyyy
			<Row>
				<Col span={4}>
					<div className={'product-card-photo'}>
						{/* {
							product.images.map((item, index) => <img src={item} key={index} onClick={() => setActiveImage(item)} />)
						} */}
					</div>
				</Col>
				<Col span={20} className={'product-card-main-photo'}>
					<img src={activeImage} alt="" />
					<Button type={'half-opacity'} children={'Add to cart'} />
				</Col>
			</Row>
		</div>
	)
}
export default ProductPage