type ButtonProps = {
  classValue: string,
  text: string,
  idButton?: string,
  typeButton: "submit" | "reset" | "button",
  eventHandler: React.MouseEventHandler<HTMLButtonElement>
}

export const Button = ({classValue, text, typeButton, idButton, eventHandler}:ButtonProps) => {
  let button: JSX.Element
  if (typeButton === "submit") {
    button = <button id={idButton} className={classValue} type={typeButton} onSubmit={eventHandler}>{ text }</button>
  } else {
    button = <button id={idButton} className={classValue} type={typeButton} onClick={eventHandler}>{ text }</button>
  }
  
  return (
    button
  )
}