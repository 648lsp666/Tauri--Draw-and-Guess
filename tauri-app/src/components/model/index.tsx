import styles from './index.module.less';
import cls from 'classnames';
import styled from "styled-components";
import Button from "../button";
import {useCallback, useState} from "react";
import {TLUserPreferences} from "tldraw";
import ninjaBg from '../../assets/ninjaBg.png';
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/user.ts";

export interface ModelProps {
    // text: string;
    onClick?: () => void;
    style?: React.CSSProperties;
    className?: string;
}

const getTlBrRadius = () => {
    let random1 = Math.floor(Math.random() * 255);
    random1 = random1 < 200 ? 200 : random1;
    let random2 = Math.floor(Math.random() * 255);
    random2 = random2 > 30 ? 30 : random2;
    return `${random1}px ${random2}px`;
};

const getTrBlRadius = () => {
    let random1 = Math.floor(Math.random() * 255);
    random1 = random1 < 200 ? 200 : random1;
    let random2 = Math.floor(Math.random() * 255);
    random2 = random2 > 30 ? 30 : random2;
    console.log(random1, random2);
    return `${random2}px ${random1}px`;
};

const StyledModel = styled.div`
    border-top-left-radius: ${props => props.tlbr};
    border-top-right-radius: ${props => props.trbl};
    border-bottom-right-radius: ${props => props.tlbr};
    border-bottom-left-radius: ${props => props.trbl};
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    //cursor: pointer;
    transition: all 0.3s ease;
    background-image: url(${ninjaBg});
    aspect-ratio: 16/9;
    //background-clip: ;
    color: #fff;
    //height: 800px;
`;

export default function Model(props: ModelProps) {
    const [userName, setUserName] = useState('');
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }
    const handleClick = useCallback((name: string) => {
        const user = {
            id: `user-${Math.random().toString(36).substring(7)}`,
            name: name,
            color: `#${Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0')}`,
        } as TLUserPreferences;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setUser(user));
    },[userName]);
    return (
        <div className={styles.mask}>
            <StyledModel style={props.style} className={cls(styles.model, props.className)} >
                {/*<div className={styles.}></div>*/}
                <div>🥷🏾{Boolean(userName) ? (<><span style={{direction:'rtl'}}>🗡️</span><span>🗡️</span></>) : '⚔️'}🥷🏽</div>
                {Boolean(userName) ? `${userName}阁下，影子之中，欢迎！` : '敢问阁下尊姓大名？'}
                <input
                    type="text"
                    className={styles.input}
                    onChange={handleChange}
                    maxLength={8}
                />
                <Button
                    text={'确认'}
                    // disabled={!Boolean(userName)}
                    onClick={() => {
                        handleClick(userName);
                    }}
                />
            </StyledModel>
        </div>
    );
}