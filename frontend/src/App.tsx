import { useState } from 'react'
import { CancelBtn, ConfirmBtn, Header1, Header2, Header3, Inserir, InserirComRotulo, PainelBtn, Pesquisar } from './shared/components'

function App() {

  return (
    <>
      <PainelBtn nomeImagem='clientes' tamanho='md'>
        test
      </PainelBtn>
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
    </>
  )
}

export default App
