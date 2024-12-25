import 'tldraw/tldraw.css';
import styles from './index.module.less';
import {useParams} from "react-router-dom";
import {InstancePresenceRecordType, Tldraw} from "tldraw";
import {useSyncDemo} from "@tldraw/sync";
import {useEffect, useRef, useState} from "react";
// import {User} from "../../redux/user.ts";
import {useDispatch, useSelector} from "react-redux";
// import { useDispatch } from 'react-redux';
import {CURSOR_CHAT_MESSAGE, MOVING_CURSOR_SPEED, USER_ID, USER_NAME} from "../../mock/GlobalMock.ts";
import {setUser, UserWithCursor} from "../../redux/user.ts";
import {throttle} from "@tldraw/tldraw";
// import {window} from "@tauri-apps/api";

export default function Room() {
    // let roomId = localStorage.getItem('roomId');
    // if (!roomId) {
    //     roomId = Math.random().toString(36).substring(7);
    //     localStorage.setItem('roomId', roomId);
    // }
    // const store = useSyncDemo({ roomId })
    const roomId = useParams().roomId;
    const {name, id} = useSelector((state: any) => state.user);
    // const room = useSelector((state: any) => state.room);
    // console.log(room);

    const dispatch = useDispatch();
    if (!roomId) {
        console.log('no roomId');
        return <div>wrong roomId</div>;
    }
    useEffect(() => {
        try {
            const socket = new WebSocket('ws://localhost:3000');
            socket.onopen = () => {
                console.log('socket opened');
                socket.send(JSON.stringify({ type: 'join', roomId }));
            }
            socket.onclose = () => {
                console.log('socket closed');
            }
            socket.onmessage = (event) => {
                // console.log(event.data);
            }
            const broadcast = (data: UserWithCursor) => {
                socket.send(JSON.stringify({ type: 'broadcast', data }));
            };
            const throttleBroadcast = throttle(broadcast, 100);
            const handleMouseMove = (e: MouseEvent) => {
                throttleBroadcast({
                    name: USER_NAME,
                    id: USER_ID,
                    cursor: {
                        x: e.clientX,
                        y: e.clientY,
                        type: 'default',
                        rotation: 0,
                    },
                    chatMessage: '',
                });
            }
            document.addEventListener('mousemove',handleMouseMove);

            return () => {
                socket.send(JSON.stringify({ type: 'leave', roomId }));
                document.removeEventListener('mousemove', handleMouseMove);
                socket.close();
            }
        }
        catch (e) {
            console.log(e);
        }
    }, [roomId]);
    const store = useSyncDemo({ roomId })
    const rRaf = useRef<any>(-1);

    useEffect(()=>{
        // dispatch(setUser({name: USER_NAME, id: USER_ID, avatar: ''}));
        dispatch(setUser({name: USER_NAME, id: Math.random().toString(36).substring(7), avatar: ''}));
    },[]);

    return (
        <div className={styles.room}>
            <div className={styles.Tldraw}>
                <Tldraw store={store} onMount={(editor) => {
                    // [a]
                    const peerPresence = InstancePresenceRecordType.create({
                        id: InstancePresenceRecordType.createId(editor.store.id),
                        currentPageId: editor.getCurrentPageId(),
                        userId: `peer-${id}`,
                        userName: name ? name : USER_NAME,
                        cursor: { x: 0, y: 0, type: 'default', rotation: 0 },
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
                                x: Math.random() ,
                                y: 1 + Math.random(),
                            }

                            if (CURSOR_CHAT_MESSAGE) {
                                const k = 1000
                                const t = (now % (k * 3)) / k
                                chatMessage =
                                    t < 1
                                        ? ''
                                        : t > 2
                                            ? CURSOR_CHAT_MESSAGE
                                            : CURSOR_CHAT_MESSAGE.slice(
                                                0,
                                                Math.ceil((t - 1) * CURSOR_CHAT_MESSAGE.length)
                                            )
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
                            editor.store.put([{ ...peerPresence, lastActivityTimestamp: Date.now() }])
                        })
                        rRaf.current = editor.timers.setInterval(() => {
                            editor.store.mergeRemoteChanges(() => {
                                editor.store.put([{ ...peerPresence, lastActivityTimestamp: Date.now() }])
                            })
                        }, 1000)
                    }
                }} deepLinks />
            </div>
        </div>
    )
}
