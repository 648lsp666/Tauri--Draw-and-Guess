import "./App.css";
import Home from "./pages/Home";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import Room from "./pages/Room";
import {useSelector} from "react-redux";
import {selectUser} from "./redux/user.ts";

function App() {
  const user = useSelector(selectUser);
    return (
      <HashRouter>
          <Routes>
              <Route path={'/start'} element={<Home />} />
              <Route path={`/room/:roomId`} element={<Room user={user}/>} />
              <Route path={'*'} element={<Navigate to={'/start'} replace={true} />} />
          </Routes>
      </HashRouter>
  );
}

export default App;
