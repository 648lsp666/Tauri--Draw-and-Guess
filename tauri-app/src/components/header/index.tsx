import styles from './index.module.less';
import cls from 'classnames';
import styled from "styled-components";

export interface ButtonProps {
    text: string;
    onClick?: () => void;
}

const getTlBrRadius = () => {
    let random1 = Math.floor(Math.random() * 255);
    random1 = random1 < 225 ? 225 : random1;
    let random2 = Math.floor(Math.random() * 255);
    random2 = random2 > 15 ? 15 : Math.floor(Math.random() * 255);
    return `${random1}px ${random2}px`;
};

const getTrBlRadius = () => {
    let random1 = Math.floor(Math.random() * 255);
    random1 = random1 < 225 ? 225 : random1;
    let random2 = Math.floor(Math.random() * 255);
    random2 = random2 > 15 ? 15 : Math.floor(Math.random() * 255);
    return `${random2}px ${random1}px`;
};

const StyledButton = styled.div`
    border-top-left-radius: ${props => props.tlbr};
    border-top-right-radius: ${props => props.trbl};
    border-bottom-right-radius: ${props => props.tlbr};
    border-bottom-left-radius: ${props => props.trbl};
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;

    &:active {
        transform: scale(1.05);
    }
`;

export default function Button(props: ButtonProps) {
    return (
        <StyledButton className={cls(styles.button)} tlbr={getTlBrRadius} trbl={getTrBlRadius} onClick={props.onClick}>
            {props.text}
        </StyledButton>
    );
}