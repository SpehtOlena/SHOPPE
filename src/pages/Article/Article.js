import { Col, Row, Typography, Divider } from 'antd';
import './Article.scss';
import Button from '../../components/Button/Button';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { articleItems } from '../Blog/Blog';
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

const Article = () => {
	const location = useLocation();
	const { articleId } = useParams();
	const [article, setArticle] = useState({});

	useEffect(() => {
		if (articleItems !== undefined) {
			const foundArticle = articleItems.find((value) => value.id === articleId);
			if (foundArticle) {
				setArticle(foundArticle);
			}
		}
	}, [articleId, location]);
	return (
		<div className={'article-container'}>
			<Typography.Title level={2}>{article.title || 'Article Title'}</Typography.Title>
			<Typography.Title level={4}>by <span>{article.author || 'Author Name'}</span> - {article.date || 'Date'}</Typography.Title>
			<div className={'article-image'}>
				<img src={article.articleImg || 'defaultImage.jpg'} alt="" />
			</div>
			<div className={'article-content'}>
				<Typography.Text>{article.text || 'Article content goes here.'}</Typography.Text>
				<div className={'article-image-secondary'}>
					<img src={article.articleImg || 'defaultImage.jpg'} alt="" />
				</div>
				<div>
					<Typography.Title level={3}>Top trends</Typography.Title>
					<Typography.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero.</Typography.Text>
					<ul>
						<li><span>●</span> consectetur adipiscing elit. Aliquam placerat</li>
						<li><span>●</span> Lorem ipsum dolor sit amet consectetur</li>
						<li><span>●</span> sapien tortor faucibus augue</li>
						<li><span>●</span> a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis</li>
					</ul>
				</div>
				<Row justify={'space-between'}>
					<Col span={12}>
						<Row align={'middle'}>
							<p>Tags</p>
							<div className={'divider'} />
							<Typography.Text>Fashion, Style, Season</Typography.Text>
						</Row>
					</Col>
					<Col span={12}>
						<Row align={'middle'} justify={'end'}>
							<p>Share</p>
							<div className={'divider'} />
							<div className={'blog-community'}>
								<FaLinkedinIn size={19} />
								<FaFacebookF size={19} />
								<FaInstagram size={19} />
								<FaTwitter size={19} />
							</div>
						</Row>
					</Col>
				</Row>
				<Divider />
				<div className={'button-container'}>
					<Link to={'/blog'}>
						<Button >Back</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Article;
