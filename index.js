import React from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from 'styled-components';
import { configJson, extractUsersByKey, fillLettersWithUsers } from './helpers';

import Tabs from './Tabs';
import ContactCard from './ContactCard';

const { TabPane } = Tabs;

const noop = () => null;

const userInfoSelector = user => ({
  id: user.id.value,
  firstName: user.name.first,
  lastName: user.name.last,
  'e-mail': user.email,
  phone: user.phone,
  city: user.location.city,
  state: user.location.state,
  postcode: user.location.postcode,
  picture: user.picture.thumbnail
})

const App = () => {
  const [usersByLetter, setUsersByLetter] = React.useState({});

  React.useEffect(() => {
    fetch('https://randomuser.me/api/?results=100&nat=NL')
      .then(response => response.json())
      .then(data => {
        const usersByLastLetter = extractUsersByKey('name.last', data.results);

        const tabsLettersWithUsers = fillLettersWithUsers(configJson.tabs, usersByLastLetter)

        setUsersByLetter(tabsLettersWithUsers);
      })
  }, [])

  return (
    <WrapperDiv>
      <GlobalStyles />
      <h1>Contacts app</h1>
      <ContactCardAppDiv>
        <Tabs
          defaultActiveKey={configJson.tabs[0]}
        >
          {
            Object.keys(usersByLetter).map(letter => {
              const contactsCount = usersByLetter[letter].length
              const hasNoContacts = contactsCount === 0;
              const tabComponent = (
                <p className={hasNoContacts ? 'disabled' : ''}>
                  {letter}
                  <span>({contactsCount})</span>
                </p>
              )
              return (
                <TabPane
                  key={letter}
                  tab={tabComponent}
                  onClick={hasNoContacts ? noop : undefined}
                >
                  <ContactCard letter={letter} users={usersByLetter[letter].map(userInfoSelector)} />
                </TabPane>
              )
            })
          }
        </Tabs>
      </ContactCardAppDiv>
    </WrapperDiv>
  )
};

const ContactCardAppDiv = styled.div`
  width: 90%;
  height: 400px;
  max-width: 1280px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, .15);
  border-radius: 4px;
  background: #fff;

  button {
    p {
      margin: 0 5px;
      padding: 4px 8px;
      font-size: 24px;
      display: flex;
      align-items: baseline;

      &.disabled {
        color: #bdbdbd;
      }

      span {
        font-size: 10px;
        margin-left: 5px;
      }
    }
  }
`
const GlobalStyles = createGlobalStyle`
  body {
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    height: 100vh;
  }

  * {
    box-sizing: border-box;
  }
`

const WrapperDiv = styled.div`
  font-family: -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Helvetica,
    Arial,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h1 {
    color: #fff;
    text-shadow: 0 2px rgba(0, 0, 0, .25);
  }
`

const appNode = document.getElementById('app');
ReactDOM.render(<App />, appNode);

