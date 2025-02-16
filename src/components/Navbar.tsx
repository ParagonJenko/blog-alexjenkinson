import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

interface NavbarProps {
  currentTheme: 'fallout' | 'astrology' | 'tarkov';
  setTheme: (theme: 'fallout' | 'astrology' | 'tarkov') => void;
}

const Nav = styled.nav`
  background-color: ${({ theme }) => `${theme.secondary}ee`};
  padding: 1rem;
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  position: relative;
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  
  @media (min-width: 769px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 72px; // Height of navbar
    left: 0;
    right: 0;
    background-color: ${({ theme }) => `${theme.secondary}ee`};
    backdrop-filter: blur(5px);
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-100vh')});
    transition: transform 0.3s ease-in-out;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
  
  a {
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: ${({ theme }) => theme.accent};
      transition: width 0.3s ease;
    }
    
    &:hover:after {
      width: 100%;
    }
  }
`;

const ThemeSelector = styled.select`
  margin-left: auto;
  background: ${({ theme }) => `${theme.secondary}cc`};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.font};
  transition: all 0.3s ease;
  z-index: 1;
  
  &:hover {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 10px ${({ theme }) => theme.accent}66;
  }

  option {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.text};
  }

  @media (max-width: 768px) {
    margin-left: 1rem;
  }
`;

const HamburgerButton = styled.button<{ $isOpen: boolean }>`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 2;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
  }

  span {
    display: block;
    width: 2rem;
    height: 2px;
    background: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
    
    &:first-child {
      transform: ${({ $isOpen }) =>
        $isOpen ? 'rotate(45deg) translate(0.5rem, 0.5rem)' : 'rotate(0)'};
    }
    
    &:nth-child(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
    }
    
    &:last-child {
      transform: ${({ $isOpen }) =>
        $isOpen ? 'rotate(-45deg) translate(0.5rem, -0.5rem)' : 'rotate(0)'};
    }
  }
`;

const Navbar = ({ currentTheme, setTheme }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Nav>
      <NavContainer>
        <HamburgerButton onClick={toggleMenu} $isOpen={isOpen}>
          <span />
          <span />
          <span />
        </HamburgerButton>
        <NavLinks $isOpen={isOpen}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/links" onClick={closeMenu}>Links</Link>
        </NavLinks>
        <ThemeSelector 
          value={currentTheme} 
          onChange={(e) => setTheme(e.target.value as 'fallout' | 'astrology' | 'tarkov')}
        >
          <option value="fallout">Fallout Theme</option>
          <option value="astrology">Astrology Theme</option>
          <option value="tarkov">Tarkov Theme</option>
        </ThemeSelector>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 