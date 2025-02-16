interface FrontmatterParseOptions {
	arrayFields?: string[];
	numberFields?: string[];
	booleanFields?: string[];
}

export interface MarkdownContent {
	frontmatter: Record<string, any>;
	content: string;
	slug: string;
}

export type ContentType = 'blog' | 'project';

/**
 * Parses frontmatter from markdown content with type handling
 */
export const parseFrontmatter = (
	content: string,
	options: FrontmatterParseOptions = {}
): MarkdownContent => {
	const [, frontmatter = '', ...contentParts] = content.split('---');
	const mainContent = contentParts.join('---').trim();
	const frontmatterLines = frontmatter.trim().split('\n');
	const metadata: Record<string, any> = {};

	frontmatterLines.forEach((line) => {
		const [key, ...valueParts] = line.split(':').map((part) => part.trim());
		if (key && valueParts.length) {
			let value = valueParts.join(':').trim();

			// Remove quotes if present
			if (value.startsWith("'") && value.endsWith("'")) {
				value = value.slice(1, -1);
			}

			// Handle arrays
			if (options.arrayFields?.includes(key)) {
				metadata[key] =
					value.startsWith('[') && value.endsWith(']')
						? value
								.slice(1, -1)
								.split(',')
								.map((v) => v.trim().replace(/['"]/g, ''))
						: [];
			}
			// Handle numbers
			else if (options.numberFields?.includes(key)) {
				metadata[key] = !isNaN(Number(value)) ? Number(value) : 0;
			}
			// Handle booleans
			else if (options.booleanFields?.includes(key)) {
				metadata[key] = value === 'true';
			}
			// Default string handling
			else {
				metadata[key] = value;
			}
		}
	});

	return {
		frontmatter: metadata,
		content: mainContent,
		slug: '', // Will be set by the loading function
	};
};

/**
 * Loads markdown files from a directory and parses them
 */
export const loadMarkdownFiles = async (
	contentType: ContentType,
	options: FrontmatterParseOptions = {}
): Promise<MarkdownContent[]> => {
	let files: Record<string, string>;

	// Use literal patterns based on content type
	if (contentType === 'blog') {
		files = import.meta.glob('/src/content/blog/**/*.{md,mdx}', {
			as: 'raw',
			eager: true,
		});
	} else {
		files = import.meta.glob('/src/content/projects/**/*.md', {
			as: 'raw',
			eager: true,
		});
	}

	return Object.entries(files).map(([filepath, content]) => {
		const parsed = parseFrontmatter(content, options);

		// Generate slug from filepath
		const pathParts = filepath.split('/');
		const filename = pathParts[pathParts.length - 1]
			.replace('.mdx', '')
			.replace('.md', '');
		parsed.slug = filename.toLowerCase();

		return parsed;
	});
};

/**
 * Sorts markdown content by date
 */
export const sortByDate = (contents: MarkdownContent[]): MarkdownContent[] => {
	return [...contents].sort(
		(a, b) =>
			new Date(b.frontmatter.date).getTime() -
			new Date(a.frontmatter.date).getTime()
	);
};
