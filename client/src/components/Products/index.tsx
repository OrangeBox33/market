import React, { useEffect } from 'react';
import {
	selectProductsError,
	selectProductsItems,
	selectProductsLoading,
	selectProductsPagination,
	setProductsPage,
} from '@src/store/slices/productsSlice';
import { useAppDispatch, useAppSelector } from '@src/store/store';
import { getProducts } from '@src/store/thunk/products';
import { ProductItem } from '../ProductItem';
import { Flexbox, Indent, Text } from '../ui';
import { StyledPageNumber, StyledPaginationButton } from './styled';

type TProductsProps = {
	categorySlug?: string;
};

export const Products: React.FC<TProductsProps> = ({ categorySlug }) => {
	const dispatch = useAppDispatch();
	const items = useAppSelector(selectProductsItems);
	const { currentPage, totalPages } = useAppSelector(selectProductsPagination);
	const isLoading = useAppSelector(selectProductsLoading);
	const error = useAppSelector(selectProductsError);

	useEffect(() => {
		dispatch(getProducts({ page: currentPage, categorySlug }));
	}, [dispatch, currentPage, categorySlug]);

	const handlePageChange = (page: number) => {
		dispatch(setProductsPage(page));
	};

	const renderPagination = () => {
		if (totalPages <= 1) return null;

		return (
			<Indent mT={24}>
				<Flexbox justifyContent="center" alignItems="center" gap="8px">
					<Indent p={8}>
						<StyledPaginationButton
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							isDisabled={currentPage === 1}
						>
							Previous
						</StyledPaginationButton>
					</Indent>

					{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
						<Indent p={8} pL={12} pR={12} key={page}>
							<StyledPageNumber
								onClick={() => handlePageChange(page)}
								isActive={currentPage === page}
							>
								{page}
							</StyledPageNumber>
						</Indent>
					))}

					<Indent p={8}>
						<StyledPaginationButton
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							isDisabled={currentPage === totalPages}
						>
							Next
						</StyledPaginationButton>
					</Indent>
				</Flexbox>
			</Indent>
		);
	};

	if (isLoading) {
		return (
			<Flexbox justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
				<Text size="18px" color="secondary">
					Loading products...
				</Text>
			</Flexbox>
		);
	}

	if (error) {
		return (
			<Flexbox justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
				<Text size="18px" color="secondary">
					Error: {error}
				</Text>
			</Flexbox>
		);
	}

	if (items.length === 0) {
		return (
			<Flexbox justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
				<Text size="18px" color="secondary">
					No products found
				</Text>
			</Flexbox>
		);
	}

	return (
		<Flexbox direction="column">
			<Indent p={16}>
				<Flexbox direction="column" gap="24px">
					<Flexbox justifyContent="flex-start" alignItems="stretch" gap="24px" isWrap={true}>
						{items.map(product => (
							<ProductItem key={product.id} product={product} />
						))}
					</Flexbox>

					{renderPagination()}
				</Flexbox>
			</Indent>
		</Flexbox>
	);
};
