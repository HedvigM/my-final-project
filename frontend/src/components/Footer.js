import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faMountain } from '@fortawesome/free-solid-svg-icons';

library.add(fab);

export const Footer = () => {
  return (
    <StyledFooter>
      <Text>
        <Link to={'/about'}>
          {' '}
          <h3>About</h3>
        </Link>
        <Link to={'/settings'}>
          {' '}
          <h3>Settings</h3>
        </Link>
      </Text>

      <h1>
        <Icons>
          <Icon
            href="https://github.com/HedvigM"
            target="_blank"
            tabindex="0"
            rel="noreferrer"
            aria-label="a link to my GitHub account">
            <FontAwesomeIcon icon={['fab', 'github']} />
          </Icon>
          <Icon
            href="https://www.linkedin.com/in/hedvig-mejstedt"
            target="_blank"
            tabindex="0"
            rel="noreferrer"
            aria-label="a link to my linkedin account">
            <FontAwesomeIcon icon={['fab', 'linkedin']} />
          </Icon>
          <Icon
            href="https://stackoverflow.com/users/16650863/hedvig"
            target="_blank"
            tabindex="0"
            rel="noreferrer"
            aria-label="a link to my stack-overflow account">
            <FontAwesomeIcon icon={['fab', 'stack-overflow']} />
          </Icon>
          <Icon
            href="https://mejstedt.se"
            target="_blank"
            tabindex="0"
            rel="noreferrer"
            aria-label="a link to my portfolio">
            <FontAwesomeIcon icon={faMountain} />
          </Icon>
        </Icons>
      </h1>
    </StyledFooter>
  );
};
const Text = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  h3 {
    margin: 5px;
  }
`;

const Icon = styled.a`
  margin: 5px 5px;
  color: black;
  cursor: pointer;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
  :hover {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledFooter = styled.footer`
a {
  color: black;
  font-size: 0.8em;
  text-decoration: none;
}
a:hover {
  /* color taken from the picture on the site */
  color: #2a6d38;
}
a:active {
  color: var(--secondary-color);
}

  /* Mobil */
  @media (min-width: 0px)  {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: var(--main-color);
    color: black;
  }

  /* Liten Dator - */
  @media (min-width: 992px) {
    font-size: 1.7em;
  }

  /* Stor Dator - */
  @media (min-width: 1200px) {
  }

/*   background-color: var(--main-color);
  text-align: center;
  /*   margin-top: 20px; */
  @media (min-width: 0px) and (max-width: 991px) {
    margin-top: auto;
    h1 {
      font-size: 1em;
      padding: 10px;
    }
    h3 {
      margin-top: 0px;
    }
  }
  @media (min-width: 992px) {
    padding: 30px;
    margin-top: 50px;
  } */
`;
