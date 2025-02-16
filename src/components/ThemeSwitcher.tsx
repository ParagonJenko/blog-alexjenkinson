import { BsTerminalFill } from 'react-icons/bs';
import { FaSkull } from 'react-icons/fa';
import { GiStarsStack } from 'react-icons/gi';
import { IoMdCompass } from 'react-icons/io';
import styled from 'styled-components';
import { ThemeName } from '../themes';

interface ThemeSwitcherProps {
	currentTheme: ThemeName;
	setTheme: (theme: ThemeName) => void;
}

const ThemeIconsContainer = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
	margin-left: auto;

	@media (max-width: 768px) {
		margin-left: 1rem;
	}
`;

const ThemeIcon = styled.button<{ $isActive: boolean }>`
	background: none;
	border: 2px solid
		${({ theme, $isActive }) => ($isActive ? theme.accent : 'transparent')};
	color: ${({ theme }) => theme.text};
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.3s ease;
	padding: 0.5rem;
	position: relative;

	&:hover {
		border-color: ${({ theme }) => theme.accent};
		transform: scale(1.1);
		color: ${({ theme }) => theme.accent};
	}

	&:after {
		content: '';
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		border-radius: 50%;
		background: ${({ theme }) => theme.accent};
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: -1;
	}

	&:hover:after {
		opacity: 0.1;
	}

	svg {
		width: 100%;
		height: 100%;
	}
`;

const ThemeSwitcher = ({ currentTheme, setTheme }: ThemeSwitcherProps) => {
	const themes: { name: ThemeName; icon: JSX.Element; label: string }[] = [
		{ name: 'fallout', icon: <FaSkull />, label: 'Fallout Theme' },
		{ name: 'astrology', icon: <GiStarsStack />, label: 'Astrology Theme' },
		{ name: 'tarkov', icon: <IoMdCompass />, label: 'Tarkov Theme' },
		{ name: 'dos', icon: <BsTerminalFill />, label: 'DOS Terminal Theme' },
	];

	return (
		<ThemeIconsContainer>
			{themes.map(({ name, icon, label }) => (
				<ThemeIcon
					key={name}
					$isActive={currentTheme === name}
					onClick={() => setTheme(name)}
					title={label}
					aria-label={label}
				>
					{icon}
				</ThemeIcon>
			))}
		</ThemeIconsContainer>
	);
};

export default ThemeSwitcher;
