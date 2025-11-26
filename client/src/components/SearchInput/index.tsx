import {
	StyledContainer,
	StyledIconContainer,
	StyledInput,
	StyledSuggestions,
	StyledSuggestionsItem,
} from './styled';
import { FC, useState, useEffect } from 'react';
import { ReactComponent as SearchSVG } from '@src/assets/svg/search.svg?react';
import { colorMap } from '../ui/constants';
import { Icon } from '../ui/Icon';
import Fuse from 'fuse.js';
import CyrillicToTranslit from 'cyrillic-to-translit-js';

const products = [
	{ id: 1, name: 'Product 1', translit: 'product-1' },
	{ id: 2, name: 'Product 2', translit: 'product-2' },
	{ id: 3, name: 'shampoon', translit: 'shampoon' },
	{ id: 4, name: 'head & shoulders', translit: 'head-and-shoulders' },
];

const fuse = new Fuse(products, {
	keys: ['name', 'translit'],
	threshold: 0.5,
	ignoreLocation: true,
	includeScore: true,
});
const cyrillicToTranslit = CyrillicToTranslit();

type SearchInputProps = {};

export const SearchInput: FC<SearchInputProps> = () => {
	const [text, setText] = useState('');
	const [suggestions, setSuggestions] = useState<typeof products>([]);
	const [isFocusInput, setIsFocusInput] = useState(false);

	const isShowSuggestion = isFocusInput && suggestions.length > 0;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setText(value);

		if (value.trim().length > 0) {
			console.log(cyrillicToTranslit.transform(value));
			const results = fuse
				.search(cyrillicToTranslit.transform(value))
				.slice(0, 5)
				.map(result => result.item);
			console.log('results', results);
			setSuggestions(results);
		} else {
			setSuggestions([]);
		}
	};

	const handleFocus = () => {
		setIsFocusInput(true);
	};

	const handleBlur = () => {
		setIsFocusInput(false);
	};

	return (
		<StyledContainer>
			<StyledContainer>
				<StyledInput
					type="text"
					spellCheck={false}
					placeholder="Поиск в MAGAZ"
					value={text}
					onChange={handleChange}
					isSuggestion={isShowSuggestion}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				<StyledIconContainer>
					<Icon SVG={SearchSVG} width={24} height={24} color={colorMap.primary} />
				</StyledIconContainer>
			</StyledContainer>
			{isShowSuggestion && (
				<StyledSuggestions direction="column">
					{suggestions.map(suggestion => (
						<StyledSuggestionsItem>{suggestion.name}</StyledSuggestionsItem>
					))}
				</StyledSuggestions>
			)}
		</StyledContainer>
	);
};
