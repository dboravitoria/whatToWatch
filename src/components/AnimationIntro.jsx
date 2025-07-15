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
    <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,1)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#facc15', fontSize: '2rem', flexDirection: 'column'}}>

        <p className="font-bold uppercase">
          <IoStar className="inline align-middle text-primaryYellow mr-1" />
              Prepare-se para o espetáculo!
          <IoStar className="inline align-middle text-primaryYellow ml-1" />
        </p>

      {/* Exibe a animação Lottie   */}
      <div style={{ marginTop: '2rem', width:"50%", height: "auto" }}>
        <DotLottieReact src={urlAnimation} loop autoplay />
      </div>
    </div>
  )
}
