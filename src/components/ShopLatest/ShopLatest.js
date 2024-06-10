import './ShopLatest.scss';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { List } from 'antd';

const ShopLatest = () => {
	const products = useSelector(state => state.firestore.ordered.products)
	return (
		<div className={'shop-latest-container'}>
			<div className={'shop-latest-title'}>
				<h3>Shop The Latest</h3>
				<Link to={'/shop'}>
					<Button type={'link'}>View All</Button>
				</Link>
			</div>
			<div className={'shop-latest-items'}>
				{!isLoaded(products)
					? "LOADING"
					: isEmpty(products)
						? 'DATA LIST IS EMPTY'
						: <List
							position={'bottom'}
							style={{ width: "100%" }}
							pagination={{
								position: 'top',
								defaultPageSize: 4,
								simple: true,
								total: 6,
								responsive: true
							}}
							grid={{
								gutter: 16,
								column: 4
							}}
							gutter={80}
							dataSource={products}
							renderItem={(value, index) => (
								<List.Item style={{ width: "100%", display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
									<ProductCard key={index} value={value} index={index} />
								</List.Item>
							)}
						/>
				}
			</div>
		</div>
	)
}
export default ShopLatest