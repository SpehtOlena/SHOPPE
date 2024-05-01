import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { ConfigProvider } from 'antd';
import "./styles/reset.css";
import configTheme from './styles/configTheme';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ConfigProvider theme={configTheme}>
		<RouterProvider router={routes} />
	</ConfigProvider>
);

