import { Typography } from 'antd';
import './BlogArticleCard.scss';
import Button from "../Button/Button"

const BlogArticleCard = ({ value, index }) => {
	return (
		<div className={'article-card-container'}>
			<img src={value.articleImg} alt="" />
			<Typography.Title level={5}>{value.subtitle}</Typography.Title>
			<Typography.Title level={3}>{value.title}</Typography.Title>
			<Typography.Text>{value.text}</Typography.Text>
			<Button type={'link'}>Read More</Button>
		</div>
	)
}
export default BlogArticleCard