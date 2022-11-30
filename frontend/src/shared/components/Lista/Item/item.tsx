import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { HTMLAttributes } from "react"

import styles from './Item.module.scss';

interface Props extends HTMLAttributes<HTMLButtonElement>{}

export const Item = (props: Props) => {
    return(
            <li className={styles.item}>
                <span className={styles.point}></span>
                {props.children}
                <button className={styles.btn} onClick={props.onClick}>
                    <FontAwesomeIcon icon={faX} className={styles.icon}/>
                </button>
            </li>
    )
}