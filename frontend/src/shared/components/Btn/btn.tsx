import { HTMLAttributes, HtmlHTMLAttributes } from "react"
import styles from './btn.module.scss';

interface propsPainelBtn extends HtmlHTMLAttributes<HTMLDivElement> {
    imagem: string,
    tamanho: 'lg' | 'md',

}

export const PainelBtn = (props: propsPainelBtn) => {
    let sobreposicao = styles.corSobreposicao;
    let fundo = styles.fundo;
    let tamanho = styles[props.tamanho];

    return (
        <>
            <div 
            style={{backgroundImage: `url(images/${props.imagem})`}} 
            className={`${fundo} ${tamanho}`}>
                <div className={`${sobreposicao} ${tamanho}`}>
                    {props.children}
                </div>
            </div>
        </>
    )
}

interface configBtn extends HTMLAttributes<HTMLButtonElement>{}

export const ConfirmBtn = (props: configBtn) => {
    return(
        <span className={`${styles.btn} ${styles.confirm}`} onClick={props.onClick}>
            {props.children}
        </span>
    )
}

export const CancelBtn = (props: configBtn) => {
    return(
        <span className={`${styles.btn} ${styles.cancel}`} onClick={props.onClick}>
            {props.children}
        </span>
    )
}

interface selectBtn extends HTMLAttributes<HTMLButtonElement>{
    status: 'enable' | 'disable'
} 

export const SelectBtn = (props: selectBtn) => {
    return(
        <div className={styles.SCompContainer}>
            <span className={`${styles.selectContainer} ${styles[props.status]}`}>
                {props.children}
            </span>
        </div>
    )
}