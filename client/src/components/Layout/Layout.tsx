import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectDevice } from '@src/store/slices/settingsSlice';
import { useAppSelector } from '../../store/hooks';
import { logout, selectUser } from '../../store/slices/userSlice';
import type { RootState } from '../../store/store';
import { Header } from '../Header';
import { MobileMenu } from '../MobileMenu';
import { StyledLayout } from './styled';

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

	return (
		<StyledLayout>
			<Header />
			{children}
			{isMobile && <MobileMenu />}
		</StyledLayout>
	);
};
