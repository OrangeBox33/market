import { colorMap } from '../ui/constants';
import { Flexbox } from '../ui/Flexbox';
import { Indent } from '../ui/Indent';
import { Text } from '../ui/Text';
import React from 'react';

export const Header: React.FC = () => {
	return (
		<Flexbox>
			<Indent p={16}>
				<Text size="24px" tag="h1" color="secondary" textWeight="bold">
					MAGAZ
				</Text>
			</Indent>
		</Flexbox>
	);
};
