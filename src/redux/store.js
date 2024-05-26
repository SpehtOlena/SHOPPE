import { configureStore } from "@reduxjs/toolkit";
import { app, auth, firestore, database, storage } from '../firebase/firebase'
import { combineReducers } from "redux";
import { actionTypes } from "react-redux-firebase";
import firebase from 'firebase/compat/app';
import {
	getFirebase,
} from 'react-redux-firebase'
// Імпорт редукторів
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { shoppingCartProductsReducer } from './shoppingCartProductsReducer';
import { productReviewsReducer } from './productReviewsReducer';

// Імпорт констант
import { actionTypes as rrfActionTypes } from 'react-redux-firebase';
import { constants as rfConstants } from 'redux-firestore';

// Імпорт інших необхідних ресурсів
import { createFirestoreInstance } from 'redux-firestore';


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
	productReviews: productReviewsReducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					// just ignore every redux-firebase and react-redux-firebase action type
					...Object.keys(rfConstants.actionTypes).map(
						(type) => `${rfConstants.actionsPrefix}/${type}`,
					),
					...Object.keys(rrfActionTypes).map(
						(type) => `@@reactReduxFirebase/${type}`,
					),
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