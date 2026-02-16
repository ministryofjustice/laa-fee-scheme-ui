import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "../context/AppContext";
import AppRoutes from "./routes";
import Header from "../components/Header"
import Footer from "../components/Footer"

const App = () => {
  return (
    <AppProvider>
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
    </AppProvider>
  );
}

export default App;
