import styles from './index.module.less';
import cls from 'classnames';
import styled from "styled-components";
import React from "react";

export interface ButtonProps {
    text: string;
    size?: 'small' | 'normal' | 'large';
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
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

const StyledButton = styled.div`
    &:active {
        transform: scale(1.05);
    }
`;

export default function Button(props: ButtonProps) {
    const className = cls(styles.button, props.size ? styles[props.size] : styles.normal, styles.handdraw, props.className);
    return (
        <StyledButton style={props.style} className={cls(className,props.className)} tlbr={getTlBrRadius} trbl={getTrBlRadius} onClick={props.onClick}>
            {props.text}
        </StyledButton>
    );
}