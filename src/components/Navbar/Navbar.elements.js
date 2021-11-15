import styled from 'styled-components';
import  { Container } from '../../globalStyles.js';


export const Nav = styled.nav`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  top: 0;
  z-index: 999;
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  flex-direction: row-reverse;
  height: 50px;

  ${Container}
`;

export const ConnectButton = styled.button`
  border-radius: 4px;
  background-color: #4B59F7;
  white-space: nowrap;
  padding: 6px 28px;
  color: #fff;
  font-size: 18px;
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: #0467FB;
  }
`;