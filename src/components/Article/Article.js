import { Typography } from 'antd'
import './Article.scss'

const Article = ({ activeArticle }) => {
	const { id, title, subtitle, annotation, text, articleImg, category } = activeArticle
	return (
		<div className={'article-container'}>
			<img src={articleImg} alt="" />
			<Typography>{text}</Typography>
		</div>
	)
}
export default Article