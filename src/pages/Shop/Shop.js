import { useState } from 'react';
import { Row, Col, Space, Typography, Checkbox, Slider, List } from 'antd';
import './Shop.scss';
import { typesJewelry, categories, preciousMetal, gemstone } from "../../structure"
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from "../../components/ProductCard/ProductCard"

const Shop = () => {
	const [typesJewelryValues, setTypesJewelryValues] = useState([]);
	const [categoriesValues, setCategoriesValues] = useState([]);
	const [preciousMetalValues, setPreciousMetalValues] = useState([]);
	const [gemstoneValues, setGemstoneValues] = useState([]);
	const [sliderValues, setSliderValues] = useState([0, 1000]);
	const [showFilterItems, setShowFilterItems] = useState({
		typesJewelry: false,
		categories: false,
		preciousMetal: false,
		gemstone: false,
		price_range: false
	});
	const products = useSelector(state => state.firestore.ordered.products);


	const changeShowFilterItems = (fieldName) => {
		setShowFilterItems({ ...showFilterItems, [fieldName]: !showFilterItems[fieldName] })
	}

	return (
		<Row className={'shop-container'}>
			<Col span={6}>
				{/* Choose filter */}
				<Space direction={'vertical'} style={{ width: "100%" }} size={'large'}>
					{/* Types of Jewelry */}
					<Space direction={'vertical'} style={{ width: "100%" }} size={'small'}>
						<Row className={'shop-filter-item'}>
							<Typography.Title level={3}>
								Types of Jewelry
							</Typography.Title>
							<div className={'filter-collapse'} onClick={() => changeShowFilterItems('typesJewelry')}>
								{
									showFilterItems.typesJewelry ? <FaMinus size={18} /> : <FaPlus size={18} />
								}
							</div>
						</Row>
						{
							showFilterItems.typesJewelry &&
							<Checkbox.Group
								style={{ display: "flex", flexDirection: "row", gap: "20px 10px", textTransform: "uppercase", width: "95%" }}
								value={typesJewelryValues}
								options={typesJewelry.map(value => {
									return {
										label: value,
										value: value
									}
								})}
								onChange={(value) => setTypesJewelryValues(value)}
							/>
						}
					</Space>
					{/* Categories */}
					<Space direction={'vertical'} style={{ width: "100%" }} size={'small'}>
						<Row className={'shop-filter-item'}>
							<Typography.Title level={3}>
								Categories
							</Typography.Title>
							<div className={'filter-collapse'} onClick={() => changeShowFilterItems('categories')}>
								{
									showFilterItems.categories ? <FaMinus size={18} /> : <FaPlus size={18} />
								}
							</div>
						</Row>
						{
							showFilterItems.categories &&
							<Checkbox.Group
								style={{ display: "flex", flexDirection: "row", gap: "20px 10px", textTransform: "uppercase", width: "95%" }}
								value={categoriesValues}
								options={categories.map(value => {
									return {
										label: value,
										value: value
									}
								})}
								onChange={(value) => setCategoriesValues(value)}
							/>
						}
					</Space>
					{/* Precious Metal */}
					<Space direction={'vertical'} style={{ width: "100%" }} size={'small'}>
						<Row className={'shop-filter-item'}>
							<Typography.Title level={3}>
								Precious Metal
							</Typography.Title>
							<div className={'filter-collapse'} onClick={() => changeShowFilterItems('preciousMetal')}>
								{
									showFilterItems.preciousMetal ? <FaMinus size={18} /> : <FaPlus size={18} />
								}
							</div>
						</Row>
						{
							showFilterItems.preciousMetal &&
							<Checkbox.Group
								style={{ display: "flex", flexDirection: "row", gap: "20px 10px", textTransform: "uppercase", width: "95%" }}
								value={preciousMetalValues}
								options={preciousMetal.map(value => {
									return {
										label: value,
										value: value
									}
								})}
								onChange={(value) => setPreciousMetalValues(value)}
							/>
						}
					</Space>
					{/* Gemstone */}
					<Space direction={'vertical'} style={{ width: "100%" }} size={'small'}>
						<Row className={'shop-filter-item'}>
							<Typography.Title level={3}>
								Gemstone
							</Typography.Title>
							<div className={'filter-collapse'} onClick={() => changeShowFilterItems('gemstone')}>
								{
									showFilterItems.gemstone ? <FaMinus size={18} /> : <FaPlus size={18} />
								}
							</div>
						</Row>
						{
							showFilterItems.gemstone &&
							<Checkbox.Group
								style={{ display: "flex", flexDirection: "row", gap: "20px 10px", textTransform: "uppercase", width: "95%" }}
								value={gemstoneValues}
								options={gemstone.map(value => {
									return {
										label: value,
										value: value
									}
								})}
								onChange={(value) => setGemstoneValues(value)}
							/>
						}
					</Space>
					{/* Price Range */}
					<Space direction={'vertical'} style={{ width: "100%" }} size={'small'}>
						<Row className={'shop-filter-item'}>
							<Typography.Title level={3}>
								Price Range
							</Typography.Title>
							<div className={'filter-collapse'} onClick={() => changeShowFilterItems('price_range')}>
								{
									showFilterItems.price_range ? <FaMinus size={18} /> : <FaPlus size={18} />
								}
							</div>
						</Row>
						{
							showFilterItems.price_range &&
							<>
								<Slider range step={0.01} min={0} max={1000} onChange={setSliderValues} defaultValue={sliderValues} />
								<Row>
									Price: {`$ ${sliderValues[0].toFixed(2)} - $ ${sliderValues[1].toFixed(2)}`}
								</Row>
							</>
						}
					</Space>
				</Space>
			</Col>
			<Col span={17} className={'products-container'} >
				{/* ALL PRODUCTS */}
				<List
					position={'top'}
					style={{ width: '100%' }}
					pagination={{
						position: 'top',
						defaultPageSize: 6,
						pageSizeOptions: ['6', '12'],
					}}
					grid={{
						gutter: 26,
						xs: 1,
						sm: 2,
						md: 3,
						// lg: 2,
						// xl: 3,
						// xxl: 3,
					}}

					dataSource={products}
					renderItem={(value, index) => (
						<List.Item>
							<Link to={`${value.id}`}>
								<ProductCard key={index} value={value} index={index} />
							</Link>
						</List.Item>
					)}
				/>
			</Col>
		</Row>
	)
}
export default Shop