import 'tldraw/tldraw.css';
import styles from './index.module.less';
import {useParams} from "react-router-dom";
import {InstancePresenceRecordType, Tldraw} from "tldraw";
import {useEffect, useRef} from "react";
// import {User} from "../../redux/user.ts";
import {useDispatch, useSelector} from "react-redux";
// import { useDispatch } from 'react-redux';
import {CURSOR_CHAT_MESSAGE} from "../../mock/GlobalMock.ts";
import {useSyncDemo} from "@tldraw/sync";
// import {window} from "@tauri-apps/api";

export default function Room() {
    const roomId = useParams().roomId;
    const {name, id} = useSelector((state: any) => state.user.user);
    // const [webSocket, sendMessage] = useWebSocket({
    //     url: 'ws://localhost:3000',  //这里放长链接
    //     onOpen: () => {
    //         //连接成功
    //         sendMessage({type: 'join', data: roomId});
    //     },
    //     onClose: () => {
    //         //连接关闭
    //         console.log('WebSocket disconnected');
    //     },
    //     onError: (event) => {
    //         //连接异常
    //         console.error('WebSocket error:', event);
    //     },
    //     onMessage: (message) => {
    //         //收到消息
    //         console.log('WebSocket received message:', message);
    //         dispatch(setRoom(message));
    //     },
    // });

    const dispatch = useDispatch();
    if (!roomId) {
        console.log('no roomId');
        return <div>wrong roomId</div>;
    }
    // useEffect(() => {
    //     const broadcast = (data: UserWithCursor) => {
    //         sendMessage({type: 'broadcast', data});
    //     };
    //     const throttleBroadcast = throttle(broadcast, 100);
    //     const handleMouseMove = (e: MouseEvent) => {
    //         throttleBroadcast({
    //             name: name,
    //             id: id,
    //             cursor: {
    //                 x: e.clientX,
    //                 y: e.clientY,
    //                 type: 'default',
    //                 rotation: 0,
    //             },
    //             chatMessage: '',
    //         });
    //     }
    //     document.addEventListener('mousemove', handleMouseMove);
    //
    //     return () => {
    //         // webSocket?.close();
    //         document.removeEventListener('mousemove', handleMouseMove);
    //     }
    // }, [roomId]);
    const store = useSyncDemo({roomId})
    const rRaf = useRef<any>(-1);

    useEffect(() => {
        // dispatch(setUser({name: USER_NAME, id: USER_ID, avatar: ''}));
        // dispatch(setUser({name: USER_NAME, id: Math.random().toString(36).substring(7), avatar: ''}));
    }, []);

    return (
        <div className={styles.room}>
            <div className={styles.roomState}>
                <div className={styles.roomStateTitle}>
                    <span>Room:</span>
                    <span>{roomId}</span>
                    <div className={styles.link} onClick={() => {
                        navigator.clipboard.writeText(window.location.href).then(() => {
                            alert('Copied to clipboard');
                        });
                    }}>
                        <h3>邀请朋友一起玩！</h3>
                        {window.location.href}
                        <h3>点击复制url</h3>
                    </div>
                </div>
                <div className={styles.roomStateItem}>
                    <span>User ID:</span>
                    <span>{id}</span>
                </div>
                <div className={styles.roomStateItem}>
                    <span>User Name:</span>
                    <span>{name}</span>
                </div>
            </div>
            <div className={styles.Tldraw}>
                <Tldraw store={store} onMount={(editor) => {
                    // [a]
                    const peerPresence = InstancePresenceRecordType.create({
                        id: InstancePresenceRecordType.createId(editor.store.id),
                        currentPageId: editor.getCurrentPageId(),
                        userId: id,
                        userName: name,
                        cursor: {x: 0, y: 0, type: 'default', rotation: 0},
                        chatMessage: CURSOR_CHAT_MESSAGE,
                    })

                    console.log(peerPresence);

                    editor.store.mergeRemoteChanges(() => {
                        editor.store.put([peerPresence])
                    })

                    // [b]
                    const raf = rRaf.current;
                    cancelAnimationFrame(raf);

                    if (true) {
                        function loop() {
                            let cursor = peerPresence.cursor
                            if (!cursor) return
                            let chatMessage = peerPresence.chatMessage

                            const now = Date.now()

                            cursor = {
                                ...cursor,
                                x: Math.random(),
                                y: 1 + Math.random(),
                            }

                            editor.store.mergeRemoteChanges(() => {
                                editor.store.put([
                                    {
                                        ...peerPresence,
                                        cursor,
                                        chatMessage,
                                        lastActivityTimestamp: now,
                                    },
                                ])
                            })

                            rRaf.current = editor.timers.requestAnimationFrame(loop)
                        }

                        rRaf.current = editor.timers.requestAnimationFrame(loop)
                    } else {
                        editor.store.mergeRemoteChanges(() => {
                            editor.store.put([{...peerPresence, lastActivityTimestamp: Date.now()}])
                        })
                        rRaf.current = editor.timers.setInterval(() => {
                            editor.store.mergeRemoteChanges(() => {
                                editor.store.put([{...peerPresence, lastActivityTimestamp: Date.now()}])
                            })
                        }, 1000)
                    }
                }} deepLinks/>


            </div>
        </div>
    )
}
