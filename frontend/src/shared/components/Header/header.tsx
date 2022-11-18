import { HTMLAttributes } from "react"

import styles from './header.module.scss';

interface headerConfig extends HTMLAttributes<HTMLElement> {}

export const Header1 = (props: headerConfig) => {
    return(
        <h1 className={`${styles.header} ${styles.h1}`}>
            {props.children}
        </h1>
    )
}

export const Header2 = (props: headerConfig) => {
    return(
        <h1 className={`${styles.header} ${styles.h2}`}>
            {props.children}
        </h1>
    )
}

export const Header3 = (props: headerConfig) => {
    return(
        <h1 className={`${styles.header} ${styles.h3}`}>
            {props.children}
        </h1>
    )
}