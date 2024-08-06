import BlogArticleCard from '../../components/BlogArticleCard/BlogArticleCard';
import Article from '../Article/Article'
import { useEffect, useState } from 'react';
import { Col, List, Row, Typography } from 'antd';
import './Blog.scss';
import bannerPhoto_1 from "../../assets/bannerPhoto/bannerPhoto_1.png"
import bannerPhoto_2 from "../../assets/bannerPhoto/bannerPhoto_2.png"
import bannerPhoto_3 from "../../assets/bannerPhoto/bannerPhoto_3.png"
import bannerPhoto_4 from "../../assets/bannerPhoto/bannerPhoto_4.png"
import bannerPhoto_5 from "../../assets/bannerPhoto/bannerPhoto_5.png"

export const articleItems = [
	{
		title: "Top Trends From Spring",
		date: "October 18, 2020",
		annotation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.  faucibus augue, a maximus elit ex vitae libero... ",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis.",
		articleImg: bannerPhoto_1,
		category: "Fashion",
		id: "1",
		author: "ANNY JOHNSON"
	},
	{
		title: "Top Trends From Spring",
		date: "October 28, 2020",
		annotation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.  faucibus augue, a maximus elit ex vitae libero... ",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis.",
		articleImg: bannerPhoto_2,
		category: "Style",
		id: "2",
		author: "ANNY JOHNSON"
	},
	{
		title: "Fast Fashion, And Faster Fashion",
		date: "October 12, 2020",
		annotation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.  faucibus augue, a maximus elit ex vitae libero... ",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis.",
		articleImg: bannerPhoto_3,
		category: "Accessories",
		id: "3",
		author: "ANNY JOHNSON"
	},
	{
		title: "Fast Fashion, And Faster Fashion",
		date: "October 30, 2020",
		annotation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.  faucibus augue, a maximus elit ex vitae libero... ",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis.",
		articleImg: bannerPhoto_4,
		category: "Fashion",
		id: "4",
		author: "ANNY JOHNSON"
	},
	{
		title: "Top Trends From Spring",
		date: "October 13, 2020",
		annotation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.  faucibus augue, a maximus elit ex vitae libero... ",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis.",
		articleImg: bannerPhoto_5,
		category: "Season",
		id: "5",
		author: "ANNY JOHNSON"
	}
]

const Blog = () => {
	const [activeCategory, setActiveCategory] = useState('');
	const [activeArticle, setActiveArticle] = useState('');
	const filteredData = articleItems.filter((value => value.category === activeCategory))

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [activeArticle])

	return (
		<Row>
			<Col span={4} className={'blog-filter'}>
				<Typography.Title level={3} onClick={() => setActiveCategory('')}>Categories</Typography.Title>
				<Typography.Title level={5} onClick={() => setActiveCategory('Fashion')}>Fashion</Typography.Title>
				<Typography.Title level={5} onClick={() => setActiveCategory('Style')}>Style</Typography.Title>
				<Typography.Title level={5} onClick={() => setActiveCategory('Accessories')}>Accessories</Typography.Title>
				<Typography.Title level={5} onClick={() => setActiveCategory('Season')}>Season</Typography.Title>
			</Col>
			<Col span={20}>
				<List
					position={'bottom'}
					style={{ width: '100%' }}
					className={'articles-list'}
					pagination={{
						position: 'bottom',
						defaultPageSize: 4,
					}}
					size={'small'}
					dataSource={activeCategory.length ? filteredData : articleItems}
					renderItem={(value, index) => (
						<List.Item>
							<BlogArticleCard key={index} value={value} index={index} activeArticle={activeArticle} setActiveArticle={setActiveArticle} />
						</List.Item>
					)}
				/>
			</Col>
		</Row>
	)
}
export default Blog