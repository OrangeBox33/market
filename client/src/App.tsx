import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { api } from './api/client';
import { Layout } from './components/Layout/Layout';
import { initSearchEngine } from './engine/searchEngine';
import { AuthPage } from './pages/AuthPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { DetailProductPage } from './pages/DetailProductPage';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
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
			.then(data => {
				if (data?.user) {
					dispatch(setUser(data.user));
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
					<Route path="/category/:categorySlug?" element={<ProductsPage />} />
					<Route path="/product/:id" element={<DetailProductPage />} />
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
