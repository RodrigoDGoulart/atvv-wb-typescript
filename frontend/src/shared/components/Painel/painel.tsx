import { HTMLAttributes } from "react"
import styles from './painel.module.scss';

interface configPainelItem extends HTMLAttributes<HTMLButtonElement> {
    titulo: string,
    subtitulo: string,
    imagem: string
}

export const PainelItem = (props: configPainelItem) => {
    return (
        <div className={`${styles.fundo} ${styles.container}`}>
            <div style={{
                backgroundImage: `url(images/${props.imagem})`
            }} className={styles.foto} />
            <div className={styles.conteudo}>
                <p>{props.titulo}</p>
                <p>{props.subtitulo}</p>
            </div>
        </div>
    )
}

interface configPainelRaking extends configPainelItem {
    ranking: number
}

export const PainelRankingItem = (props: configPainelRaking) => {
    let cor: string;

    switch (props.ranking) {
        case 1:
            cor = '#FAE100';
            break;
        case 2:
            cor = '#6A6A6A';
            break;
        case 3:
            cor = '#FA9600';
            break;
        default:
            cor = '#F2F2F2';
    }

    return (
        <div className={styles.fundoRanking}>
            <div className={`${styles.fundo} ${styles.ranking}`} style={{
                backgroundColor: cor,
                color: props.ranking < 4 ? '#FFFFFF' : '#54265C'
            }}>
                {props.ranking}°
            </div>
            <PainelItem imagem={props.imagem} titulo={props.titulo} subtitulo={props.subtitulo} />
        </div>
    )
}

interface configPainelBtn extends configPainelItem {
    onEdit: Function,
    onDelete: Function
}

export const PainelItemBtn = (props: configPainelBtn) => {
    return (
        <div className={`${styles.fundo} ${styles.container}`}>
            <div style={{
                backgroundImage: `url(images/${props.imagem})`
            }} className={styles.foto} />
            <div className={styles.conteudo}>
                <p>{props.titulo}</p>
                <p>{props.subtitulo}</p>
            </div>
            <div className={styles.buttons}>
                <span className={`material-icons ${styles.edit}`} onClick={e => props.onEdit()}>
                    edit
                </span>
                <span className={`material-icons ${styles.delete}`} onClick={e => props.onDelete()}>
                    delete
                </span>
            </div>
        </div>
    )
}