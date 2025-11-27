import { FC, useState } from 'react';
import SearchSVG from '@src/assets/svg/search.svg?react';
import { TProductForSearch } from '@src/common/types/product';
import { searchProducts } from '@src/engine/searchEngine';
import { Icon } from '../ui/Icon';
import { colorMap } from '../ui/constants';
import {
	StyledContainer,
	StyledIconContainer,
	StyledInput,
	StyledSuggestions,
	StyledSuggestionsItem,
} from './styled';

type SearchInputProps = {};

export const SearchInput: FC<SearchInputProps> = () => {
	const [text, setText] = useState('');
	const [suggestions, setSuggestions] = useState<TProductForSearch[]>([]);
	const [isFocusInput, setIsFocusInput] = useState(false);

	const isShowSuggestion = isFocusInput && suggestions.length > 0;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setText(value);

		if (value.trim().length > 0) {
			const results = searchProducts(value);

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
