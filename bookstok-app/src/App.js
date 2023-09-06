import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import SignIn from "./pages/signIn";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
