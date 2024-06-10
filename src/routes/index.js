import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound/NotFound";
import Shop from "../pages/Shop/Shop";
import Blog from "../pages/Blog/Blog";
import OurStory from "../pages/OurStory/OurStory";
import Home from "../pages/Home/Home";
import ProductPage from "../pages/ProductPage/ProductPage"
import ContactUs from "../pages/ContactUs/ContactUs";

export const routes = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/shop",
				element: <Shop />
			},
			{
				path: "/blog",
				element: <Blog />
			},
			{
				path: "/our_story",
				element: <OurStory />
			},
			{
				path: "/home",
				element: <Home />
			},
			{
				path: '/:productId',
				element: <ProductPage />
			},
			{
				path: '/contact_us',
				element: <ContactUs />
			}
		]
	},
	{
		path: "*",
		element: <NotFound />
	}
])