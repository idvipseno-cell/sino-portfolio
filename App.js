import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Desktop from "@/components/Desktop";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Desktop />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
