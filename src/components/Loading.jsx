//componente da animação de loading
import { ClipLoader } from "react-spinners"

export default function Loading({ message = "Carregando...", size = 50, color = "#facc15" }) {
  return (
    <div className="flex flex-col items-center justify-center my-20">
      <ClipLoader color={color} size={size} />
      <p className="text-primaryYellow mt-4">{message}</p>
    </div>
  )
}
