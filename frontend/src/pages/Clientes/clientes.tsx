import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConfirmBtn, Head, Header2, PainelItem, Pesquisar } from "../../shared/components";
import styles from './Clientes.module.scss';

import fotoCliente from '../../shared/images/clientes.jpg';
import { useState } from "react";
import ListaClientes from "../../shared/components/ListaClientes/listaClientes";
import { useNavigate } from "react-router-dom";

export default function Clientes() {

  const [busca, setBusca] = useState('');

  const history = useNavigate();

  return (
    <>
      <Head selecionado={1} />
      <Header2>Clientes</Header2>
      <div className={styles.container}>
        <div className={styles.div}>
          <ConfirmBtn onClick={() => history('/novo-cliente')}>
            <FontAwesomeIcon icon={faPlus} className={styles.addIcon} />
            Novo cliente
          </ConfirmBtn>
        </div>
        <div className={styles.div2}>
          <Pesquisar placeholder="Pesquisar cliente..." setPesquisa={setBusca} />
        </div>
        <div>
          <ListaClientes busca={busca}/>
        </div>
      </div>
    </>
  )
}