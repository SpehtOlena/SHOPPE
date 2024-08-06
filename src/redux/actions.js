
import { CREATE_SHOPPING_CART_PRODUCT, DELETE_SHOPPING_CART_PRODUCT, EDIT_SHOPPING_CART_PRODUCT, CREATE_PRODUCT_REVIEW, CLEAR_SHOPPING_CART_PRODUCTS } from "./types";



export function addProductToShoppingCart(product, quantity) {
	return {
		type: CREATE_SHOPPING_CART_PRODUCT, payload:
		{
			name: product.name,
			id: product.id,
			price: product.price,
			quantity: quantity,
			preciousMetal: product.preciousMetal,
			gemStone: product.gemStone,
			image: product.images[0]
		}
	}
}

export function addReviewToProduct(email, review, rate, name) {
	return {
		type: CREATE_PRODUCT_REVIEW, payload:
		{
			userEmail: email,
			userName: name,
			userRate: rate,
			userReview: review
		}
	}
}

export function editProductToShoppingCard(product, quantity) {
	return {
		type: EDIT_SHOPPING_CART_PRODUCT, payload: { ...product, quantity: quantity }
	}

}

export function deleteProductFromShoppingCart(product) {
	return {
		type: DELETE_SHOPPING_CART_PRODUCT,
		payload: product
	}
}


export function clearShoppingCart() {
	return {
		type: CLEAR_SHOPPING_CART_PRODUCTS
	}
}
