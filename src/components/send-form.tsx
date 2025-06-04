import { useState } from "react";
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

const sendSchema = z.object({
	token: z.enum(["bitcoin", "ethereum"]),
	address: z.string().min(26, { message: "Wallet address should be at least 26 characters long"}),
	amount: z.string().refine((val) => Number(val) >= 1e-18, { message: "Should be at least 0.0000000000000000001"}),
}).refine((data) => data.token === "bitcoin" ? (
                    /^(1|3)[a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(data.address) ||
                    /^bc1[a-zA-HJ-NP-Z0-9]{39,59}$/.test(data.address)
                ) : /^0x[a-fA-F0-9]{40}$/.test(data.address), {
					message: "Invalid address for selected token",
					path: ["address"]
				}
);

type SendFormValues = z.infer<typeof sendSchema>;

export default function BalanceForm() {
	const form = useForm<SendFormValues>({
		resolver: zodResolver(sendSchema),
		defaultValues: {
			token: "bitcoin",
			address: "",
			amount: "0",
		},
	});

	const onSubmit = (data: SendFormValues) => {
		setTransaction({ estimatedFee: "0.0001BTC", status: 'preview', totalAmount: "0.5001BTC" })
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
							<Select
								onValueChange={field.onChange}
								value={field.value}
							>
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
				<Button type="submit" >
					Send Token
				</Button>
			</form>
		</Form>
	);
}


// async function getWalletBalance(token: Token, address: string) {
// 	if (token === "bitcoin") {
// 		const response = await fetch(
// 			`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`,
// 		);

// 		if (!response.ok) {
// 			console.error(response.json());
// 			throw new Error("There was a network error, please try again later");
// 		}

// 		return response.json();
// 	}

// 	const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

// 	const response = await fetch(
// 		`https://api.etherscan.io/v2/api?chainid=1&module=account&action=balance&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`,
// 	);

// 	const data: EtherscanResponse = await response.json();

// 	if (data.message === "NOTOK") {
// 		console.error(data.result);
// 		throw new Error("There was a network error, please try again later");
// 	}

// 	return data;
// }