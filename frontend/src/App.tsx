import { useState } from 'react'
import { Inserir, InserirComRotulo, PainelBtn, Pesquisar } from './shared/components'

function App() {

  return (
    <>
      <PainelBtn nomeImagem='clientes' tamanho='md'>
        test
      </PainelBtn>
      <InserirComRotulo rotulo='teste' placeholder='rotulo'/>
      <Pesquisar placeholder='Pesquise' />
    </>
  )
}

export default App
