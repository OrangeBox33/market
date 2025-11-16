import { TNormalizedError } from '@src/api/types/response';
import { useEffect, useState } from 'react';

export const useLoading = <TData>(promise: Promise<TData>) => {
	const [data, setData] = useState<TData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<TNormalizedError | null>(null);

	useEffect(() => {
		let isMount = true; // если компонент размонтируется

		promise
			.then(result => {
				if (isMount) setData(result);
			})
			.catch(err => {
				if (isMount) setError(err);
			})
			.finally(() => {
				if (isMount) setIsLoading(false);
			});

		return () => {
			isMount = false;
		};
	}, []);

	return { data, isLoading, error };
};
