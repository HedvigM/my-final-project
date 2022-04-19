import { Link } from 'react-router-dom';
import styled from 'styled-components';

/* Screen Layout */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;
export const InnerContainer = styled.div`
  min-width: 334px;
  max-width: 500px;
  margin: 0 auto;
  height: 100%;
  /* background-color: #ff885e; */
  /* border: 3px solid red;*/
  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 200px;
    max-width: 300px;
  }

  /* mobile */
  @media (min-width: 0px) and (max-width: 767px) {
  }

  /* small laptop - */
  @media (min-width: 992px) {
  }

  /* large computer - */
  @media (min-width: 1200px) {
  }
`;

export const Img = styled.div`
  background-image: url('../yan-ming.jpg');
  background-repeat: no-repeat;
  background-size: cover;

  .overlay {
    background-color: #04040469;

    width: 100%;
    height: 100%;
    padding-top: 100px;
    padding-bottom: 10px;
  }
`;

export const Overlay = styled.div`
  background-color: #04040469;
  width: 100%;
  height: 100%;
`;

export const Color = styled.div`
  background-color: var(--main-color);
`;

export const LoginInnerContainer = styled.div`
  padding: 80px 0;
  display: flex;
  justify-content: center;
`;

export const LoginContainer = styled.div`
  background-color: var(--main-color);
  margin: 0;
`;

/* Component Layout */
export const H1 = styled.h1`
  text-align: center;
  /* small laptop - */
  @media (min-width: 992px) {
    font-size: 3em;
  }
`;
export const H2 = styled.h2``;
export const H3 = styled.h3``;
export const P = styled.p``;

/* use this in My tunes */
export const ComponentContainer = styled.div`
  color: white;
  padding: 16px 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  display: flex;

  input {
    background-color: var(--secondary-color);
    border: none;
    border-bottom: 1px solid black;

    margin: 15px;
    padding: 5px;
    width: 250px;

    text-align: center;
    font-size: 16px;

    ::placeholder {
      color: white;
      opacity: 1;
    }
  }
`;

export const InnerComponentContainer = styled.div`
  min-width: 334px;
  max-width: 500px;
  margin: 0 auto;
  height: 100%;

  .input {
    font-size: 16px;
  }
  .accent {
    background-color: var(--secondary-color);
    color: white;
  }

  /* mobile */
  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 200px;
    max-width: 300px;
  }

  /* small laptop - */
  @media (min-width: 992px) {
    min-width: 500px;
    max-width: 700px;
  }
`;

export const Members = styled.div`
  margin: 30px 0px;
  color: black;
`;

export const Green = styled.div`
  background-color: var(--main-color);

  input {
    background-color: var(--main-color);
    border: none;
    border-bottom: 1px solid black;

    margin: 15px;
    padding: 5px;
    width: 300px;

    text-align: center;
    text-transform: uppercase;

    ::placeholder {
      color: black;
      opacity: 1;
    }
    /* small laptop - */
    @media (min-width: 992px) {
      margin: 100px;
      padding: 15px;
    }
  }
`;
export const R = styled.div`
  display: grid;
  justify-self: right;
`;

export const Right = styled.div`
  display: grid;
  justify-self: right;
  align-self: center;

  p {
    margin: 3px;
    font-size: 12px;
    font-style: italic;
  }
`;

export const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
  display: grid;
  justify-self: left;
  align-self: center;
`;

export const Div = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;

  h1,
  h2,
  p {
    color: white;
    margin: 0px;
  }
  h1 {
    font-size: 1.17em;
    margin: 0px;
    margin-bottom: 20px;
    padding-top: 20px;
  }
  p {
    padding-bottom: 20px;
  }

  .noTunes {
    text-align: center;
  }

  /* Liten Dator - */
  @media (min-width: 992px) {
    .noTunes {
      text-align: center;
    }
    h1 {
      font-size: 2.5em;
      padding-bottom: 40px;
    }
    h2 {
      font-size: 2.3em;
    }
    p {
      padding-top: 40px;
      font-size: 1.7em;
    }
  }
`;
