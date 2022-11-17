import { HtmlHTMLAttributes } from "react"
import styles from './painelBtn.module.scss';

interface propsPainelBtn extends HtmlHTMLAttributes<HTMLDivElement> {
    image: string,
    tamanho: 'lg' | 'md'
}

export const PainelBtn = (props: propsPainelBtn) => {

    // tamanhos: lg/md

    let tamanho = styles[props.tamanho];
    return (
        <>
            <div className={`${styles.fundo} ${tamanho}`}>
                <div className={`${styles.corSobreposicao} ${tamanho}`}>
                    {props.children}
                </div>
            </div>
        </>
    )

}