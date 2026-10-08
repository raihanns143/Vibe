import { User, Post, NotificationItem, Conversation } from '../types';

export const AVATAR_PRESETS = {
  alex: '/assets/avatars/alex.svg',
  elena: '/assets/avatars/elena.svg',
  marcus: '/assets/avatars/marcus.svg',
  maya: '/assets/avatars/maya.svg',
  david: '/assets/avatars/david.svg',
  sophia: '/assets/avatars/sophia.svg',
};

export const COVER_PRESETS = {
  defaultCover: '/assets/posts/workspace.svg',
  architecture: '/assets/posts/architecture.svg',
};

export const POST_MEDIA_PRESETS = {
  workspace: '/assets/posts/workspace.svg',
  architecture: '/assets/posts/architecture.svg',
  typography: '/assets/posts/typography.svg',
};

export const INITIAL_CURRENT_USER: User = {
  id: 'user_alex',
  name: 'Alex Chen',
  username: 'alexchen',
  avatar: AVATAR_PRESETS.alex,
  coverImage: COVER_PRESETS.defaultCover,
  bio: 'Staff Product Designer & Interface Craftsman. Obsessed with high-density layouts, micro-interactions, and dark mode.',
  location: 'San Francisco, CA',
  website: 'https://alexchen.design',
  joinedDate: 'March 2024',
  followersCount: 1420,
  followingCount: 388,
  verified: true,
};

