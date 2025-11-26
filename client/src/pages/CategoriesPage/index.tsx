import { FC } from 'react';
import styled from 'styled-components';
import { SearchInput } from '@src/components/SearchInput';
import { useLoading } from '@src/utils/hooks/hooks';
import { api } from '@src/api/client';
import { Flexbox } from '@src/components/ui/Flexbox';
import { Indent } from '@src/components/ui/Indent';
import { Text } from '@src/components/ui/Text';

const SkeletonCard = styled.div`
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: loading 1.5s infinite;
	border-radius: 8px;
	width: 200px;
	height: 120px;

	@keyframes loading {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
`;

const CategoryCard = styled.div`
	background: #ffffff;
	border-radius: 8px;
	padding: 16px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	transition: transform 0.2s ease, box-shadow 0.2s ease;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
	}
`;

const CategoryImage = styled.div`
	width: 100%;
	height: 80px;
	background: #f5f5f5;
	border-radius: 4px;
	margin-bottom: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
`;

export const CategoriesPage: FC = () => {
	const { data: categories, isLoading: categoriesLoading } = useLoading(api.getCategories);

	return (
		<div>
			<SearchInput />
			<Indent m={20}>
				<Flexbox direction="row" gap="16px" isWrap={true} justifyContent="flex-start">
					{categoriesLoading
						? Array.from({ length: 8 }, (_, index) => <SkeletonCard key={`skeleton-${index}`} />)
						: categories?.map(category => (
								<CategoryCard key={category.id}>
									<Indent p={16}>
										<Flexbox direction="column" alignItems="center">
											<CategoryImage>📦</CategoryImage>
											<Text size="16px" textWeight="600" textAlign="center" color="primary">
												{category.name}
											</Text>
										</Flexbox>
									</Indent>
								</CategoryCard>
						  ))}
				</Flexbox>
			</Indent>
		</div>
	);
};
