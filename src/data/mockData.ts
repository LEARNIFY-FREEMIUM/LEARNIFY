import { Tutorial, ChatMessage } from '../types';

export const mockTutorials: Tutorial[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals: Getting Started',
    description: 'Learn the basics of JavaScript programming with hands-on examples and practical exercises.',
    content: `# JavaScript Fundamentals

## Introduction
JavaScript is the programming language of the web. In this tutorial, you'll learn the core concepts that every JavaScript developer needs to know.

## Variables and Data Types
JavaScript has several data types including strings, numbers, booleans, and objects...

## Functions
Functions are reusable blocks of code. Here's how to create and use them...

## Conclusion
With these fundamentals, you're ready to start building amazing web applications!`,
    category: 'Programming',
    author: 'Admin User',
    publishDate: '2024-01-15',
    readTime: 8,
    isPremium: false,
    thumbnailUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['javascript', 'programming', 'beginner'],
  },
  {
    id: '2',
    title: 'Advanced React Patterns & Hooks',
    description: 'Master advanced React concepts including custom hooks, context patterns, and performance optimization.',
    content: `# Advanced React Patterns

## Custom Hooks
Learn how to create reusable logic with custom hooks...

## Context Patterns
Understanding React Context for state management...

## Performance Optimization
Techniques to make your React apps blazingly fast...`,
    category: 'Programming',
    author: 'Admin User',
    publishDate: '2024-01-20',
    readTime: 12,
    isPremium: true,
    videoUrl: 'https://example.com/react-video',
    thumbnailUrl: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['react', 'hooks', 'advanced'],
  },
  {
    id: '3',
    title: 'Productivity Hacks for Remote Work',
    description: 'Discover proven strategies to boost your productivity while working from home.',
    content: `# Productivity Hacks for Remote Work

## Setting Up Your Workspace
Create an environment that promotes focus and creativity...

## Time Management Techniques
Learn the Pomodoro Technique and time-blocking strategies...

## Communication Best Practices
Master virtual collaboration and remote team dynamics...`,
    category: 'Productivity',
    author: 'Admin User',
    publishDate: '2024-01-25',
    readTime: 6,
    isPremium: false,
    thumbnailUrl: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['productivity', 'remote-work', 'tips'],
  },
  {
    id: '4',
    title: 'Digital Marketing Masterclass',
    description: 'Complete guide to digital marketing including SEO, social media, and content strategy.',
    content: `# Digital Marketing Masterclass

## SEO Fundamentals
Learn how to optimize your content for search engines...

## Social Media Strategy
Build a presence that converts followers into customers...

## Content Marketing
Create valuable content that drives engagement and sales...`,
    category: 'Marketing',
    author: 'Admin User',
    publishDate: '2024-02-01',
    readTime: 15,
    isPremium: true,
    videoUrl: 'https://example.com/marketing-video',
    thumbnailUrl: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['marketing', 'seo', 'social-media'],
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    userId: '2',
    userEmail: 'premium@test.com',
    message: 'Hi! I have a question about the React hooks tutorial. Can you explain useCallback in more detail?',
    timestamp: '2024-02-05T10:30:00Z',
    adminReply: 'Great question! useCallback is used to memoize functions to prevent unnecessary re-renders...',
    adminReplyTimestamp: '2024-02-05T11:00:00Z',
  },
  {
    id: '2',
    userId: '2',
    userEmail: 'premium@test.com',
    message: 'Could you recommend some practice projects for JavaScript beginners?',
    timestamp: '2024-02-06T14:15:00Z',
  },
];