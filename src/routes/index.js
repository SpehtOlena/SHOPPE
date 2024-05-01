import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound/NotFound";
import Shop from "../pages/Shop/Shop";
import Blog from "../pages/Blog/Blog";
import OurStory from "../pages/OurStory/OurStory";
import Home from "../pages/Home/Home";

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
			}
		]
	},
	{
		path: "*",
		element: <NotFound />
	}
])