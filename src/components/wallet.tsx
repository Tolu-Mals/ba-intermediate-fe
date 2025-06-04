import { useEffect, useState } from "react";
import type {
	BitcoinBalance,
	EtherBalance,
	EtherscanResponse,
	Token,
} from "@/lib/types";
import Header from "@/components/header";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import BalanceForm from "./balance-form";
import Balance from "./balance";

function Wallet() {
	const queryClient = useQueryClient();
	const [token, setToken] = useState<Token>("bitcoin");
	const [address, setAddress] = useState<string>("");
	const { data, isLoading, error, isRefetching, status } = useQuery<
		BitcoinBalance | EtherBalance
	>({
		queryKey: [token, address],
		queryFn: () => getWalletBalance(token, address),
		refetchInterval: 30_000,
		enabled: Boolean(address),
	});

	console.log(status);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Need to reset address if the token type changes, since address is specific to token type
	useEffect(() => {
		setAddress("");
	}, [token]);

	const refreshBalance = () => {
		queryClient.invalidateQueries({ queryKey: [token, address] });
	};

	return (
		<main className="max-w-lg mx-auto px-4 sm:border sm:mt-4 sm:rounded-lg bg-white flex flex-col gap-8 pt-4 pb-8 h-screen sm:h-auto">
			<Header token={token} setToken={setToken} />

			{!error && (
				<Balance
					data={data}
					token={token}
					address={address}
					isLoading={isLoading}
					isRefetching={isRefetching}
					refreshBalance={refreshBalance}
				/>
			)}

			<BalanceForm
				networkError={error?.message}
				token={token}
				setAddress={setAddress}
				isLoading={isLoading}
			/>
		</main>
	);
}

export default Wallet;

async function getWalletBalance(token: Token, address: string) {
	if (token === "bitcoin") {
		const response = await fetch(
			`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`,
		);

		if (!response.ok) {
			console.error(response.json());
			throw new Error("There was a network error, please try again later");
		}

		return response.json();
	}

	const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

	const response = await fetch(
		`https://api.etherscan.io/v2/api?chainid=1&module=account&action=balance&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`,
	);

	const data: EtherscanResponse = await response.json();

	if (data.message === "NOTOK") {
		console.error(data.result);
		throw new Error("There was a network error, please try again later");
	}

	return data;
}
