import { useState } from "react"
import { Opcao } from "../Opcao/opcao";

import styles from './Opcoes.module.scss';

interface Props {
    lista: string[],
    onChange: React.Dispatch<React.SetStateAction<string>>,
    rotulo: string
}

export const Opcoes = (props: Props) => {

    const [selecionado, setSelecionado] = useState('');

    return(
        <>
            <h5 className={styles.rotulo}>{props.rotulo}</h5>
            <div className={styles.container}>
                {props.lista.map((item, index) => (
                    <Opcao key={index} click={() => {setSelecionado(item); props.onChange(item)}} selecionado={item === selecionado} className={styles.containerChild}>{item}</Opcao>
                ))}
            </div>
        </>
    )
}