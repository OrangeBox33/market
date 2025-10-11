// парсер чисел с ограничением диапазона
export const parsePositiveInt = (value: unknown, fallback: number, max?: number): number => {
	const n = Number(value);
	if (!Number.isFinite(n) || n <= 0) return fallback;
	const val = Math.floor(n);
	return max && val > max ? max : val;
};
