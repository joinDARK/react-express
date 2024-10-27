type Props = {
  userLogin: string,
  userPassword: string
}

// Специально создан для вывода информации, не скрывая её
export const Window = ({userLogin, userPassword}:Props) => {
  return (
    <div id="window" className="bg-neutral-800 flex flex-col p-5 rounded-md w-full lg:w-fit lg:container lg:mx-auto hidden">
      <p className="text-white text-center font-bold text-xl mb-7 sm:text-2xl md:text-3xl lg:text-3xl 2xl:text-4xl">Данные о пользователе</p>
      <p className="text-white text-base md:text-[17px] lg:text-lg 2xl:text-xl">Логин: {userLogin}</p>
      <p className="text-white text-base md:text-[17px] lg:text-lg 2xl:text-xl">Пароль: {userPassword}</p>
    </div>
  )
}