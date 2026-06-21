'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatDate, readingTime } from '@/lib/utils';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const timeToRead = readingTime(post.content);

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="card h-full flex flex-col overflow-hidden !p-0">
        {/* Featured Image */}
        <div className="relative h-52 w-full overflow-hidden bg-navy-800">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-800 to-navy-700">
              <span className="text-4xl font-bold text-navy-600">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
          {post.category && (
            <span className="absolute left-4 top-4 rounded-full bg-teal-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {post.category.name}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          {/* Meta */}
          <div className="mb-3 flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {timeToRead}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-lg font-bold leading-tight text-white transition-colors group-hover:text-teal-500">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-400 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {post.tags.split(',').slice(0, 3).map((tag) => (
                <span
                  key={tag.trim()}
                  className="rounded bg-navy-700/50 px-2 py-0.5 text-xs text-slate-400"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Read More */}
          <div className="flex items-center gap-1 text-sm font-medium text-teal-500 transition-all group-hover:gap-2">
            Read More
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </article>
    </Link>
  );
}
