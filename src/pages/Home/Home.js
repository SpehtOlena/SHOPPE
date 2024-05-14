import Banner from '../../components/Banner/Banner'
import Button from '../../components/Button/Button';
import ShopLatest from '../../components/ShopLatest/ShopLatest'
import './Home.scss';

const Home = () => {
	return (
		<div>
			<Banner />
			<ShopLatest />
			<Button onClick={() => console.log('test')}>click</Button>
		</div>
	)
}
export default Home