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
import {useGoEasy} from "../../hooks/useGoeasy.tsx";
import Button from "../../components/button";
import GameBoardSVG from "@/assets/svgs/cardboard.svg?react";
import PencilSVG from "@/assets/svgs/pencil.svg?react";
import {Editor} from "@tldraw/tldraw";
// import {window} from "@tauri-apps/api";

export default function Room() {
    const roomId = useParams().roomId;
    const {name, id} = useSelector((state: any) => state.user.user);
    const {users} = useSelector((state: any) => state.user.room);
    const goEasy = useGoEasy();
    console.log(users);
    if (!id) {
        window.location.href = `/#/start`;
    }
    const dispatch = useDispatch();
    if (!roomId) {
        console.log('no roomId');
        return <div>wrong roomId</div>;
    }
    const store = useSyncDemo({roomId})
    const rRaf = useRef<any>(-1);


    useEffect(() => {
        // dispatch(setUser({name: USER_NAME, id: USER_ID, avatar: ''}));
        // dispatch(setUser({name: USER_NAME, id: Math.random().toString(36).substring(7), avatar: ''}));
    }, []);

    const onMount = (editor: Editor) => {
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
    }
    return (
        <div className={styles.room}>
            <div className={styles.roomState}>
                <div className={styles.roomStateTitle}>
                    <span>Ninja<GameBoardSVG/></span>
                    <span>Draw<PencilSVG/></span>
                </div>
                <h1>邀请你的忍者同伙一起！</h1>
                <div className={styles.buttonlist}>
                    <Button text={"复制url"} onClick={() => {
                        navigator.clipboard.writeText(window.location.href).then(() => {
                            alert('Copied to clipboard');
                        });
                    }}/>
                    <Button text={"二维码"} onClick={() => {
                        navigator.clipboard.writeText(window.location.href).then(() => {
                            alert('Copied to clipboard');
                        });
                    }}/>
                </div>
                <div className={styles.roomStateItem}>
                    <span>User Name:</span>
                    <span>{name}</span>
                </div>
                <div className={styles.roomStateItem}>
                    <div>Chat:</div>
                </div>
            </div>
            <Tldraw store={store}
                    className={styles.Tldraw}
                    onMount={onMount}
                    user={}
                    deepLinks
            />
        </div>
    )
}
