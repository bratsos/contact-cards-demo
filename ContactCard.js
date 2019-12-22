import React from 'react';
import styled from 'styled-components';

const ContactCard = ({ users }) => {
  console.log({users})
  return (
    <Wrapper>
      {
        users.map(user => {
          return (
            <div className="user-row">
              { user.name.first}, {user.name.last.toUpperCase()}
            </div>
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

  .user-row {
    padding: 10px 0;
    margin: 10px 20px;
    border-bottom: 1px solid rgba(0,0,0,.15);
  }
`

export default ContactCard;
