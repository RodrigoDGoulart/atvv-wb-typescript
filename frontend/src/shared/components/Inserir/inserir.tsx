import { HTMLAttributes } from 'react';
import styles from './inserir.module.scss';

interface configInserir extends HTMLAttributes<HTMLInputElement> { }

export const Inserir = (props: configInserir) => {

    return (
        <input className={`${styles.input} ${styles.lg}`} placeholder={props.placeholder} onChange={props.onChange} />
    )
}

interface configInserirRotulo extends configInserir {
    rotulo: string
}

export const InserirComRotulo = (props: configInserirRotulo) => {
    return (
        <label>
            <h5 className={styles.rotulo}>{props.rotulo}</h5>
            <Inserir placeholder={props.placeholder} onChange={props.onChange} />
        </label>
    )
}

export const Pesquisar = (props: configInserir) => {
    return (
        <span className={`${styles.input} ${styles.align}`}>
            <span className={`material-icons`}>
                search
            </span>
            <input placeholder={props.placeholder} className={styles.pesquisa} />
        </span>
    )
}