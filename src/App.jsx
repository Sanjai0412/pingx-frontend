import "./App.css";
import { AuthContextProvider } from "./providers/AuthContextProvider";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}

export default App;
