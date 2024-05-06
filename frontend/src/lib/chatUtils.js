export function formattedText(inputText) {
  return inputText
    .replace(/\n+/g, " ") // Replace multiple consecutive new lines with a single space
    .replace(/(\w) - (\w)/g, "$1$2") // Join hyphenated words together
    .replace(/\s+/g, " "); // Replace multiple consecutive spaces with a single space
}

export function scrollToBottom(containerRef) {
  if (containerRef.current) {
    const lastMessage = containerRef.current.lastElementChild;
    if (lastMessage) {
      const scrollOptions = {
        behavior: "smooth",
        block: "end",
      };
      lastMessage.scrollIntoView(scrollOptions);
    }
  }
}

export const getSources = (data, role, index) => {
  if (role === "assistant" && index >= 2 && (index - 2) % 2 === 0) {
    const sourcesIndex = (index - 2) / 2;
    if (data[sourcesIndex] && data[sourcesIndex].sources) {
      return data[sourcesIndex].sources;
    }
  }
  return [];
};

export const initialMessages = (title) => [
  {
    role: "assistant",
    id: "0",
    content: `Hi! I am your OnlyTrends assistant. I am happy to help with your questions about ${
      title ? title : "latest trends"
    }`,
  },
];
