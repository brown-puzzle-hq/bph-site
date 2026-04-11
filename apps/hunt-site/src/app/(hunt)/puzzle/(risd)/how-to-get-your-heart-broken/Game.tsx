"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { type StaticImageData } from "next/image";
import blueImg from "./art/blue_background.png";
import grantImg from "./art/grant_back.png";
import erikaImg from "./art/erika_back.png";
import simonImg from "./art/simon_back.png";
import threeImg from "./art/three_back.png";
import lindenImg from "./art/linden_back.png";
import lol from "./art/lol.jpg";
import six from "./art/67.jpg";
import freaky from "./art/Freaky.jpg";
import hey from "./art/hey.jpg";
import knight from "./art/knight.jpg";
import cat from "./art/cat.jpg";
import puzzle from "./art/puzzle.png";
import Image from "next/image";

const script = [
  { sender: "You", text: "Hi, I’m so glad we matched:) You are so beautiful!" },
  {
    sender: "Linden",
    text: "Haha tyyy. Matching with me is like winning a lottery💅",
  },
  { sender: "You", text: "I agree! I noticed you like music..." },
  {
    sender: "Linden",
    text: "I do! I'm playing in a local symphony. Mostly violin",
  },
  { sender: "You", text: "Wow! Your profile also mentions guitar" },
  { sender: "Linden", text: "No, I don't play guitar." },
  { sender: "You", text: "Hmm, okay. Are you also singing?" },
  { sender: "Linden", text: "Sometimes. Wanna go to karaoke any time soon?" },
  { sender: "You", text: "Yes, ofc! When are you free?" },
  { sender: "Linden", text: "Let me check... I'm quite busy these days" },
  { sender: "Linden", text: "I’m planning to win a Grammy in two years btw" },
  { sender: "You", text: "Two years???" },
  { sender: "Linden", text: "I work on my new album every single day" },
  {
    sender: "You",
    text: "Your dedication is impressive. So what do you do in your free time?",
  },
  {
    sender: "Linden",
    text: "I like fashion... And I love going out for ice cream!",
  },
  { sender: "You", text: "Noted. Favorite flavor?" },
  { sender: "Linden", text: "Hazelnut or chocolate." },
  {
    sender: "Linden",
    text: "I usually go with Simon to a local ice cream shop",
  },
  { sender: "You", text: "Is he your friend?" },
  {
    sender: "Linden",
    text: "Kind of. A good acquaintance. I heard he joined this app recently. He's… interesting",
  },
  { sender: "You", text: "What do you know about him?" },
  {
    sender: "Linden",
    text: "He can just be too much sometimes. He plans everything. And I mean literally everything. Spreadsheets, calendars, reminders for reminders, etc",
  },
  { sender: "You", text: "Wow😮" },
  {
    sender: "Linden",
    text: "When we meet up I usually let him add the plan to my calendar so he doesn't panic about anything",
  },
  { sender: "You", text: "Sounds intense" },
  {
    sender: "Linden",
    text: "Once he literally left in the middle of our walk because his calendar said it was time to check an online auction",
  },
  { sender: "You", text: "What auction?" },
  {
    sender: "Linden",
    text: "He collects this old useless crap... Don't mention it or he won't shut up about his collection",
  },
  { sender: "You", text: "That’s pretty niche" },
  {
    sender: "Linden",
    text: "He’s not a bad guy though... Just a little… anxious",
  },
  {
    sender: "Linden",
    text: " Okay, I gotta go, I have to keep working on my album. I also have a meeting with all the community members later today. I should walk out early to enjoy the North Walk without bumping into my annoying neighbour",
  },
  { sender: "You", text: "Sure, good luck! Hope to talk to you later!" },
];

