import Wallet from "@/components/wallet";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Wallet />
			<ToastContainer />
		</QueryClientProvider>
	);
}

export default App;
