import React from 'react';
import styled from 'styled-components';

const DISPLAY_USER_FIELDS = ['e-mail', 'phone', 'city', 'state', 'postcode'];

const UserRow = ({ isOpen, user, handleExpandButton }) => {
  const rowRef = React.useRef(null);
  React.useEffect(() => {
    if (!isOpen) return;

    rowRef.current.scrollIntoView({
      behaviour: 'smooth',
      inline: 'center',
    })
  }, [isOpen])

  return (
    <Wrapper ref={rowRef}>
      { user.firstName}, {user.lastName.toUpperCase()}
      <button className={isOpen ? 'active' : ''}onClick={() => handleExpandButton(user.id)}>⇓</button>

      <ExtendedUserCard isOpen={isOpen}>
        <div className="col">
          <img src={user.picture} alt="User image"/>
        </div>
        <div className="col col-big">
          <h2>{user.lastName.toUpperCase()}, {user.firstName}</h2>
          <div className="info">
            {
              DISPLAY_USER_FIELDS.map(key => (
                <p><b>{key}:</b> {user[key]}</p>
              ))
            }
          </div>
        </div>
      </ExtendedUserCard>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 10px 0;
  margin: 10px 20px;
  border-bottom: 1px solid rgba(0,0,0,.15);
  width: calc(50% - 40px);
  min-width: 300px;
  position: relative;

  button {
    position: absolute;
    border: none;
    background: none;
    right: 0;
    cursor: pointer;
    line-height: 10px;
    color: #979797;
    transition: transform .15s;

    &.active {
      transform: rotate(180deg);
    }
  }

  .col {
      padding: 20px 10px;
  }

  .col img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      box-shadow: 0px 4px 4px rgba(0,0,0,.25);
  }

  h2 {
      margin: 0 0 10px;
      font-size: 18px;
  }

  .info p {
      margin: 5px 0;
      font-size: 14px;
  }

  .info p b {
      width: 80px;
      display: inline-block;
  }
`

const ExtendedUserCard = styled.div`
  overflow: hidden;
  display: flex;

  ${({ isOpen }) => isOpen
  ? `
    height: 200px;
    opacity: 1;
    pointer-events: auto;
  `
  : `
    height: 0px;
    opacity: 0;
  `
  }
`

export default UserRow;
