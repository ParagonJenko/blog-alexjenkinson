import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { loadMarkdownFiles } from '../utils/markdown';

interface Project {
	id: string;
	title: string;
	description: string;
	date: string;
	size: number;
	tech: string[];
	repository: string;
	live: string;
	version: string;
	status: string;
	content: string;
	slug: string;
	blog_posts: string[];
}

interface BlogPost {
	id: string;
	title: string;
	date: string;
	slug: string;
	summary?: string;
}

const blink = keyframes`
	0%, 100% { opacity: 1; }
	50% { opacity: 0; }
`;

const ProjectsContainer = styled.div`
	padding: 0 0 2rem 0;
	margin-top: 2rem;
`;

const Terminal = styled.div`
	border: 1px solid ${({ theme }) => theme.text};
	background: ${({ theme }) => theme.background};
	padding: 1rem;
	font-family: ${({ theme }) => theme.font};
	margin-bottom: 2rem;
`;

const TerminalHeader = styled.div`
	border-bottom: 1px double ${({ theme }) => theme.text};
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const TerminalTitle = styled.h1`
	margin: 0;
	font-size: 1.2rem;
`;

const TerminalContent = styled.div`
	white-space: pre-wrap;
`;

const Cursor = styled.span`
	display: inline-block;
	width: 0.6em;
	height: 1em;
	background: ${({ theme }) => theme.text};
	margin-left: 0.2em;
	animation: ${blink} 1s step-end infinite;
`;

const Command = styled.div`
	margin-bottom: 1rem;
	display: flex;
	align-items: center;

	&:before {
		content: 'C:\\>';
		margin-right: 0.5rem;
		color: ${({ theme }) => theme.specialAccent};
	}
`;

const Response = styled.div`
	margin-left: 2rem;
	margin-bottom: 1rem;
`;

const ProjectList = styled.div`
	display: grid;
	gap: 1rem;
`;

const ProjectItem = styled.div`
	border: 1px solid ${({ theme }) => theme.text};
	padding: 1rem;
`;

const ProjectTitle = styled.h3`
	margin: 0 0 0.5rem 0;
`;

const ProjectDescription = styled.p`
	margin: 0;
`;

const TechTag = styled.span`
	display: inline-block;
	padding: 0.2rem 0.5rem;
	margin: 0.5rem 0.5rem 0 0;
	border: 1px solid ${({ theme }) => theme.text};
	font-size: 0.9rem;
`;

const ProjectDetails = styled.div`
	margin-top: 1rem;
	padding-top: 1rem;
	border-top: 1px solid ${({ theme }) => theme.text};
`;

const ActionButton = styled.button`
	background: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
	border: 1px solid ${({ theme }) => theme.text};
	padding: 0.5rem 1rem;
	margin-right: 1rem;
	margin-top: 1rem;
	cursor: pointer;
	font-family: ${({ theme }) => theme.font};
	text-transform: uppercase;

	&:hover {
		background: ${({ theme }) => theme.text};
		color: ${({ theme }) => theme.background};
	}
`;

const FileSize = styled.span`
	color: ${({ theme }) => theme.specialAccent};
`;

const RelatedPosts = styled.div`
	margin-top: 1rem;
	padding-top: 1rem;
	border-top: 1px solid ${({ theme }) => theme.text};
`;

const PostLink = styled(Link)`
	display: block;
	padding: 0.5rem;
	margin: 0.5rem 0;
	color: ${({ theme }) => theme.text};
	text-decoration: none;
	border: 1px solid ${({ theme }) => theme.text};

	&:hover {
		background: ${({ theme }) => theme.text};
		color: ${({ theme }) => theme.background};
	}
