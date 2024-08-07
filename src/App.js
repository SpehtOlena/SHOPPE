import { Affix, Col, Divider, Input, Layout, Row, Space } from 'antd';
import './App.scss';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Logo from "./assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { LuUser } from "react-icons/lu";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

function App() {
	const [activeMenuItems, setActiveMenuItems] = useState('');
	const location = useLocation();
	const navigate = useNavigate();
	useFirestoreConnect(() => [
		{
			collection: 'products',
		}
	])

	const products = useSelector(state => state.firestore.ordered.products);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (location.pathname === '/') {
			navigate('/home')
		}
	}, [location, navigate])
	const menuItems = [
		{
			label: <Link to={'/shop'}>Shop</Link>,
			key: 'shop'
		},
		{
			label: <Link to={'/blog'}>Blog</Link>,
			key: 'blog'
		},
		{
			label: <Link to={'/our_story'}>Our Story</Link>,
			key: 'our_story'
		}
	]
	return (
		<Layout className="app-container">
			<Affix>
				<Header className={'header-container'}>
					<Link className={'header-logo'}>
						<img src={Logo} alt='logo' />
					</Link>
					<div className={'header-menu'}>
						{
							menuItems.map(value =>
								<li onClick={() =>
									setActiveMenuItems(value.key)}
									key={value.key}
									className={activeMenuItems === value.key ? 'active-menu-item' : ''} >
									{value.label}
								</li>)
						}
						<Space size={'large'} className={'header-menu-icons'}>
							<span>|</span>
							<IoSearchOutline size={20} />
							<Link to={'/shopping_cart'}>
								<AiOutlineShoppingCart size={20} />
							</Link>
							<LuUser size={20} />
						</Space>
					</div>
				</Header>
			</Affix>
			{
				!isLoaded(products)
					? <div className={'loading-empty'}>Loading</div>
					: isEmpty(products)
						? <div className={'loading-empty'}>Is empty</div>
						: <Content className={'content-container'}>
							<Outlet />
						</Content>
			}
			<Footer className={'footer-container'}>
				<Divider />
				<Row justify={'space-between'} align={'middle'}>
					<Col span={10}>
						<ul className={'footer-menu'}>
							<Link to={'/contact_us'}>
								<li>{'Contact'.toUpperCase()}</li>
							</Link>
							<li>{'Term of services'.toUpperCase()}</li>
							<li>{'Shipping and returns'.toUpperCase()}</li>
						</ul>
					</Col>
					<Col span={8}>
						<Input
							placeholder='Give an email, get the newsletter.'
							suffix={<HiOutlineArrowNarrowRight size={22} />}
							className={'footer-input'} />
					</Col>
				</Row>
				<Row justify={'space-between'} align={'middle'}>
					<Col span={8}>
						<p>
							<span>© 2021 Shelly. </span>
							Terms of use
							<span> and </span>
							privacy policy.
						</p>
					</Col>
					<Col span={8}>
						<div className={'footer-community'}>
							<FaLinkedinIn size={19} />
							<FaFacebookF size={19} />
							<FaInstagram size={19} />
							<FaTwitter size={19} />
						</div>
					</Col>
				</Row>
			</Footer>
		</Layout>
	);
}

export default App;
