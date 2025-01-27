import 'tldraw/tldraw.css';
import styles from './index.module.less';
import Button from "../../components/button";
import Footer from "../../components/footer";
import {Tldraw, TLShapeId, useEditor} from "tldraw";
import {Editor} from "@tldraw/tldraw";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Room} from "../../model/room.ts";
import Model from "../../components/model";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, setUser} from "../../redux/user.ts";

export default function HomeComponent() {
    // const [titleIds,setTitleIds] = useState<TLShapeId[]>([]);
    const navigator = useNavigate();
    const localRoom = localStorage.getItem('room');
    const TLuserInfo = useSelector(selectUser);
    const dispatch = useDispatch();
    useEffect(() => {
        const localTLuserInfo =  localStorage.getItem('user');
        if (localTLuserInfo) {
            dispatch(setUser(JSON.parse(localTLuserInfo)));
        }
    }, [TLuserInfo]);
    const handleMount = (editor:Editor) => {
        editor.setCurrentTool('draw');
    }
    console.log('TLuserInfo',TLuserInfo);

    return !(TLuserInfo.name) ? (
        <Model />
        ) : (
        <div className={styles.home}>
            <Tldraw
                onMount={handleMount}
                className={styles.bg}
                hideUi
                // cameraOptions={{ isLocked: true }}
            />
            <h1 style={{zIndex:1,fontSize:'44px',fontWeight:'800'}}>🥷绘影猜谜</h1>
            <h2 style={{zIndex:1, fontSize:'32px'}}>{TLuserInfo.name}阁下,尝试施展你的绘画之术！</h2>
            <div className={styles.buttonlist}>
            {Boolean(localRoom && localRoom.length) && <Button text={'重返聚会'} onClick={() => {
                const curRoom = JSON.parse(localRoom);
                const url = new URL(`/#/room/${curRoom.id}`, window.location.href);
                // const url = new URL(`/#/room/${randomId}`, window.location.href);
                window.location.href = url.toString();
            }} className={styles.backToParty}></Button>}
            </div>
            <div className={styles.buttonlist}>
                <Button text={'潜入聚会'} onClick={()=>{
                    // GlobalEditor.deleteShapes(titleIds);
                    //唤起一个input框，输入房间号
                }}></Button>
                <Button text={'策划聚会'} onClick={()=>{
                    const randomId = Math.random().toString(36).substring(7);
                    const newroom: Room = {
                        id: randomId,
                        // todo
                        members: []
                    }
                    localStorage.setItem('room', JSON.stringify(newroom));
                    const url = new URL(`/#/room/${randomId}`, window.location.href);
                    window.location.href = url.toString();
                    // GlobalEditor.deleteShapes(titleIds);
                }}></Button>
            </div>
            <Footer />
        </div>
    )

}
