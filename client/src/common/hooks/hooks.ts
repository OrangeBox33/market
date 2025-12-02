import { useEffect, useState } from 'react';
import { TNormalizedError } from '@src/common/types/response';

export const useLoading = <TData>(loader: () => Promise<TData>) => {
	const [data, setData] = useState<TData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<TNormalizedError | null>(null);

	useEffect(() => {
		let isMounted = true;

		loader()
			.then(result => {
				if (isMounted) setData(result);
			})
			.catch(err => {
				if (isMounted) setError(err);
			})
			.finally(() => {
				if (isMounted) setIsLoading(false);
			});

		return () => {
			isMounted = false;
		};
	}, [loader]);

	return { data, isLoading, error };
};
