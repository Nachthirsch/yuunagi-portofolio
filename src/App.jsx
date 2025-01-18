import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/loading";

import Nav from "./components/nav";
import Portfolio from "./components/pages/v1/portofolio";
import Gallery from "./components/pages/v1/gallery";
import BlogList from "./components/pages/v1/BlogList";
import WritesPage from "./components/pages/v1/writes";
import PortfolioV2 from "./components/pages/v2/PortfolioV2";
import WritesV2 from "./components/pages/v2/WritesV2";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Loading screen akan muncul selama 2 detik

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <LoadingScreen isLoading={isLoading} />
      <div className="select-none scrollbar-hide h-screen overflow-auto">
        <Nav />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/writes" element={<BlogList />} />
          <Route path="/writes/:slug" element={<WritesPage />} />
          <Route path="/v2" element={<PortfolioV2 />} />
          <Route path="/v2/writes" element={<WritesV2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
