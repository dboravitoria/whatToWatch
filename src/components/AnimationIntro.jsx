import { useEffect } from 'react'   
//importa o componente DotLottieReact
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {IoStar} from '../utils/icones'

export default function SplashOverlay({ onFinish }) {
  //variável de ambiente para a animação
  const urlAnimation = import.meta.env.VITE_LOTTIE_ANIMATION
  
  //define o temporizador da animação
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    //cobre o fundo da tela de preto pra aparecer a animação
    <div className='fixed top-0 left-0 bg-primaryBlack w-full h-full z-50 flex items-center justify-center text-primaryYellow text-4xl flex-col'>

        <p className="font-bold uppercase">
          <IoStar className="inline align-middle text-primaryYellow mr-1" />
              Prepare-se para o espetáculo!
          <IoStar className="inline align-middle text-primaryYellow ml-1" />
        </p>

      {/* Exibe a animação Lottie   */}
      <div style={{ marginTop: '2rem', width:"75%", height: "auto" }}>
        <DotLottieReact src={urlAnimation} loop autoplay />
      </div>
    </div>
  )
}
