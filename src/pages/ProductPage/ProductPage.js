import { Row, Col, Typography, Space, Rate, Tabs, List } from 'antd';
import './ProductPage.scss';
import Button from "../../components/Button/Button";
import Counter from "../../components/Counter/Counter";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { FiHeart } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import Reviews from '../../components/Reviews/Reviews';
import ProductCard from '../../components/ProductCard/ProductCard';
import NotFound from '../NotFound/NotFound';
import { addProductToShoppingCart } from '../../redux/actions';


const ProductPage = () => {
	const { productId } = useParams();
	const [counterValue, setCounterValue] = useState(1);
	const location = useLocation();
	const dispatch = useDispatch();
	const [product, setProduct] = useState();
	const [activeImage, setActiveImage] = useState('');
	const products = useSelector((state) => state.firestore.ordered.products);

	useEffect(() => {
		if (product !== undefined) {
			window.scrollTo(0, 0);
			setCounterValue(1)
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

	function calculateAverageRating(product) {
		if (product?.customerReview.length === 0) {
			return 0;
		}
		const totalRating = product?.customerReview.reduce((accumulator, review) => accumulator + review.userRate, 0)
		const averageRating = totalRating / product?.customerReview.length;
		return averageRating;
	}

	const averageRating = calculateAverageRating(product);
	const items = [
		{
			key: '1',
			label: 'Description',
			children: <div className={'product-description'}>
				{product?.description}
			</div>,
		},
		{
			key: '2',
			label: 'Aditional information',
			children:
				<div>
					<div className={'product-info-text'}>
						<span>Weight: </span> 0.3 kg
					</div>
					<div className={'product-info-text'}>
						<span>Dimentions: </span> 15 x 10 x 1 cm
					</div>
					<div className={'product-info-text'}>
						<span>Colours: </span> Black, Browns, White
					</div>
					<div className={'product-info-text'}>
						<span>Precious Metal: </span> {product?.preciousMetal}
					</div>
					<div className={'product-info-text'}>
						<span>Gemstone: </span> {product?.gemStone}
					</div>
				</div>,
		},
		{
			key: '3',
			label: `Reviews (${product?.customerReview.length})`,
			children: <Reviews product={product} productId={productId} />,
		},
	]

	const handleAddToCart = () => {
		dispatch(addProductToShoppingCart(product, counterValue))
	};
	return (
		<>
			{
				product ?
					<div className={'product-page-container'}>
						<Row style={{ marginBottom: 90 }}>
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
							</Col>
							<Col span={10} className={'product-info'} >
								<Space direction={'vertical'} size={'middle'} style={{ width: "100%" }}>
									<Typography.Title level={4}>
										{product?.name}
									</Typography.Title>
									<Typography.Title level={5}>
										$ 	{(product?.price * counterValue).toFixed(2)}
									</Typography.Title>
									<div>
										<Row justify={'start'} className={'product-info-block'}>
											<Rate disabled value={averageRating} allowHalf className={'product-rate'} />
											<div className={'product-info-text'}>
												{product?.customerReview.length}  customer review
											</div>
										</Row>
										<div className={'product-info-text'}>
											{product?.description}
										</div>
									</div>
									<div className={'product-add-block'}>
										<Counter counterValue={counterValue} setCounterValue={setCounterValue} />
										<Button onClick={handleAddToCart}>ADD TO CART</Button>
									</div>
									<div className={'product-icons'}>
										<FiHeart size={19} />
										<span>|</span>
										<div className={'product-community'}>
											<HiOutlineMail size={21} />
											<FaFacebookF size={21} />
											<FaInstagram size={21} />
											<FaTwitter size={21} />
										</div>
									</div>
									<div className={'product-info-text'}>
										<span>SKU: </span>{product?.SKU}
									</div>
									<div className={'product-info-text'}>
										<span>Categories: </span>{product?.categories.join(', ')}
									</div>
								</Space>
							</Col>
						</Row>
						<Row className={'product-details'}>
							<Tabs items={items} />
						</Row>
						<Row className={'similar-items-container'}>
							<Typography.Title level={4} className={'similar-items-title'}>Similar Items</Typography.Title>
							<List
								position={'bottom'}
								style={{ width: "100%" }}
								pagination={{
									position: 'top',
									defaultPageSize: 3,
									simple: true,
									total: 6,
									responsive: true
								}}
								grid={{
									gutter: 16,
									column: 3
								}}
								gutter={80}
								dataSource={products}
								renderItem={(value, index) => (
									<List.Item style={{ width: "100%", display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
										<ProductCard key={index} value={value} index={index} />
									</List.Item>
								)}
							/>
						</Row>
					</div> :
					<NotFound />
			}
		</>
	)
}
export default ProductPage