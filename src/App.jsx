import "./App.css";
import { AuthContextProvider } from "./providers/AuthContextProvider";
import NotificationProvider from "./providers/NotificationProvider";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <AuthContextProvider>
      <NotificationProvider>
        <AppRouter />
      </NotificationProvider>
    </AuthContextProvider>
  );
}

export default App;
