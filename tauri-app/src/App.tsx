import "./App.css";
import Home from "./pages/Home";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import Room from "./pages/Room";
// @ts-ignore
import GoEasy from "goeasy";
import {useSelector} from "react-redux";
import {useEffect} from "react";

function App() {
    const goEasy = GoEasy.getInstance({
        host: 'hangzhou.goeasy.io',
        appkey: 'BC-1eadd97ec64d4f6cb391e3bfc1d84d5f',
        modules: ['pubsub', 'im'],
    });
    const {name, id, avatar} = useSelector((state: any) => state.user.user);
    useEffect(() => {
        if (id) {
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
        }
    }, [id, name, avatar]);
    return (
        <HashRouter>
            <Routes>
                <Route path={'/start'} element={<Home/>}/>
                <Route path={`/room/:roomId`} element={<Room/>}/>
                <Route path={'*'} element={<Navigate to={'/start'} replace={true}/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
