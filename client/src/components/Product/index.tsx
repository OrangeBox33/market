import React, { useState } from 'react';
import styled from 'styled-components';
import { Flexbox } from '../ui/Flexbox';
import { Image } from '../ui/Image';
import { Indent } from '../ui/Indent';
import { Text } from '../ui/Text';

type TProduct = {
	id: number;
	name: string;
	description: string;
	price: number;
	stock: number;
	images: string[];
	categoryId: number;
};

type TProductProps = {
	product: TProduct;
};

// Styled компоненты для карусели
const CarouselContainer = styled.div`
	position: relative;
	width: 100%;
`;

const CarouselWrapper = styled.div`
	position: relative;
	overflow: hidden;
	border-radius: 8px;
`;

const Indicators = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
	margin-top: 12px;
`;

const Indicator = styled.button<{ isActive: boolean }>`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	border: none;
	background-color: ${props => props.isActive ? '#6f5e4f' : '#d4d4d4'};
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: ${props => props.isActive ? '#6f5e4f' : '#b4b4b4'};
	}
`;

const ArrowButton = styled.button<{ direction: 'left' | 'right' }>`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	${props => props.direction === 'left' ? 'left: 12px;' : 'right: 12px;'}
	background-color: rgba(255, 255, 255, 0.8);
	border: none;
	border-radius: 50%;
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	z-index: 2;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: rgba(255, 255, 255, 0.9);
	}

	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
`;

export const Product: React.FC<TProductProps> = ({ product }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const images = product.images.length > 0 ? product.images : ['/placeholder-image.jpg'];

	const handlePrevImage = () => {
		setCurrentImageIndex((prev) =>
			prev === 0 ? images.length - 1 : prev - 1
		);
	};

	const handleNextImage = () => {
		setCurrentImageIndex((prev) =>
			prev === images.length - 1 ? 0 : prev + 1
		);
	};

	const handleIndicatorClick = (index: number) => {
		setCurrentImageIndex(index);
	};

	return (
		<Indent p={16} borderRadius={8} maxWidth={400}>
			<Flexbox direction="column" gap="16px">
				{/* Карусель изображений */}
				<CarouselContainer>
					<CarouselWrapper>
						<Image
							src={images[currentImageIndex]}
							width="100%"
							height={300}
							alt={product.name}
						/>

						{/* Кнопки навигации */}
						{images.length > 1 && (
							<>
								<ArrowButton
									direction="left"
									onClick={handlePrevImage}
									aria-label="Предыдущее изображение"
								>
									‹
								</ArrowButton>
								<ArrowButton
									direction="right"
									onClick={handleNextImage}
									aria-label="Следующее изображение"
								>
									›
								</ArrowButton>
							</>
						)}
					</CarouselWrapper>

					{/* Индикаторы */}
					{images.length > 1 && (
						<Indicators>
							{images.map((_, index) => (
								<Indicator
									key={index}
									isActive={index === currentImageIndex}
									onClick={() => handleIndicatorClick(index)}
									aria-label={`Изображение ${index + 1} из ${images.length}`}
								/>
							))}
						</Indicators>
					)}
				</CarouselContainer>

				{/* Информация о товаре */}
				<Flexbox direction="column" gap="8px">
					{/* Название товара */}
					<Text tag="h3" size="20px" textWeight="600" font="helios">
						{product.name}
					</Text>

					{/* Описание */}
					<Text tag="p" size="14px" color="secondary" maxWidth={350}>
						{product.description}
					</Text>

					{/* Цена и наличие */}
					<Flexbox justifyContent="space-between" alignItems="center">
						<Text tag="span" size="24px" textWeight="700" color="primary" font="helios">
							{product.price} ₽
						</Text>

						<Text tag="span" size="14px" color="primary">
							{product.stock > 0 ? `В наличии: ${product.stock} шт.` : 'Нет в наличии'}
						</Text>
					</Flexbox>

					{/* ID товара и категория (для отладки) */}
					<Flexbox justifyContent="space-between" alignItems="center">
						<Text tag="small" size="12px" color="quaternary">
							ID: {product.id}
						</Text>

						<Text tag="small" size="12px" color="tertiary">
							Категория: {product.categoryId}
						</Text>
					</Flexbox>
				</Flexbox>
			</Flexbox>
		</Indent>
	);
};
