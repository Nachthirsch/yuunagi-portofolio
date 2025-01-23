import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Nav from "./components/nav";
import Portfolio from "./components/pages/v1/portofolio";
import Gallery from "./components/pages/v1/gallery";
import BlogList from "./components/pages/v1/BlogList";
import WritesPage from "./components/pages/v1/writes";
import PortfolioV2 from "./components/pages/v2/PortfolioV2";
import WritesV2 from "./components/pages/v2/WritesV2";

function App() {
  return (
    <HelmetProvider>
      <Router>
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
    </HelmetProvider>
  );
}

export default App;
