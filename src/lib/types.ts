export type Token = "bitcoin" | "ethereum";
export type BitcoinBalance = {
	balance: string;
};
export type EtherBalance = {
	result: string;
};
export type EtherscanResponse = {
	message: string;
	result: string;
	status: string;
};