const scriptErika = [
  { sender: "You", text: "Hi, Erika! Nice to meet you" },
  { sender: "Erika", text: "Good morning" },
  { sender: "You", text: "What have you been up to?" },
  { sender: "You", text: "Hello?" },
  { sender: "You", text: "Are you here?" },
  { sender: "You", text: "Erika?" },
  { sender: "Erika", text: "Yes!" },
  { sender: "You", text: "So, what have you been up to?" },
  { sender: "Erika", text: "Oh, yeah, sorry. I was running" },
  { sender: "You", text: "Oh! Sorry if I interrupted" },
  { sender: "Erika", text: "It's fine. I'm just a bad texter" },
  { sender: "You", text: "No worries! So, running?" },
  {
    sender: "Erika",
    text: "Yeah, almost every morning. It helps me start the day right",
  },
  {
    sender: "You",
    text: "That's impressive. I run sometimes too, but usually on a treadmill",
  },
  { sender: "Erika", text: "I guess that works too" },
  { sender: "Erika", image: lol },
  {
    sender: "You",
    text: "I usually set the incline to like six or seven and run for 30 min",
  },
  { sender: "Erika", image: six },
  { sender: "You", text: "LMAO 😂" },
  { sender: "You", text: "So what are you doing later today?" },
  { sender: "You", text: "Erika? Are you here?" },
  { sender: "You", text: "Hello?" },
  { sender: "Erika", text: "Are you asking me out on a date?" },
  { sender: "Erika", image: freaky },
  { sender: "You", text: "Potentially. Are you free in the evening?" },
  { sender: "Erika", text: "Getting a ballerina cappuccina rn" },
  { sender: "You", text: "Yeah... okay" },
  {
    sender: "Erika",
    text: "It's Italian brainrot. I also have bananini chimpanzini",
  },
  { sender: "You", text: "What do you mean?" },
  { sender: "Erika", image: hey },
  { sender: "You", text: "I guess you are chronically online" },
  {
    sender: "Erika",
    text: "I think I am. I have 3 months streak in tiktok with my friends",
  },
  { sender: "You", text: "You also have an interesting last name" },
  {
    sender: "Erika",
    text: "Oh yeah, it comes from an English royalty or something. My friends like to call me by titles",
  },
  { sender: "You", text: "I will remember it, princess" },
  { sender: "Erika", image: knight },
  { sender: "You", text: "So what about our date?" },
  { sender: "You", text: "Hello?" },
  { sender: "You", text: "Are you here...?" },
  { sender: "You", text: "?" },
  { sender: "Erika", text: "Do you like animals?" },
  { sender: "You", text: "Yeah, I have two cats!" },
  { sender: "Erika", image: cat },
  { sender: "You", text: "What about you?" },
  { sender: "You", text: "Any pets?" },
  { sender: "You", text: "...? Hello?" },
  {
    sender: "Erika",
    text: "I actually have to go. Have a meeting kinda far. They never care to set a location closer",
  },
];

const scriptSimon = [
  { sender: "You", text: "Hi!" },
  {
    sender: "Simon",
    text: "Hi :) This is actually my first time using an app like this, so I'm not really sure what I'm supposed to say.",
  },
  {
    sender: "You",
    text: "Just tell me what you like to do in your free time!",
  },
  { sender: "Simon", text: "I like going out for ice cream actually" },
  { sender: "You", text: "What flavor?" },
  {
    sender: "Simon",
    text: "Mint! We always get it with Linden. She's the only person I know who likes mint ice cream as much as I do.",
  },
  { sender: "You", text: "That's cool! I like pistachio" },
  {
    sender: "Simon",
    text: "Linden is allergic to nuts. Also cinnamon. Coffee makes her really irritable, so she avoids that too. And she doesn't eat seafood.",
  },
  { sender: "You", text: "Wow… you know a lot about her" },
  { sender: "Simon", text: " I keep notes like that for most people I know." },
  { sender: "You", text: "Notes?" },
  {
    sender: "Simon",
    text: "Just small lists. Allergies, preferences, schedules. It helps avoid unexpected situations.",
  },
  { sender: "You", text: "That's… actually kind of thoughtful" },
  {
    sender: "Simon",
    text: "Maybe. I just prefer knowing things in advance. Surprises make me nervous.",
  },
  {
    sender: "Simon",
    text: "I also organize things. I keep records of every movie, book, and show I watch.",
  },
  { sender: "You", text: "Dedication" },
  { sender: "Simon", text: "I also like collecting things" },
  { sender: "You", text: "Like what?" },
  {
    sender: "Simon",
    text: "Well last week I finally bought a doubled-die Lincoln cent on eBay. I've been looking for one for a long time.",
  },
  { sender: "You", text: "Why is it so special 😮" },
  {
    sender: "Simon",
    text: "It's a minting error. The design was stamped slightly misaligned, which created a doubled image.",
  },
  { sender: "You", text: "So you like suprises that happen to coins?" },
  {
    sender: "Simon",
    text: "If you put it this way lol I guess errors are easier to accept when you can categorize them.",
  },
  { sender: "You", text: "very STEM of you" },
  {
    sender: "Simon",
    text: "Haha. Well I enjoy outside activities too. Blue tried to get me to go hiking with her recently.",
  },
  { sender: "You", text: "Did you have fun?" },
  {
    sender: "Simon",
    text: "Kinda... She's too chaotic for me and slightly problematic.",
  },
  { sender: "You", text: "Problematic?" },
  {
    sender: "Simon",
    text: "I probably shouldn't say too much. She's still my friend.",
  },
  { sender: "You", text: "You can trust me" },
  {
    sender: "Simon",
    text: "Her last relationship... There are some rumors going around.",
  },
  { sender: "You", text: "Tell me!" },
  {
    sender: "Simon",
    text: "I heard her ex found some messages on her phone, and saw her kissing another man..",
  },
  { sender: "You", text: "Oh.." },
  {
    sender: "Simon",
    text: "People are saying it wasn't the first time also. Anyway, I probably shouldn't speculate too much.",
  },
  { sender: "Simon", text: "Just thought you should know..." },
  { sender: "You", text: "Thank you for sharing!" },
  {
    sender: "Simon",
    text: "Okay, well, my alarm just went off to notify me that it's time to get ready for the community meeting.",
  },
  { sender: "You", text: "Oh sure, good luck?" },
  {
    sender: "Simon",
    text: "Do you want to join? I think it will be useful for you to meet everyone.",
  },
  { sender: "You", text: "Well if you're inviting me... Where is it?" },
  {
    sender: "Simon",
    text: "You can find it easily. You will know you're there when you see them.",
  },
  { sender: "You", text: "Who are you talking about?" },
  { sender: "Simon", text: "You know who. The people who are always there" },
];

