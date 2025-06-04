import type { Dispatch } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, type SetStateAction } from "react";
import type { Token } from "@/lib/types";

export default function BalanceForm({
	token,
	isLoading,
	setAddress,
	networkError,
}: {
	token: Token;
	isLoading: boolean;
	setAddress: Dispatch<SetStateAction<string>>;
	networkError?: string;
}) {
	const [error, setError] = useState<string>("");

	console.log("network error: ", networkError);

	const handleGetBalance = (data: FormData) => {
		const address = data.get("address") ? String(data.get("address")) : "";
		let valid = false;
		if (token === "bitcoin") {
			valid = isValidBitcoinAddress(address);
		} else {
			valid = isValidEthereumAddress(address);
		}

		if (!valid) {
			setError(
				token === "bitcoin"
					? "Invalid Bitcoin address"
					: "Invalid Ethereum address",
			);
			setAddress("");
		} else {
			setError("");
			setAddress(address);
		}
	};
	return (
		<form className="flex flex-col gap-2" action={handleGetBalance}>
			<label htmlFor="wallet-address" className="text-sm font-semibold">
				Wallet Address
			</label>
			<Input
				id="wallet-address"
				name="address"
				placeholder="eg. 0x0000000000"
				onChange={() => {
					if (error) setError("");
				}}
			/>
			{(networkError || error) && (
				<p className="text-red-500 text-sm text-left font-semibold">
					{networkError ?? error}
				</p>
			)}
			<Button type="submit" disabled={isLoading}>
				Get Balance
			</Button>
		</form>
	);
}

function isValidBitcoinAddress(address: string) {
	return (
		/^(1|3)[a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address) ||
		/^bc1[a-zA-HJ-NP-Z0-9]{39,59}$/.test(address)
	);
}

function isValidEthereumAddress(address: string) {
	return /^0x[a-fA-F0-9]{40}$/.test(address);
}
