export default function Header() {
	return (
		<div className="flex justify-between items-center">
			<p className="flex gap-2 text-md items-center font-bold">
				<SendIcon />
				Wallet Send
			</p>
		</div>
	);
}

function SendIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="url(#blue-gradient)"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-send-icon lucide-send"
		>
			<title>Send</title>
			<defs>
				<linearGradient
					id="blue-gradient"
					x1="0"
					y1="0"
					x2="24"
					y2="24"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#3b82f6" /> {/* blue-500 */}
					<stop offset="1" stopColor="#06b6d4" /> {/* cyan-500 */}
				</linearGradient>
			</defs>
			<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
			<path d="m21.854 2.147-10.94 10.939" />
		</svg>
	);
}
