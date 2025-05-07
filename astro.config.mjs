import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkToc from 'remark-toc';
import { getSiteConfig } from './src/utils/config';

// https://astro.build/config
export default defineConfig({
  site: getSiteConfig().url,
  integrations: [
    tailwind(),
    mdx({
      remarkPlugins: [remarkToc],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }]
      ],
      shikiConfig: {
        theme: 'github-dark',
        langs: ['html', 'css', 'js', 'ts', 'jsx', 'tsx', 'json', 'bash', 'md'],
        wrap: true
      }
    }),
    react(),
    sitemap()
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  output: 'static',
  image: {
    // Image service optimization configuration
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        jpeg: {
          quality: 80
        },
        png: {
          quality: 80
        },
        webp: {
          quality: 80
        },
        avif: {
          quality: 65 // Reduce AVIF quality to speed up processing
        }
      }
    },
    // Use faster formats for development environment
    dev: {
      format: 'webp' // Use WebP instead of AVIF in development environment
    }
  },
  vite: {
    build: {
      assetsInlineLimit: 4096, // Inline images smaller than 4kb as base64
    },
    // Optimize development server
    server: {
      watch: {
        usePolling: false
      },
      hmr: {
        overlay: true
      }
    }
  }
});