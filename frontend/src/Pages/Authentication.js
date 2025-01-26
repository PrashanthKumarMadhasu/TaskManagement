import React, { useState } from "react";
import styled from "styled-components";
import LoginBack from "../Components/Assets/loginbackground.jpg";
import LoginForm from "../Components/LoginForm/LoginForm";
import RegisterForm from "../Components/RegisterForm/RegisterForm";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  background-image: url(${LoginBack});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: #fff;
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: #64e3ec;
    text-decoration: underline;
  }
`;

const Wrapper = styled.div`
  width: 420px;
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(35px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 30px 40px;
  @media (max-width: 500px) {
    width: 90%;
  }
`;



const Authentication = () => {
  const [login, setLogin] = useState(false);
  
  return (
    <Container>
    {!login ? (
      <Wrapper>
        <LoginForm />
        <Text>Dont have an account?{" "}
          <TextButton onClick={() => setLogin(true)}>Register</TextButton>
        </Text>
      </Wrapper>
    ) : (
      <Wrapper>
        <RegisterForm />
        <Text>
          Already have an account?{" "}
          <TextButton onClick={() => setLogin(false)}>Login</TextButton>
        </Text>
      </Wrapper>
    )}

  </Container>
  );
};

export default Authentication;
