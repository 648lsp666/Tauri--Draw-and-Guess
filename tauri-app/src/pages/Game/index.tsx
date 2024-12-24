import { useSyncDemo } from '@tldraw/sync';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import styles from './index.module.less';

export default function Home({ roomId }: { roomId: string }) {
    const store = useSyncDemo({ roomId })
    return (
        <div className={styles.Tldraw}>
            <Tldraw store={store} deepLinks />
        </div>
    )
}
