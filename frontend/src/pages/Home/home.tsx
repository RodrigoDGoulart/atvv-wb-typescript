import { PainelBtn } from "../../shared/components";
import produtos from '../../shared/images/produtos.jpg';
import servicos from '../../shared/images/servicos.jpg';
import relatorios from '../../shared/images/relatorios.jpg';
import clientes from '../../shared/images/clientes.jpg';
import { useNavigate } from "react-router-dom";
import styles from './Home.module.scss';

export default function Home () {

    const history = useNavigate();

    return(
        <div className={styles.container}>
            <PainelBtn tamanho="md" imagem={produtos} onClick={() => history('/produtos')}>
                Produtos
            </PainelBtn>
            <PainelBtn tamanho="md" imagem={servicos} onClick={() => history('/servicos')}>
                Serviços
            </PainelBtn>
            <PainelBtn tamanho="md" imagem={clientes} onClick={() => history('/clientes')}>
                Clientes
            </PainelBtn>
            <PainelBtn tamanho="md" imagem={relatorios} onClick={() => history('/relatorios')}>
                Relatórios
            </PainelBtn>
        </div>
    );
}