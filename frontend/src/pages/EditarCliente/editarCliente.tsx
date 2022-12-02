import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CancelBtn, ConfirmBtn, Head, Header2, InserirComRotulo, InserirImagem } from "../../shared/components";
import { Lista } from "../../shared/components/Lista/lista";
import { Opcoes } from "../../shared/components/Opcoes/opcoes";
import foto from '../../shared/images/clientes.jpg';
import styles from './EditarCliente.module.scss';

export default function EditarCliente() {

  const { id } = useParams();

  const history = useNavigate();

  const [img, setImg] = useState(foto);
  const [sexo, setSexo] = useState('');
  const [nome, setNome] = useState('');
  const [nomeSocial, setNomeSocial] = useState('');
  
  const [cpfValor, setCpfValor] = useState('');
  const [cpfData, setCpfData] = useState('');
  
  const [rgValor, setRgValor] = useState('');
  const [rgData, setRgData] = useState('');
  const [rgList, setRgList] = useState([]);
  
  const [telefone, setTelefone] = useState('');
  const [telefoneList, setTelefoneList] = useState([]);
  
  const getCliente = () => {
    axios.get(`http://localhost:4001/cliente?id=${id}`).then(response => {
      let cliente = response.data;
      setNome(cliente.nome);
      setNomeSocial(cliente.nomeSocial);
      setSexo(convertGenero(cliente.genero));
      setCpfValor(cliente.cpf.valor);
      setCpfData(cliente.cpf.data.split('T')[0]);
      let rgs = cliente.rgs.map(rg => {return {valor: rg.valor, data: rg.data.split('T')[0]}})
      setRgList(rgs);
      setTelefoneList(cliente.telefones.map(telefone => telefone.telefone));
    });
  }

  const [erroSexo, setErroSexo] = useState(false);
  const [erroNome, setErroNome] = useState(false);
  const [erroNomeSocial, setErroNomeSocial] = useState(false);
  const [erroCpfValor, setErroCpfValor] = useState(false);
  const [erroCpfData, setErroCpfData] = useState(false);
  const [erroRgList, setErroRgList] = useState(false);
  const [erroTelefoneList, setErroTelefoneList] = useState(false);

  const voltar = () => {
    history(`/cliente/${id}`);
  }

  const verificar = () => {
    let retorno = true;
    if (!sexo) { setErroSexo(true); retorno = false; } else { setErroSexo(false) }
    if (!nome) { setErroNome(true); retorno = false; } else { setErroNome(false) }
    if (!nomeSocial) { setErroNomeSocial(true); retorno = false; } else { setErroNomeSocial(false) }
    if (!cpfValor) { setErroCpfValor(true); retorno = false; } else { setErroCpfValor(false) }
    if (!cpfData) { setErroCpfData(true); retorno = false; } else { setErroCpfData(false) }
    if (rgList.length == 0) { setErroRgList(true); retorno = false; } else { setErroRgList(false) }
    if (telefoneList.length == 0) { setErroTelefoneList(true); retorno = false; } else { setErroTelefoneList(false) }
    return retorno;
  }
  
  const cadastrar = () => {
    if (verificar()) {
      axios.put('http://localhost:4001/editar-cliente', {
        id,
        nome,
        nomeSocial,
        genero: generoToSQL(sexo),
        cpf: {
          valor: cpfValor,
          data: cpfData
        },
        rgs: rgList,
        telefones: telefoneList
      }).then(() => voltar());
    }
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

  const generoToSQL = (genero: string) => {
    switch(genero) {
      case 'Masculino':
        return 'M';
      case 'Feminino':
        return 'F';
      default:
        return 'O';
    }
  }

  const convertDia = (dia: string) => {
    let data = new Date(dia);
    return data.toLocaleDateString('pt-br');
  }

  useEffect(() => {
    getCliente();
  }, [])
  return (
    <>
      <Head selecionado={1} />
      <Header2>Editando {nome}</Header2>
      <div className={styles.container}>
        <div className={styles.fstSection}>
          <InserirImagem receberArquivo={setImg} value={img} className={styles.img} />
          <div className={styles.fstSectionCampos}>
            <InserirComRotulo rotulo="Nome:" receber={setNome} value={nome} />
            {erroNome && <p className={styles.erro}>Por favor insira um nome.</p>}
            <InserirComRotulo rotulo="Nome Social:" receber={setNomeSocial} value={nomeSocial} />
            {erroNomeSocial && <p className={styles.erro}>Por favor insira um nome social.</p>}
            <Opcoes lista={['Masculino', 'Feminino', 'Outro']} onChange={setSexo} rotulo='Sexo:' value={sexo} />
            {erroSexo && <p className={styles.erro}>Por favor selecione um sexo.</p>}
          </div>
        </div>
        <div>
          <Header2>CPF</Header2>
          <div className={styles.containerCampos}>
            <div className={styles.campos}>
              <InserirComRotulo rotulo="Valor (ex.: 123.456.789-00)" placeholder="xxx.xxx.xxx-xx" className={styles.scndInput} receber={setCpfValor} value={cpfValor} />
              <InserirComRotulo tipo="date" rotulo="Data de emissão" className={styles.scndInput} receber={setCpfData} value={cpfData}/>
            </div>
            {(erroCpfData || erroCpfValor) && <p className={styles.erro}>Por favor insira um CPF válido e a data de emissão.</p>}
          </div>
          <Header2>RGs</Header2>
          <div className={styles.containerCampos}>
            <form className={styles.campos}>
              <InserirComRotulo rotulo="Valor (ex.: 12.345.678-9)" placeholder="xx.xxx.xxx-x" className={styles.scndInput} receber={setRgValor} value={rgValor} />
              <InserirComRotulo tipo="date" rotulo="Data de emissão" className={styles.scndInput} receber={setRgData} value={rgData} />
              <ConfirmBtn type="reset" className={styles.addBtn} onClick={() => {
                if (!rgValor || !rgData) return
                let lista = [...rgList];
                console.log(rgData)
                lista.push({
                  valor: rgValor,
                  data: rgData
                });
                setRgList(lista);
              }}>
                <FontAwesomeIcon icon={faPlus} />
              </ConfirmBtn>
            </form>
            {erroRgList && <p className={styles.erro}>Por favor insira ao menos um RG com data de emissão.</p>}
            <Lista className={styles.lista} lista={rgList.map(item => `${item.valor} - ${convertDia(item.data)}`)} deleteFunction={(index: number) => {
              let lista = [...rgList]
              lista.splice(index, 1);
              setRgList(lista);
            }} />
          </div>
          <Header2>Telefones</Header2>
          <div className={styles.containerCampos}>
            <form className={styles.campos}>
              <InserirComRotulo rotulo="Telefone" placeholder="+xx (xx) xxxxx-xxxx" className={styles.scndInput} receber={setTelefone} value={telefone} />
              <ConfirmBtn type="reset" className={styles.addBtn} onClick={() => {
                if (!telefone) return
                setTelefoneList([...telefoneList, telefone]);
              }}>
                <FontAwesomeIcon icon={faPlus} />
              </ConfirmBtn>
            </form>
            {erroTelefoneList && <p className={styles.erro}>Por favor insira ao menos um telefone.</p>}
            <Lista className={styles.lista} lista={telefoneList} deleteFunction={(index: number) => {
              let lista = [...telefoneList]
              lista.splice(index, 1);
              setTelefoneList(lista);
            }} />
          </div>
        </div>
        <div className={styles.btns}>
          <CancelBtn className={styles.btn} onClick={() => voltar()}>Cancelar edição</CancelBtn>
          <ConfirmBtn className={styles.btn} onClick={() => cadastrar()}>Editar {nome}</ConfirmBtn>
        </div>
      </div>
    </>
  )
}