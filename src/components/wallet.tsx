import { Button } from "./ui/button";
import { CheckCircle, ChevronLeft } from "lucide-react";
import { useState } from "react";
import Header from "@/components/header";
import BalanceForm from "./send-form";
import type { TransactionPreview } from "@/lib/types";

function Wallet() {
	const [transactionPreview, setTransactionPreview] =
		useState<TransactionPreview | null>(null);
	const [success, setSuccess] = useState(false);

	let mainComponent: React.ReactNode;

	if (!success) {
		mainComponent = transactionPreview && (
			<div className="flex flex-col gap-6 items-start">
				<Button
					variant="outline"
					type="button"
					onClick={() => setTransactionPreview(null)}
				>
					<ChevronLeft />
					Go back
				</Button>
				<div className="bg-gray-100 w-full rounded-lg p-4">
					<h2 className="font-bold mb-4">Transaction Preview</h2>

					<div className="mb-2">
						<p className="text-sm">
							Estimated Gas - {transactionPreview.estimatedGas}
						</p>
					</div>

					<div className="mb-2">
						<p className="text-sm">
							Total amount - {transactionPreview.totalAmount}
						</p>
					</div>

					<div>
						<p className="text-sm">Status - {transactionPreview.status}</p>
					</div>
				</div>

				<Button
					type="button"
					className="w-full"
					onClick={() => setSuccess(true)}
				>
					Submit Transaction
				</Button>
			</div>
		);
	} else {
		mainComponent = (
			<div className="rounded-lg flex flex-col items-center justify-center p-4 gap-4">
				<CheckCircle className="text-green-600" size="100" />
				<p className="text-3xl text-center font-bold">Transaction Successful</p>
				<Button
					onClick={() => {
						setTransactionPreview(null);
						setSuccess(false);
					}}
				>
					Go Home
				</Button>
			</div>
		);
	}

	return (
		<main className="max-w-lg mx-auto px-4 sm:border sm:mt-4 sm:rounded-lg bg-white flex flex-col gap-8 pt-4 pb-8 h-screen sm:h-auto">
			<Header />

			{mainComponent}

			{!transactionPreview && (
				<BalanceForm setTransactionPreview={setTransactionPreview} />
			)}
		</main>
	);
}

export default Wallet;
