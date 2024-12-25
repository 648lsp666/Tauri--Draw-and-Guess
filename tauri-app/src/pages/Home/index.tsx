import 'tldraw/tldraw.css';
import styles from './index.module.less';
import Button from "../../components/button";
import Footer from "../../components/footer";
import {Tldraw, TLShapeId, useEditor} from "tldraw";
import {Editor} from "@tldraw/tldraw";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const [titleIds,setTitleIds] = useState<TLShapeId[]>([]);
    const navigator = useNavigate();
    const handleMount = (editor:Editor) => {
        editor.createShape({
            type: 'text',
            x: 200,
            y: 200,
            props: {
                text: '       Draw & Guess\nTry to draw something!',
                size: 'xl',
            },
        })
        editor.selectAll();
        editor.zoomToSelection({
            animation: { duration: 0 },
        });
        // editor.deselect();
        console.log(editor.getSelectedShapeIds());
        setTitleIds(editor.getSelectedShapeIds());
        editor.setCurrentTool('draw');
    }

    return (
        <div className={styles.home}>
            <Tldraw
                onMount={handleMount}
                className={styles.bg}
                hideUi
                // cameraOptions={{ isLocked: true }}
            />
            <div className={styles.buttonlist}>
                <Button text={'加入派对'} onClick={()=>{
                    // GlobalEditor.deleteShapes(titleIds);
                }}></Button>
                <Button text={'创建派对'} onClick={()=>{
                    const randomId = Math.random().toString(36).substring(7);
                    localStorage.setItem('roomId', randomId);
                    const url = new URL(`/#/room/${randomId}`, window.location.href);
                    window.location.href = url.toString();
                    // GlobalEditor.deleteShapes(titleIds);
                }}></Button>
            </div>
            <Footer />
        </div>
    )
}
