
import { CREATE_SHOPPING_CART_PRODUCT, DELETE_SHOPPING_CART_PRODUCT, EDIT_SHOPPING_CART_PRODUCT, CREATE_PRODUCT_REVIEW } from "./types";



export function addProductToShoppingCart(product, quantity, color, size) {
	return {
		type: CREATE_SHOPPING_CART_PRODUCT, payload:
		{
			name: product.name,
			color: color,
			id: product.id + color + size,
			price: product.price,
			quantity: quantity,
			size: size,
			image: product.images[color][0]
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
