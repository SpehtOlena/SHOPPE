import { Link } from 'react-router-dom';
import './NotFound.scss';
import { Button, Typography } from 'antd';

const NotFound = () => {
	return (
		<div className={'not-found-container'}>
			<Typography.Title level={2}>404 ERROR</Typography.Title>
			<Typography.Title level={5}>This page not found;</Typography.Title>
			<Typography.Title level={5}>back to home and start again</Typography.Title>
			<Link to={'/'}>
				<Button>HOMEPAGE</Button>
			</Link>
		</div>
	)
}
export default NotFound