const scriptGrant = [
  { sender: "You", text: "Hello" },
  {
    sender: "Grant",
    text: "Hey, beautiful. Your profile caught my eye. I usually only match with people who get art iykyk :)",
  },
  { sender: "You", text: "Oh wow, hi! What kind of art are you into?" },
  {
    sender: "Grant",
    text: "A bit of everything. Writing, photography… Lately I've been doing a lot of street photography. Capturing real moments.",
  },
  {
    sender: "You",
    text: " I've done some photography too for friends and family",
  },
  { sender: "Grant", text: "Oh, so like casual stuff. Not real art" },
  {
    sender: "You",
    text: "Actually I was invited to photograph a wedding once",
  },
  { sender: "Grant", text: "Hm. Weddings are pretty easy gigs though..." },
  { sender: "You", text: "I guess? Anyway, what else are you into?" },
  {
    sender: "Grant",
    text: "Music. But real music. Not the way most people listen to it",
  },
  { sender: "Grant", text: "I bet you use headphones" },
  { sender: "You", text: "Yeah, I do" },
  {
    sender: "Grant",
    text: "Well you're wrong, but you don't know any better ig",
  },
  {
    sender: "Grant",
    text: "Headphones ruin everything. Producers spend hours perfecting the soundstage, and then people flatten it with cheap headphones",
  },
  { sender: "You", text: "So how do you listen?" },
  {
    sender: "Grant",
    text: "I have a full setup. Studio monitors, DAC, the whole thing. It's the only way to hear music the way it's supposed to sound.",
  },
  { sender: "You", text: "This sounds intense" },
  { sender: "Grant", text: "I'm just passionate about it." },
  {
    sender: "Grant",
    text: "By the way… you will probably see Linden around here. She's such a loser. Don't trust anything she says",
  },
  {
    sender: "Grant",
    text: "And her lyrics... She has no taste or common sense. Just a waste of time and paper",
  },
  { sender: "You", text: "Maybe you two just got off on the wrong foot..." },
  { sender: "Grant", text: "Wow. So you're taking her side already" },
  { sender: "You", text: "I'm not taking sides" },
  { sender: "Grant", text: "You basically just said I'm lying" },
  { sender: "You", text: "I didn't say that" },
  { sender: "Grant", text: "You didn't have to. I can read between the lines" },
  { sender: "You", text: " I think you're reading into it a bit" },
  {
    sender: "Grant",
    text: "See, this is what people do. They twist my words and then say I'm the problem.",
  },
  { sender: "You", text: "I'm not twisting anything" },
  {
    sender: "Grant",
    text: "Relax. You're getting really defensive. Don't be so dramatic",
  },
  { sender: "You", text: "..." },
  {
    sender: "Grant",
    text: "I haven't said anything wrong and you know that. Let's talk when you calm down",
  },
  {
    sender: "You",
    text: "I have to be somewhere soon anyway. Deal with Linden and a bunch of those joyful people jumping around",
  },
];