export const INITIAL_USERS: User[] = [
  INITIAL_CURRENT_USER,
  {
    id: 'user_elena',
    name: 'Elena Vance',
    username: 'elenavance',
    avatar: AVATAR_PRESETS.elena,
    coverImage: COVER_PRESETS.architecture,
    bio: 'Systems architect building distributed peer protocols. Less code, higher throughput. Exploring verifiable state machines.',
    location: 'Berlin, DE',
    website: 'https://vance.systems',
    joinedDate: 'January 2024',
    followersCount: 3840,
    followingCount: 290,
    isFollowing: true,
    verified: true,
  },
  {
    id: 'user_marcus',
    name: 'Marcus Thorne',
    username: 'mthorne',
    avatar: AVATAR_PRESETS.marcus,
    coverImage: COVER_PRESETS.defaultCover,
    bio: 'Creative technologist & shader artist. Experimenting with WebGL, raymarching, and spatial design.',
    location: 'Tokyo, JP',
    website: 'https://thorne.dev',
    joinedDate: 'April 2024',
    followersCount: 2190,
    followingCount: 412,
    isFollowing: false,
    verified: false,
  },
  {
    id: 'user_maya',
    name: 'Maya Lin',
    username: 'mayalin',
    avatar: AVATAR_PRESETS.maya,
    coverImage: COVER_PRESETS.architecture,
    bio: 'Product Designer. Obsessed with typography, zero-pill hierarchies, and tactile mechanical keyboards.',
    location: 'Seattle, WA',
    website: 'https://mayalin.design',
    joinedDate: 'February 2024',
    followersCount: 5210,
    followingCount: 640,
    isFollowing: true,
    verified: true,
  },
  {
    id: 'user_david',
    name: 'David Kim',
    username: 'davidk',
    avatar: AVATAR_PRESETS.david,
    coverImage: COVER_PRESETS.defaultCover,
    bio: 'Staff Engineer. Open source maintainer, Rust enthusiast, making browser engines performant.',
    location: 'Austin, TX',
    website: 'https://dkim.tech',
    joinedDate: 'November 2023',
    followersCount: 1890,
    followingCount: 210,
    isFollowing: false,
    verified: false,
  },
  {
    id: 'user_sophia',
    name: 'Sophia Rossi',
    username: 'sophia_r',
    avatar: AVATAR_PRESETS.sophia,
    coverImage: COVER_PRESETS.architecture,
    bio: 'Architectural photographer & essayist. Documenting brutalist concrete structures across Europe.',
    location: 'Milan, IT',
    website: 'https://sophiarossi.photo',
    joinedDate: 'May 2024',
    followersCount: 4150,
    followingCount: 310,
    isFollowing: true,
    verified: true,
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_1',
    author: INITIAL_USERS[3], // Maya Lin
    content:
      "The best interfaces don't scream for attention. They get completely out of the user's way. Generous whitespace, precise typography, zero unnecessary pills, and instantaneous feedback.\n\nCraft is what happens when every pixel has a specific reason to exist.",
    createdAt: '22m ago',
    likesCount: 142,
    commentsCount: 18,
    sharesCount: 29,
    isLiked: false,
    isBookmarked: true,
    tags: ['Design', 'UI', 'Craftsmanship'],
    mediaUrl: POST_MEDIA_PRESETS.typography,
    mediaType: 'image',
    comments: [
      {
        id: 'c1',
        postId: 'post_1',
        author: INITIAL_CURRENT_USER,
        content: 'Could not agree more. Restraint is the hardest design skill to master.',
        createdAt: '15m ago',
        likesCount: 12,
        isLiked: true,
      },
      {
        id: 'c2',
        postId: 'post_1',
        author: INITIAL_USERS[1], // Elena Vance
        content:
          'Same principle applies to distributed system APIs. Simpler surface area = fewer failure modes.',
        createdAt: '8m ago',
        likesCount: 6,
        isLiked: false,
      },
    ],
  },
  {
    id: 'post_2',
    author: INITIAL_USERS[1], // Elena Vance
    content:
      'Profiling query latencies under synthetic load. Replaced the nested JSON serializer with zero-copy binary buffers. Dropped P99 response time from 14.8ms down to 1.1ms.',
    createdAt: '2h ago',
    likesCount: 89,
    commentsCount: 11,
    sharesCount: 14,
    isLiked: true,
    isBookmarked: false,
    tags: ['Engineering', 'Performance', 'Rust'],
    poll: {
      question: 'Which backend strategy should ship next?',
      voted: false,
      options: [
        { id: 'poll_zero_copy', label: 'Zero-copy buffers', votes: 42 },
        { id: 'poll_streaming', label: 'Streaming responses', votes: 31 },
        { id: 'poll_caching', label: 'Adaptive caching', votes: 18 },
      ],
    },
    codeSnippet: {
      language: 'rust',
      code: `// Zero-copy event ring buffer
pub struct EventRing<T> {
    buffer: Arc<RwLock<VecDeque<T>>>,
    capacity: usize,
}

impl<T: Clone> EventRing<T> {
    pub fn push(&self, item: T) -> Result<(), BufferError> {
        // Direct pointer exchange without realloc
        self.buffer.write().push_back(item);
        Ok(())
    }
}`,
    },
    comments: [
      {
        id: 'c3',
        postId: 'post_2',
        author: INITIAL_USERS[4], // David Kim
        content: 'Massive win. Are you handling thread contention via spinlocks or parking_lot?',
        createdAt: '1h ago',
        likesCount: 4,
        isLiked: false,
      },
    ],
  },
  {
    id: 'post_3',
    author: INITIAL_CURRENT_USER, // Alex Chen
    content:
      'Shipped a refreshed theme engine for Vibe today. Dark-first canvas (#0A0A0C), subtle hairline borders, and deep crimson highlights (#DC2626). Built for speed, responsive ergonomics, and zero distractions.',
    createdAt: '4h ago',
    likesCount: 231,
    commentsCount: 34,
    sharesCount: 47,
    isLiked: true,
    isBookmarked: true,
    tags: ['Vibe', 'Product', 'Release'],
    mediaUrl: POST_MEDIA_PRESETS.workspace,
    mediaType: 'image',
    comments: [
      {
        id: 'c4',
        postId: 'post_3',
        author: INITIAL_USERS[2], // Marcus Thorne
        content:
          'The crimson accent against deep charcoal is stunning. Very Apple x Linear aesthetic.',
        createdAt: '3h ago',
        likesCount: 15,
        isLiked: false,
      },
    ],
  },
  {
    id: 'post_4',
    author: INITIAL_USERS[5], // Sophia Rossi
    content:
      'Documenting the morning fog over the concrete galleries in Milan. Light cut through the slit windows like a geometric blade.',
    createdAt: '6h ago',
    likesCount: 312,
    commentsCount: 22,
    sharesCount: 56,
    isLiked: false,
    isBookmarked: false,
    tags: ['Photography', 'Architecture'],
    mediaUrl: POST_MEDIA_PRESETS.architecture,
    mediaType: 'image',
    comments: [],
  },
  {
    id: 'post_5',
    author: INITIAL_USERS[2], // Marcus Thorne
    content:
      'Most developers over-complicate physics simulations in WebGL. You do not need heavy engines for particle ribbons. Simple Verlet integration with compute shaders delivers 120 FPS on mobile GPUs without breaking a sweat.',
    createdAt: '11h ago',
    likesCount: 94,
    commentsCount: 8,
    sharesCount: 19,
    isLiked: false,
    isBookmarked: false,
    tags: ['WebGL', 'CreativeCoding'],
    comments: [],
  },
  {
    id: 'post_6',
    author: INITIAL_USERS[4], // David Kim
    content:
      'Hot take: TypeScript strict mode should be the default for any repository with more than two contributors. The time you think you save by skipping type definitions is paid back 10x in debugging production race conditions.',
    createdAt: '1d ago',
    likesCount: 418,
    commentsCount: 63,
    sharesCount: 82,
    isLiked: true,
    isBookmarked: false,
    tags: ['TypeScript', 'SoftwareEngineering'],
    comments: [],
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'like',
    user: INITIAL_USERS[3], // Maya Lin
    postId: 'post_3',
    postSnippet: 'Shipped a refreshed theme engine for Vibe today...',
    createdAt: '12m ago',
    isRead: false,
  },
  {
    id: 'notif_2',
    type: 'comment',
    user: INITIAL_USERS[2], // Marcus Thorne
    postId: 'post_3',
    postSnippet: 'The crimson accent against deep charcoal is stunning...',
    createdAt: '35m ago',
    isRead: false,
  },
  {
    id: 'notif_3',
    type: 'follow',
    user: INITIAL_USERS[5], // Sophia Rossi
    createdAt: '2h ago',
    isRead: true,
  },
  {
    id: 'notif_4',
    type: 'mention',
    user: INITIAL_USERS[1], // Elena Vance
    postId: 'post_1',
    postSnippet: 'Elena Vance mentioned you in a comment...',
    createdAt: '5h ago',
    isRead: true,
  },
  {
    id: 'notif_5',
    type: 'like',
    user: INITIAL_USERS[4], // David Kim
    postId: 'post_3',
    postSnippet: 'Shipped a refreshed theme engine for Vibe today...',
    createdAt: '1d ago',
    isRead: true,
  },
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_maya',
    participant: INITIAL_USERS[3], // Maya Lin
    unreadCount: 1,
    lastActivity: '14m ago',
    messages: [
      {
        id: 'm1',
        senderId: 'user_maya',
        content: 'Hey Alex! Loved your write-up on high-density interface grids.',
        createdAt: '10:15 AM',
      },
      {
        id: 'm2',
        senderId: 'user_alex',
        content: 'Thanks Maya! The feedback on the typographic rhythm was super helpful.',
        createdAt: '10:20 AM',
      },
      {
        id: 'm3',
        senderId: 'user_maya',
        content:
          'Are you publishing the token structure soon? Would love to reference it for our new design system.',
        createdAt: '10:32 AM',
      },
    ],
  },
  {
    id: 'conv_elena',
    participant: INITIAL_USERS[1], // Elena Vance
    unreadCount: 0,
    lastActivity: '3h ago',
    messages: [
      {
        id: 'm4',
        senderId: 'user_elena',
        content: 'Did you check out the zero-copy buffer benchmarks?',
        createdAt: 'Yesterday',
      },
      {
        id: 'm5',
        senderId: 'user_alex',
        content: 'Insane numbers! 1.1ms P99 is wild. Dropping that into the telemetry collector.',
        createdAt: 'Yesterday',
      },
    ],
  },
  {
    id: 'conv_marcus',
    participant: INITIAL_USERS[2], // Marcus Thorne
    unreadCount: 0,
    lastActivity: '1d ago',
    messages: [
      {
        id: 'm6',
        senderId: 'user_marcus',
        content:
          'Working on a custom GLSL shader transition for post cards. Will send you a demo later this week.',
        createdAt: 'Oct 6',
      },
      {
        id: 'm7',
        senderId: 'user_alex',
        content: 'Excited to see it! Keep the GPU memory footprint light for mobile.',
        createdAt: 'Oct 6',
      },
    ],
  },
  {
    id: 'conv_sophia',
    participant: INITIAL_USERS[5], // Sophia Rossi
    unreadCount: 0,
    lastActivity: '2d ago',
    messages: [
      {
        id: 'm8',
        senderId: 'user_sophia',
        content: 'Thanks for following along with the Milan architecture series!',
        createdAt: 'Oct 5',
      },
    ],
  },
];

export const TRENDING_TOPICS = [
  { tag: '#designsystems', category: 'Technology', count: '14.2k vibes' },
  { tag: '#interfaces', category: 'Design', count: '9.8k vibes' },
  { tag: '#webgl', category: 'Creative Tech', count: '8.4k vibes' },
  { tag: '#rustlang', category: 'Engineering', count: '6.7k vibes' },
  { tag: '#brutalism', category: 'Architecture', count: '4.9k vibes' },
  { tag: '#typescript', category: 'Development', count: '12.3k vibes' },
];

export const CATEGORIES = [
  'All',
  'Design',
  'Engineering',
  'Architecture',
  'WebGL',
  'TypeScript',
  'Photography',
];
