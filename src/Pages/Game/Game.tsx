
import {useState, useEffect, useRef} from 'react'
import Logo from '../../../public/Logo.svg'
import ParticipantRow from '../../components/ParticipantRow/ParticipantRow'
import ParticipantsBox from '../../components/ParticipantsBox/ParticipantsBox'
import GameControl from '../../components/GameControl/GameControl'
import { participantsList } from '../../utils/participantsList'
import './Game.css'


function Game() {
  const audioRef = useRef<HTMLAudioElement>()

  const [startRound, setStartRound] = useState(false)
  const [startVote, setStartVote] = useState(false)
  const [roundType, setRoundType] = useState<'running' | 'round' | 'vote'>('round')
  const [roundVotes, setRoundVotes] = useState<string[]>([])
  const [participants, setParticipants] = useState(participantsList)
  const [eliminatedParticipants, setEliminatedParticipants] = useState([])
  const [totalPrize, setTotalPrize] = useState(0)
  const [round, setRound] = useState(0)
  const [prizePerParticipant, setPrizePerParticipant] = useState(420)
  const [endGame, setEndGame] = useState(false)

  const numberOfParticipants = 69
  const eliminationChance = 0.42
  const endGameChangePerParticipant = 0.30
  const votesToEndGame = Math.ceil(participants.length / 2 + 1)

  const playAudio = () => {
    if (!audioRef.current) return
    audioRef.current.playbackRate = 2.0
    audioRef.current.play()
  }

  useEffect(() => {
    if(startRound) {
      playAudio()
      setRoundType('running')
      setRound(prev => prev + 1)
      setRoundVotes([])
      setTimeout(() => {
        const eliminatedArr = eliminatedParticipants
        const participantArr = participants
        for(let p = 0; p < participants.length; p++){
          if (Math.random() < eliminationChance) {
            eliminatedArr.push(participants[p])
            participantArr.splice(participants[p], 1);
          }
        }
        setEliminatedParticipants(eliminatedArr)
        setParticipants(participantArr)
        setTotalPrize(eliminatedParticipants.length * prizePerParticipant)
        setRoundType('vote')
        setStartRound(false)
      }, 2000);  

    }
  }, [startRound])


  useEffect(() => {
    if(startVote){
      setRoundType('running')
      const votes = []
      setTimeout(() => {
        for(let p = 0; p < participants.length; p++){
          if (Math.random() < endGameChangePerParticipant) {
            votes.push('SIM')
          } else {
            votes.push('NÃO')
          }
        }
  
        const numberOfYes =  votes.reduce((number, word) => {
          number[word] = (number[word] || 0) + 1;
          return number;
        }, {});
  
  
        if(numberOfYes.SIM > votesToEndGame){
          setPrizePerParticipant(Math.ceil(prizePerParticipant + totalPrize / participants.length))
          setRoundVotes([])
          setEndGame(true)
        } else {
          setRoundVotes(votes)
          setStartVote(false)
          setRoundType('round')
        }

      }, 2000);
      
    }
  }, [startVote])

  return (
    <div className='main_container'>
      <div className='logo_container'>
        <img src={Logo}/>
      </div>

      <div className='game_container'>
        <ParticipantsBox title="Participantes" numberOfParticipants={participants.length} totalOfParticipants={numberOfParticipants}>
          {participants.map((participant, index) => {
            return(
              <div className='row' key={index}>
                <ParticipantRow avatar={participant.avatar} name={participant.name} prize={prizePerParticipant} vote={roundVotes[index]}/>
              </div>
            )
          })}
        </ParticipantsBox>

        <div className='middle_container'>
          <GameControl prize={totalPrize} roundState={roundType} rounds={round} vowToEnd={votesToEndGame} startRound={() => {roundType === 'round' ? setStartRound(true) : setStartVote(true)}} participants={participants} endGame={endGame} />
        </div>

        <ParticipantsBox title="Participantes Eliminados" numberOfParticipants={eliminatedParticipants.length} totalOfParticipants={numberOfParticipants}>
        {eliminatedParticipants.map((participant, index) => {
            if(eliminatedParticipants.length > 0){
              return(
                <div className='row' key={index}>
                  <ParticipantRow avatar={participant.avatar} name={participant.name} prize={0} />
                </div>
              )
            }
          })}
        </ParticipantsBox>
      </div>
      <audio  ref={audioRef}>
        <source src="../../../public/red-light-sound.mp3" type="audio/mp3">
        </source>
      </audio>
    </div>
  )
}

export default Game
