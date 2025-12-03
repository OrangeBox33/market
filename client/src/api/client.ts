import { CategoriesApi } from './modules/categories';
import { ProductsApi } from './modules/products';
import { CartApi } from './modules/cart';
import { AuthApi } from './modules/auth';
import { OrdersApi } from './modules/orders';
import { AdminApi } from './modules/admin';

// API modules - each extending BaseApiClient
export const categoriesApi = new CategoriesApi();
export const productsApi = new ProductsApi();
export const cartApi = new CartApi();
export const authApi = new AuthApi();
export const ordersApi = new OrdersApi();
export const adminApi = new AdminApi();

// Legacy API export for backward compatibility
export const api = {
	// Categories
	getCategories: categoriesApi.getCategories,

	// Products
	getProducts: productsApi.getProducts,
	getProduct: productsApi.getProduct,
	getProductsForSearch: productsApi.getProductsForSearch,

	// Cart
	getCart: cartApi.getCart,
	increaseItemQuantity: cartApi.increaseItemQuantity,
	decreaseItemQuantity: cartApi.decreaseItemQuantity,
	removeItemFromCart: cartApi.removeItemFromCart,
	clearLocalCart: cartApi.clearLocalCart,

	// Auth
	sendOtp: authApi.sendOtp,
	verifyOtp: authApi.verifyOtp,
	auth: authApi.auth,
	logout: authApi.logout,

	// Orders
	createOrder: ordersApi.createOrder,
	getOrders: ordersApi.getOrders,
	getOrder: ordersApi.getOrder,

	// Admin
	adminGetProducts: adminApi.adminGetProducts,
	adminCreateProduct: adminApi.adminCreateProduct,
	adminUpdateProduct: adminApi.adminUpdateProduct,
	adminDeleteProduct: adminApi.adminDeleteProduct,
	adminGetOrders: adminApi.adminGetOrders,
	adminGetOrder: adminApi.adminGetOrder,
	adminUpdateOrderStatus: adminApi.adminUpdateOrderStatus,
};
