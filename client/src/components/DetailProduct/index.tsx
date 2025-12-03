import React, { useState } from 'react';
import { useProduct } from '@src/store/hooks/useProduct';
import { Flexbox } from '../ui/Flexbox';
import { Image } from '../ui/Image';
import { Indent } from '../ui/Indent';
import { Text } from '../ui/Text';
import {
	StyledArrowButton,
	StyledCarouselContainer,
	StyledCarouselWrapper,
	StyledIndicator,
	StyledIndicators,
} from './styled';

type TProductProps = {
	productId: number;
};

export const DetailProduct: React.FC<TProductProps> = ({ productId }) => {
	const { product, isLoading, error } = useProduct(productId);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	console.log(product);
	const images = product?.images.length ? product.images : ['/placeholder-image.jpg'];

	const handlePrevImage = () => {
		setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const handleNextImage = () => {
		setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
	};

	const handleIndicatorClick = (index: number) => {
		setCurrentImageIndex(index);
	};

	if (isLoading) {
		return (
			<Indent p={16} borderRadius={8} maxWidth={400}>
				<Flexbox direction="column" gap="16px" alignItems="center">
					<Text tag="p" size="16px" color="secondary">
						Загрузка...
					</Text>
				</Flexbox>
			</Indent>
		);
	}

	if (error) {
		return (
			<Indent p={16} borderRadius={8} maxWidth={400}>
				<Flexbox direction="column" gap="16px" alignItems="center">
					<Text tag="p" size="16px" color="secondary">
						Ошибка: {error}
					</Text>
				</Flexbox>
			</Indent>
		);
	}

	if (!product) {
		return (
			<Indent p={16} borderRadius={8} maxWidth={400}>
				<Flexbox direction="column" gap="16px" alignItems="center">
					<Text tag="p" size="16px" color="secondary">
						Товар не найден
					</Text>
				</Flexbox>
			</Indent>
		);
	}

	return (
		<Indent p={16} borderRadius={8} maxWidth={400}>
			<Flexbox direction="column" gap="16px">
				{/* Карусель изображений */}
				<StyledCarouselContainer>
					<StyledCarouselWrapper>
						<Image src={images[currentImageIndex]} width="100%" height={300} alt={product.name} />

						{/* Кнопки навигации */}
						{images.length > 1 && (
							<>
								<StyledArrowButton
									direction="left"
									onClick={handlePrevImage}
									aria-label="Предыдущее изображение"
								>
									‹
								</StyledArrowButton>
								<StyledArrowButton
									direction="right"
									onClick={handleNextImage}
									aria-label="Следующее изображение"
								>
									›
								</StyledArrowButton>
							</>
						)}
					</StyledCarouselWrapper>

					{/* Индикаторы */}
					{images.length > 1 && (
						<StyledIndicators>
							{images.map((_, index) => (
								<StyledIndicator
									key={index}
									isActive={index === currentImageIndex}
									onClick={() => handleIndicatorClick(index)}
									aria-label={`Изображение ${index + 1} из ${images.length}`}
								/>
							))}
						</StyledIndicators>
					)}
				</StyledCarouselContainer>

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
