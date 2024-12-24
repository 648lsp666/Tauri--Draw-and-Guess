// import { useSyncDemo } from '@tldraw/sync';
// import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import styles from './index.module.less';

export default function Room() {
    // let roomId = localStorage.getItem('roomId');
    // if (!roomId) {
    //     roomId = Math.random().toString(36).substring(7);
    //     localStorage.setItem('roomId', roomId);
    // }
    // const store = useSyncDemo({ roomId })
    return (
        <div className={styles.room}>
            
        </div>
    )
}
