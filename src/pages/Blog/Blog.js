import './Blog.scss'

const Blog = () => {

	const myUnixTimestamp = 1691622800; // start with a Unix timestamp

	const myDate = new Date(myUnixTimestamp * 1000); // convert timestamp to milliseconds and construct Date object

	console.log(myDate.toDateString()); // will print "Thu Aug 10 2023"


	return (
		<div>
			Blog
		</div>
	)
}
export default Blog