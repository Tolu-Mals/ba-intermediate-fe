import btcLogo from "@/assets/btc.png";
import ethLogo from "@/assets/eth.png";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { BitcoinBalance, EtherBalance, Token } from "@/lib/types";
import Header from "@/components/header";
import { useQuery } from "@tanstack/react-query";

function isValidBitcoinAddress(address: string) {
	// Basic check: starts with 1, 3, or bc1 and length
	return (
		/^(1|3)[a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address) ||
		/^bc1[a-zA-HJ-NP-Z0-9]{39,59}$/.test(address)
	);
}

function isValidEthereumAddress(address: string) {
	// Basic check: starts with 0x and is 42 chars
	return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function Wallet() {
	const [token, setToken] = useState<Token>("bitcoin");
	const [address, setAddress] = useState<string>("");
	const [error, setError] = useState<string>("");
	const { data, isLoading } = useQuery({
		queryKey: [token, address],
		queryFn: () => getWalletBalance(token, address),
		refetchInterval: 30_000,
		enabled: Boolean(address) && !error,
	});

	const logo = token === "bitcoin" ? btcLogo : ethLogo;
	const symbol = token === "bitcoin" ? "BTC" : "ETH";
	const balance = data
		? isBitcoinBalance(data)
			? Number(data.balance)
			: Number(data.result)
		: 0;

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
		<main className="max-w-lg mx-auto px-4 sm:border sm:mt-4 sm:rounded-lg bg-white flex flex-col gap-8 pt-4 pb-8 h-screen sm:h-auto">
			<Header token={token} setToken={setToken} />

			{isLoading ? (
				<div className="flex flex-col gap-3 p-4 border border-dashed rounded-lg border-gray-300">
					<div className="w-[200px] bg-gray-200 animate-pulse h-[30px] rounded-md" />
					<div className="w-full max-w-[300px] bg-gray-200 animate-pulse h-[35px] rounded-md" />
					<div className="w-[200px] bg-gray-200 animate-pulse h-[30px] rounded-md" />
				</div>
			) : address ? (
				<div className="flex flex-col gap-2 border border-dashed p-4 rounded-lg border-gray-400">
					<div className="flex gap-1">
						<img src={logo} className="w-6 h-6" alt={symbol} />
						<p className="font-semibold text-gray-600">{address}</p>
					</div>
					<p className="text-4xl font-semibold">
						{balance} {symbol}
					</p>
					<p className="text-xs flex gap-1">Updates every 30 seconds</p>
				</div>
			) : (
				<p className="text-sm text-center p-2 py-4 bg-gray-50 border rounded-lg font-bold">
					Enter your {token[0].toUpperCase() + token.slice(1)} address and click
					"Get Balance" to start
				</p>
			)}

			<form className="flex flex-col gap-2" action={handleGetBalance}>
				<label htmlFor="wallet-address" className="text-sm font-semibold">
					Wallet Address
				</label>
				<Input
					id="wallet-address"
					name="address"
					placeholder="eg. 0x0000000000"
				/>
				{error && (
					<p className="text-red-500 text-sm text-left font-semibold">
						{error}
					</p>
				)}
				<Button type="submit" disabled={isLoading}>
					Get Balance
				</Button>
			</form>
		</main>
	);
}

export default Wallet;

function isBitcoinBalance(
	data: BitcoinBalance | EtherBalance,
): data is BitcoinBalance {
	return (data as BitcoinBalance).balance !== undefined;
}

function getWalletBalance(token: Token, address: string) {
	if (token === "bitcoin") {
		return fetch(
			`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`,
		).then((res) => res.json());
	}

	const ETHERSCAN_API_KEY = import.meta.env.ETHERSCAN_API_KEY;

	return fetch(
		`https://api.etherscan.io/v2/api?chainid=1&module=account&action=balance&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`,
	).then((res) => res.json());
}
