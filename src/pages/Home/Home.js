import Banner from '../../components/Banner/Banner'
import Button from '../../components/Button/Button'
import './Home.scss'

const Home = () => {
	return (
		<div>
			<Banner />
			<Button type={'primary'} children={'add to cart'} />
		</div>
	)
}
export default Home