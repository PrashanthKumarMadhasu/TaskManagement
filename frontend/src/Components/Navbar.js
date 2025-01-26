import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { logout } from "../Redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import Logout from "./Assets/logout.png"

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding: 0 20px;
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  @media (min-width: 768px) and (max-width: 900px) {
    padding: 5px;
  }
`;

const NavItemsDiv = styled.div`
  display: flex;
  width:100%;
  justify-content: center; 
  @media (min-width: 769px) and (max-width: 900px) {
    margin-left: 10px;
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-;
  padding: 0 6px;
  gap: 80px;
  font-size: 20px;
  list-style: none;
  @media screen and (max-width: 768px) {
    display: none;
  }
  @media (min-width: 769px) and (max-width: 900px) {
    gap: 10px;
  }
`;
const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) =>
    theme.theme === "true" ? theme.white : theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 1s slide-in;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }
  @media screen and (min-width: 768px) {
    &:hover {
      transform: scale(1.15);
    }
  }
`;
const TextButton = styled.div`
  color: ${({ theme }) => theme.profile_delete};
  cursor: pointer;
  display: flex;
  align-items: center;
  float:right;
  padding:10px 20px;
  justify-content:center;
  font-size: 20px;
  transition: all 0.3s ease;
  font-weight: 500;
  margin-top: 8px;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ImageIcon = styled.img`
  width: 16px;
  height: 16px;
  margin: 0 5px;
`;

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Nav>
        <NavItemsDiv>
          <NavItems>
            <Navlink to="/">ToDo-List</Navlink>
            <Navlink to="/feed">Feed</Navlink>
          </NavItems>
          
        </NavItemsDiv>
        <TextButton
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            {" "}
            <ImageIcon src={Logout} />
            Logout
          </TextButton>
    </Nav>
  );
};

Navbar.propTypes = {
  currentUser: PropTypes.any,
  id: PropTypes.any,
  email: PropTypes.any,
};

export default Navbar;
