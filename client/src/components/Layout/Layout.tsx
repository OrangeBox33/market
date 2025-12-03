import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@src/context';
import { logout, selectUser } from '../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Header } from '../Header';
import { MobileMenu } from '../MobileMenu';
import { StyledLayout } from './styled';

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { isMobile } = useAppContext();
	const { isAuth, phone, name } = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate('/');
	};

	return (
		<StyledLayout>
			<Header />
			{children}
			{isMobile && <MobileMenu />}
		</StyledLayout>
	);
};
