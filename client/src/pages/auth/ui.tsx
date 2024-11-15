import axios from "axios"
import { Alert, Window } from "../../widgets"
import { Button } from "../../shared"
import { useState } from "react"

export const Authorization = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [bgColorAlert, setBgColorAlert] = useState("bg-red-600")
  const [isValidPassword, setIsValidPassword] = useState(false)
  const [isValidLogin, setIsValidLogin] = useState(false)
  const [isCanSubmit, setIsCanSubmit] = useState(false)
  const [isCallAlert, setIsCallAlert] = useState(false)
  
  const loginValidateText = document.querySelector("#validateAuthLogin")
  const passwordValidateText = document.querySelector("#validateAuthPassword")
  const regButton = document.querySelector("#authBtn")
  
  const fetchReg = async (userLogin: string, userPassword: string) => {
    try {
      axios
        .post("http://localhost:5050/users/login", {
          login: userLogin,
          password: userPassword
        })
        .then(() => {
          setIsCallAlert(true)
          setBgColorAlert("bg-green-600")
          setAlertMessage(`Вы вошли в аккаунт! Добро пожаловать ${userLogin}`)
          setTimeout(() => setIsCallAlert(false), 3000)
          openUserWindow()
        })
        .catch(err => {
          setIsCallAlert(true)
          setBgColorAlert("bg-red-600")
          setAlertMessage(err.response.data)
        })
    } catch {
      console.log("Произошла ошибка")
    }
  }
  
  const handleIsCanSubmit = () => {
    if (isValidPassword && isValidLogin) {
      regButton?.classList.remove("bg-red-600", "hover:bg-red-700")
      regButton?.classList.add("bg-green-600", "hover:bg-green-700")
      setIsCanSubmit(true)
    } else {
      regButton?.classList.remove("bg-green-600", "hover:bg-green-700")
      regButton?.classList.add("bg-red-600", "hover:bg-red-700")
      setIsCanSubmit(false)
    }
  }
  
  const handleSubmit = () => {
    if (isCanSubmit) {
      fetchReg(login, password)
    } else {
      setIsCallAlert(true)
      setAlertMessage("Ошибка: Данные не валидны. Проверьте логин или пароль")
      setBgColorAlert("bg-red-600")
      console.debug("Данные не валидны")
      setTimeout(() => {setIsCallAlert(false)}, 5000)
    }
  }
  
  const openReg = () => {
    document.querySelector("#auth")?.classList.remove("flex")
    document.querySelector("#auth")?.classList.add("hidden")
    document.querySelector("#reg")?.classList.remove("hidden")
    document.querySelector("#reg")?.classList.add("flex")
  }
  
  const openUserWindow = () => {
    document.querySelector("#auth-block")?.classList.add("hidden")
    document.querySelector("#window")?.classList.remove("hidden")
  }
  
  return (
    <div id="auth" className="hidden w-full h-full px-5 flex-col justify-center items-center sm:px-16 lg:px-0">
      <Alert bgColor={ bgColorAlert } textAlert={ alertMessage } isActive={ isCallAlert } />
      <div id="auth-block" className="bg-neutral-800 flex flex-col p-5 rounded-md w-full lg:w-fit lg:container lg:mx-auto">
        <p className="text-white text-center font-bold text-xl mb-7 sm:text-2xl md:text-3xl lg:text-3xl 2xl:text-4xl">Вход в аккаунт</p>
        <div>
          <p className="text-red-500 mb-1 text-xs select-none opacity-0 transition delay-300 md:text-[15px] lg:text-base 2xl:text-lg" id="validateAuthLogin">Логин не может быть пустым или состоять из пробелов</p>
          <input 
            type="text" 
            onChange={(e) => {
                if (e.target.value.trim() === "") {
                  setIsValidLogin(false)
                  setLogin("")
                  loginValidateText?.classList.remove("opacity-0")
                  loginValidateText?.classList.add("opacity-")
                  e.target.classList.remove("border-green-600", "border-neutral-700")
                  e.target.classList.add("border-red-600")
                } else {
                  setIsValidLogin(true)
                  setLogin(e.target.value)
                  loginValidateText?.classList.add("opacity-0")
                  loginValidateText?.classList.remove("opacity-1")
                  e.target.classList.add("border-green-600")
                  e.target.classList.remove("border-red-600", "border-neutral-700")
                }
                handleIsCanSubmit()
              } 
            }
            onBlur={(e) => {
                handleIsCanSubmit()
              }
            }
            placeholder="Логин" 
            className="w-full p-3 border-2 border-neutral-700 text-white rounded-md bg-neutral-600 focus-visible:outline-none focus-visible:border-sky-600 md:text-[17px] lg:w-[500px] lg:text-lg 2xl:w-[700px] 2xl:text-xl" 
          />
        </div>
        <div>
          <p className="text-red-500 mb-1 mt-4 text-xs select-none opacity-0 transition delay-300 md:text-[15px] lg:text-base 2xl:text-lg" id="validateAuthPassword">Пароль должен содержать от 8 до 14 символов</p>
          <input 
            type="password" 
            onChange={(e) => {
                if (e.target.validity.tooShort || e.target.validity.tooLong || e.target.value.trim() == "") {
                  setIsValidPassword(false)
                  setPassword(e.target.value)
                  passwordValidateText?.classList.remove("opacity-0")
                  passwordValidateText?.classList.add("opacity-1")
                  e.target.classList.remove("border-green-600", "border-neutral-700")
                  e.target.classList.add("border-red-600")
                } else {
                  setIsValidPassword(true)
                  setPassword(e.target.value)
                  passwordValidateText?.classList.add("opacity-0")
                  passwordValidateText?.classList.remove("opacity-1")
                  e.target.classList.add("border-green-600")
                  e.target.classList.remove("border-red-600")
                }
                handleIsCanSubmit()
              } 
            } 
            placeholder="Пароль (от 8 до 14 символов)"
            className="w-full p-3 border-2 border-neutral-700 mb-10 text-white rounded-md bg-neutral-600 focus-visible:outline-none focus-visible:border-sky-600 md:text-[17px] lg:w-[500px] lg:text-lg 2xl:w-[700px] 2xl:text-xl"
            minLength={8}
            maxLength={14}
          />
        </div>
        <Button 
          text="Войти" 
          classValue="text-white bg-red-600 font-semibold py-3 px-6 rounded-md transition duration-300 hover:bg-red-700 md:text-[17px] lg:text-lg 2xl:text-xl" 
          typeButton="button"
          idButton="authBtn"
          eventHandler={handleSubmit}
        />
        <p className="text-white text-center lowercase text-base m-3 lg:text-lg 2xl:text-xl">или</p>
        <Button 
          classValue="text-white bg-sky-700 py-3 font-semibold rounded-md transition duration-300 hover:bg-sky-600 md:text-[17px] lg:text-lg 2xl:text-xl" 
          text="Зарегистрироваться" 
          typeButton="button"
          eventHandler={openReg}
        />
      </div>
      <Window userLogin={ login } userPassword={ password } />
    </div>
  )
}