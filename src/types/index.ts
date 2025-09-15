export interface User {
  id: string;
  email: string;
  name: string;
  role: 'guest' | 'free' | 'premium' | 'admin';
  joinDate: string;
  subscriptionStatus?: 'active' | 'pending' | 'expired';
  subscriptionPlan?: 'basic' | 'pro';
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: number;
  isPremium: boolean;
  videoUrl?: string;
  thumbnailUrl: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  userId: string;
  userEmail: string;
  message: string;
  timestamp: string;
  adminReply?: string;
  adminReplyTimestamp?: string;
}

export interface PaymentProof {
  id: string;
  userId: string;
  plan: 'basic' | 'pro';
  amount: string;
  transactionId: string;
  screenshot: File | null;
  status: 'pending' | 'verified' | 'rejected';
  submittedAt: string;
}