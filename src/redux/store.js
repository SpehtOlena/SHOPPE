import { configureStore } from "@reduxjs/toolkit";
import { app, auth, firestore, storage } from '../firebase/firebase'
import { combineReducers } from "redux";
import { actionTypes } from "react-redux-firebase";
import firebase from 'firebase/compat/app';
import { getFirebase } from 'react-redux-firebase'
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { shoppingCartProductsReducer } from './shoppingCartProductsReducer';
import { productReviewsReducer } from './productReviewsReducer';
import { actionTypes as rrfActionTypes } from 'react-redux-firebase';
import { constants as rfConstants } from 'redux-firestore';
import { createFirestoreInstance } from 'redux-firestore';
import { saveOrderReducer } from "./saveOrderReducer";


const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true,
	profileParamsToPopulate: [
		{ child: 'roles', root: 'roles' },
	],
	profileFactory: user => {
		const profile = {
			email: user.email || user.providerData[0].email,
			role: 'user',
		}
		if (user.providerData && user.providerData[0].length) {
			profile.providerData = user.providerData
		}
		return profile
	},
	enableClaims: true,
	presence: 'presence',
	sessions: 'sessions'
}

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	shoppingCartProducts: shoppingCartProductsReducer,
	productReviews: productReviewsReducer,
	saveOrders: saveOrderReducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					...Object.keys(rfConstants.actionTypes).map(
						(type) => `${rfConstants.actionsPrefix}/${type}`,
					),
					...Object.keys(rrfActionTypes).map(
						(type) => `@@reactReduxFirebase/${type}`,
					),
					actionTypes.LOGIN, actionTypes.AUTH_LINK_ERROR
				],
				ignoredPaths: ['firebase', 'firestore'],
			},
			thunk: {
				extraArgument: {
					getFirebase,
				},
			},
		}),
})

export const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance,
}