export type Token = "bitcoin" | "ethereum";
export type WalletState = {
	token: Token;
	address: string;
	balance: number;
};
