import { HTMLAttributes, useEffect, useState } from "react";
import { Item } from "./Item/item";

interface Props extends HTMLAttributes<HTMLElement> {
  lista: string[];
  setFunction: React.Dispatch<React.SetStateAction<string[]>>
}

export const Lista = (props: Props) => {

  const [list, setList] = useState(props.lista);
  const [toDel, setToDel] = useState<number>(NaN)
  
  const del = (index: number) => {
    let novaLista = [...list];
    novaLista.splice(index, 1);
    setList(novaLista)
    props.setFunction(novaLista)
  }

  useEffect(() => {
    if (!Number.isNaN(toDel)) {
      del(toDel);
      setToDel(NaN);
    }
  }, [toDel]);

  useEffect(() => {
    setList(props.lista)
  }, [props.lista]);

  return (
    <div className={props.className}>
      {list.map((item, index) => (
        <Item key={index} onClick={() => setToDel(index)}>{item}</Item>
      ))}
    </div>
  );
}