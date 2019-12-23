import React from 'react';
import styled from 'styled-components';

const ContactCard = ({ users, openModalWithContent }) => {
  console.log({users})
  return (
    <Wrapper>
      {
        users.map(user => {
          return (
            <div className="user-row">
              { user.name.first}, {user.name.last.toUpperCase()}
              <button onClick={() => openModalWithContent(<ExpandedContactCard user={user} />)}>🔍</button>
            </div>
          )
        })
      }
    </Wrapper>
  )
}

const ExpandedContactCard = ({ user }) => {
  return (
    <p>user: {user.name.first}</p>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px;
  overflow-x: auto;

  .user-row {
    padding: 10px 0;
    margin: 10px 20px;
    border-bottom: 1px solid rgba(0,0,0,.15);
    position: relative;
    max-width: 50%;

    button {
      position: absolute;
      right: 0px;
      background: none;
      border: none;
      cursor: pointer;
    }
  }
`

export default ContactCard;
