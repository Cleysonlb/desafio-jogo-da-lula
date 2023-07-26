import { useRef, useEffect } from 'react'

import Logo from '/public/Logo.svg'
import { useNavigate } from "react-router-dom";
import './Home.css'

const Home = () => {
  const audioRef = useRef<HTMLAudioElement>()
  const navigate = useNavigate()

  useEffect(() => {
    audioRef.current.play()
  },[])

  return(
    <div className="page_container">
      <img src={Logo}/>
      <button onClick={() => navigate('/game')} className='start_button'>Iniciar</button>
      <audio autoPlay loop ref={audioRef}>
        <source src="/public/main-theme.mp3" type="audio/mp3">
        </source>
      </audio>
    </div>
  )
}

export default Home