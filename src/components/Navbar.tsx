import { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiLinkAlt } from 'react-icons/bi';
import { BsPersonVcard } from 'react-icons/bs';
import { FaBlog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeName } from '../themes';
import ThemeSwitcher from './ThemeSwitcher';

interface NavbarProps {
	currentTheme: ThemeName;
	setTheme: (theme: ThemeName) => void;
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
	gap: 1.5rem;
	align-items: center;

	@media (min-width: 769px) {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	@media (max-width: 768px) {
		position: fixed;
		top: 72px;
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
`;

const NavLink = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	padding: 0.5rem;
	color: ${({ theme }) => theme.text};
	text-decoration: none;
	position: relative;
	border: 2px solid transparent;
	border-radius: 2rem;
	transition: all 0.3s ease;
	font-family: ${({ theme }) => theme.font};
	min-width: 2.5rem;
	height: 2.5rem;

	svg {
		width: 1.2rem;
		height: 1.2rem;
	}

	span {
		@media (max-width: 768px) {
			display: inline;
		}
	}

	&:hover,
	&:focus {
		border-color: ${({ theme }) => theme.accent};
		color: ${({ theme }) => theme.accent};
		transform: scale(1.1);
		outline: none;
	}

	&:after {
		content: '';
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		border-radius: 2rem;
		background: ${({ theme }) => theme.accent};
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: -1;
	}

	&:hover:after {
		opacity: 0.1;
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

	const navItems = [
		{ to: '/', icon: <AiOutlineHome />, label: 'Home' },
		{ to: '/blog', icon: <FaBlog />, label: 'Blog' },
		{ to: '/about', icon: <BsPersonVcard />, label: 'About' },
		{ to: '/links', icon: <BiLinkAlt />, label: 'Links' },
	];

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
					{navItems.map(({ to, icon, label }) => (
						<NavLink key={to} to={to} onClick={closeMenu}>
							{icon}
							<span>{label}</span>
						</NavLink>
					))}
				</NavLinks>
				<ThemeSwitcher currentTheme={currentTheme} setTheme={setTheme} />
			</NavContainer>
		</Nav>
	);
};

export default Navbar;
