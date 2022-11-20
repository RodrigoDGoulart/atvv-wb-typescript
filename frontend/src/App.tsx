import { useState } from 'react'
import { CancelBtn, ConfirmBtn, Header1, Header2, Header3, Inserir, InserirComRotulo, PainelBtn, PainelItem, PainelItemBtn, PainelRankingItem, Pesquisar, SelectBtn } from './shared/components'

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
      <PainelBtn imagem='clientes.jpg' tamanho='lg'></PainelBtn>
      <PainelItem imagem='clientes.jpg' titulo='lorem ipsum' subtitulo='lorem ipsum dolor' />
      <PainelRankingItem imagem='clientes.jpg' titulo='lorem ipsum' subtitulo='lorem ipsum dolor' ranking={1}/>
      <PainelRankingItem imagem='clientes.jpg' titulo='lorem ipsum' subtitulo='lorem ipsum dolor' ranking={2}/>
      <PainelRankingItem imagem='clientes.jpg' titulo='lorem ipsum' subtitulo='lorem ipsum dolor' ranking={3}/>
      <PainelRankingItem imagem='clientes.jpg' titulo='lorem ipsum' subtitulo='lorem ipsum dolor' ranking={4}/>
      <PainelItemBtn imagem='clientes.jpg' titulo='lorem ipsum' subtitulo='lorem ipsum dolor' onEdit={() => console.log('editando')} onDelete={() => console.log('Excluindo')} />
    </>
  )
}

export default App
