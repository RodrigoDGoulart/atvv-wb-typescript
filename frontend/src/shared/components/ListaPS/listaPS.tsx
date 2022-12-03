import styles from './ListaPS.module.scss';

import foto from '../../images/produtos.jpg';
import { PainelItem, PainelPS } from '../Painel/painel';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Confirmar } from '../Confirmar/confirmar';
import axios from 'axios';

interface configLista {
  busca: string;
  tipo: 'produto' | 'servico';
  select?: boolean;
  PsSelecionado?: Function;
}

export default function ListaClientes(props: configLista) {
  let itens = []
  
  let select = props.select === undefined ? false : props.select;

  const [lista, setLista] = useState(itens);
  const [selecionado, setSelecionado] = useState(Object);
  const [paraDeletar, setParaDeletar] = useState<number>()
  const [paraDeletarNome, setParaDeletarNome] = useState('');

  const [confirm, setConfirm] = useState(false);
  
  const history = useNavigate();

  const testaBusca = (nome: string) => {
    const regex = new RegExp(props.busca, 'i');
    return regex.test(nome);
  }

  const deletar = () => {
    if (props.tipo === 'produto') {
      axios.delete(`http://localhost:4001/deletar-produto?cod=${paraDeletar}`).then(() => {
        setConfirm(false);
      });
    } else {
      axios.delete(`http://localhost:4001/deletar-servico?cod=${paraDeletar}`).then(() => {
        setConfirm(false);
      });
    }
  }

  const editar = (cod: number) => {
    if(props.tipo === 'produto') history(`/editar-produto/${cod}`);
    else {history(`/editar-servico/${cod}`);}
  }

  const selecionar = (item: Object) => {
    setSelecionado(item);
    props.PsSelecionado(item);
  }

  useEffect(() => {
    if (props.tipo === 'produto') {
      axios.get('http://localhost:4001/produtos').then(response => {
          let lista = response.data
          let novaLista = lista.filter(item => {
            return testaBusca(item.nome)
          });
          setLista(novaLista);
          setSelecionado({cod: NaN});
      });
    } else {
      axios.get('http://localhost:4001/servicos').then(response => {
          let lista = response.data
          let novaLista = lista.filter(item => {
            return testaBusca(item.nome)
          });
          setLista(novaLista);
          setSelecionado({cod: NaN});
      });
    }
  }, [props.busca, props.tipo, confirm])

  return (
    <div className={styles.container}>
      {lista.map(item => (
        <PainelPS select={select} selected={selecionado['cod'] === item['cod']} aoSelecionar={() => selecionar(item)} key={item.cod} titulo={item.nome} subtitulo={`Cod.: ${item.cod}  -  R$${item.valor}`} imagem={foto} onEdit={() => editar(item.cod)} onDelete={() => {
          setParaDeletar(item.cod)
          setParaDeletarNome(item.nome)
          setConfirm(true);
        }} />
      ))}
      <Confirmar
        ativo={confirm}
        onConfirm={() => deletar()}
        closeReturn={setConfirm}
      >
        <p className={styles.confirmMsg}>Excluir {paraDeletarNome}?</p>
      </Confirmar>
    </div>
  )
}