import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthPage } from './pages/AuthPage';
import { api } from './api/client';
import { useAppDispatch } from './store/hooks';
import { setUser } from './store/slices/userSlice';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { ProfilePage } from './pages/ProfilePage';

export const App: React.FC = () => {
	const dispatch = useAppDispatch();

	// TODO просто расскомментить
	// useEffect(() => {
	// 	api
	// 		.auth()
	// 		.then(user => {
	// 			if (user) {
	// 				dispatch(setUser(user));
	// 			}
	// 		})
	// 		.catch(err => {
	// 			console.error(err);
	// 		});
	// });

	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/product/:id" element={<ProductPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/auth" element={<AuthPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					{/* Admin */}
					{/* <Route path="/admin" element={<AdminRoute />}>
						<Route index element={<Navigate to="products" replace />} />
						<Route path="products" element={<AdminProductsPage />} />
						<Route path="products/new" element={<AdminProductFormPage />} />
						<Route path="products/:id/edit" element={<AdminProductFormPage />} />
						<Route path="orders" element={<AdminOrdersPage />} />
						<Route path="orders/:id" element={<AdminOrderDetailsPage />} />
					</Route> */}
				</Routes>
			</Layout>
		</Router>
	);
};