const scriptBlue = [
  { sender: "You", text: "I love your hair!!!" },
  { sender: "Blue", text: "Thank you! Totally natural, obviously ;)" },
  { sender: "You", text: "I believe you" },
  {
    sender: "Blue",
    text: "Good. So tell me… are you more of a day person or a night person?",
  },
  {
    sender: "You",
    text: "Probably night. I like going on night walks and listening to music",
  },
  {
    sender: "Blue",
    text: "Same! Nights are the best. Everything's quiet and the sky is clear",
  },
  {
    sender: "Blue",
    text: " I like wandering around at night sometimes. Finding a quiet spot, laying in the grass… you notice a lot of things if you actually look up",
  },
  { sender: "You", text: " I don't know much about the sky though" },
  {
    sender: "Blue",
    text: "That's okay. I can point out a few things. I've learned a bit about stars over time",
  },
  { sender: "You", text: "That would be so romantic" },
  {
    sender: "Blue",
    text: "I know ;)  I used to go on hikes every week with Grant before… yeah, not anymore",
  },
  { sender: "You", text: " Oh? What happened?" },
  {
    sender: "Blue",
    text: "I just couldn't deal with it any longer. Every conversation turned into this weird interrogation",
  },
  { sender: "You", text: "wdym" },
  {
    sender: "Linden",
    text: "He'd pressure me to admit I said things I never said. Then he'd twist my words and act like I hurt him somehow. And in the end everything would become my fault",
  },
  { sender: "You", text: "oh no..." },
  {
    sender: "Linden",
    text: "After hanging out with him I'd replay every conversation in my head wondering what I did wrong",
  },
  { sender: "You", text: "I'm so sorry" },
  { sender: "Blue", text: "It's fine. I'd rather talk about something nicer" },
  {
    sender: "You",
    text: "Sure! I saw on your profile that you work in a coffee shop",
  },
  { sender: "Blue", text: "Yep!" },
  { sender: "You", text: "So you must love coffee" },
  {
    sender: "Blue",
    text: "Honestly? I kind of hate it now. When you smell espresso for seven hours straight it loses its charm",
  },
  { sender: "You", text: "Fair point. What about tea then?" },
  {
    sender: "Blue",
    text: "Ugh… no. My ex worked at a boba shop so I had enough tea for a lifetime",
  },
  {
    sender: "You",
    text: "Oh, what happened between you two? If you feel comfortable sharing",
  },
  {
    sender: "Blue",
    text: "Nothing serious. He just got mad at me for no reason and blocked me",
  },
  { sender: "You", text: "That's rough" },
  {
    sender: "Blue",
    text: "Yeah… well, maybe he had his reasons. People get weirdly sensitive sometimes",
  },
  { sender: "You", text: "I see" },
  {
    sender: "Blue",
    text: "Anyway! That's in the past. Now we matched, so things are already looking better :)",
  },
  {
    sender: "Blue",
    text: "Wait, I'll text you later. I have to go to this stupid meeting. It's like half a block away, but I need to close the cafe beforehand",
  },
];

type Screen =
  | "start"
  | "instructions"
  | "profileSetup"
  | "match"
  | "chats"
  | "profileView"
  | "chatDetail"
  | "profile";

type Match = {
  id: number;
  name: string;
};

type Message = {
  sender: "You" | string;
  text?: string;
  image?: StaticImageData | string;
};

type Character = {
  id: number;
  name: string;
  last: string;
  description: string;
  pronouns: string;
  sign: string;
  hobbies: string[];
  home: string[];
  script: Message[];
};
const characters: Character[] = [
  {
    id: 1,
    name: "Linden",
    last: "Mann",
    pronouns: "she/her",
    sign: "Gemini",
    description:
      "'We're running through woods, my hand in your hand - I can't here your voice, I can't see your face' Woodlands by me",
    hobbies: ["music", "fashion", "guitar"],
    home: ["Berlin, Germany", "Brown"],
    script: script,
  },
  {
    id: 2,
    name: "Erika",
    last: "Athelhere",
    pronouns: "she/her",
    sign: "Gemini",
    description:
      "Roses are red. Violets are blue. Don't make me choose between running and you!",
    hobbies: ["sports", "tv shows", "animals"],
    home: ["Brown"],
    script: scriptErika,
  },
  {
    id: 3,
    name: "Simon",
    last: "Li",
    pronouns: "he/him",
    sign: "Sagittarius",
    description:
      "My friends made me join, but I do hope to find my soulmate here",
    hobbies: ["collecting", "reading", "math"],
    home: ["Guangzhou, China", "Brown"],
    script: scriptSimon,
  },
  {
    id: 4,
    name: "Grant",
    last: "Granoff",
    pronouns: "they/them",
    sign: "Aries",
    description: "Match if you care for aesthethics",
    hobbies: ["photography", "gossips", "art"],
    home: ["Brown"],
    script: scriptGrant,
  },
  {
    id: 5,
    name: "Blue",
    last: "de Campi",
    pronouns: "she/her",
    sign: "Cancer",
    description:
      "I can read you like a book knowing your coffee order. Intrigued?)",
    hobbies: ["matcha", "video games", "camping"],
    home: ["Naples, Italy", "Brown"],
    script: scriptBlue,
  },
];

