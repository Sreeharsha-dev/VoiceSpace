export interface Message {
  id: string;
  text: string;
  createdAt: number;
  status: 'pending' | 'resolved';
  resolution?: string;
  category?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: number;
}
