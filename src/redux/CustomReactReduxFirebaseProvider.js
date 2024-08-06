import React from 'react';
import PropTypes from 'prop-types';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { Provider } from 'react-redux';
import { store, rrfProps } from './store';

const CustomReactReduxFirebaseProvider = ({
	children,
	firebase = rrfProps.firebase,
	config = rrfProps.config,
	dispatch = rrfProps.dispatch,
	createFirestoreInstance = rrfProps.createFirestoreInstance,
}) => (
	<ReactReduxFirebaseProvider
		firebase={firebase}
		config={config}
		dispatch={dispatch}
		createFirestoreInstance={createFirestoreInstance}
	>
		{children}
	</ReactReduxFirebaseProvider>
);

CustomReactReduxFirebaseProvider.propTypes = {
	children: PropTypes.node,
	firebase: PropTypes.object,
	config: PropTypes.object,
	dispatch: PropTypes.func,
	createFirestoreInstance: PropTypes.func,
};

export default CustomReactReduxFirebaseProvider;
