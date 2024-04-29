import { Divider, Layout } from 'antd';
import './App.scss';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Link, Outlet } from 'react-router-dom';
import Logo from "./assets/logo.png"

function App() {
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
			<Header className={'header-container'}>
				<Link className={'header-logo'}>
					<img src={Logo} alt='logo' />
				</Link>
				<div className={'header-menu'}>
					{
						menuItems.map(value => <li key={value.key}>{value.label}</li>)
					}
					<Divider type={'vertical'} />
				</div>
			</Header>
			<Content><Outlet /></Content>
			<Footer>Footer</Footer>
		</Layout>
	);
}

export default App;
