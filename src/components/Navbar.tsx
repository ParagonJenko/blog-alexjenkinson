import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  
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
`;

const Navbar = ({ currentTheme, setTheme }: NavbarProps) => {
  return (
    <Nav>
      <NavContainer>
        <NavLinks>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <Link to="/links">Links</Link>
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