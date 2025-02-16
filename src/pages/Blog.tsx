import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import { loadMarkdownFiles } from '../utils/markdown';

interface BlogPost {
	id: string;
	title: string;
	content: string;
	date: string;
	slug: string;
	tags: string[];
	series?: string;
	series_order?: number;
	summary?: string;
	draft: boolean;
}

const BlogContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
`;

const BlogPostPreview = styled(Link)`
	display: block;
	background-color: ${({ theme }) => theme.secondary};
	padding: 20px;
	border-radius: 8px;
	margin-bottom: 20px;
	text-decoration: none;
	color: inherit;
	transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
	border: 1px solid transparent;

	&:hover,
	&:focus {
		transform: translateY(-2px);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		border-color: ${({ theme }) => theme.primary};
		outline: none;
		text-decoration: none;
	}

	&:focus-visible {
		outline: 2px solid ${({ theme }) => theme.primary};
		outline-offset: 2px;
	}
`;

const BlogPostFull = styled.article`
	background-color: ${({ theme }) => theme.secondary};
	padding: 30px;
	border-radius: 8px;
	margin-bottom: 20px;
`;

const PostDate = styled.time`
	color: ${({ theme }) => theme.text};
	font-size: 0.9em;
	margin-bottom: 1em;
	display: block;
`;

const PostTitle = styled.h2`
	margin: 0 0 0.5em 0;
	font-size: 1.8em;
`;

const PostMeta = styled.div`
	margin: 1em 0;
	font-size: 0.9em;
	color: ${({ theme }) => theme.text};
`;

const TagList = styled.div`
	display: flex;
	color: ${({ theme }) => theme.text};
	gap: 0.5em;
	flex-wrap: wrap;
	margin-top: 0.5em;
`;

const Tag = styled.span`
	background-color: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
	border: 1px solid ${({ theme }) => theme.border};
	padding: 0.2em 0.6em;
	border-radius: 4px;
	font-size: 0.8em;
`;

const SeriesInfo = styled.div`
	background-color: ${({ theme }) => theme.primary}22;
	padding: 1em;
	border-radius: 4px;
	margin: 1em 0;
	color: ${({ theme }) => theme.text};

	a {
		color: ${({ theme }) => theme.text};
		text-decoration: none;
		padding: 2px 4px;
		border-radius: 2px;
		transition: background-color 0.2s ease-in-out;

		&:hover,
		&:focus {
			background-color: ${({ theme }) => theme.border};
			text-decoration: none;
		}

		&:focus-visible {
			outline: 2px solid ${({ theme }) => theme.primary};
			outline-offset: 2px;
		}
	}
`;

const PostContent = styled.div`
	line-height: 1.6;

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 1.5em 0 0.5em;
	}

	p {
		margin: 1em 0;
	}

	ul,
	ol {
		margin: 1em 0;
		padding-left: 2em;
	}

	a {
		color: ${({ theme }) => theme.text};
		text-decoration: underline;
		text-underline-offset: 2px;
		padding: 2px 4px;
		margin: 0 -4px;
		border-radius: 2px;
		transition: all 0.2s ease-in-out;

		&:hover,
		&:focus {
			background-color: ${({ theme }) => theme.border};
			text-decoration: underline;
			text-underline-offset: 3px;
		}

		&:focus-visible {
			outline: 2px solid ${({ theme }) => theme.primary};
			outline-offset: 2px;
		}
	}

	table {
		border-collapse: collapse;
		margin: 1em 0;
		width: 100%;
		font-size: 0.9em;
	}

	th {
		background-color: ${({ theme }) => theme.border};
		color: ${({ theme }) => theme.text};
		font-weight: bold;
		padding: 12px;
		text-align: left;
	}

	td {
		padding: 10px;
		border-bottom: 1px solid ${({ theme }) => theme.border};
	}

	tr:nth-child(even) {
		background-color: ${({ theme }) => theme.border}22;
	}

	tr:hover {
		background-color: ${({ theme }) => theme.border}44;
	}
