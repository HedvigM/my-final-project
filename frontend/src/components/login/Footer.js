import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
  return (
    <StyledFooter>
      <h1>
        Hedvig Mejstedt
        <br />
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

const Icon = styled.a`
  margin: 5px 5px;
  color: white;
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
  @media (min-width: 992px) {
    padding: 10px;
  }
`;

const StyledFooter = styled.footer`
  a {
    color: white;
    text-decoration: none;
  }
  a:hover {
    /* color taken from the picture on the site */
    /* color: #2a6d38; */
    color: var(--main-color);
  }
  a:active {
    color: #2a6d38;
  }

  background-color: var(--secondary-color);
  text-align: center;

  @media (min-width: 0px) and (max-width: 991px) {
    margin-top: auto;
    h1 {
      font-size: 1em;
      padding: 10px;
      color: white;
    }
    h3 {
      margin-top: 0px;
      color: white;
    }
  }
  @media (min-width: 992px) {
    padding: 30px;
    margin-top: 50px;
  }
`;
