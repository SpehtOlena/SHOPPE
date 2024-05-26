import { Carousel } from 'antd';
import './Banner.scss';
import bannerPhoto_1 from '../../assets/bannerPhoto/bannerPhoto_1.png';
import bannerPhoto_2 from '../../assets/bannerPhoto/bannerPhoto_2.png';
import bannerPhoto_3 from '../../assets/bannerPhoto/bannerPhoto_3.png';
import bannerPhoto_4 from '../../assets/bannerPhoto/bannerPhoto_4.png';
import bannerPhoto_5 from '../../assets/bannerPhoto/bannerPhoto_5.png';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const Banner = () => {
	return (
		<Carousel autoplay>
			<div className={'banner'}>
				<div className={'banner-container'}>
					<div className={'banner-content'}>
						<h3>Silver big hoops</h3>
						<h4>$ 68,00</h4>
						<Link to={'/2RfWMIyNLcu9YudZXfYX'}>
							<Button type={'primary'} children={'View Product'} />
						</Link>
					</div>
				</div>
				<img src={bannerPhoto_1} alt="banner img" className={'banner-bgi'} />
			</div>
			<div className={'banner'}>
				<div className={'banner-container'}>
					<div className={'banner-content'}>
						<h3>Gold earrings</h3>
						<h4>$ 76,00</h4>
						<Link to={'/CUyeY64gR3pTruDOJY6G'}>
							<Button type={'primary'} children={'View Product'} />
						</Link>
					</div>
				</div>
				<img src={bannerPhoto_2} alt="banner img" className={'banner-bgi'} />
			</div>
			<div className={'banner'}>
				<div className={'banner-container'}>
					<div className={'banner-content'}>
						<h3>Gold watch</h3>
						<h4>$ 199,00</h4>
						<Link to={'/SLfAWJvfNhojvplbMYUV'}>
							<Button type={'primary'} children={'View Product'} />
						</Link>
					</div>
				</div>
				<img src={bannerPhoto_3} alt="banner img" className={'banner-bgi'} />
			</div>
			<div className={'banner'}>
				<div className={'banner-container'}>
					<div className={'banner-content'}>
						<h3>Earrings with pearls</h3>
						<h4>$ 113,00</h4>
						<Link to={'/QsOqVZV4M6NLAq8C8rcv'}>
							<Button type={'primary'} children={'View Product'} />
						</Link>
					</div>
				</div>
				<img src={bannerPhoto_4} alt="banner img" className={'banner-bgi'} />
			</div>
			<div className={'banner'}>
				<div className={'banner-container'}>
					<div className={'banner-content'}>
						<h3>Necklace of black pearls </h3>
						<h4>$ 145,00</h4>
						<Link to={'/noXx8G9DqRwiDw0EpUJ9'}>
							<Button type={'primary'} children={'View Product'} />
						</Link>
					</div>
				</div>
				<img src={bannerPhoto_5} alt="banner img" className={'banner-bgi'} />
			</div>
		</Carousel>
	)
}
export default Banner