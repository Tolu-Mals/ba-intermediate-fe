export type Token = "bitcoin" | "ethereum";
export type TransactionPreview = {
	estimatedGas: string;
	totalAmount: string;
	status: "preview" | "success";
};
