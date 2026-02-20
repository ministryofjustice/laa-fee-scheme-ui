import { BrowserRouter } from "react-router-dom";
import { SchemeUIProvider } from "../context/SchemeUIContext";
import AppRoutes from "./routes";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SummaryPane from "../components/SummaryPane.jsx";

const App = () => {
  return (
    <SchemeUIProvider>
      <BrowserRouter>
        <Header />
        <div style={{ display: "flex", minHeight: "calc(100vh - 170px)" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <AppRoutes />
          </div>
          <SummaryPane />
        </div>
        <Footer />
      </BrowserRouter>
    </SchemeUIProvider>
  );
};

export default App;
