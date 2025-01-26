import { ThemeProvider, styled } from "styled-components";
import { theme} from "./Utils/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./Pages/Authentication";
import { useState, useEffect,} from "react";
import { useSelector } from "react-redux";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Feed from "./Pages/Feed/Feed";
import SplashScreen from "./Pages/Splash/SplashScreen";
import ForgotForm from "./Components/ForgotForm/ForgotForm";
import { Toaster} from 'sonner';
import { handleToast} from './Utils/Toasts';
import BackgroundImage from "./Components/Assets/blue.jpg"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  background-image: url(${BackgroundImage}); 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: "black";
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        handleToast(`Welcome ${currentUser.name}👋`,'green')
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <BrowserRouter>
        {currentUser ? (
          showSplash ? (
            <SplashScreen />
          ) : (
            <Container>
              <Navbar currentUser={currentUser} />
              <Routes>
                <Route
                  path="/"
                  exact
                  element={<Dashboard currentUser={currentUser} />}
                />
                <Route path="/feed" exact element={<Feed />} />               
              </Routes>
            </Container>
          )
        ) : (
          <Container>
            <Routes>
              <Route path="/" element={<Authentication />} />
              <Route path="/forgot-password" element={<ForgotForm />} />
            </Routes>
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
