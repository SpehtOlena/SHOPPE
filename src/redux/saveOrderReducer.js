import { CREATE_ORDER } from "./types"

const initialState = {
	data: [],
	item: {}
}

export const saveOrderReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_ORDER: {
			return { ...state, data: [...state.data, action.payload] }
		}
		default: {
			return state
		}
	}
}