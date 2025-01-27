import styles from './index.module.less';
import cls from 'classnames';
import styled from "styled-components";

export interface ButtonProps {
    text: string;
    size?: 'small' | 'normal' | 'large';
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

const StyledButton = styled.div`
    border-top-left-radius: ${props => props.tlbr};
    border-top-right-radius: ${props => props.trbl};
    border-bottom-right-radius: ${props => props.tlbr};
    border-bottom-left-radius: ${props => props.trbl};


    &:active {
        transform: scale(1.05);
    }
`;

export default function Button(props: ButtonProps) {
    const className = cls(styles.button, props.size ? styles[props.size] : styles.normal);
    return (
        <StyledButton style={props.style} className={cls(className,props.className)} tlbr={getTlBrRadius} trbl={getTrBlRadius} onClick={props.onClick}>
            {props.text}
        </StyledButton>
    );
}