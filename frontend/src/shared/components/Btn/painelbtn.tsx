import { HtmlHTMLAttributes } from "react"
import styles from './painelBtn.module.scss';

interface propsPainelBtn extends HtmlHTMLAttributes<HTMLDivElement> {
    nomeImagem: string,
    tamanho: 'lg' | 'md',

}

export const PainelBtn = (props: propsPainelBtn) => {

    // tamanhos: lg/md

    let sobreposicao = styles.corSobreposicao;
    let fundo = styles.fundo;
    let tamanho = styles[props.tamanho];
    let bgImagem = styles[props.nomeImagem];
    return (
        <>
            <div  className={`${bgImagem} ${fundo} ${tamanho}`}>
                <div className={`${sobreposicao} ${tamanho}`}>
                    {props.children}
                </div>
            </div>
        </>
    )

}