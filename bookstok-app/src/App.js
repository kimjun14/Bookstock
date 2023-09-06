import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import SignIn from "./pages/signIn";
import SearchResult from "./pages/searchResult";
import Trading from "./pages/Trading";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/searchResult" element={<SearchResult />} />
          <Route path="/Trading" element={<Trading />} />
      </Routes>
    </Router>
  );
}

export default App;
