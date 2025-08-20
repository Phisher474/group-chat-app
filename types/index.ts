export interface Group {
  id: string;
  title: string;
  description: string;
  memberCount: number;
  isJoined: boolean;
  lastActivity?: string;
}

export interface Message {
  id: string;
  groupId: string;
  content: string;
  author: string;
  timestamp: Date;
  isOwn?: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}