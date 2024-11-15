type AlertProps = {
  textAlert: string,
  bgColor: string,
  isActive: boolean
}

export const Alert = ({textAlert, bgColor, isActive}:AlertProps) => {
  return (
    <div className={`fixed top-3 w-full px-5 sm:px-16 lg:px-0 ${isActive ? "block" : "hidden"}`}>
      <div className={`w-full lg:w-fit rounded-md p-5 lg:container lg:mx-auto ${bgColor}`}>
        <p className="text-white md:text-[17px] lg:text-lg 2xl:text-xl">{ textAlert }</p>
      </div>
    </div>
  )
}