const tinfoilCharacter: Character = {
  id: 9,
  name: "Three",
  last: "Tinfoil",
  pronouns: "he/him",
  sign: "???",
  description: "...",
  hobbies: [""],
  home: ["Brown"],
  script: [
    { sender: "You", text: "Hi?" },
    { sender: "Tinfoil", text: "So… I guess you finally found me" },
    { sender: "You", text: "Who are you?" },
    { sender: "Tinfoil", text: "I'm one of the Tinfoil siblings. Obviously" },
    { sender: "You", text: "Why couldn't I see you before?" },
    {
      sender: "Tinfoil",
      text: "I was watching you. Waiting for the right moment to show up",
    },
    { sender: "You", text: "Why hide in the first place?" },
    { sender: "Tinfoil", text: "Because the others don't really like me" },
    { sender: "You", text: "Why?" },
    {
      sender: "Tinfoil",
      text: "Oh, who knows. Maybe they got upset when I changed their phone passwords while they weren't looking. Or when I hacked one of their emails and sent a few creative messages",
    },
    { sender: "Tinfoil", text: "Or maybe it was the fireworks incident" },
    { sender: "You", text: "Fireworks?" },
    { sender: "Tinfoil", text: "Relax. They weren't real fireworks" },
    { sender: "Tinfoil", text: "Mostly" },
    { sender: "You", text: "Those are some pretty intense pranks" },
    { sender: "Tinfoil", text: "Ugh, whatever. They're all boring anyway" },
    {
      sender: "You",
      text: "I don't think so. They all seemed interesting when I talked to them. Maybe you should try being friends with them again",
    },
    { sender: "Tinfoil", text: "Seriously? With them?" },
    { sender: "You", text: "Why not?" },
    {
      sender: "Tinfoil",
      text: "Blue's hair is dry and annoying to look at. Linden's songs barely rhyme half the time. Grant's street photography is trash. Simon spends more time talking to spreadsheets than to actual humans. Who else? Oh.. Erika… honestly, who even cares what she's thinking? She disappears mid-conversation.",
    },
    { sender: "You", text: "Wow… you're really a big hater" },
    { sender: "Tinfoil", text: "Maybe I am, but what are they?" },
    {
      sender: "Tinfoil",
      text: "Also, my birthday is early June if you care about that stuff",
    },
    { sender: "You", text: "Good to know" },
    {
      sender: "Tinfoil",
      text: "Also, I have something for you. I hope you will make the right decision",
    },
    { sender: "Tinfoil", image: puzzle },
    { sender: "Tinfoil", text: "So who is your best match?" },
  ],
};

