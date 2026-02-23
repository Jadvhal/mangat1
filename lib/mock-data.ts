export interface Chapter {
  id: string;
  number: number;
  pages: number;
  released: string;
}

export interface Manga {
  id: string;
  title: string;
  author: string;
  status: string;
  type: string;
  genres: string[];
  cover: string;
  synopsis: string;
  updated: string;
  views: number;
  chapters: Chapter[];
  latestChapter: number;
  releasedAgo: string;
  unreadCount?: number;
}

export const mockManga: Manga[] = [
  {
    id: "tower-dungeon",
    title: "Tower Dungeon",
    author: "Nihei Tsutomu",
    status: "ongoing",
    type: "Manga",
    genres: ["Adventure", "Supernatural", "Drama", "Fantasy", "Action", "Shounen"],
    cover: "https://picsum.photos/seed/tower/400/600",
    synopsis: "A mysterious tower dungeon appears, bringing monsters and magic to the world.",
    updated: "December 27, 2025",
    views: 1200,
    latestChapter: 3,
    releasedAgo: "2 hours ago",
    chapters: [
      { id: "c3", number: 3, pages: 24, released: "December 27, 2025" },
      { id: "c2", number: 2, pages: 22, released: "December 20, 2025" },
      { id: "c1", number: 1, pages: 45, released: "December 13, 2025" },
    ]
  },
  {
    id: "my-bias-gets-on-the-last-train",
    title: "My Bias Gets on the Last Train",
    author: "Jixksee",
    status: "ongoing",
    type: "Manwha",
    genres: ["Romance", "Drama"],
    cover: "https://picsum.photos/seed/bias/400/600",
    synopsis: "A heartwarming story about catching the last train and meeting your idol.",
    updated: "December 26, 2025",
    views: 850,
    latestChapter: 24,
    releasedAgo: "5 hours ago",
    chapters: [
      { id: "c24", number: 24, pages: 18, released: "December 26, 2025" },
    ]
  },
  {
    id: "lord-of-money",
    title: "Lord of Money",
    author: "Toyou's Dream",
    status: "ongoing",
    type: "Manwha",
    genres: ["Action", "Drama", "Fantasy"],
    cover: "https://picsum.photos/seed/money/400/600",
    synopsis: "Reborn with the power of money, he will conquer the corporate world.",
    updated: "December 25, 2025",
    views: 2300,
    latestChapter: 112,
    releasedAgo: "1 day ago",
    chapters: []
  },
  {
    id: "nitos-lazy-foreign-world-syndrome",
    title: "Nito's Lazy Foreign World Syndrome",
    author: "Garuka",
    status: "ongoing",
    type: "Manga",
    genres: ["Fantasy", "Isekai", "Action"],
    cover: "https://picsum.photos/seed/nito/400/600",
    synopsis: "Summoned to another world, Nito decides to live a lazy life.",
    updated: "December 24, 2025",
    views: 1500,
    latestChapter: 45,
    releasedAgo: "2 days ago",
    chapters: []
  },
  {
    id: "tsumiki-ogamis-not-so-ordinary-life",
    title: "Tsumiki Ogami's Not-So-Ordinary Life",
    author: "Miyu Morishita",
    status: "ongoing",
    type: "Manga",
    genres: ["Comedy", "Slice of Life", "Supernatural"],
    cover: "https://picsum.photos/seed/tsumiki/400/600",
    synopsis: "The daily life of a girl with extraordinary powers.",
    updated: "December 27, 2025",
    views: 900,
    latestChapter: 85,
    releasedAgo: "5 hours ago",
    unreadCount: 0,
    chapters: []
  },
  {
    id: "tou-no-kanri-o-shite-miyou",
    title: "Tou no Kanri o Shite Miyou",
    author: "Hayate",
    status: "ongoing",
    type: "Manga",
    genres: ["Fantasy", "Slice of Life"],
    cover: "https://picsum.photos/seed/tou/400/600",
    synopsis: "Managing a tower in another world.",
    updated: "December 26, 2025",
    views: 1100,
    latestChapter: 89,
    releasedAgo: "16 hours ago",
    unreadCount: 41,
    chapters: []
  },
  {
    id: "the-sss-ranker-returns",
    title: "The SSS-Ranker Returns",
    author: "Unknown",
    status: "ongoing",
    type: "Manwha",
    genres: ["Action", "Fantasy"],
    cover: "https://picsum.photos/seed/sss/400/600",
    synopsis: "The strongest ranker returns to the past.",
    updated: "December 26, 2025",
    views: 3400,
    latestChapter: 173,
    releasedAgo: "16 hours ago",
    unreadCount: 116,
    chapters: []
  },
  {
    id: "the-return-of-the-disaster-class-hero",
    title: "The Return of the Disaster-Class Hero",
    author: "SAN.G",
    status: "ongoing",
    type: "Manwha",
    genres: ["Action", "Fantasy"],
    cover: "https://picsum.photos/seed/disaster/400/600",
    synopsis: "The hero who saved the world returns for revenge.",
    updated: "December 26, 2025",
    views: 4500,
    latestChapter: 159,
    releasedAgo: "16 hours ago",
    unreadCount: 15,
    chapters: []
  },
  {
    id: "the-fragrant-flower-blooms-with-dignity",
    title: "The Fragrant Flower Blooms With Dignity",
    author: "Saka Mikami",
    status: "ongoing",
    type: "Manga",
    genres: ["Romance", "School Life"],
    cover: "https://picsum.photos/seed/flower/400/600",
    synopsis: "A sweet romance between two students from rival schools.",
    updated: "December 25, 2025",
    views: 2100,
    latestChapter: 175,
    releasedAgo: "1 day ago",
    unreadCount: 47,
    chapters: []
  },
  {
    id: "witchriv",
    title: "WITCHRIV",
    author: "Unknown",
    status: "ongoing",
    type: "Manga",
    genres: ["Action", "Fantasy"],
    cover: "https://picsum.photos/seed/witchriv/400/600",
    synopsis: "A tale of witches and magic.",
    updated: "December 25, 2025",
    views: 800,
    latestChapter: 11,
    releasedAgo: "1 day ago",
    unreadCount: 8,
    chapters: []
  },
  {
    id: "one-piece",
    title: "One Piece",
    author: "Oda Eiichiro",
    status: "ongoing",
    type: "Manga",
    genres: ["Adventure", "Drama", "Fantasy", "Action", "Comedy", "Shounen"],
    cover: "https://picsum.photos/seed/onepiece/400/600",
    synopsis: "As a child, Monkey D. Luffy dreamed of becoming the King of the Pirates. But his life changed when he accidentally gained the power to stretch like rubber...at the cost of never being able to swim again! Now Luffy, with the help of a motley collection of nakama, is setting off in search of \"One Piece,\" said to be the greatest treasure in the world...",
    updated: "December 27, 2025",
    views: 2,
    latestChapter: 1170,
    releasedAgo: "1 hour ago",
    chapters: [
      { id: "c1170", number: 1170, pages: 17, released: "December 27, 2025" },
      { id: "c1169", number: 1169, pages: 18, released: "December 18, 2025" },
      { id: "c1168", number: 1168, pages: 17, released: "December 6, 2025" },
      { id: "c1167", number: 1167, pages: 17, released: "November 28, 2025" },
      { id: "c1166", number: 1166, pages: 16, released: "November 21, 2025" },
      { id: "c1165", number: 1165, pages: 17, released: "November 7, 2025" },
      { id: "c1164", number: 1164, pages: 17, released: "October 31, 2025" },
      { id: "c1163", number: 1163, pages: 17, released: "October 24, 2025" },
    ]
  },
  {
    id: "wanted",
    title: "WANTED! Eiichiro Oda Before One Piece",
    author: "Oda Eiichiro",
    status: "completed",
    type: "Manga",
    genres: ["Action", "Comedy", "Shounen"],
    cover: "https://picsum.photos/seed/wanted/400/600",
    synopsis: "A collection of short stories by Eiichiro Oda.",
    updated: "November 4, 1998",
    views: 500,
    latestChapter: 5,
    releasedAgo: "27 years ago",
    chapters: []
  },
  {
    id: "one-piece-party",
    title: "One Piece Party",
    author: "Oda Eiichiro",
    status: "completed",
    type: "Manga",
    genres: ["Comedy", "Shounen"],
    cover: "https://picsum.photos/seed/party/400/600",
    synopsis: "A spin-off comedy manga of One Piece.",
    updated: "October 3, 2014",
    views: 300,
    latestChapter: 35,
    releasedAgo: "10 years ago",
    chapters: []
  },
  {
    id: "shokugeki-no-sanji",
    title: "Shokugeki no Sanji",
    author: "Oda Eiichiro",
    status: "completed",
    type: "Manga",
    genres: ["Comedy", "Shounen"],
    cover: "https://picsum.photos/seed/sanji/400/600",
    synopsis: "A spin-off manga focusing on Sanji's cooking adventures.",
    updated: "July 23, 2018",
    views: 400,
    latestChapter: 6,
    releasedAgo: "7 years ago",
    chapters: []
  },
  {
    id: "one-piece-episode-a",
    title: "One Piece Episode A",
    author: "Oda Eiichiro",
    status: "completed",
    type: "Manga",
    genres: ["Action", "Adventure", "Shounen"],
    cover: "https://picsum.photos/seed/episodea/400/600",
    synopsis: "A spin-off manga focusing on Portgas D. Ace.",
    updated: "September 16, 2020",
    views: 600,
    latestChapter: 4,
    releasedAgo: "5 years ago",
    chapters: []
  },
  {
    id: "omniscient-reader",
    title: "Omniscient Reader",
    author: "Sing Shong",
    status: "ongoing",
    type: "Manwha",
    genres: ["Action", "Fantasy"],
    cover: "https://picsum.photos/seed/omniscient/400/600",
    synopsis: "A reader finds himself in the world of his favorite web novel.",
    updated: "December 27, 2025",
    views: 5000,
    latestChapter: 230,
    releasedAgo: "1 day ago",
    chapters: []
  },
  {
    id: "dandadan",
    title: "Dandadan",
    author: "Yukinobu Tatsu",
    status: "ongoing",
    type: "Manga",
    genres: ["Action", "Comedy", "Supernatural"],
    cover: "https://picsum.photos/seed/dandadan/400/600",
    synopsis: "A story about ghosts and aliens.",
    updated: "December 27, 2025",
    views: 4000,
    latestChapter: 130,
    releasedAgo: "2 days ago",
    chapters: []
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    author: "Tatsuki Fujimoto",
    status: "ongoing",
    type: "Manga",
    genres: ["Action", "Horror", "Supernatural"],
    cover: "https://picsum.photos/seed/chainsaw/400/600",
    synopsis: "A story about a boy who merges with his chainsaw devil dog.",
    updated: "December 27, 2025",
    views: 6000,
    latestChapter: 150,
    releasedAgo: "3 days ago",
    chapters: []
  },
  {
    id: "witch-and-mercenary",
    title: "Witch and Mercenary",
    author: "Unknown",
    status: "ongoing",
    type: "Manga",
    genres: ["Action", "Fantasy"],
    cover: "https://picsum.photos/seed/witchmerc/400/600",
    synopsis: "A witch and a mercenary team up.",
    updated: "December 27, 2025",
    views: 1200,
    latestChapter: 7,
    releasedAgo: "3 days ago",
    chapters: []
  },
  {
    id: "tower-of-god",
    title: "Tower of God",
    author: "SIU",
    status: "ongoing",
    type: "Manwha",
    genres: ["Action", "Fantasy", "Adventure"],
    cover: "https://picsum.photos/seed/tog/400/600",
    synopsis: "A boy enters a tower to find his friend.",
    updated: "December 27, 2025",
    views: 8000,
    latestChapter: 600,
    releasedAgo: "1 day ago",
    chapters: []
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    author: "Gege Akutami",
    status: "completed",
    type: "Manga",
    genres: ["Action", "Supernatural", "Shounen"],
    cover: "https://picsum.photos/seed/jjk/400/600",
    synopsis: "A boy swallows a cursed finger.",
    updated: "December 27, 2025",
    views: 9000,
    latestChapter: 271,
    releasedAgo: "1 week ago",
    chapters: []
  },
  {
    id: "the-max-level-hero-strikes-back",
    title: "The Max Level Hero Strikes Back",
    author: "Devil's Tail",
    status: "ongoing",
    type: "Manwha",
    genres: ["Action", "Fantasy"],
    cover: "https://picsum.photos/seed/maxlevel/400/600",
    synopsis: "A weak prince becomes the strongest hero.",
    updated: "December 27, 2025",
    views: 3000,
    latestChapter: 150,
    releasedAgo: "2 days ago",
    chapters: []
  },
  {
    id: "dungeon-odyssey",
    title: "Dungeon Odyssey",
    author: "Glacier",
    status: "ongoing",
    type: "Manwha",
    genres: ["Action", "Fantasy"],
    cover: "https://picsum.photos/seed/odyssey/400/600",
    synopsis: "A dungeon baby explores the labyrinth.",
    updated: "December 27, 2025",
    views: 2500,
    latestChapter: 100,
    releasedAgo: "3 days ago",
    chapters: []
  },
  {
    id: "the-world-after-the-fall",
    title: "The World After the Fall",
    author: "Sing Shong",
    status: "ongoing",
    type: "Manwha",
    genres: ["Action", "Fantasy"],
    cover: "https://picsum.photos/seed/worldafter/400/600",
    synopsis: "A man refuses to regress and fights the tower.",
    updated: "December 27, 2025",
    views: 4000,
    latestChapter: 120,
    releasedAgo: "4 days ago",
    chapters: []
  }
];

export const getMangaById = (id: string) => mockManga.find(m => m.id === id);
export const getMangaByAuthor = (author: string) => mockManga.filter(m => m.author === author);
export const getMangaByGenre = (genre: string) => mockManga.filter(m => m.genres.includes(genre));
export const getPopularManga = () => mockManga.slice(0, 2);
export const getLatestReleases = () => mockManga.slice(2, 8);
export const getBookmarks = () => mockManga.filter(m => m.unreadCount !== undefined);
