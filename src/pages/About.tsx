import { useState } from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
	width: 100%;
	max-width: 800px;
	margin: 0 auto;
	padding: 2rem 0;
`;

const Title = styled.h1`
	font-size: clamp(2rem, 5vw, 3rem);
	margin-bottom: 1.5rem;
	color: ${({ theme }) => theme.accent};
`;

const Content = styled.div`
	font-size: clamp(1rem, 2vw, 1.2rem);
	line-height: 1.6;

	p {
		margin-bottom: 1rem;
	}
`;

const CVSection = styled.div`
	margin-top: 2rem;
	padding: 1rem;
	border: 2px solid ${({ theme }) => theme.accent};
	border-radius: 8px;
	text-align: center;
`;

const ToggleButton = styled.button`
	background: none;
	border: none;
	color: ${({ theme }) => theme.accent};
	font-size: 1.2rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin: 0 auto;
	padding: 0.5rem 1rem;
	border-radius: 4px;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: ${({ theme }) => `${theme.accent}10`};
	}

	svg {
		transition: transform 0.3s ease;
	}
`;

const NeuroDivSection = styled.div`
	margin-top: 2rem;
	padding: 1.5rem;
	background-color: ${({ theme }) => `${theme.accent}10`};
	border-radius: 8px;
`;

const SectionTitle = styled.h2`
	color: ${({ theme }) => theme.accent};
	margin-bottom: 1rem;
	font-size: clamp(1.5rem, 3vw, 2rem);
`;

const SupportList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 1rem 0;

	li {
		margin: 0.8rem 0;
		padding-left: 1.5rem;
		position: relative;

		&:before {
			content: '•';
			color: ${({ theme }) => theme.accent};
			position: absolute;
			left: 0;
			font-weight: bold;
		}
	}
`;

const PDFViewer = styled.iframe`
	width: 100%;
	height: 800px;
	border: none;
	margin: 1rem 0;
	border-radius: 4px;
`;

const CVActions = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: center;
	margin-top: 1rem;
`;

const CVLink = styled.a`
	display: inline-block;
	padding: 0.8rem 1.5rem;
	background-color: ${({ theme }) => theme.accent};
	color: ${({ theme }) => theme.background};
	text-decoration: none;
	border-radius: 4px;
	font-weight: bold;
	transition: opacity 0.2s ease;

	&:hover {
		opacity: 0.9;
	}
`;

const CollapsibleContent = styled.div<{ $isOpen: boolean }>`
	max-height: ${(props) => (props.$isOpen ? '2000px' : '0')};
	overflow: hidden;
	transition: max-height 0.5s ease-in-out;
	opacity: ${(props) => (props.$isOpen ? '1' : '0')};
	transition: max-height 0.5s ease-in-out, opacity 0.3s ease-in-out;
`;

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
	<svg
		width='20'
		height='20'
		viewBox='0 0 20 20'
		fill='currentColor'
		style={{
			transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
		}}
	>
		<path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
	</svg>
);

const About = () => {
	const [isNeuroDivOpen, setIsNeuroDivOpen] = useState(false);

	return (
		<AboutContainer>
			<Title>About me</Title>
			<Content>
				<p>
					Hi, I'm Alex - also known as Jenko online and sometimes in person!
				</p>
				<p>
					I build things for fun primarily for the web space but also I work in
					the FinTech space in Risk & Compliance.
				</p>
				<p>
					I love learning by doing and will absorb knowledge much quicker that
					way. I'm also obsessed with knowing <b>why</b> about things, so will
					always push to try get that full context to support my understanding.
				</p>
				<p>
					I have ADHD and Autism (AuDHD) so speak pretty directly and
					accurately. Feel free to read more in my journey below!
				</p>
			</Content>

			<NeuroDivSection>
				<ToggleButton onClick={() => setIsNeuroDivOpen(!isNeuroDivOpen)}>
					My Neurodiversity Journey <ChevronIcon isOpen={isNeuroDivOpen} />
				</ToggleButton>

				<CollapsibleContent $isOpen={isNeuroDivOpen}>
					<Content>
						<p>
							I was in the pipeline to be diagnosed with a personaliy disorder
							until COVID happened. This led to a significant period of burnout,
							skill regression and finally a realisation that I had Autism AND
							ADHD. This combination is often referred to as AuDHD, and it
							shapes how I interact with the world in both challenging and
							beneficial ways.
						</p>
						<p>
							My neurodivergent traits contribute to my ability to think outside
							the box, notice patterns others might miss, and maintain intense
							focus on topics that interest me. However, they can also present
							challenges in certain environments and social situations.
						</p>

						<SectionTitle>
							How to best support my communication style
						</SectionTitle>
						<SupportList>
							<li>
								I appreciate direct, clear communication without implied
								meanings
							</li>
							<li>
								Written communication often works best for complex topics,
								allowing me to process information at my own pace
							</li>
							<li>
								I may need time to process information before responding,
								especially in meetings
							</li>
							<li>I tend to be very literal and precise in my communication</li>
							<li>I value structured environments and clear expectations</li>
							<li>
								I might need breaks during long social interactions to recharge
							</li>
						</SupportList>

						<SectionTitle>
							My reasonable adjustments for interviews
						</SectionTitle>
						<SupportList>
							<li>
								Using direct questions, prompts and follow ups as standard to
								get a signal
							</li>
							<li>Providing the questions in advance and in writing</li>
							<li>
								Any communication outside of required face-to-face interviews to
								be through text rather than verbally
							</li>
							<li>
								Where possible the interview to ran in a conversational style
								than a traditional format
							</li>
							<li>
								Provide clear written instructions, specifically for technical
								tasks as I struggle to process verbal instructions especially
								under time limits and pressure
							</li>
							<li>
								Where a structured interview is required utilising
								competency-based questions asking about specific experiences
								rather than hypothetical scenarios
							</li>
							<li>
								Any multi-part questions to be split into individual questions
								(where written questions are not provided)
							</li>
						</SupportList>
					</Content>
				</CollapsibleContent>
			</NeuroDivSection>

			<CVSection>
				<h2>My CV</h2>
				<PDFViewer src='/CV.pdf' title='CV Preview' />
				<CVActions>
					<CVLink href='/CV.pdf' target='_blank' rel='noopener noreferrer'>
						Open in New Tab
					</CVLink>
					<CVLink href='/CV.pdf' download>
						Download CV
					</CVLink>
				</CVActions>
			</CVSection>
		</AboutContainer>
	);
};

export default About;
