import styles from './ListaRanking.module.scss';

import fotoCliente from '../../images/clientes.jpg';
import { PainelRankingItem } from '../Painel/painel';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface configLista {
  busca: string,
  tipo: 'produto' | 'servico',
  relatorio: number | string
}

export default function ListaRanking(props: configLista) {

  let clientes = [
    {
      nome: 'rose',
      foto: fotoCliente,
      desc: '25 produtos consumidos',
      rank: 1
    },
    {
      nome: 'mariana',
      foto: fotoCliente,
      desc: '15 produtos consumidos',
      rank: 2
    }
  ]

  let servicos = [
    {
      nome: 'rose',
      foto: fotoCliente,
      desc: '44 serviços consumidos',
      rank: 1
    },
    {
      nome: 'mariana',
      foto: fotoCliente,
      desc: '19 serviços consumidos',
      rank: 2
    }
  ]

  const [lista, setLista] = useState(clientes);

  const history = useNavigate();

  const testaBusca = (nome: string) => {
    const regex = new RegExp(props.busca, 'i');
    return regex.test(nome);
  }

  useEffect(() => {
    const list = props.tipo === 'produto' ? clientes : servicos
    const novaLista = list.filter(cliente => {
      return testaBusca(cliente.nome)
    });
    setLista(novaLista);
  }, [props.busca, props.tipo])
  
  return (
    <div className={styles.container}>
      {lista.map((cliente, index) => (
        <PainelRankingItem ranking={cliente.rank} key={index} titulo={cliente.nome} subtitulo={cliente.desc} imagem={cliente.foto} onClick={() => history(`/cliente/${index}`)} />
      ))}
    </div>
  )
}