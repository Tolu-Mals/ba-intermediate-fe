import Header from "@/components/header";
import BalanceForm from "./send-form";

function Wallet() {

	return (
		<main className="max-w-lg mx-auto px-4 sm:border sm:mt-4 sm:rounded-lg bg-white flex flex-col gap-8 pt-4 pb-8 h-screen sm:h-auto">
			<Header />

			{/* {!error && (
				<Balance
					data={data}
					token={token}
					address={address}
					isLoading={isLoading}
					isRefetching={isRefetching}
					refreshBalance={refreshBalance}
				/>
			)} */}

			<BalanceForm />
		</main>
	);
}

export default Wallet;
