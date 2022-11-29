import { Header2 } from "../../shared/components";
import styles from './Produtos.module.scss';

export default function Produtos () {
    return(
        <div className={styles.container}>
            <Header2 className={styles.header}>Produtos</Header2>
        </div>
    )
}