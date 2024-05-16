import './ShopLatest.scss';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

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
						: products.map((value, index) =>
							<ProductCard key={value.id} value={value} index={index} />
						)
				}
			</div>
		</div>
	)
}
export default ShopLatest