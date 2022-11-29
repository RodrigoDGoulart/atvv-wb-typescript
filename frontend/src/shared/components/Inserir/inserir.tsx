import { faCamera, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, HTMLAttributes, SetStateAction, useState } from 'react';
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

interface configPesquisa extends configInserir {
    setPesquisa: Dispatch<SetStateAction<string>>
}

export const Pesquisar = (props: configPesquisa) => {
    return (
        <span className={`${styles.input} ${styles.align}`}>
            <FontAwesomeIcon icon={faSearch} />
            <input placeholder={props.placeholder} className={styles.pesquisa} onChange={e => props.setPesquisa(e.target.value)} />
        </span>
    )
}

import img from '../../images/sem-foto.png';
interface configInserirImg extends HTMLAttributes<HTMLInputElement> {
    receberArquivo: Function
}

export const InserirImagem = (props: configInserirImg) => {

    const [imagem, setImagem] = useState(img);

    const trocarImg = (img) => {
        if(img){
            props.receberArquivo(img);
            setImagem(URL.createObjectURL(img));
        }
    }

    return (
        <>
        <div className={styles.img} style={{
            backgroundImage: `url(${imagem})`
        }}>
            <label className={styles.addImgBtn}>
                <FontAwesomeIcon icon={faCamera} />
                <input type='file' accept="image/png, image/jpeg" name="upload" className={styles.addImgInput} onChange={e => trocarImg(e.target.files[0])}></input>
            </label>
        </div>
        </>
    )
}