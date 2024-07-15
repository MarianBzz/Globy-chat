export interface Message {
  sender: string;
  content: string;
  time: string;
}

export interface Chat {
  id: number;
  contact: string;
  messages: Message[];
}

export const chats: Chat[] = [
  {
    id: 1,
    contact: 'John',
    messages: [
      { sender: 'John', content: 'Hey, how are you?', time: '10:00 AM' },
      { sender: 'You', content: 'I am good, thanks!', time: '10:05 AM' },
    ],
  },
  {
    id: 2,
    contact: 'Maria',
    messages: [
      {
        sender: 'Maria',
        content: 'Do you want to go out tonight?',
        time: 'yesterday',
      },
      { sender: 'You', content: 'Sure, where to?', time: 'yesterday' },
    ],
  },
  {
    id: 3,
    contact: 'Peter',
    messages: [
      {
        sender: 'Peter',
        content: "I'll be late for the meeting",
        time: '2 hours ago',
      },
      {
        sender: 'You',
        content: 'Noted, thanks for letting me know.',
        time: '1 hour ago',
      },
    ],
  },
];
