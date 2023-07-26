import Soldier from '../../../public/Soldier.svg'
import { useNavigate } from "react-router-dom";

import './GameControl.css'

interface gameControlTypes {
  rounds: number
  vowToEnd: number
  prize: number
  roundState: 'running' | 'round' | 'vote'
  endGame: boolean
  startRound: () => void
}

const GameControl = ({rounds, vowToEnd, prize, roundState, endGame, startRound}: gameControlTypes) => {
  const navigate = useNavigate()
  return(
    <div className='game_control_container'>
      <div className='game_control_header'>
        <div className='game_control_round_box'>
          <span className='game_control_title'>Round</span>
          <span className='game_control_subtitle'>{rounds}</span>
        </div>
        <div className='game_control_prize_box'>
          <span className='game_control_title'>Fundos do Prêmio</span>
          <span className='game_control_subtitle'>{`$${prize}`}</span>
        </div>
      </div>

      <div className='game_control_action'>
        <img src={Soldier}/>
        {endGame ? (
          <button onClick={() => navigate('/')} className='game_control_button'>
            Voltar para o inicio
          </button>
        ) : (
          <button disabled={roundState === 'running'} onClick={startRound} className='game_control_button'>
          {roundState === 'round' && 'Iniciar Rodada'}
          {roundState === 'vote' && 'Iniciar Votação'}
          {roundState === 'running' && 'vamos ver...'}
          </button>
        )}
      </div>

      <div className='game_control_footer'>
        {endGame ? (
          <>
            <span className='game_control_title'>O jogo chegou ao fim</span>
          </>
        ) : (
          <>
            <span className='game_control_title'>Votos para o fim do jogo</span>
            <span className='game_control_subtitle'>{vowToEnd}</span>
          </>
        )}

      </div>
    </div>
  )
}

export default GameControl