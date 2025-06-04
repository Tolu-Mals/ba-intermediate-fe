import type { Dispatch } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Token } from "@/lib/types";
import type { SetStateAction } from "react";

export default function Header({
	token,
	setToken,
}: {
	token: Token;
	setToken: Dispatch<SetStateAction<Token>>;
}) {
	return (
		<div className="flex justify-between items-center">
			<p className="flex gap-2 text-md items-center font-bold">
				<WalletIcon />
				Wallet Balance
			</p>
			<Select
				value={token}
				onValueChange={(newToken: Token) => setToken(newToken)}
			>
				<SelectTrigger className="w-[120px]">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="bitcoin">Bitcoin</SelectItem>
					<SelectItem value="ethereum">Ethereum</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}

function WalletIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="url(#wallet-gradient)"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-wallet-minimal-icon lucide-wallet-minimal"
		>
			<title>Wallet</title>
			<defs>
				<linearGradient
					id="wallet-gradient"
					x1="0"
					y1="0"
					x2="24"
					y2="24"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0%" stopColor="#60a5fa" />
					<stop offset="100%" stopColor="#1e3a8a" />
				</linearGradient>
			</defs>
			<path d="M17 14h.01" />
			<path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14" />
		</svg>
	);
}
