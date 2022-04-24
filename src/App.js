import Home from "./routes/home/home";
import Navigation from "./routes/home/navigation/navigation";
import Authentication from "./routes/authentication/authentication";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