`;

const Projects = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
	const [selectedProject, setSelectedProject] = useState<string | null>(null);
	const [currentCommand, setCurrentCommand] = useState('dir /projects');
	const [showCursor, setShowCursor] = useState(true);

	useEffect(() => {
		const loadContent = async () => {
			try {
				// Load projects
				const projectContents = await loadMarkdownFiles('project', {
					arrayFields: ['tech', 'blog_posts'],
					numberFields: ['size'],
				});

				const loadedProjects = projectContents.map((content) => ({
					id: content.slug,
					title: content.frontmatter.title || content.slug,
					description: content.frontmatter.description || '',
					date: content.frontmatter.date || new Date().toISOString(),
					size: content.frontmatter.size || 0,
					tech: content.frontmatter.tech || [],
					repository: content.frontmatter.repository || '',
					live: content.frontmatter.live || '',
					version: content.frontmatter.version || '1.0.0',
					status: content.frontmatter.status || 'In Development',
					content: content.content,
					slug: content.slug,
					blog_posts: content.frontmatter.blog_posts || [],
				}));

				// Load blog posts
				const blogContents = await loadMarkdownFiles('blog', {
					arrayFields: ['tags'],
					booleanFields: ['draft'],
				});

				const loadedBlogPosts = blogContents
					.filter((content) => !content.frontmatter.draft)
					.map((content) => ({
						id: content.slug,
						title: content.frontmatter.title || content.slug,
						date: content.frontmatter.date || new Date().toISOString(),
						slug: content.slug,
						summary: content.frontmatter.summary,
					}));

				setProjects(loadedProjects);
				setBlogPosts(loadedBlogPosts);
			} catch (error) {
				console.error('Error loading content:', error);
			}
		};

		loadContent();
	}, []);

	const handleProjectClick = (id: string) => {
		const project = projects.find((p) => p.id === id);
		if (!project) return;

		window.scrollTo({ top: 0, behavior: 'smooth' });
		setSelectedProject(id);
		setCurrentCommand(`type ${project.title.toLowerCase()}.txt`);
	};

	const handleViewProject = (link: string) => {
		setCurrentCommand(`start ${link}`);
		setTimeout(() => {
			window.open(link, '_blank');
		}, 500);
	};

	const handleBack = () => {
		setCurrentCommand('dir /projects');
		setSelectedProject(null);
	};

	const formatFileSize = (size: number) => {
		return size.toLocaleString() + ' KB';
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: '2-digit',
			month: '2-digit',
			day: '2-digit',
		});
	};

	return (
		<ProjectsContainer>
			<Terminal>
				<TerminalHeader>
					<TerminalTitle>DOS Projects Explorer v1.0</TerminalTitle>
					<span>{new Date().toLocaleString()}</span>
				</TerminalHeader>
				<TerminalContent>
					<Command>
						{currentCommand}
						{showCursor && <Cursor />}
					</Command>
					<Response>
						{selectedProject === null ? (
							<>
								Directory of C:\\projects
								{projects.map((project, index) => (
									<div
										key={project.id}
										style={{ cursor: 'pointer' }}
										onClick={() => handleProjectClick(project.id)}
									>
										{`${index + 1}.`.padEnd(6)}
										{project.title.toLowerCase().padEnd(30)}
										{formatDate(project.date)}
										{' '.repeat(5)}
										<FileSize>{formatFileSize(project.size)}</FileSize>
									</div>
								))}
								{projects.length} File(s){' '}
								{projects
									.reduce((acc, curr) => acc + curr.size, 0)
									.toLocaleString()}{' '}
								KB free
							</>
						) : (
							<>
								{selectedProject && (
									<div>
										<div>{`PROJECT: ${
											projects.find((p) => p.id === selectedProject)?.title
										}`}</div>
										<div>{`VERSION: ${
											projects.find((p) => p.id === selectedProject)?.version
										}`}</div>
										<div>{`STATUS: ${
											projects.find((p) => p.id === selectedProject)?.status
										}`}</div>
										<div>{`LAST UPDATE: ${formatDate(
											projects.find((p) => p.id === selectedProject)?.date || ''
										)}`}</div>
										<div>{`REPOSITORY: ${
											projects.find((p) => p.id === selectedProject)?.repository
										}`}</div>
										<div>{`LIVE DEMO: ${
											projects.find((p) => p.id === selectedProject)?.live
										}`}</div>
										<ReactMarkdown>
											{projects.find((p) => p.id === selectedProject)
												?.content || ''}
										</ReactMarkdown>

										{/* Display related blog posts */}
										{(() => {
											const selectedProjectData = projects.find(
												(p) => p.id === selectedProject
											);
											if (
												!selectedProjectData ||
												!selectedProjectData.blog_posts?.length
											) {
												return null;
											}
											return (
												<RelatedPosts>
													<h3>Related Blog Posts:</h3>
													{selectedProjectData.blog_posts.map((postSlug) => {
														const post = blogPosts.find(
															(p) => p.slug === postSlug
														);
														return (
															post && (
																<PostLink
																	key={post.slug}
																	to={`/blog/${post.slug}`}
																>
																	{post.title}
																	<br />
																	<small>
																		{new Date(post.date).toLocaleDateString()}
																	</small>
																	{post.summary && <p>{post.summary}</p>}
																</PostLink>
															)
														);
													})}
												</RelatedPosts>
											);
										})()}
									</div>
								)}

								<ProjectDetails>
									<ActionButton
										onClick={() =>
											handleViewProject(
												projects.find((p) => p.id === selectedProject)?.live ||
													projects.find((p) => p.id === selectedProject)
														?.repository ||
													''
											)
										}
									>
										View Live Project
									</ActionButton>
									<ActionButton
										onClick={() =>
											handleViewProject(
												projects.find((p) => p.id === selectedProject)
													?.repository || ''
											)
										}
									>
										View Repository
									</ActionButton>
									<ActionButton onClick={handleBack}>Back</ActionButton>
								</ProjectDetails>
							</>
						)}
					</Response>
				</TerminalContent>
			</Terminal>

			<ProjectList>
				{projects.map((project) => (
					<ProjectItem key={project.id}>
						<ProjectTitle>{project.title}</ProjectTitle>
						<ProjectDescription>{project.description}</ProjectDescription>
						<div>
							{project.tech.map((tech) => (
								<TechTag key={tech}>{tech}</TechTag>
							))}
						</div>
						<ProjectDetails>
							<div>Created: {formatDate(project.date)}</div>
							<div>Size: {formatFileSize(project.size)}</div>
							<div>Status: {project.status}</div>
							<ActionButton onClick={() => handleProjectClick(project.id)}>
								View Details
							</ActionButton>
							{project.live && (
								<ActionButton onClick={() => handleViewProject(project.live)}>
									View Live
								</ActionButton>
							)}
							<ActionButton
								onClick={() => handleViewProject(project.repository)}
							>
								View Repository
							</ActionButton>
						</ProjectDetails>
					</ProjectItem>
				))}
			</ProjectList>
		</ProjectsContainer>
	);
};

export default Projects;
