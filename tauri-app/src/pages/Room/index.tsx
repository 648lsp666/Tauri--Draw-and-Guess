import 'tldraw/tldraw.css';
import styles from './index.module.less';
import {useParams} from "react-router-dom";
import {InstancePresenceRecordType, TLComponents, Tldraw, TLUserPreferences, useTldrawUser} from "tldraw";
import {useSyncDemo} from "@tldraw/sync";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import GoEasy from 'goeasy';
// import { useDispatch } from 'react-redux';
import {CURSOR_CHAT_MESSAGE, MOVING_CURSOR_SPEED, USER_ID, USER_NAME} from "../../mock/GlobalMock.ts";
import {selectRoom, setUser, Room, setRoom} from "../../redux/user.ts";
import {Emoji} from "emoji-picker-react";

const components: TLComponents = {
    PageMenu: null,
    MainMenu: null,
    ZoomMenu: null,
    ActionsMenu: null,
    ContextMenu: null,
    DebugMenu: null,
    // HelpMenu: null,
    KeyboardShortcutsDialog: null,
    SharePanel: sharePanel,
    TopPanel: TopPanel,
    // MainMenu: null,
    // NavigationPanel: null,
    // PageMenu: null,
    QuickActions: null,
    // StylePanel: null,
    // Toolbar: null,
    // ZoomMenu: null,
}

function TopPanel() {
    const room = useSelector(selectRoom);
    const [timer, setTimer] = useState(60);
    const startTimer = () => {
        const timerId = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }

    useEffect(startTimer, []);
    useEffect(() => {
        // console.log(user);
        if (timer === 0) {
            console.log('时间到');
            setTimer(60);
        }
        // console.log(room);
    }, [timer]);
    return (
        <>
            <h1>TopPanel, {timer}</h1>
            <div className={styles.progress}>
                <div className={styles.progressbar} style={{
                    width: `${timer * 100 / 60}%`,
                }}></div>
            </div>
        </>
    )
}

function sharePanel() {
    const room = useSelector(selectRoom);
    console.log(room);
    const renderAward = (idx: number) => {
        if (idx === 0) {
            return <Emoji unified={'1f947'} size={32} />;
        } else if (idx === 1) {
            return <Emoji unified={'1f948'} size={32} />;
        } else if (idx === 2) {
            return <Emoji unified={'1f949'} size={32}/>;
        }
    }
    return (
        <div className={styles.userlist}>
            {room.users.map((user, idx) =>(
                <div key={user.id} className={styles.user}>
                    <div className={styles.label} style={{color: user.color}}>
                        {renderAward(idx)}
                    </div>
                    <Emoji unified={'1f977'} size={54} />
                    <div className={styles.name} style={{color: user.color}}>{user.name}</div>
                </div>
            ))}
        </div>
    )
}

export default function RoomComponent({
    user,
                             }:
                                 {
                                        user: TLUserPreferences | null;
                                 }) {
    if (!user?.id) {
        console.log('no user');
        setTimeout(()=>{
            window.location.href = '/#/home';
        },1000);
        return <h1>哼，看来阁下还没有自己的名号，继续潜行吧。</h1>;
    }
    const roomId = useParams().roomId;
    const dispatch = useDispatch();
    if (!roomId) {
        console.log('no roomId');
        return <div>wrong roomId</div>;
    }
    // const rRaf = useRef<any>(-1);
    const [userPreferences, setUserPreferences] = useState<TLUserPreferences>(user);
    const store = useSyncDemo({ roomId, userInfo: userPreferences });
    const TLuser = useTldrawUser({ userPreferences, setUserPreferences });
    // const [isConnected, setIsConnected] = useState(false);
    let goEasy;

    useEffect(()=>{
        setTimeout(()=>{
            goEasy = GoEasy.getInstance({
                host: 'hangzhou.goeasy.io', //新加坡host：singapore.goeasy.io
                appkey: "BC-1eadd97ec64d4f6cb391e3bfc1d84d5f", //替换为您的应用appkey
                modules: ['pubsub']
            });
            goEasy.connect({
                id: user.id,
                data:{'nickname':user.name, 'color': user.color},
                onSuccess: function () { //连接成功
                    // setIsConnected(true);
                },
                onFailed: function (error) { //连接失败
                    console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
                }
            });
            goEasy.pubsub.subscribe({
                channel:roomId,
                presence:{
                    enable: true
                },
                onMessage: function (message) { //收到消息
                    console.log("Channel:" + message.channel + " content:" + message.content);
                },
                onSuccess: function () {
                    // console.log("Channel订阅成功。");
                    // setIsConnected(true);
                },
                onFailed: function (error) {
                    console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
                }
            })
            goEasy.pubsub.publish({
                channel: roomId,//替换为您自己的channel
                message: '123',
                onSuccess:function(){
                    console.log("消息发布成功。");
                },
                onFailed: function (error) {
                    console.log("消息发送失败，错误编码："+error.code+" 错误信息："+error.content);
                }
            });
            goEasy.pubsub.hereNow({
                channel: roomId,
                limit: 20, //可选项，定义返回的最新上线成员列表的数量，默认为10，最多支持返回最新上线的100个成员
                onSuccess: function (response) {  //获取成功
                    alert("hereNow response: " + JSON.stringify(response));//json格式的response
                    const roomPresence: Room = {
                        id: roomId,
                        users: response.content.members.map(member => ({
                            id: member.id,
                            name: member.data.nickname,
                            color: member.data.color,
                        } as TLUserPreferences)),
                    }
                    dispatch(setRoom(roomPresence));
                    console.log('room', roomId);
                },
                onFailed: function (error) { //获取失败
                    console.log("Failed to obtain online clients, code:"+error.code+ ",error:"+error.content);
                }
            });

        },0);
        return () => {

            }
    },[]);



    return (
        <div className={styles.room}>
            <div className={styles.Tldraw}>
                <Tldraw store={store} components={components} user={TLuser}/>
            </div>
        </div>
    )
}
