import { Typography } from 'antd'
import './OurStory.scss';
import bannerPhoto_3 from "../../assets/bannerPhoto/bannerPhoto_3.png"
import bannerPhoto_5 from "../../assets/bannerPhoto/bannerPhoto_5.png"

const OurStory = () => {
	return (
		<div className={'our-story-container'}>
			<Typography.Title level={2}>About</Typography.Title>
			<Typography.Title level={4}>Who we are and why we do what we do!</Typography.Title>
			<Typography.Text>Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam, sollicitudin ante a, gravida arcu. Nam fringilla molestie velit, eget pellentesque risus scelerisque a. Nam ac urna maximus, tempor magna et, placerat urna. Curabitur eu magna enim. Proin placerat tortor lacus, ac sodales lectus placerat quis. </Typography.Text>
			<div className={'our-story-block'}>
				<Typography.Title level={3}>Top trends</Typography.Title>
				<img src={bannerPhoto_3} alt="" />
				<Typography.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. </Typography.Text>
				<ul>
					<li><span>●</span> consectetur adipiscing elit. Aliquam placerat</li>
					<li><span>●</span> Lorem ipsum dolor sit amet consectetur </li>
				</ul>
			</div>
			<div className={'our-story-block'}>
				<Typography.Title level={3}>Produced with care</Typography.Title>
				<img src={bannerPhoto_5} alt="" />
				<Typography.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor odio, in molestie diam bibendu.</Typography.Text>
			</div>
		</div>
	)
}
export default OurStory