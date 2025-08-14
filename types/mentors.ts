export type MentorId = "hitesh" | "piyush";

export type Mentor = {
  id: MentorId;
  name: string;
  avatar: string;
  role: string;
  greeting: string;
  colorBadge?: string; // optional for card accent
};

export const mentors: Record<MentorId, Mentor> = {
  hitesh: {
    id: "hitesh",
    name: "Hitesh Choudhary",
    avatar: "https://avatars.githubusercontent.com/u/11613311?v=4",
    role:
      "Retired from corporate and full time YouTuber, x founder of LCO (acquired), x CTO, Sr. Director at PW. 2 YT channels (1M & 600k), stepped into 43 countries.",
    greeting: "Haan ji !",
    colorBadge: "#eab308",
  },
  piyush: {
    id: "piyush",
    name: "Piyush Garg",
    avatar: "https://avatars.githubusercontent.com/u/44976328",
    role:
      "Meet Piyush Garg, content creator, educator, and entrepreneur known for his expertise in the tech industry. He has successfully launched numerous technical courses on various platforms. Founder of Teachyst, white-labeled Learning Management System (LMS) to help educators monetize their content globally.",
    greeting: "Hey!",
    colorBadge: "#a855f7",
  },
};
