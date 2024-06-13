import { useState } from 'react';
import { Typography } from 'antd';
import './BlogArticleCard.scss';
import Button from "../Button/Button";
import ModalArticle from '../ModalArticle/ModalArticle';
import Article from '../Article/Article';



const BlogArticleCard = ({ value, index }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [activeArticle, setActiveArticle] = useState('');
	return (
		<>
			<div className={'article-card-container'}>
				<img src={value.articleImg} alt="" />
				<Typography.Title level={5}>{value.subtitle}</Typography.Title>
				<Typography.Title level={3}>{value.title}</Typography.Title>
				<Typography.Text>{value.annotation}</Typography.Text>
				<Button onClick={() => { setActiveArticle(value); setModalOpen(true) }} type={'link'}>Read More</Button>
			</div>
			<ModalArticle isOpen={modalOpen} onClose={() => setModalOpen(false)}>
				{
					!!activeArticle.id &&
					<Article activeArticle={activeArticle} />
				}
			</ModalArticle >
		</>
	)
}
export default BlogArticleCard