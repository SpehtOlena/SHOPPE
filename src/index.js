import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { ConfigProvider } from 'antd';
import './styles/reset.css';
import configTheme from './styles/configTheme';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CustomReactReduxFirebaseProvider from './redux/CustomReactReduxFirebaseProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<CustomReactReduxFirebaseProvider>
			<ConfigProvider theme={configTheme}>
				<RouterProvider router={routes} />
			</ConfigProvider>
		</CustomReactReduxFirebaseProvider>
	</Provider>
);
