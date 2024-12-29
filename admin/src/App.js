//Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import CopyrightBar from "./components/CopyrightBar";
//Routers
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <CopyrightBar />
    </div>
  );
};

export default App;
