declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"advanced-css-animations.mdx": {
	id: "advanced-css-animations.mdx";
  slug: "advanced-css-animations";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"css-animation-techniques.mdx": {
	id: "css-animation-techniques.mdx";
  slug: "css-animation-techniques";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"css-flexbox-layout-guide.mdx": {
	id: "css-flexbox-layout-guide.mdx";
  slug: "css-flexbox-layout-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"css-grid-complete-guide.mdx": {
	id: "css-grid-complete-guide.mdx";
  slug: "css-grid-complete-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"css-grid-system-guide.mdx": {
	id: "css-grid-system-guide.mdx";
  slug: "css-grid-system-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"css-variables-custom-properties.mdx": {
	id: "css-variables-custom-properties.mdx";
  slug: "css-variables-custom-properties";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"docker-for-web-developers.mdx": {
	id: "docker-for-web-developers.mdx";
  slug: "docker-for-web-developers";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"getting-started-with-astro.mdx": {
	id: "getting-started-with-astro.mdx";
  slug: "getting-started-with-astro";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"git-workflow-for-teams.mdx": {
	id: "git-workflow-for-teams.mdx";
  slug: "git-workflow-for-teams";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"javascript-promises-explained.mdx": {
	id: "javascript-promises-explained.mdx";
  slug: "javascript-promises-explained";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"nextjs-vs-remix.mdx": {
	id: "nextjs-vs-remix.mdx";
  slug: "nextjs-vs-remix";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"nodejs-performance-optimization.mdx": {
	id: "nodejs-performance-optimization.mdx";
  slug: "nodejs-performance-optimization";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"react-hooks-explained.mdx": {
	id: "react-hooks-explained.mdx";
  slug: "react-hooks-explained";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"tailwind-css-best-practices.mdx": {
	id: "tailwind-css-best-practices.mdx";
  slug: "tailwind-css-best-practices";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"web-accessibility-best-practices.mdx": {
	id: "web-accessibility-best-practices.mdx";
  slug: "web-accessibility-best-practices";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"why-typescript-is-worth-learning.mdx": {
	id: "why-typescript-is-worth-learning.mdx";
  slug: "why-typescript-is-worth-learning";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
};
"projects": {
"modern-blog-template.mdx": {
	id: "modern-blog-template.mdx";
  slug: "modern-blog-template";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"portfolio-website.mdx": {
	id: "portfolio-website.mdx";
  slug: "portfolio-website";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
