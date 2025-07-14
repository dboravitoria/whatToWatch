import { useEffect } from 'react'   
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function SplashOverlay({ onFinish }) {
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
        backgroundColor: 'rgba(0,0,0,0.85)', // semi-preto por cima
        zIndex: 9999, // fica na frente de tudo
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#facc15',
        fontSize: '2rem',
        flexDirection: 'column',
      }}
    >
        
      <p>Prepare-se para o espetáculo!</p>
      <div style={{ marginTop: '2rem', width:"50%", height: "auto" }}>
        <DotLottieReact
          src="https://lottie.host/df92f88f-07ed-41c2-ad1f-dc8717a1496d/O013tJxgvr.lottie"
          loop
          autoplay
        />
      </div>

    </div>
  )
}
