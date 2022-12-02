import styles from './ListaCliente.module.scss';
import fotoCliente from '../../images/clientes.jpg';
import { PainelItem } from '../Painel/painel';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header3 } from '../Header/header';
import axios from 'axios';

interface configLista {
  busca: string;
  separarPorGenero?: boolean;
}

export default function ListaClientes(props: configLista) {

  let separarPorGenero = props.separarPorGenero === undefined ? false : props.separarPorGenero;

  const [lista, setLista] = useState([]);
  const [listaFem, setListaFem] = useState([]);
  const [listaMasc, setListaMasc] = useState([]);
  const [listaOutros, setListaOutros] = useState([]);

  const history = useNavigate();

  const testaBusca = (nome: string) => {
    const regex = new RegExp(props.busca, 'i');
    return regex.test(nome);
  }

  const separar = (lista: Object[]) => {
    setListaMasc(lista.filter(cliente => cliente['genero'] == 'M'));
    setListaFem(lista.filter(cliente => cliente['genero'] == 'F'));
    setListaOutros(lista.filter(cliente => cliente['genero'] == 'O'));
  }

  useEffect(() => {
    axios.get('http://localhost:4001/clientes').then(response => {
      const novaLista = response.data.filter(cliente => {
        return testaBusca(cliente.nome)
      });
      if (separarPorGenero) {
        separar(novaLista)
      } else {
        setLista(novaLista);
      }
    });
  }, [props.busca])

  return (
    <div className={styles.container}>
      {separarPorGenero ?
        <>
          <Header3 className={styles.left}>Masculino</Header3>
          {listaMasc.map((cliente, index) => (
            <PainelItem key={index} titulo={cliente.nome} subtitulo={`Cadastrado(a) em ${new Date(cliente.dataCadastro).toLocaleDateString('pt-br')}`} imagem={fotoCliente} onClick={() => history(`/cliente/${index}`)} />
          ))}
          <Header3 className={styles.left}>Feminino</Header3>
          {listaFem.map((cliente, index) => (
            <PainelItem key={index} titulo={cliente.nome} subtitulo={`Cadastrado(a) em ${new Date(cliente.dataCadastro).toLocaleDateString('pt-br')}`} imagem={fotoCliente} onClick={() => history(`/cliente/${index}`)} />
          ))}
          <Header3 className={styles.left}>Outros</Header3>
          {listaOutros.map((cliente, index) => (
            <PainelItem key={index} titulo={cliente.nome} subtitulo={`Cadastrado(a) em ${new Date(cliente.dataCadastro).toLocaleDateString('pt-br')}`} imagem={fotoCliente} onClick={() => history(`/cliente/${index}`)} />
          ))}
        </>
        :
        lista.map((cliente) => (
          <PainelItem key={cliente.id} titulo={cliente.nome} subtitulo={`Cadastrado(a) em ${new Date(cliente.dataCadastro).toLocaleDateString('pt-br')}`} imagem={fotoCliente} onClick={() => history(`/cliente/${cliente.id}`)} />
        ))}
    </div>
  )
}