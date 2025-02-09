import styles from './index.module.less';
import cls from 'classnames';
import Button from "../button";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {setUser} from "../../redux/user.ts";
import {useNavigate} from "react-router-dom";

interface ModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function Modal() {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const navigator = useNavigate();
    return (
        <div className={styles.mask}>
            <div className={cls(styles.modal, styles.handdraw)}>
                <div className={cls(styles.modalContent, styles.modalContentCenter)}>
                    <div className={styles.modalTitle}>欢迎！</div>
                    <div className={styles.modalSubtitle}>为你的画笔取个名字吧~</div>
                    <input
                        type="text"
                        className={cls(styles.modalInput, styles.handdraw)}
                        placeholder={"set a Name"}
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />
                    <Button text={"开始绘画！"} onClick={() => {
                        const id = `peer-${Math.random().toString(36).substring(4)}`;
                        dispatch(setUser({
                            name: userName,
                            id: id,
                            avatar: ''
                        }));
                        localStorage.setItem('user', userName);
                        localStorage.setItem('id', id);
                        window.history.back();
                    }}></Button>
                </div>
            </div>
        </div>
    );
}