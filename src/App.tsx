import btcLogo from "@/assets/btc.png";
import ethLogo from "@/assets/eth.png";
import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import type { WalletState } from "./lib/types";
import Header from "./components/header";

function App() {
	const [state, setState] = useState<WalletState>({
		token: "bitcoin",
		address: "0x0000000000000000",
		balance: 0,
	});

	const logo = state.token === "bitcoin" ? btcLogo : ethLogo;
	const symbol = state.token === "bitcoin" ? "BTC" : "ETH";

	const handleGetBalance = (data: FormData) => {
		const address = data.get("address");
	};

	return (
		<main className="max-w-lg mx-auto px-4 sm:border sm:mt-4 sm:rounded-lg bg-white flex flex-col gap-8 pt-4 pb-8 h-screen sm:h-auto">
			<Header token={state.token} setState={setState} />

			<div className="flex flex-col gap-2 border border-dashed p-4 rounded-lg border-gray-400">
				<div className="flex gap-1">
					<img src={logo} className="w-6 h-6" alt={symbol} />
					<p className="font-semibold text-gray-600">0x000...000</p>
				</div>
				<p className="text-4xl font-semibold">0.00000 {symbol}</p>
				<p className="text-xs flex gap-1">Updates every 30 seconds</p>
			</div>

			<form className="flex flex-col gap-2" action={handleGetBalance}>
				<label htmlFor="wallet-address" className="text-sm font-semibold">
					Wallet Address
				</label>
				<Input
					id="wallet-address"
					name="address"
					placeholder="eg. 0x0000000000"
				/>
				<Button type="submit">Get Balance</Button>
			</form>
		</main>
	);
}

export default App;
