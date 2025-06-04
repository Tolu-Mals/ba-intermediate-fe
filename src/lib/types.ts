export type Token = "bitcoin" | "ethereum";
export type Transaction = {
	estimatedFee: string;
	totalAmount: string;
	status: "preview" | "success";
};