`;

const BackLink = styled(Link)`
	display: inline-block;
	margin-bottom: 20px;
	color: ${({ theme }) => theme.text};
	text-decoration: none;
	padding: 4px 8px;
	margin-left: -8px;
	border-radius: 4px;
	transition: background-color 0.2s ease-in-out;

	&:hover,
	&:focus {
		text-decoration: none;
		background-color: ${({ theme }) => theme.border};
	}

	&:focus-visible {
		outline: 2px solid ${({ theme }) => theme.primary};
		outline-offset: 2px;
	}
`;

const Summary = styled.p`
	font-style: italic;
	color: ${({ theme }) => theme.text};
	margin: 1em 0;
`;

const BlogList = ({ posts }: { posts: BlogPost[] }) => (
	<BlogContainer>
		{posts.map((post) => (
			<BlogPostPreview key={post.id} to={`/blog/${post.slug}`}>
				<PostTitle>{post.title}</PostTitle>
				<PostDate>{new Date(post.date).toLocaleDateString()}</PostDate>
				{post.summary && <Summary>{post.summary}</Summary>}
				{post.tags && (
					<TagList>
						{post.tags.map((tag) => (
							<Tag key={tag}>{tag}</Tag>
						))}
					</TagList>
				)}
				{post.series && (
					<PostMeta>
						Part {post.series_order} of {post.series} series
					</PostMeta>
				)}
			</BlogPostPreview>
		))}
	</BlogContainer>
);

const SinglePost = ({ posts }: { posts: BlogPost[] }) => {
	const { slug } = useParams();
	const post = posts.find((p) => p.slug === slug);

	if (!post) {
		return <BlogContainer>Post not found</BlogContainer>;
	}

	// Find other posts in the same series
	const seriesPosts = post.series
		? posts
				.filter((p) => p.series === post.series)
				.sort((a, b) => (a.series_order || 0) - (b.series_order || 0))
		: [];

	return (
		<BlogContainer>
			<BackLink to='/blog'>← Back to all posts</BackLink>
			<BlogPostFull>
				<PostTitle>{post.title}</PostTitle>
				<PostDate>{new Date(post.date).toLocaleDateString()}</PostDate>
				{post.tags && (
					<TagList>
						{post.tags.map((tag) => (
							<Tag key={tag}>{tag}</Tag>
						))}
					</TagList>
				)}
				{post.series && (
					<SeriesInfo>
						<strong>{post.series} Series</strong> - Part {post.series_order}
						<div style={{ marginTop: '0.5em' }}>
							{seriesPosts.map((p, i) => (
								<div key={p.id}>
									{p.id === post.id ? (
										<strong>
											Part {i + 1}: {p.title}
										</strong>
									) : (
										<Link to={`/blog/${p.slug}`}>
											Part {i + 1}: {p.title}
										</Link>
									)}
								</div>
							))}
						</div>
					</SeriesInfo>
				)}
				{post.summary && <Summary>{post.summary}</Summary>}
				<PostContent>
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{post.content}
					</ReactMarkdown>
				</PostContent>
			</BlogPostFull>
		</BlogContainer>
	);
};

const Blog = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);

	useEffect(() => {
		const loadBlogPosts = async () => {
			try {
				const contents = await loadMarkdownFiles('blog', {
					arrayFields: ['tags'],
					numberFields: ['series_order'],
					booleanFields: ['draft'],
				});

				const loadedPosts = contents
					.map((content) => ({
						id: content.slug,
						title: content.frontmatter.title || content.slug,
						content: content.content,
						date: content.frontmatter.date || new Date().toISOString(),
						slug: content.slug,
						tags: content.frontmatter.tags || [],
						series: content.frontmatter.series,
						series_order: content.frontmatter.series_order,
						summary: content.frontmatter.summary,
						draft: content.frontmatter.draft || false,
					}))
					.filter((post) => !post.draft);

				setPosts(loadedPosts);
			} catch (error) {
				console.error('Error loading blog posts:', error);
			}
		};

		loadBlogPosts();
	}, []);

	return (
		<Routes>
			<Route path='/' element={<BlogList posts={posts} />} />
			<Route path='/:slug' element={<SinglePost posts={posts} />} />
		</Routes>
	);
};

export default Blog;
