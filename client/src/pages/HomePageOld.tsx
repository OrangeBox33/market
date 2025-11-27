import React, { useState } from 'react';
import styled from 'styled-components';
import { api } from '../api/client';
import { useLoading } from '../common/hooks/hooks';
import { LoadingSpinner } from '../components/LoadingSpinner';

const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;

const Title = styled.h1`
	text-align: center;
	margin-bottom: 2rem;
	color: #333;
`;

const Filters = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 2rem;
	flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active?: boolean }>`
	padding: 0.5rem 1rem;
	border: 2px solid ${props => (props.active ? '#667eea' : '#ddd')};
	background: ${props => (props.active ? '#667eea' : 'white')};
	color: ${props => (props.active ? 'white' : '#333')};
	border-radius: 20px;
	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		border-color: #667eea;
		background: ${props => (props.active ? '#667eea' : '#f8f9ff')};
	}
`;

const ProductsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: 2rem;
	margin-bottom: 2rem;
`;

const Pagination = styled.div`
	display: flex;
	justify-content: center;
	gap: 0.5rem;
	margin-top: 2rem;
`;

const PageButton = styled.button<{ active?: boolean }>`
	padding: 0.5rem 1rem;
	border: 1px solid #ddd;
	background: ${props => (props.active ? '#667eea' : 'white')};
	color: ${props => (props.active ? 'white' : '#333')};
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background: ${props => (props.active ? '#667eea' : '#f8f9ff')};
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const ErrorMessage = styled.div`
	background: #ffebee;
	color: #c62828;
	padding: 1rem;
	border-radius: 4px;
	text-align: center;
	margin: 2rem 0;
`;

export const HomePage: React.FC = () => {
	console.log('HomePage rendered');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [currentPage, setCurrentPage] = useState(1);
	const perPage = 12;

	const {
		data: categories,
		isLoading: categoriesLoading,
		error: categoriesError,
	} = useLoading(api.getCategories());
	const {
		data: productsData,
		isLoading: productsLoading,
		error: productsError,
	} = useLoading(
		api.getProducts({
			page: currentPage,
			perPage,
			category: selectedCategory || undefined,
		})
	);

	const handleCategoryChange = (categorySlug: string) => {
		setSelectedCategory(categorySlug === selectedCategory ? '' : categorySlug);
		setCurrentPage(1);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (categoriesError || productsError) {
		return (
			<Container>
				<ErrorMessage>Ошибка загрузки данных. Попробуйте обновить страницу.</ErrorMessage>
			</Container>
		);
	}

	return (
		<Container>
			<Title>Каталог товаров</Title>

			<Filters>
				<FilterButton active={selectedCategory === ''} onClick={() => handleCategoryChange('')}>
					Все товары
				</FilterButton>
				{categoriesLoading ? (
					<LoadingSpinner />
				) : (
					categories?.map((category: any) => (
						<FilterButton
							key={category.id}
							active={selectedCategory === category.slug}
							onClick={() => handleCategoryChange(category.slug)}
						>
							{category.name}
						</FilterButton>
					))
				)}
			</Filters>

			{productsLoading ? (
				<LoadingSpinner />
			) : (
				<>
					<ProductsGrid>
						{productsData?.items?.map((product: any) => (
							// TODO
							<div />
						))}
					</ProductsGrid>

					{productsData && productsData.total > perPage && (
						<Pagination>
							<PageButton
								disabled={currentPage === 1}
								onClick={() => handlePageChange(currentPage - 1)}
							>
								Назад
							</PageButton>

							{Array.from({ length: Math.ceil(productsData.total / perPage) }, (_, i) => i + 1)
								.filter(
									page =>
										page === 1 ||
										page === Math.ceil(productsData.total / perPage) ||
										Math.abs(page - currentPage) <= 2
								)
								.map((page, index, array) => (
									<React.Fragment key={page}>
										{index > 0 && array[index - 1] !== page - 1 && <span>...</span>}
										<PageButton
											active={page === currentPage}
											onClick={() => handlePageChange(page)}
										>
											{page}
										</PageButton>
									</React.Fragment>
								))}

							<PageButton
								disabled={currentPage === Math.ceil(productsData.total / perPage)}
								onClick={() => handlePageChange(currentPage + 1)}
							>
								Вперед
							</PageButton>
						</Pagination>
					)}
				</>
			)}
		</Container>
	);
};
