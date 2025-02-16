import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import { GlobalStyles } from './GlobalStyles';
import About from './pages/About';
import Blog from './pages/Blog';
import Home from './pages/Home';
import Links from './pages/Links';
import { ThemeName, getTheme } from './themes';

const DEFAULT_THEME: ThemeName = 'dos';
const THEME_STORAGE_KEY = 'preferred-theme';

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 100vh;
`;

const PageContainer = styled.div`
	flex: 1;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem;
	padding-top: 80px;

	@media (max-width: 768px) {
		padding: 1rem;
		padding-top: 80px;
	}
`;

function App() {
	const [currentTheme, setCurrentTheme] = useState<ThemeName>(() => {
		const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
		return (savedTheme as ThemeName) || DEFAULT_THEME;
	});

	useEffect(() => {
		localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
	}, [currentTheme]);

	return (
		<ThemeProvider theme={getTheme(currentTheme)}>
			<GlobalStyles theme={getTheme(currentTheme)} />
			<Router>
				<AppContainer>
					<Navbar currentTheme={currentTheme} setTheme={setCurrentTheme} />
					<PageContainer>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/blog/*' element={<Blog />} />
							<Route path='/about' element={<About />} />
							<Route path='/links' element={<Links />} />
						</Routes>
					</PageContainer>
				</AppContainer>
			</Router>
		</ThemeProvider>
	);
}

export default App;
