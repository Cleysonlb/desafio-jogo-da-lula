import './ParticipantRow.css'

interface ParticipantRowTypes {
  avatar: string
  name: string
  prize: number
  vote?: string
}

const ParticipantRow = ({avatar, name, prize, vote}: ParticipantRowTypes) => {
  return(
    <div className='participant_row_container'>
      <div className='participant_info'>
        <img className='avatar' src={avatar} width={32} height={32}/>
        <span className='name'>{name}</span>
      </div>
      {!!vote ? (
        <span className='prize'>{vote}</span>
      ) : 
      (
        <span className='prize'>{`$${prize}`}</span>
      )}
    </div>
  )
}

export default ParticipantRow