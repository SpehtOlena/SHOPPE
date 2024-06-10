import { useEffect, useState } from 'react';
import { Row, Col, Space, Typography, Checkbox, Slider, List } from 'antd';
import './Shop.scss';
import { typesJewelry, categories, preciousMetal, gemstone } from "../../structure"
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import ProductCard from "../../components/ProductCard/ProductCard"
import DeleteItem from '../../components/DeleteItem/DeleteItem';
import Button from '../../components/Button/Button';

const Shop = () => {
	const [typesJewelryValues, setTypesJewelryValues] = useState([]);
	const [categoriesValues, setCategoriesValues] = useState([]);
	const [preciousMetalValues, setPreciousMetalValues] = useState([]);
	const [gemstoneValues, setGemstoneValues] = useState([]);
	const [sliderValues, setSliderValues] = useState([0, 1000]);
	const [showFilterDetails, setShowFilterDetails] = useState(false);
	const products = useSelector(state => state.firestore.ordered.products);
	const [productsWithFilter, setProductsWithFilter] = useState([]);

	const [showFilterItems, setShowFilterItems] = useState({
		type: false,
		category: false,
		precious: false,
		gem: false,
		price_range: false
	});

	useEffect(() => {
		window.scrollTo(0, 0);
		setProductsWithFilter(products)
	}, [products])


	useEffect(() => {
		if (!typesJewelryValues.length && !categoriesValues.length && !preciousMetalValues.length && !gemstoneValues) {
			setShowFilterDetails(false)
		}
	}, [sliderValues])

	const applyFilter = () => {
		const filteredProducts = products.filter(product => {
			const meetsType = typesJewelryValues.length === 0 || typesJewelryValues.includes(product.typesJewelry);
			const meetsCategories = categoriesValues.length === 0 || categoriesValues.some(category => product.categories.includes(category));
			const meetsPrecious = preciousMetalValues.length === 0 || preciousMetalValues.includes(product.preciousMetal);
			const meetsGem = gemstoneValues.length === 0 || gemstoneValues.includes(product.gemStone);
			const meetsSliderValues = product.price <= sliderValues[1] && product.price >= sliderValues[0]
			return meetsType && meetsCategories && meetsPrecious && meetsGem && meetsSliderValues
		})
		if (typesJewelryValues.length || categoriesValues.length || preciousMetalValues.length || gemstoneValues.length) {
			setShowFilterDetails(true)
		}
		setProductsWithFilter(filteredProducts)
	}

	const changeShowFilterItems = (fieldName) => {
		setShowFilterItems({ ...showFilterItems, [fieldName]: !showFilterItems[fieldName] })
	}
	const onChangeSlider = (value) => {
		setSliderValues(value)
	};
	const deleteOneElementFromFilter = (setFilters, filters, item) => {
		setFilters(filters.filter(value => value !== item))
	};
	const deleteAllFilters = () => {
		setTypesJewelryValues([])
		setCategoriesValues([])
		setPreciousMetalValues([])
		setGemstoneValues([])
		setSliderValues([0, 1000])
		setShowFilterDetails(false)
		setProductsWithFilter(products)
		setShowFilterItems(false)
	}

	return (
		<Row className={'shop-container'} justify={'space-between'}>
			<Col span={7}>
				{/* Selected filters */}
				{
					typesJewelryValues.length || categoriesValues.length || preciousMetalValues.length || gemstoneValues.length || '' && showFilterDetails ?
						<Space direction={'vertical'} size={'middle'} className={'selected-filters-container'}>
							<div className={'selected-filters-title'}>
								<Typography.Title level={2}>Filters</Typography.Title>
								<DeleteItem onClick={deleteAllFilters} children={'reset all'} />
							</div>
							{/* Types */}
							{!!typesJewelryValues.length &&
								<Space direction={'vertical'}>
									<Typography.Title level={3}>Types of Jewelry</Typography.Title>
									<Space size={'middle'} wrap>
										{
											typesJewelryValues.map((value, index) =>
												<DeleteItem
													onClick={() => deleteOneElementFromFilter(setTypesJewelryValues, typesJewelryValues, value)}
													key={index}
													children={value}
												/>)
										}
									</Space>
								</Space>
							}
							{/* Categories */}
							{!!categoriesValues.length &&
								<Space direction={'vertical'}>
									<Typography.Title level={3}>Categories</Typography.Title>
									<Space size={'middle'} wrap>
										{
											categoriesValues.map((value, index) =>
												<DeleteItem
													onClick={() => deleteOneElementFromFilter(setCategoriesValues, categoriesValues, value)}
													key={index}
													children={value}
												/>)
										}
									</Space>
								</Space>
							}
							{/* Precious Metal */}
							{!!preciousMetalValues.length &&
								<Space direction={'vertical'}>
									<Typography.Title level={3}>Precious Metal</Typography.Title>
									<Space size={'middle'} wrap>
										{
											preciousMetalValues.map((value, index) =>
												<DeleteItem
													onClick={() => deleteOneElementFromFilter(setPreciousMetalValues, preciousMetalValues, value)}
													key={index}
													children={value}
												/>)
										}
									</Space>
								</Space>
							}
							{/* Gemstone */}
							{!!gemstoneValues.length &&
								<Space direction={'vertical'}>
									<Typography.Title level={3}>Gemstone</Typography.Title>
									<Space size={'middle'} wrap>
										{
											gemstoneValues.map((value, index) =>
												<DeleteItem
													onClick={() => deleteOneElementFromFilter(setGemstoneValues, gemstoneValues, value)}
													key={index}
													children={value}
												/>)
										}
									</Space>
								</Space>
							}
							{/* Price Range */}
							<Space direction={'vertical'}>
								<Typography.Title level={3}>Price Range</Typography.Title>
								<Space size={'middle'} wrap>
									<Space>
										<DeleteItem onClick={() => setSliderValues([0, 1000])} />
										{`$ ${sliderValues[0].toFixed(2)} - $ ${sliderValues[1].toFixed(2)}`}
									</Space>
								</Space>
							</Space>
						</Space> : ''
				}

				{/* Choose filter */}
				<Space direction={'vertical'} style={{ width: "100%" }} size={'large'}>
					{/* Types of Jewelry */}
					<Space direction={'vertical'} style={{ width: "100%" }} size={'small'}>
						<Row className={'shop-filter-item'}>
							<Typography.Title level={3}>
								Types of Jewelry
							</Typography.Title>
							<div className={'filter-collapse'} onClick={() => changeShowFilterItems('type')}>
								{
									showFilterItems.type ? <FaMinus size={18} /> : <FaPlus size={18} />
								}
							</div>
						</Row>
						{
							showFilterItems.type &&
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
							<div className={'filter-collapse'} onClick={() => changeShowFilterItems('category')}>
								{
									showFilterItems.category ? <FaMinus size={18} /> : <FaPlus size={18} />
								}
							</div>
						</Row>
						{
							showFilterItems.category &&
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
							<div className={'filter-collapse'} onClick={() => changeShowFilterItems('precious')}>
								{
									showFilterItems.precious ? <FaMinus size={18} /> : <FaPlus size={18} />
								}
							</div>
						</Row>
						{
							showFilterItems.precious &&
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
							<div className={'filter-collapse'} onClick={() => changeShowFilterItems('gem')}>
								{
									showFilterItems.gem ? <FaMinus size={18} /> : <FaPlus size={18} />
								}
							</div>
						</Row>
						{
							showFilterItems.gem &&
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
								<Slider range step={0.01} min={0} max={1000} onChange={onChangeSlider} value={sliderValues} />
								<Row className={"filter-price-range"}>
									<h5>
										Price: {`$ ${sliderValues[0].toFixed(2)} - $ ${sliderValues[1].toFixed(2)}`}
									</h5>
								</Row>
							</>
						}
					</Space>
					<Button onClick={() => applyFilter()} type={'w-100'}>Apply Filter</Button>
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
					size={'small'}
					dataSource={productsWithFilter}
					renderItem={(value, index) => (
						<List.Item>
							<ProductCard key={index} value={value} index={index} />
						</List.Item>
					)}
				/>
			</Col>
		</Row>
	)
}
export default Shop