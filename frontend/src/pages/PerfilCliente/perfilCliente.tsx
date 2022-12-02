import { useNavigate, useParams } from "react-router-dom";
import { BlueBtn, CancelBtn, ConfirmBtn, Head, Header2, InserirComRotulo, InserirImagem } from "../../shared/components";
import { Lista } from "../../shared/components/Lista/lista";
import styles from './PerfilCliente.module.scss';
import foto from '../../shared/images/clientes.jpg';
import { useEffect, useState } from "react";
import { Confirmar } from "../../shared/components/Confirmar/confirmar";
import axios from "axios";

export default function PerfilCliente() {

  const history = useNavigate();

  const { id } = useParams();

  const getCliente = () => {
    axios.get(`http://localhost:4001/cliente?id=${id}`).then(response => {
      setCliente(response.data);
    });
  }

  const [confirm, setConfirm] = useState(false);
  const [cliente, setCliente] = useState({nome: '', nomeSocial:'', genero:'O', cpf:{valor:'', data:''}, rgs:[], telefones:[]});

  const voltar = () => {
    history('/clientes')
  }

  const deletar = (id: string) => {
    setConfirm(false);
    axios.delete(`http://localhost:4001/deletar-cliente?id=${id}`).then(() => {
      voltar();
    })
  }

  const convertGenero = (genero: string) => {
    switch (genero) {
      case 'M':
        return 'Masculino'
      case 'F':
        return 'Feminino'
      default:
        return 'Outro'
    }
  }

  const chamarModal = () => {
    setConfirm(true);
  }

  useEffect(() => {
    getCliente();
  }, []);
  return (
    <>
      <Head selecionado={1} />
      <Header2>Perfil de cliente: {cliente['nome']}</Header2>
      <div className={styles.container}>
        <div className={styles.fstSection}>
          <InserirImagem editable={false} value={foto} className={styles.img} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.containerCampos}>
            <Header2 className={styles.header}> Informação padrão</Header2>
            <InserirComRotulo rotulo="Nome:" value={cliente['nome']} editable={false} />
            <InserirComRotulo rotulo="Nome social:" value={cliente['nomeSocial']} editable={false} />
            <InserirComRotulo rotulo="Sexo:" value={convertGenero(cliente['genero'])} editable={false} />
          </div>
          <div className={styles.containerCampos}>
            <Header2 className={styles.header}>CPF</Header2>
            <div className={styles.campos}>
              <InserirComRotulo editable={false} rotulo="Valor" className={styles.scndInput} value={cliente['cpf']['valor']} />
              <InserirComRotulo editable={false} rotulo="Data de emissão" className={styles.scndInput} value={new Date(cliente['cpf']['data']).toLocaleDateString('pt-br')} />
            </div>
          </div>
          <div className={styles.containerCampos}>
            <Header2 className={styles.header}>RGs</Header2>
            <Lista editable={false} lista={cliente['rgs'].map(item => `${item.valor} - ${new Date(item.data).toLocaleDateString('pt-br')}`)} />
          </div>
          <div className={styles.containerCampos}>
            <Header2 className={styles.header}>Telefones</Header2>
            <Lista editable={false} lista={cliente['telefones'].map(telefone => telefone['telefone'])} />
          </div>
        </div>
      </div>
      <div className={styles.btns}>
        <CancelBtn className={styles.btn} onClick={() => chamarModal()}>Deletar {cliente['nome']}</CancelBtn>
        <ConfirmBtn className={styles.btn} onClick={() => history(`/editar-cliente/${id}`)}>Editar {cliente['nome']}</ConfirmBtn>
      </div>
      <div className={styles.btns}>
        <span></span>
        <BlueBtn className={styles.btnFS} onClick={() => history(`/consumo-cliente/${id}`)}>Consumo de {cliente['nome']}</BlueBtn>
      </div>
      <Confirmar
        ativo={confirm}
        onConfirm={() => deletar(id)}
        closeReturn={setConfirm}
      >
        <p className={styles.confirmMsg}>Excluir {cliente['nome']}?</p>
      </Confirmar>
    </>
  )
}