import { HTMLAttributes, useEffect, useState } from "react";
import { Item } from "./Item/item";

interface Props extends HTMLAttributes<HTMLElement> {
  lista: string[];
  setFunction?: React.Dispatch<React.SetStateAction<Object[]>>;
  editable?: boolean;
  deleteFunction?: Function
}

export const Lista = (props: Props) => {

  const [list, setList] = useState(props.lista);
  
  let editable = (props.editable === undefined) ? true : props.editable;

  const del = (index: number) => {
    let lista = [...list]
    lista.splice(index, 1);
    setList(lista)
  }

  useEffect(() => {
    if(props.setFunction) {
      props.setFunction(list)
    }
  }, [list]);

  useEffect(() => {
    setList(props.lista)
  }, [props.lista]);
  return (
    <div className={props.className}>
      {list.map((item, index) => (
        <Item editable={editable} key={index} onClick={() => props.deleteFunction(index)}>{item}</Item>
      ))}
    </div>
  );
}