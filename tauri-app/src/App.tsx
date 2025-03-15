import "./App.css";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {selectUser} from "./redux/user.ts";
import RoomComponent from "./pages/Room";
import HomeComponent from "./pages/Home";
import Room from "./pages/Room";
// @ts-ignore
import GoEasy from "goeasy";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {GoEasyProvider, useGoEasy} from "./hooks/useGoeasy.tsx";
import {setUser} from "./redux/user.ts";
import Modal from "./components/modal";

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
    // const [goEasyInstance, setGoEasyInstance] = useState<GoEasy.IGoEasy | null>(null);\
    const goEasy = useGoEasy();
    const dispatch = useDispatch();
    if (localStorage.getItem('user') && localStorage.getItem('id')) {
        const name = localStorage.getItem('user');
        const id = localStorage.getItem('id');
        dispatch(setUser({
            name: name,
            id: id,
            avatar: ''
        }));
    }
    const {name, id, avatar} = useSelector((state: any) => state.user.user);
    useEffect(() => {
        if (id && goEasy) {
            goEasy.connect({
                id: id,
                data: {"nickname": name, "avatar": avatar},
                onSuccess: function () {
                    console.log("GoEasy connect successfully.") //连接成功
                },
                onFailed: function (error: any) {
                    console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
                },
                onProgress: function (attempts: any) {
                    console.log("GoEasy is connecting", attempts);
                }
            });
            // window.goeasy = goEasy;
        }
    }, [id, name, avatar]);
    return (
        <GoEasyProvider>
            {!name && <Modal/>}
            <HashRouter>
                <Routes>
                    <Route path={'/start'} element={<Home/>}/>
                    <Route path={`/room/:roomId`} element={<Room/>}/>
                    <Route path={'*'} element={<Navigate to={'/start'} replace={true}/>}/>
                </Routes>
            </HashRouter>
        </GoEasyProvider>
    );
}

export default App;
