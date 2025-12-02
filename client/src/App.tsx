import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { api } from './api/client';
import { Layout } from './components/Layout/Layout';
import { initSearchEngine } from './engine/searchEngine';
import { AuthPage } from './pages/AuthPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { setUser } from './store/slices/userSlice';
import { useAppDispatch } from './store/store';

export const App: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log('render');
	});

	useEffect(() => {
		api
			.auth()
			.then(user => {
				if (user) {
					dispatch(setUser(user));
				}
			})
			.catch(err => {
				console.error(err);
			});
		api
			.getProductsForSearch()
			.then(productsForSearch => {
				if (productsForSearch) {
					initSearchEngine(productsForSearch);
				}
			})
			.catch(err => {
				console.error(err);
			});
	}, []);

	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/categories/" element={<CategoriesPage />} />
					<Route path="/category/:slug" element={<CategoryPage />} />
					<Route path="/product/:id" element={<ProductPage />} />
					{/* <Route path="/cart" element={<CartPage />} /> */}
					{/* <Route path="/auth" element={<AuthPage />} /> */}
					{/* <Route path="/profile" element={<ProfilePage />} /> */}
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
