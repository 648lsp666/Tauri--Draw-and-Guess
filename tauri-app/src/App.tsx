import "./App.css";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "./redux/user.ts";
import RoomComponent from "./pages/Room";
import HomeComponent from "./pages/Home";

function App() {
  const user = useSelector(selectUser);
    return (
      <HashRouter>
          <Routes>
              <Route path={'/start'} element={<HomeComponent />} />
              <Route path={`/room/:roomId`} element={<RoomComponent user={user}/>} />
              <Route path={'*'} element={<Navigate to={'/start'} replace={true} />} />
          </Routes>
      </HashRouter>
  );
}

export default App;
