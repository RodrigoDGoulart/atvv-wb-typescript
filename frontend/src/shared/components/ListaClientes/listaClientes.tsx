import styles from './ListaCliente.module.scss';

import fotoCliente from '../../images/clientes.jpg';
import { PainelItem } from '../Painel/painel';
import { useEffect, useState } from 'react';

interface configLista {
  busca: string
}

export default function ListaClientes(props: configLista) {

  let clientes = [
    {
      nome: 'rose',
      cadastro: '12/12/2012',
      foto: fotoCliente
    },
    {
      nome: 'mariana',
      cadastro: '13/09/2013',
      foto: fotoCliente
    }
  ]

  const [lista, setLista] = useState(clientes);

  const testaBusca = (nome: string) => {
    const regex = new RegExp(props.busca, 'i');
    return regex.test(nome);
  }

  useEffect(() => {
    const novaLista = clientes.filter(cliente => {
      return testaBusca(cliente.nome)
    });
    setLista(novaLista);
  }, [props.busca])
  
  return (
    <div className={styles.container}>
      {lista.map((cliente, index) => (
        <PainelItem key={index} titulo={cliente.nome} subtitulo={`Cadastrado(a) em ${cliente.cadastro}`} imagem={cliente.foto} onClick={() => console.log('foi')} />
      ))}
    </div>
  )
}