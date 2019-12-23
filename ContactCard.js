import React from 'react';
import styled from 'styled-components';
import UserRow from './UserRow';

const ContactCard = ({ users }) => {
  console.log({users})
  return (
    <Wrapper>
      {
        users.map((user) => {
          return (
            <UserRow
              key={user.id}
              isOpen={user.id === expandedUserId}
              user={user}
              handleExpandButton={handleExpandButton}
            />
          )
        })
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px;
  overflow-x: auto;
`

export default ContactCard;
