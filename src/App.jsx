import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/loading";

import Portfolio from "./components/pages/portofolio";
import Nav from "./components/nav";

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
      <div className="select-none">
        <Nav />
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
