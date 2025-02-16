import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import { GlobalStyles } from './GlobalStyles';
import About from './pages/About';
import Blog from './pages/Blog';
import Home from './pages/Home';
import Links from './pages/Links';
import { astrologyTheme, falloutTheme, tarkovTheme } from './themes';

type ThemeType = 'fallout' | 'astrology' | 'tarkov';

const themes = {
	fallout: falloutTheme,
	astrology: astrologyTheme,
	tarkov: tarkovTheme,
} as const;

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

	@media (max-width: 768px) {
		padding: 1rem;
	}
	padding-top: 80px;
`;

function App() {
	const [currentTheme, setCurrentTheme] = useState<ThemeType>('fallout');

	return (
		<ThemeProvider theme={themes[currentTheme]}>
			<GlobalStyles />
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
