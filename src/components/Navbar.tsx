import { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiLinkAlt } from 'react-icons/bi';
import { BsPersonVcard } from 'react-icons/bs';
import { FaBlog, FaCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface NavbarProps {
	// Remove unused props
}

const Nav = styled.nav`
	background: ${({ theme }) => theme.background};
	padding: 0.75rem 0;
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 1000;
	border-bottom: 1px solid ${({ theme }) => theme.text};
`;

const NavContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2rem;
	width: 100%;
	position: relative;
	min-height: 2.5rem;

	@media (max-width: 768px) {
		padding: 0 1rem;
	}
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
	display: flex;
	gap: 0;
	align-items: center;

	@media (min-width: 769px) {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: auto;
		max-width: none; /* Remove the space restriction */
	}

	@media (max-width: 768px) {
		position: fixed;
		top: 40px;
		left: 0;
		right: 0;
		background: ${({ theme }) => theme.background};
		flex-direction: column;
		align-items: stretch;
		transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-100vh')});
		transition: transform 0.2s ease-in-out;
		border-bottom: 1px solid ${({ theme }) => theme.text};
	}
`;

const NavLink = styled(Link)`
	display: flex;
	align-items: center;
	padding: 0.5rem 1rem;
	color: ${({ theme }) => theme.text};
	text-decoration: none;
	text-transform: uppercase;
	background: ${({ theme }) => theme.background};

	svg {
		width: 1rem;
		height: 1rem;
		margin-right: 0.5rem;
	}

	&:hover,
	&:focus {
		background: ${({ theme }) => theme.text};
		color: ${({ theme }) => theme.background};
	}

	@media (max-width: 768px) {
		padding: 1rem;
		border-bottom: 1px solid ${({ theme }) => theme.text};

		&:last-child {
			border-bottom: none;
		}
	}
`;

const HamburgerButton = styled.button<{ $isOpen: boolean }>`
	display: none;
	background: ${({ theme }) => theme.background};
	border: 1px solid ${({ theme }) => theme.text};
	color: ${({ theme }) => theme.text};
	padding: 0.25rem 0.5rem;
	font-family: ${({ theme }) => theme.font};
	text-transform: uppercase;
	cursor: pointer;

	@media (max-width: 768px) {
		display: block;
	}

	&:hover,
	&:focus {
		background: ${({ theme }) => theme.text};
		color: ${({ theme }) => theme.background};
	}
`;

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const navItems = [
		{ to: '/', icon: <AiOutlineHome />, label: 'Home' },
		{ to: '/blog', icon: <FaBlog />, label: 'Blog' },
		{ to: '/projects', icon: <FaCode />, label: 'Projects' },
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
					{isOpen ? 'Close' : 'Menu'}
				</HamburgerButton>
				<NavLinks $isOpen={isOpen}>
					{navItems.map(({ to, icon, label }) => (
						<NavLink key={to} to={to} onClick={closeMenu}>
							{icon}
							<span>{label}</span>
						</NavLink>
					))}
				</NavLinks>
			</NavContainer>
		</Nav>
	);
};

export default Navbar;
