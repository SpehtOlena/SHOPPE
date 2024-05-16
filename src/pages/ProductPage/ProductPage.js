import { Row, Col, Typography, } from 'antd';
import './ProductPage.scss';
import Button from "../../components/Button/Button";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';


const ProductPage = () => {
	const { productId } = useParams();
	const location = useLocation();
	const [product, setProduct] = useState();
	const [activeImage, setActiveImage] = useState('');
	const products = useSelector((state) => state.firestore.ordered.products);

	useEffect(() => {
		if (product !== undefined) {
			window.scrollTo(0, 0);
		}
	}, [product]);

	useEffect(() => {
		if (product?.images.length) {
			setActiveImage(product?.images[0]);
		}
	}, [product]);

	useEffect(() => {
		if (products !== undefined) {
			setProduct(products.find((value) => value.id === productId));

		}
	}, [products, location]);
	return (
		<div className={'product-page-container'}>
			<Row>
				<Col span={2}>
					<div className={'product-page-photo'}>
						{
							product?.images.map((item, index) =>
								<img key={index}
									onClick={() => setActiveImage(item)}
									className={activeImage === item ? 'product-page-photo-active' : ''}
									src={item} alt="" />
							)
						}
					</div>
				</Col>
				<Col span={12} className={'product-page-photo-main'}>
					<img src={activeImage} alt="" />
					<Button type={'half-opacity'} children={'Add to cart'} />
				</Col>
				<Col span={10} className={'product-info'}>
					<Typography.Title level={4}>
						{product?.name}
					</Typography.Title>
					<Typography.Title level={5}>
						$ 	{product?.price.toFixed(2)}
					</Typography.Title>
				</Col>
			</Row>
		</div>
	)
}
export default ProductPage