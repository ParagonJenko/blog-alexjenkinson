import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiBuymeacoffee, SiKofi } from 'react-icons/si';
import styled from 'styled-components';

const LinksContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
`;

const LinkCard = styled.a`
	display: block;
	padding: 15px;
	margin: 10px 0;
	background-color: ${({ theme }) => theme.secondary};
	border-radius: 8px;
	transition: transform 0.2s;
	display: flex;
	align-items: center;
	gap: 12px;

	&:hover {
		transform: translateY(-2px);
		text-decoration: none;
	}
`;

const SectionTitle = styled.h2`
	margin: 30px 0 15px;
	color: ${({ theme }) => theme.text};
`;

const IconWrapper = styled.span`
	font-size: 1.5rem;
	display: flex;
	align-items: center;
`;

const Links = () => {
	return (
		<LinksContainer>
			<h1>Important Links</h1>
			<LinkCard href='https://github.com/paragonjenko' target='_blank'>
				<IconWrapper>
					<FaGithub />
				</IconWrapper>
				GitHub Profile
			</LinkCard>
			<LinkCard
				href='https://www.linkedin.com/in/alex-jenkinson/'
				target='_blank'
			>
				<IconWrapper>
					<FaLinkedin />
				</IconWrapper>
				LinkedIn Profile
			</LinkCard>
			<LinkCard href='https://twitter.com/paragonjenko' target='_blank'>
				<IconWrapper>
					<FaTwitter />
				</IconWrapper>
				Twitter Profile
			</LinkCard>

			<SectionTitle>Donate to my work</SectionTitle>
			<LinkCard href='https://buymeacoffee.com/paragonjenko' target='_blank'>
				<IconWrapper>
					<SiBuymeacoffee />
				</IconWrapper>
				Buy Me a Coffee
			</LinkCard>
			<LinkCard href='https://ko-fi.com/paragonjenko' target='_blank'>
				<IconWrapper>
					<SiKofi />
				</IconWrapper>
				Support on Ko-fi
			</LinkCard>
		</LinksContainer>
	);
};

export default Links;
