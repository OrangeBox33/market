import bcrypt from 'bcrypt';

const SALT_ROUNDS = 8;

export const makeHash = async (password: string): Promise<string> => {
	const hash = await bcrypt.hash(password, SALT_ROUNDS);
	return hash;
};

export const compareHash = async (password: string, hash: string): Promise<boolean> => {
	const match = await bcrypt.compare(password, hash);
	return match;
};

export const normalizePhone = (input: string): string | null => {
	const digits = input.replace(/\D/g, '');

	if (digits.length === 11 && digits.startsWith('8')) {
		return '7' + digits.slice(1);
	}

	if (digits.length === 10) {
		return '7' + digits;
	}

	return null;
};
