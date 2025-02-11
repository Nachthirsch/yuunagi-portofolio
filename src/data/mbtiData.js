export const traitDescriptions = {
  // ENERGY Traits
  Introverted: "I likely prefer fewer, yet deep and meaningful, social interactions and feel drawn to calmer environments",
  Extraverted: "I tend to seek social stimulation and feel energized by engaging with others in dynamic environments",
  // MIND Traits
  Intuitive: "I tend to be more imaginative and open-minded, focusing on hidden meanings and future possibilities",
  Observant: "I pay close attention to concrete details and practical realities, trusting in direct experience",
  // NATURE Traits
  Thinking: "I tend to focus on objectivity and rationality, putting effectiveness above social harmony",
  Feeling: "I consider emotions and personal values heavily in decision-making, emphasizing harmony and empathy",
  // TACTICS Traits
  Prospecting: "I tend to adapt flexibly to new situations, easygoing and spontaneous in my approach to life",
  Judging: "I value structure and planning, preferring clear decisions and organized approaches",
  // IDENTITY Traits
  Assertive: "I tend to be self-assured, even-tempered, and resistant to stress, refusing to worry too much",
  Turbulent: "I'm self-conscious and sensitive to stress, always striving for improvement and perfection",
};

export const traitTypes = {
  Introverted: "ENERGY",
  Extraverted: "ENERGY",
  Intuitive: "MIND",
  Observant: "MIND",
  Thinking: "NATURE",
  Feeling: "NATURE",
  Prospecting: "TACTICS",
  Judging: "TACTICS",
  Assertive: "IDENTITY",
  Turbulent: "IDENTITY",
};

export const traitColors = {
  Introverted: "4298B4",
  Intuitive: "E4AE3A",
  Thinking: "33A474",
  Prospecting: "88619A",
  Assertive: "F25E62",
  Extraverted: "4298B4",
  Observant: "E4AE3A",
};

export const testData = {
  current: {
    date: "Feb 10, 2025",
    type: "INTP-A",
    personality: {
      type: "INTP-A",
      description: "As an INTP-A (Logician), I approach challenges with logical analysis and innovative thinking. My assertive nature helps me maintain emotional stability while pursuing creative solutions. I value intellectual discourse and am driven by curiosity to understand complex systems and concepts.",
    },
    role: {
      title: "Analyst",
      description: "Analysts embrace rationality and impartiality, excelling in intellectual debates and scientific or technological fields. They are fiercely independent, open-minded, and strong-willed.",
    },
    strategy: {
      title: "Confident Individualism",
      description: "Those who prefer the Confident Individualism Strategy like doing things alone, choosing to rely on their own skills and instincts instead of seeking contact with other people. They know what they are good at.",
    },
    traits: [
      { trait: "Introverted", percentage: 60, opposite: "Extroverted" },
      { trait: "Intuitive", percentage: 70, opposite: "Observant" },
      { trait: "Thinking", percentage: 67, opposite: "Feeling" },
      { trait: "Prospecting", percentage: 60, opposite: "Judging" },
      { trait: "Assertive", percentage: 65, opposite: "Turbulent" },
    ],
  },
  historical: {
    date: "Jun 22, 2023",
    type: "ESTP-A",
    personality: {
      type: "ESTP-A",
      description: "As an ESTP-A (Entrepreneur), I am energetic and action-oriented, thriving in dynamic situations. My assertive nature allows me to confidently take risks and adapt quickly to changing circumstances. I excel at practical problem-solving and enjoy hands-on experiences.",
    },
    role: {
      title: "Explorer",
      description: "Explorers are observant and practical, excelling in situations that require quick thinking and immediate action. They are masters of tools and techniques, enjoying hands-on experience and physical challenges.",
    },
    strategy: {
      title: "People Mastery",
      description: "Those with the Social Engagement strategy are proactive in the social domain, confident in their abilities and comfortable engaging with others. They actively pursue their goals and aren't afraid to improvise.",
    },
    traits: [
      { trait: "Extraverted", percentage: 60, opposite: "Introverted" },
      { trait: "Observant", percentage: 59, opposite: "Intuitive" },
      { trait: "Thinking", percentage: 54, opposite: "Feeling" },
      { trait: "Prospecting", percentage: 64, opposite: "Judging" },
      { trait: "Assertive", percentage: 67, opposite: "Turbulent" },
    ],
  },
};
