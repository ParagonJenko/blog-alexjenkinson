import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	min-height: calc(100vh - 80px);
	position: relative;
	overflow: hidden;
`;

const HeroSection = styled.div`
	width: 100%;
	height: 70vh;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	background-image: ${({ theme }) => theme.backgroundImage || 'none'};
	background-size: cover;
	background-position: center;
	background-attachment: fixed;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: ${({ theme }) => theme.overlayColor || 'rgba(0, 0, 0, 0.5)'};
	}
`;

const WelcomeSection = styled.section`
	max-width: 800px;
	width: 100%;
	text-align: center;
	padding: 2rem;
	position: relative;
	z-index: 1;
	animation: ${fadeIn} 1s ease-out;
	background: ${({ theme }) =>
		`rgba(${theme.primary === '#390c06' ? '26, 19, 13' : '0, 0, 0'}, 0.1)`};
	border-radius: 15px;
	backdrop-filter: blur(5px);
`;

const Title = styled.h1`
	margin-bottom: 1.5rem;
	font-size: clamp(2.5rem, 8vw, 5rem);
	font-family: ${({ theme }) => theme.headerFont};
	color: ${({ theme }) => theme.text};
	text-shadow: ${({ theme }) => `
		0 0 10px rgba(0, 0, 0, 0.8),
		0 0 20px ${theme.accent},
		0 0 30px rgba(0, 0, 0, 0.6)
	`};
`;

const Subtitle = styled.p`
	font-size: clamp(1.1rem, 2.5vw, 1.5rem);
	line-height: 1.6;
	color: ${({ theme }) => theme.text};
	margin-bottom: 2rem;
	max-width: 600px;
	margin-left: auto;
	margin-right: auto;
	text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
	padding: 1rem;
`;

const CTAButton = styled(Link)`
	padding: 1rem 2rem;
	font-size: 1.2rem;
	background-color: ${({ theme }) => theme.accent};
	color: ${({ theme }) => theme.text};
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
	font-family: ${({ theme }) => theme.font};
	text-decoration: none;
	display: inline-block;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
	}
`;

const FeaturesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 2rem;
	padding: 4rem 2rem;
	max-width: 1200px;
	width: 100%;
	margin: 0 auto;
`;

const FeatureCard = styled.div`
	background: ${({ theme }) =>
		`rgba(${theme.primary === '#390c06' ? '26, 19, 13' : '0, 0, 0'}, 0.2)`};
	padding: 2rem;
	border-radius: 10px;
	text-align: center;
	transition: transform 0.3s ease;
	backdrop-filter: blur(5px);
	border: 1px solid ${({ theme }) => theme.border};

	&:hover {
		transform: translateY(-5px);
	}

	h3 {
		color: ${({ theme }) => theme.specialAccent || theme.accent};
		margin-bottom: 1rem;
		font-family: ${({ theme }) => theme.headerFont};
		text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
	}

	p {
		color: ${({ theme }) => theme.text};
		text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
	}
`;

const Home = () => {
	return (
		<HomeContainer>
			<HeroSection>
				<WelcomeSection>
					<Title>Welcome to Jenko's Junkyard</Title>
					<Subtitle>
						A place for my mind to unload it's various thoughts and ideas
					</Subtitle>
					<CTAButton to='/blog'>Explore My Blog</CTAButton>
				</WelcomeSection>
			</HeroSection>
			<FeaturesGrid>
				<FeatureCard>
					<h3>Tech Insights</h3>
					<p>
						Personal deep dives into software development, best practices, and
						technology I pick up over time.
					</p>
				</FeatureCard>
				<FeatureCard>
					<h3>Personal Projects</h3>
					<p>
						Showcasing my journey through various coding adventures and creative
						endeavors.
					</p>
				</FeatureCard>
				<FeatureCard>
					<h3>Learning Journey</h3>
					<p>
						Sharing experiences and lessons learned along the path of continuous
						improvement.
					</p>
				</FeatureCard>
			</FeaturesGrid>
		</HomeContainer>
	);
};

export default Home;
