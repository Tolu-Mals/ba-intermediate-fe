import { RefreshCcw } from "lucide-react";
import btcLogo from "@/assets/btc.png";
import ethLogo from "@/assets/eth.png";
import type { BitcoinBalance, EtherBalance, Token } from "@/lib/types";
import { Button } from "./ui/button";

export default function Balance({
	address,
	token,
	data,
	isLoading,
	isRefetching,
	refreshBalance,
}: {
	address: string;
	token: Token;
	isLoading: boolean;
	isRefetching: boolean;
	refreshBalance: () => void;
	data?: BitcoinBalance | EtherBalance;
}) {
	const logo = token === "bitcoin" ? btcLogo : ethLogo;
	const symbol = token === "bitcoin" ? "BTC" : "ETH";
	console.log("balance: ", data);
	const balance = data
		? isBitcoinBalance(data)
			? getFormattedBalance("bitcoin", data.balance)
			: getFormattedBalance("ethereum", data.result)
		: 0;

	if (isLoading) {
		return (
			<div className="flex flex-col gap-3 p-4 border border-dashed rounded-lg border-gray-300">
				<div className="w-[200px] bg-gray-200 animate-pulse h-[30px] rounded-md" />
				<div className="w-full max-w-[300px] bg-gray-200 animate-pulse h-[35px] rounded-md" />
				<div className="w-[200px] bg-gray-200 animate-pulse h-[30px] rounded-md" />
			</div>
		);
	}

	function getFormattedAddress(address: string) {
		return `${address.slice(0, 5)}${token === "bitcoin" ? "-" : "..."}${address.slice(-5)}`;
	}

	if (address) {
		return (
			<div className="flex flex-col gap-2 border border-dashed p-4 rounded-lg border-gray-400">
				<div className="flex justify-between">
					<div className="flex gap-1">
						<img src={logo} className="w-6 h-6" alt={symbol} />
						<p className="font-semibold text-gray-600">
							{getFormattedAddress(address)}
						</p>
					</div>
					<Button
						type="button"
						variant="ghost"
						title="Refresh balance"
						data-is-loading={isRefetching}
						className="data-[is-loading=true]:animate-spin"
						onClick={() => {
							console.log("fetching");
							refreshBalance();
						}}
					>
						<RefreshCcw />
					</Button>
				</div>
				<p className="text-4xl font-semibold">
					{balance} {symbol}
				</p>
				<p className="text-xs flex gap-1">Updates every 30 seconds</p>
			</div>
		);
	}

	return (
		<p className="text-sm text-center p-2 py-4 bg-gray-50 border rounded-lg font-bold">
			Enter your {token[0].toUpperCase() + token.slice(1)} address and click
			"Get Balance" to start
		</p>
	);
}

function isBitcoinBalance(
	data: BitcoinBalance | EtherBalance,
): data is BitcoinBalance {
	return (data as BitcoinBalance).balance !== undefined;
}

function getFormattedBalance(token: Token, balance: string) {
	let value: number;
	if (token === "bitcoin") {
		// balance is bitoshi by default, convert to BTC
		value = Number(balance) / 1e8;
	} else {
		// balance is wei by default, convert to ETH
		value = Number(balance) / 1e18;
	}
	return value.toLocaleString(undefined, {
		maximumFractionDigits: 8,
		minimumFractionDigits: 2,
	});
}
