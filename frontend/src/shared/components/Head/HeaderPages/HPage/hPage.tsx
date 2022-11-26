import { HTMLAttributes, ReactComponentElement } from "react"

interface Props extends HTMLAttributes<HTMLButtonElement> {
    page: string
}

export const HPage = (props: Props) => {
    
    return (
        <p>
            {props.children}
        </p>
    )
}