export default function DateGame() {
  const [screen, setScreen] = useState<Screen>("start");
  const [matches, setMatches] = useState<Match[]>([]);

  const [activeChat, setActiveChat] = useState<Match | null>(null);

  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  type ChatState = {
    messages: Message[];
    index: number;
  };

  const [chats, setChats] = useState<Record<number, ChatState>>({});

  const activeChatData = activeChat ? chats[activeChat.id] : null;

  type PlayerProfile = {
    name: string;
    pronouns: string;
    bio: string;
  };

  const [playerProfile, setPlayerProfile] = useState<PlayerProfile>({
    name: "",
    pronouns: "",
    bio: "",
  });

  const getCharacterColor = (id: number) => {
    switch (id) {
      case 4: // Grant
        return {
          bg: "bg-red-100",
          text: "text-red-800",
        };
      case 5: // Blue
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
        };
      case 1:
        return { bg: "bg-pink-100", text: "text-pink-800" };
      case 2: // Erika
        return { bg: "bg-yellow-100", text: "text-yellow-800" };
      case 3: // Simon
        return { bg: "bg-green-100", text: "text-green-800" };
      default:
        return { bg: "bg-gray-200", text: "text-gray-800" };
    }
  };

  const getCharacterImage = (id: number) => {
    switch (id) {
      case 1:
        return lindenImg;
      case 2:
        return erikaImg;
      case 3:
        return simonImg;
      case 5:
        return blueImg;
      case 4:
        return grantImg;
      default:
        return threeImg;
    }
  };
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  const [promoCode, setPromoCode] = useState("");
  const [isVIP, setIsVIP] = useState(false);

  const characterPool = useMemo(
    () => (isVIP ? [...characters, tinfoilCharacter] : characters),
    [isVIP],
  );

  const [matchQueue, setMatchQueue] = useState<Character[]>(characterPool);

  const activeCharacter = activeChat
    ? characterPool.find((c) => c.id === activeChat.id)
    : null;

  const script = activeCharacter?.script ?? [];

  const characterColor = activeCharacter
    ? getCharacterColor(activeCharacter.id)
    : { bg: "bg-gray-200", text: "text-black" };

  const currentCharacter = matchQueue[0];

  const [previousScreen, setPreviousScreen] = useState<Screen>("chats");

  useEffect(() => {
    setMatchQueue((prev) => {
      const existingIds = new Set(prev.map((c) => c.id));
      const matchedIds = new Set(matches.map((m) => m.id));

      const newOnes = characterPool.filter(
        (c) => !existingIds.has(c.id) && !matchedIds.has(c.id),
      );

      return [...prev, ...newOnes];
    });
  }, [characterPool, matches]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [activeChatData?.messages]);

  const handleLike = () => {
    if (!currentCharacter) return;

    setMatches((prev) => {
      if (prev.find((m) => m.id === currentCharacter.id)) return prev;
      return [
        ...prev,
        { id: currentCharacter.id, name: currentCharacter.name },
      ];
    });

    setChats((prev) => ({
      ...prev,
      [currentCharacter.id]: {
        messages: [],
        index: 0,
      },
    }));

    // remove from queue
    setMatchQueue((prev) => prev.slice(1));

    setScreen("chats");
  };

  const handlePass = () => {
    if (!currentCharacter) return;

    setMatchQueue((prev) => {
      if (prev.length === 0) return prev;
      const [first, ...rest] = prev;
      return [...rest, first!];
    });
  };

  const nextMessage = () => {
    if (!activeChat) return;
    if (isProcessing) return;

    const chat = chats[activeChat.id]!;
    let i = chat.index;

    if (i >= script.length) return;

    if (script[i]?.sender !== "You") return;

    setIsProcessing(true);

    // collect ALL consecutive "You" messages
    const userMessages: Message[] = [];
    while (true) {
      const msg = script[i];
      if (!msg || msg.sender !== "You") break;
      userMessages.push(msg);
      i++;
    }

    // show all user messages immediately
    setChats((prev) => {
      const current = prev[activeChat.id]!;
      return {
        ...prev,
        [activeChat.id]: {
          messages: [...current.messages, ...userMessages],
          index: i,
        },
      };
    });

    // collect character messages
    const responses: Message[] = [];
    while (true) {
      const msg = script[i];
      if (!msg || msg.sender === "You") break;
      responses.push(msg);
      i++;
    }

    if (responses.length === 0) {
      setIsProcessing(false);
      return;
    }

    setIsTyping(true);

    responses.forEach((msg, index) => {
      setTimeout(
        () => {
          setChats((prev) => {
            const current = prev[activeChat.id]!;
            return {
              ...prev,
              [activeChat.id]: {
                messages: [...current.messages, msg],
                index: i,
              },
            };
          });

          if (index === responses.length - 1) {
            setIsTyping(false);
            setIsProcessing(false);
          }
        },
        800 * (index + 1),
      );
    });
  };

  return (
    <div className="my-6 flex justify-center">
      {/* Phone Frame */}
      <div className="h-[600px] w-[320px] rounded-3xl bg-black p-3 shadow-xl">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white text-black">
          {/* CONTENT AREA */}
          <div className="flex flex-1 flex-col items-center justify-center">
            {/* START */}
            {screen === "start" && (
              <div className="flex flex-col items-center gap-6">
                <h1 className="text-xl font-bold">Date Everything Brown</h1>
                <button
                  onClick={() => setScreen("profileSetup")}
                  className="rounded-lg bg-pink-500 px-4 py-2 text-white"
                >
                  Start
                </button>
              </div>
            )}
            {screen === "profileSetup" && (
              <div className="flex w-full flex-col gap-3 p-4">
                <h2 className="text-center text-lg font-semibold">
                  Create Profile
                </h2>

                <input
                  placeholder="Name"
                  value={playerProfile.name}
                  onChange={(e) =>
                    setPlayerProfile({ ...playerProfile, name: e.target.value })
                  }
                  className="rounded border p-2"
                />

                <input
                  placeholder="Pronouns"
                  value={playerProfile.pronouns}
                  onChange={(e) =>
                    setPlayerProfile({
                      ...playerProfile,
                      pronouns: e.target.value,
                    })
                  }
                  className="rounded border p-2"
                />

                <textarea
                  placeholder="Bio"
                  value={playerProfile.bio}
                  onChange={(e) =>
                    setPlayerProfile({ ...playerProfile, bio: e.target.value })
                  }
                  className="rounded border p-2"
                />

                <button
                  onClick={() => setScreen("instructions")}
                  className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
                >
                  Continue
                </button>
              </div>
            )}

            {/* INSTRUCTIONS */}
            {screen === "instructions" && (
              <div className="flex h-full flex-col justify-between p-4 text-center">
                <div>
                  <h2 className="mb-2 text-lg font-semibold">Disclaimer</h2>
                  <p className="text-sm">
                    This dating simulator is a work of fiction created for
                    entertainment purposes. Any resemblance to real people,
                    conversations, or dating platforms is purely coincidental.
                    Enjoy!
                  </p>
                </div>
                {/* Note */}
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
                  <p className="mt-1 text-xs text-gray-600">
                    Note: We don't recommend reloading this page while solving
                    the puzzle since it will reset all the chats.
                  </p>
                </div>

                <button
                  onClick={() => setScreen("match")}
                  className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white"
                >
                  Continue
                </button>
              </div>
            )}

            {/* MATCH SCREEN */}
            {screen === "match" && (
              <div className="flex h-full w-full flex-col gap-4 p-4">
                {!currentCharacter ? (
                  <div className="flex flex-1 items-center justify-center text-sm text-gray-500">
                    No more matches nearby 💔
                  </div>
                ) : (
                  <>
                    {/* Photo */}
                    <div className="flex w-full justify-center">
                      <div
                        className="relative h-52 w-52 cursor-pointer overflow-hidden rounded-xl bg-gray-200"
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;

                          if (x < rect.width / 2) {
                            setHoverSide("left");
                          } else {
                            setHoverSide("right");
                          }
                        }}
                        onMouseLeave={() => setHoverSide(null)}
                        onClick={() => {
                          if (hoverSide === "left") handlePass();
                          if (hoverSide === "right") handleLike();
                        }}
                      >
                        {/* Image */}
                        {getCharacterImage(currentCharacter.id) && (
                          <Image
                            src={getCharacterImage(currentCharacter.id)}
                            alt={currentCharacter.name}
                            className="h-full w-full object-cover"
                          />
                        )}

                        {/* LEFT overlay (PASS) */}
                        <div
                          className={`absolute inset-0 flex items-center justify-start pl-4 transition-opacity duration-200 ${
                            hoverSide === "left" ? "opacity-100" : "opacity-0"
                          } bg-red-500/40`}
                        >
                          <span className="text-2xl font-bold text-white">
                            ✕
                          </span>
                        </div>

                        {/* RIGHT overlay (LIKE) */}
                        <div
                          className={`absolute inset-0 flex items-center justify-end pr-4 transition-opacity duration-200 ${
                            hoverSide === "right" ? "opacity-100" : "opacity-0"
                          } bg-pink-500/40`}
                        >
                          <span className="text-2xl font-bold text-white">
                            ❤
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="text-left">
                      <h2 className="text-lg font-bold">
                        {currentCharacter.name} {currentCharacter.last}
                      </h2>

                      {/* Pronouns + sign */}
                      <p className="-mt-1 text-xs text-gray-500">
                        {currentCharacter.pronouns} {currentCharacter.sign}
                      </p>
                    </div>

                    {/* Bio */}
                    <div className="h-45 overflow-y-auto rounded-xl bg-gray-100 p-3 text-sm">
                      <p>{currentCharacter.description}</p>

                      {/* hobbiew */}
                      <div className="mt-3">
                        <p className="mb-1 text-xs font-semibold text-gray-500">
                          hobbies
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {currentCharacter.hobbies?.map((hobby, i) => {
                            const color = getCharacterColor(
                              currentCharacter.id,
                            );
                            return (
                              <div
                                key={i}
                                className={`px-3 py-1 ${color.bg} ${color.text} rounded-full text-xs`}
                              >
                                {hobby}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* home */}
                      <div className="mt-3">
                        <p className="mb-1 text-xs font-semibold text-gray-500">
                          place(s) you call home
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {currentCharacter.home?.map((place, i) => {
                            const color = getCharacterColor(
                              currentCharacter.id,
                            );
                            return (
                              <div
                                key={i}
                                className={`px-3 py-1 ${color.bg} ${color.text} rounded-full text-xs`}
                              >
                                {place}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Buttons
                    <div className="flex gap-4 mt-auto">
                    <button
                        onClick={handlePass}
                        className="flex-1 px-4 py-2 bg-gray-300 rounded-lg"
                    >
                        Pass
                    </button>

                    <button
                        onClick={handleLike}
                        className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                        Like
                    </button>
                    </div> */}
                  </>
                )}
              </div>
            )}

            {/* CHATS SCREEN */}
            {screen === "chats" && (
              <div className="h-full w-full p-4">
                <h2 className="mb-3 text-center font-semibold">Chats</h2>

                {matches.length === 0 ? (
                  <p className="text-sm text-gray-500">No matches yet.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {matches.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setActiveChat(m);
                          setScreen("chatDetail");
                        }}
                        className="cursor-pointer rounded-lg border bg-gray-100 p-3"
                      >
                        {m.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          {screen === "chatDetail" && activeChat && (
            <div className="flex h-full w-full flex-col">
              {/* Header */}
              <div className="flex items-center gap-3 border-b p-3">
                <button
                  onClick={() => {
                    setScreen("chats");
                    setIsTyping(false);
                    setIsProcessing(false);
                  }}
                  className="text-sm font-medium text-blue-500"
                >
                  ← Back
                </button>

                <span
                  className="cursor-pointer font-semibold hover:underline"
                  onClick={() => {
                    setPreviousScreen("chatDetail");
                    setScreen("profileView");
                  }}
                >
                  {activeChat.name}
                </span>
              </div>

              {/* Messages */}
              <div
                ref={chatContainerRef}
                className="flex flex-1 flex-col gap-2 overflow-y-auto p-3"
              >
                {activeChatData?.messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                      msg.sender === "You"
                        ? "self-end bg-pink-500 text-white"
                        : `${characterColor.bg} ${characterColor.text} self-start`
                    }`}
                  >
                    {/* TEXT */}
                    {msg.text && <p>{msg.text}</p>}

                    {/* IMAGE */}
                    {msg.image && (
                      <Image
                        src={msg.image}
                        alt="chat image"
                        className="mt-2 h-auto max-w-full rounded-lg"
                      />
                    )}
                  </div>
                ))}

                {/*Typing indicator */}
                {isTyping && (
                  <div className="self-start text-sm italic text-gray-500">
                    {activeCharacter?.name} is typing...
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t p-2">
                {activeChatData &&
                  activeChatData.index < script.length &&
                  script[activeChatData.index]?.sender === "You" && (
                    <button
                      onClick={nextMessage}
                      className="w-full rounded-lg bg-blue-500 py-2 text-white"
                    >
                      Text
                    </button>
                  )}
              </div>
            </div>
          )}
          {/* Profile character check */}
          {screen === "profileView" && activeCharacter && (
            <div className="flex h-full w-full flex-col gap-4 p-4">
              {/* Header */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setScreen(previousScreen)}
                  className="text-sm font-medium text-blue-500"
                >
                  ← Back
                </button>
              </div>

              {/* Photo */}
              <div className="flex w-full justify-center">
                <div className="h-52 w-52 overflow-hidden rounded-xl bg-gray-200">
                  {getCharacterImage(activeCharacter.id) && (
                    <Image
                      src={getCharacterImage(activeCharacter.id)}
                      alt={activeCharacter.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <h2 className="text-lg font-bold">
                  {activeCharacter.name} {activeCharacter.last}
                </h2>
                <p className="-mt-1 text-xs text-gray-500">
                  {activeCharacter.pronouns} {activeCharacter.sign}
                </p>
              </div>

              {/* Bio */}
              <div className="rounded-xl bg-gray-100 p-3 text-sm">
                <p>{activeCharacter.description}</p>

                {/* Hobbies */}
                <div className="mt-3">
                  <p className="mb-1 text-xs font-semibold text-gray-500">
                    hobbies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeCharacter.hobbies?.map((hobby, i) => {
                      const color = getCharacterColor(activeCharacter.id);
                      return (
                        <div
                          key={i}
                          className={`px-3 py-1 ${color.bg} ${color.text} rounded-full text-xs`}
                        >
                          {hobby}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Home */}
                <div className="mt-3">
                  <p className="mb-1 text-xs font-semibold text-gray-500">
                    place(s) you call home
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeCharacter.home?.map((place, i) => {
                      const color = getCharacterColor(activeCharacter.id);
                      return (
                        <div
                          key={i}
                          className={`px-3 py-1 ${color.bg} ${color.text} rounded-full text-xs`}
                        >
                          {place}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* PROFILE SCREEN */}
          {screen === "profile" && (
            <div className="flex w-full flex-col gap-4 p-4">
              {/* TITLE */}
              <h2 className="text-lg font-semibold">Your Profile</h2>

              {/* PROFILE CARD */}
              <div className="rounded-lg bg-gray-100 p-3">
                <p className="font-bold">
                  {playerProfile.name} ({playerProfile.pronouns})
                </p>
                <p className="mt-1 text-sm">{playerProfile.bio}</p>
              </div>

              {/* VIP INFO BOX */}
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
                <p className="text-sm font-semibold text-purple-700">
                  Get the VIP Version!
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  With our VIP subscription you can acess more special matches
                  and be one more step closer to finding the love of your life
                </p>
              </div>

              {/* PROMO CODE */}
              <div className="mt-auto flex flex-col gap-2">
                <p className="text-sm font-medium">Enter Promo Code</p>

                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="rounded border p-2"
                  placeholder="Where are they meeting?"
                />

                <button
                  onClick={() => {
                    const code = promoCode.toLowerCase().trim();
                    if (code === "circledance" || code === "circle dance") {
                      setIsVIP(true);
                    }
                  }}
                  className="rounded-lg bg-purple-500 px-4 py-2 text-white"
                >
                  Redeem
                </button>

                {isVIP && (
                  <p className="text-xs text-purple-600">VIP unlocked ✨</p>
                )}
              </div>
            </div>
          )}

          {/* BOTTOM NAV */}
          {(screen === "match" ||
            screen === "chats" ||
            screen === "profile") && (
            <div className="flex h-14 items-center justify-around border-t">
              <button onClick={() => setScreen("match")} className="text-sm">
                Match
              </button>

              <button onClick={() => setScreen("chats")} className="text-sm">
                Chats ({matches.length})
              </button>
              <button onClick={() => setScreen("profile")} className="text-sm">
                Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
