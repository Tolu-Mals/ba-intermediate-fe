import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import Header from "@/components/header";
import BalanceForm from "./send-form";
import type { Transaction } from "@/lib/types";

function Wallet() {
	const [transaction, setTransaction] = useState<Transaction | null>(null);
	return (
		<main className="max-w-lg mx-auto px-4 sm:border sm:mt-4 sm:rounded-lg bg-white flex flex-col gap-8 pt-4 pb-8 h-screen sm:h-auto">
			<Header />

			{transaction && (
				<div className="flex flex-col gap-6 items-start">
					<Button
						variant="outline"
						type="button"
						onClick={() => setTransaction(null)}
					>
						<ChevronLeft />
						Go back
					</Button>
					<div className="bg-gray-100 w-full rounded-lg p-4">
						<h2 className="font-bold mb-4">Transaction Preview</h2>

						<div className="mb-2">
							<p className="text-sm">Estimated Fee - 0.0001BTC</p>
						</div>

						<div>
							<p className="text-sm">Total amount - 0.50001BTC</p>
						</div>
					</div>

					<Button className="w-full">Submit Transaction</Button>
				</div>
			)}

			{!transaction && <BalanceForm setTransaction={setTransaction} />}
		</main>
	);
}

export default Wallet;
