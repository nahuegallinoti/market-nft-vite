import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #252629;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
  margin-bottom: 4vh;
`;
export const NavLogo = styled(Link)`
  cursor: pointer;
  color: #fff;
  font-size: 2rem;
  text-decoration: none;
  position: absolute;
  left: 1%;
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    color: grey;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  position: absolute;
  right: 1%;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: transparent;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;

export const MainTitle = styled.h1`
  color: ${props => (props.colorTitle ? props.colorTitle : 'black')};
  font-size: ${props => (props.fontSize ? props.fontSize : '3rem')};
`;

export const CursorLink = styled.h1`
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

export const MintButton = styled.button`
  border-radius: 15px;
  color: #ffffff;
  font-size: 20px;
  background: #1f4068;
  padding: 10px 20px 10px 20px;
  cursor: pointer;
`;

export const TitleAccount = styled.span`
  color: white;
  font-size: 1.2rem;
  font-weight: normal;
  position: absolute;
  right: 100%;
`;
