import { CREATE_PRODUCT_REVIEW } from "./types"

const initialState = {
	data: [],
	item: {}
}

export const productReviewsReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_PRODUCT_REVIEW: {
			return { ...state, data: [...state.data, action.payload] }
		}
		default: {
			return state
		}
	}
}