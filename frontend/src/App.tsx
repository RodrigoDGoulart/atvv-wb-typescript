import { useState } from 'react'
import { CancelBtn, ConfirmBtn, Header1, Header2, Header3, Inserir, InserirComRotulo, InserirImagem, PainelBtn, PainelItem, PainelItemBtn, PainelItemBtnTeste, PainelRankingItem, Pesquisar, SelectBtn } from './shared/components'
import imgCliente from '../public/images/clientes.jpg';
function App() {

  return (
    <>
      <InserirComRotulo rotulo='teste' placeholder='rotulo'/>
      <Pesquisar placeholder='Pesquise' />
      <Header1>Teste</Header1>
      <Header2>Teste</Header2>
      <Header3>Teste</Header3>

      <ConfirmBtn>
        Confirma
      </ConfirmBtn>
      <CancelBtn>
        Cancelar
      </CancelBtn>

      <SelectBtn status='enable'>
        Teste
      </SelectBtn>
      <PainelBtn imagem={imgCliente} tamanho='lg'></PainelBtn>
      <PainelItem imagem={imgCliente} titulo='lorem ipsum' subtitulo='lorem ipsum dolor' />
      <PainelRankingItem imagem={imgCliente} titulo='lorem ipsum' subtitulo='lorem ipsum dolor' ranking={1}/>
      <PainelRankingItem imagem={imgCliente} titulo='lorem ipsum' subtitulo='lorem ipsum dolor' ranking={2}/>
      <PainelRankingItem imagem={imgCliente} titulo='lorem ipsum' subtitulo='lorem ipsum dolor' ranking={3}/>
      <PainelRankingItem imagem={imgCliente} titulo='lorem ipsum' subtitulo='lorem ipsum dolor' ranking={4}/>
      <PainelItemBtn imagem={imgCliente} titulo='lorem ipsum' subtitulo='lorem ipsum dolor' onEdit={() => console.log('editando')} onDelete={() => console.log('Excluindo')} />
      <PainelItemBtnTeste imagem={imgCliente} titulo='teste' subtitulo='teste' onEdit={() => console.log('teste')} onDelete={() => console.log('teste')} />
      <InserirImagem receberArquivo={(img) => console.log('cheguei')} />
    </>
  )
}

export default App
