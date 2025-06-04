import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import bitcoinLogo from "@/assets/btc.png";
import ethereumLogo from "@/assets/eth.png";
import type { TransactionPreview } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const sendSchema = z
	.object({
		token: z.enum(["bitcoin", "ethereum"]),
		address: z.string().min(26, {
			message: "Wallet address should be at least 26 characters long",
		}),
		amount: z.string().refine((val) => Number(val) >= 1e-18, {
			message: "Should be at least 0.0000000000000000001",
		}),
	})
	.refine(
		(data) =>
			data.token === "bitcoin"
				? /^(1|3)[a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(data.address) ||
					/^bc1[a-zA-HJ-NP-Z0-9]{39,59}$/.test(data.address)
				: /^0x[a-fA-F0-9]{40}$/.test(data.address),
		{
			message: "Invalid address for selected token",
			path: ["address"],
		},
	);

type SendFormValues = z.infer<typeof sendSchema>;

export default function BalanceForm({
	setTransactionPreview,
}: {
	setTransactionPreview: Dispatch<SetStateAction<TransactionPreview | null>>;
}) {
	const form = useForm<SendFormValues>({
		resolver: zodResolver(sendSchema),
		defaultValues: {
			token: "bitcoin",
			address: "",
			amount: "0",
		},
	});
	const { mutate, isPending } = useMutation({
		mutationFn: sendTransaction,
		onError(error) {
			toast.error(error.message);
		},
		onSuccess(data) {
			setTransactionPreview(data);
		},
	});

	const onSubmit = (data: z.infer<typeof sendSchema>) => {
		mutate(data);
	};

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-4"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="token"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Choose Token</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<SelectTrigger className="w-[150px]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="bitcoin">
										<span className="flex items-center gap-2">
											<img
												src={bitcoinLogo}
												alt="Bitcoin"
												className="w-5 h-5"
											/>
											Bitcoin
										</span>
									</SelectItem>
									<SelectItem value="ethereum">
										<span className="flex items-center gap-2">
											<img
												src={ethereumLogo}
												alt="Ethereum"
												className="w-5 h-5"
											/>
											Ethereum
										</span>
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Wallet Address</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="eg. 0x0000000000"
									autoComplete="off"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="number"
									step="any"
									min="0"
									placeholder="Enter amount"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">
					Send Token
					{isPending && <Loader2 className="animate-spin" />}
				</Button>
			</form>
		</Form>
	);
}

async function sendTransaction(transaction: z.infer<typeof sendSchema>) {
	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
	const response = await fetch(`${API_BASE_URL}/api/transaction/preview`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(transaction),
	});

	if (!response.ok) {
		console.error(response.json());
		throw new Error("A network error occurred, please try again later");
	}

	return response.json();
}
