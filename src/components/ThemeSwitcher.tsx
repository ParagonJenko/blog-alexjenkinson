import { BsTerminalFill } from 'react-icons/bs';
import { FaSkull } from 'react-icons/fa';
import { IoMdCompass } from 'react-icons/io';
import styled from 'styled-components';
import { ThemeName } from '../themes';

interface ThemeSwitcherProps {
	currentTheme: ThemeName;
	setTheme: (theme: ThemeName) => void;
}

const ThemeIconsContainer = styled.div`
	display: flex;
	gap: 0;
	align-items: center;
`;

const ThemeIcon = styled.button<{ $isActive: boolean }>`
	background: ${({ theme, $isActive }) =>
		$isActive ? theme.text : theme.background};
	color: ${({ theme, $isActive }) =>
		$isActive ? theme.background : theme.text};
	border: 1px solid ${({ theme }) => theme.text};
	padding: 0.5rem 1rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	cursor: pointer;
	font-family: ${({ theme }) => theme.font};
	text-transform: uppercase;
	font-size: 0.9rem;

	&:not(:last-child) {
		border-right: none;
	}

	&:hover {
		background: ${({ theme }) => theme.text};
		color: ${({ theme }) => theme.background};
	}

	svg {
		width: 1rem;
		height: 1rem;
	}

	@media (max-width: 768px) {
		padding: 0.25rem;

		span {
			display: none;
		}
	}
`;

const ThemeSwitcher = ({ currentTheme, setTheme }: ThemeSwitcherProps) => {
	const themes: { name: ThemeName; icon: JSX.Element; label: string }[] = [
		{ name: 'dos', icon: <BsTerminalFill />, label: 'DOS' },
		{ name: 'fallout', icon: <FaSkull />, label: 'Fall' },
		{ name: 'tarkov', icon: <IoMdCompass />, label: 'Tark' },
	];

	return (
		<ThemeIconsContainer>
			{themes.map(({ name, icon, label }) => (
				<ThemeIcon
					key={name}
					$isActive={currentTheme === name}
					onClick={() => setTheme(name)}
					title={`${label} Theme`}
				>
					{icon}
					<span>{label}</span>
				</ThemeIcon>
			))}
		</ThemeIconsContainer>
	);
};

export default ThemeSwitcher;
