import "./App.css";
import Home from "./pages/Home";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import Room from "./pages/Room";

function App() {
  return (
      <HashRouter>
          <Routes>
              <Route path={'/start'} element={<Home />} />
              <Route path={'/room'} element={<Room />} />
              <Route path={'*'} element={<Navigate to={'/start'} replace={true} />} />
          </Routes>
      </HashRouter>
  );
}

export default App;
