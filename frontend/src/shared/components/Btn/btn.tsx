import { HTMLAttributes, HtmlHTMLAttributes } from "react"
import styles from './btn.module.scss';

interface propsPainelBtn extends HtmlHTMLAttributes<HTMLButtonElement> {
    imagem: string,
    tamanho: 'lg' | 'md',
}

export const PainelBtn = (props: propsPainelBtn) => {
    let sobreposicao = styles.corSobreposicao;
    let fundo = styles.fundo;
    let tamanho = styles[props.tamanho];

    return (
        <>
            <button style={{ backgroundImage: `url(${props.imagem})` }} className={`${fundo} ${tamanho}`} onClick={props.onClick}>
                {props.children}
            </button>
        </>
    )
}

interface configBtn extends HTMLAttributes<HTMLButtonElement> { }

export const ConfirmBtn = (props: configBtn) => {
    return (
        <span className={`${styles.btn} ${styles.confirm}`} onClick={props.onClick}>
            {props.children}
        </span>
    )
}

export const CancelBtn = (props: configBtn) => {
    return (
        <span className={`${styles.btn} ${styles.cancel}`} onClick={props.onClick}>
            {props.children}
        </span>
    )
}

interface selectBtn extends HTMLAttributes<HTMLButtonElement> {
    status: 'enable' | 'disable'
}

export const SelectBtn = (props: selectBtn) => {
    return (
        <div className={styles.SCompContainer}>
            <span className={`${styles.selectContainer} ${styles[props.status]}`}>
                {props.children}
            </span>
        </div>
    )
}