import { Group, Message } from '@/types';

export const mockGroups: Group[] = [
  {
    id: '1',
    title: 'UI/UX Designers',
    description: 'A vibrant community for designers to share ideas, get feedback, and discuss the latest design trends and tools.',
    memberCount: 234,
    isJoined: false,
    lastActivity: '2 hours ago'
  },
  {
    id: '2', 
    title: 'React Native Developers',
    description: 'Connect with fellow React Native developers, share code snippets, solve challenges, and stay updated with the latest RN features.',
    memberCount: 567,
    isJoined: true,
    lastActivity: '30 minutes ago'
  },
  {
    id: '3',
    title: 'Startup Founders',
    description: 'Network with other entrepreneurs, share experiences, get advice on building your startup, and find potential co-founders.',
    memberCount: 189,
    isJoined: false,
    lastActivity: '1 day ago'
  },
  {
    id: '4',
    title: 'Product Managers',
    description: 'Discuss product strategy, user research, roadmap planning, and best practices in product management with industry experts.',
    memberCount: 445,
    isJoined: true,
    lastActivity: '4 hours ago'
  },
  {
    id: '5',
    title: 'Digital Marketing',
    description: 'Share marketing strategies, growth hacking techniques, analytics insights, and tools to grow your business online.',
    memberCount: 678,
    isJoined: false,
    lastActivity: '6 hours ago'
  },
  {
    id: '6',
    title: 'AI & Machine Learning',
    description: 'Explore the latest in artificial intelligence, machine learning algorithms, and discuss practical applications in various industries.',
    memberCount: 892,
    isJoined: false,
    lastActivity: '1 hour ago'
  }
];

export const mockMessages: { [groupId: string]: Message[] } = {
  '1': [
    {
      id: '1',
      groupId: '1',
      content: 'Hey everyone! Just wanted to share this amazing design system I found. It has some really innovative component patterns.',
      author: 'Sarah Chen',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isOwn: false
    },
    {
      id: '2',
      groupId: '1',
      content: 'That looks really interesting! Could you share the link? I\'m always looking for new design inspiration.',
      author: 'Mike Johnson',
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      isOwn: false
    },
    {
      id: '3',
      groupId: '1',
      content: 'I\'ve been working on something similar for our design team. Would love to get your feedback on the component library!',
      author: 'You',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      isOwn: true
    },
    {
      id: '4',
      groupId: '1',
      content: 'Absolutely! Feel free to share it here. We\'re always excited to see what the community is building.',
      author: 'Sarah Chen',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      isOwn: false
    }
  ],
  '2': [
    {
      id: '5',
      groupId: '2',
      content: 'Anyone know how to optimize React Native app performance for large lists? I\'m dealing with some lag issues.',
      author: 'Alex Rodriguez',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      isOwn: false
    },
    {
      id: '6',
      groupId: '2',
      content: 'FlatList with getItemLayout works great for me. Also try VirtualizedList for complex cases. What\'s your current implementation?',
      author: 'Emma Davis',
      timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
      isOwn: false
    },
    {
      id: '7',
      groupId: '2',
      content: 'Thanks! I\'ll try that approach. Also considering React Native Super Grid for my use case. The performance boost should be significant.',
      author: 'You',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isOwn: true
    },
    {
      id: '8',
      groupId: '2',
      content: 'Super Grid is excellent! Make sure to implement proper memoization with React.memo for your list items too.',
      author: 'Emma Davis',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isOwn: false
    }
  ],
  '4': [
    {
      id: '9',
      groupId: '4',
      content: 'What metrics do you all track for user engagement? Looking to improve our product analytics dashboard.',
      author: 'David Kim',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isOwn: false
    },
    {
      id: '10',
      groupId: '4',
      content: 'DAU, session duration, and feature adoption rates are key for us. We also track user journey completion rates.',
      author: 'Lisa Zhang',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isOwn: false
    },
    {
      id: '11',
      groupId: '4',
      content: 'Those are solid metrics! We\'ve also found cohort retention analysis really valuable for understanding long-term user behavior.',
      author: 'You',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isOwn: true
    }
  ]
};