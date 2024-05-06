import './ProductPage.scss'

const ProductPage = () => {
	return (
		<div>
			<Row>
				<Col span={4}>
					<div className={'product-card-photo'}>
						{
							value.images.map((item, index) => <img src={item} key={index} onClick={() => setActiveImage(item)} />)
						}
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