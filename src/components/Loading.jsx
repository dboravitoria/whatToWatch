//componente da animação de loading
import { ClipLoader } from "react-spinners"

export default function Loading({ message = "Carregando...", size = 50, color = "dark:text-primaryYellow text-primaryRed" }) {
  return (
    <div className="flex flex-col items-center justify-center my-20">
      <ClipLoader color={color} size={size} />
      <p className="dark:text-primaryYellow text-primaryRed mt-4">{message}</p>
    </div>
  )
}
