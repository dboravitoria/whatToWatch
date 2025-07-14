import { useEffect } from 'react'   
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {IoStar} from '../utils/icones'

export default function SplashOverlay({ onFinish }) {

  const urlAnimation = import.meta.env.VITE_LOTTIE_ANIMATION
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish()
    }, 3000) // fica 3 segundos visível e some

    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,1)', 
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#facc15',
        fontSize: '2rem',
        flexDirection: 'column',
      }}
    >
        <p className="font-bold uppercase">
          <IoStar className="inline align-middle text-primaryYellow mr-1" />
          Prepare-se para o espetáculo!
          <IoStar className="inline align-middle text-primaryYellow ml-1" />
        </p>

      <div style={{ marginTop: '2rem', width:"50%", height: "auto" }}>
        <DotLottieReact
            src={urlAnimation}
            loop
            autoplay
          />
      </div>

    </div>
  )
}
