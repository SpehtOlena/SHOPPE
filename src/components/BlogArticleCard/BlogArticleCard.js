import { useState } from 'react';
import { Typography } from 'antd';
import './BlogArticleCard.scss';
import Button from "../Button/Button";
import { Link } from 'react-router-dom';

const BlogArticleCard = ({ value, index, activeArticle, setActiveArticle }) => {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<div className={'article-card-container'}>
			<img src={value.articleImg} alt="" />
			<div className={'article-subtitle'}>
				<Typography.Title level={5}>{value.category}</Typography.Title>
				<span> - </span>
				<Typography.Title level={5}>{value.date}</Typography.Title>
			</div>
			<Typography.Title level={3}>{value.title}</Typography.Title>
			<Typography.Text>{value.annotation}</Typography.Text>
			<Link to={`/blog/${value.id}`}>
				<Button onClick={() => { setActiveArticle(value) }} type={'link'}>Read More</Button>
			</Link>
			{/* <Button onClick={() => { setActiveArticle(value) }} type={'link'}>Read More</Button> */}
		</div>
	)
}
export default BlogArticleCard