import "./App.css";
import { AuthContextProvider } from "./providers/AuthContextProvider";
import NotificationProvider from "./providers/NotificationProvider";
import AppRouter from "./routes/AppRouter";
import SocketManager from "./providers/SocketManager";

function App() {
  return (
    <AuthContextProvider>
      <NotificationProvider>
        <SocketManager>
          <AppRouter />
        </SocketManager>
      </NotificationProvider>
    </AuthContextProvider>
  );
}

export default App;
