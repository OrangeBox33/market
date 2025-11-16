import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { logout, selectUser } from '../store/slices/userSlice';
import { useAppSelector } from '../store/hooks';
import { selectDevice } from '@src/store/slices/settingsSlice';
import { MobileMenu } from './MobileMenu';

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { isAuth, phone, name } = useAppSelector(selectUser);
	const { isMobile } = useAppSelector(selectDevice);
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate('/');
	};

	const cartItemsCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

	return <>{isMobile && <MobileMenu />}</>;
};
