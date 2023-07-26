import { ReactNode } from 'react';
import './ParticipantsBox.css'

interface ParticipantsBoxTypes {
  children: ReactNode
  title: string
  numberOfParticipants: number
  totalOfParticipants: number
}

const ParticipantsContainer = ({children, title, numberOfParticipants, totalOfParticipants} : ParticipantsBoxTypes) => {
  return(
    <div className='participants_box_container'>
      <div className='participants_box_header'>
        <span className='participants_box_title'>{title}</span>
        <div className='participants_box_total'>
          <span>{`${numberOfParticipants}/${totalOfParticipants}`}</span>
        </div>
      </div>
      <div>
        {numberOfParticipants === 0 ? 
        (
          <div className='empty_state_container'>
            <span className='empty_state_message'>Nenhum participante eliminado até o momento</span>
          </div>
        ) 
        : 
        (
        <div className='participants_list'>
          {children}
        </div>
        )}

      </div>
    </div>
  )
}

export default ParticipantsContainer;