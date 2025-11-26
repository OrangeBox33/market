import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { selectUser, setUser } from '../../store/slices/userSlice';
import { api } from '../../api/client';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { TNormalizedError } from '../../api/types/response';

const Container = styled.div`
	max-width: 400px;
	margin: 0 auto;
	padding: 2rem;
`;

const Form = styled.form`
	background: white;
	padding: 2rem;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
	text-align: center;
	margin-bottom: 2rem;
	color: #333;
`;

const Input = styled.input`
	width: 100%;
	padding: 1rem;
	border: 1px solid #ddd;
	border-radius: 4px;
	font-size: 1rem;
	margin-bottom: 1rem;
	box-sizing: border-box;

	&:focus {
		outline: none;
		border-color: #667eea;
	}
`;

const Button = styled.button`
	width: 100%;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	border: none;
	padding: 1rem;
	border-radius: 4px;
	cursor: pointer;
	font-size: 1rem;
	font-weight: bold;
	margin-bottom: 1rem;

	&:hover {
		opacity: 0.9;
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;

const CodeInput = styled.input`
	width: 100%;
	padding: 1rem;
	border: 1px solid #ddd;
	border-radius: 4px;
	font-size: 1.5rem;
	text-align: center;
	letter-spacing: 0.5rem;
	margin-bottom: 1rem;
	box-sizing: border-box;

	&:focus {
		outline: none;
		border-color: #667eea;
	}
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
	padding: 1rem;
	border-radius: 4px;
	margin-bottom: 1rem;
	text-align: center;
	background: ${props => (props.type === 'success' ? '#e8f5e8' : '#ffebee')};
	color: ${props => (props.type === 'success' ? '#2e7d32' : '#c62828')};
`;

const BackButton = styled.button`
	background: #f5f5f5;
	color: #666;
	border: 1px solid #ddd;
	padding: 0.5rem 1rem;
	border-radius: 4px;
	cursor: pointer;
	margin-bottom: 1rem;

	&:hover {
		background: #e9e9e9;
	}
`;

export const AuthPage: React.FC = () => {
	const [phone, setPhone] = useState('');
	const [code, setCode] = useState('');
	const [step, setStep] = useState<'phone' | 'code'>('phone');
	const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

	const { isLoading } = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSendOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!phone.trim()) return;

		try {
			const result = await api.sendOtp(phone);
			setMessage({ text: `Код отправлен: ${result.code}`, type: 'success' });
			setStep('code');
		} catch (error: any) {
			setMessage({
				text: error?.data?.message || 'Ошибка отправки кода',
				type: 'error',
			});
		}
	};

	const handleVerifyOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!code.trim()) return;

		try {
			const result = await api.verifyOtp({ phone, code });
			dispatch(setUser(result));
			setMessage({ text: 'Успешная авторизация!', type: 'success' });
			setTimeout(() => navigate('/'), 1000);
		} catch (error: unknown) {
			const err = error as TNormalizedError;
			setMessage({ text: err.message, type: 'error' });
		}
	};

	const handleBack = () => {
		setStep('phone');
		setCode('');
		setMessage(null);
	};

	return (
		<Container>
			<Form onSubmit={step === 'phone' ? handleSendOtp : handleVerifyOtp}>
				<Title>Вход в аккаунт</Title>

				{message && <Message type={message.type}>{message.text}</Message>}

				{step === 'phone' ? (
					<>
						<Input
							type="tel"
							placeholder="Номер телефона"
							value={phone}
							onChange={e => setPhone(e.target.value)}
							required
						/>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? 'Отправляем...' : 'Получить код'}
						</Button>
					</>
				) : (
					<>
						<BackButton type="button" onClick={handleBack}>
							← Назад
						</BackButton>
						<CodeInput
							type="text"
							placeholder="000000"
							value={code}
							onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
							maxLength={6}
							required
						/>
						<Button type="submit" disabled={isLoading || code.length !== 6}>
							{isLoading ? 'Проверяем...' : 'Войти'}
						</Button>
					</>
				)}
			</Form>
		</Container>
	);
};
