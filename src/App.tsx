import Wallet from "@/components/wallet";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Wallet />
		</QueryClientProvider>
	);
}

export default App;
