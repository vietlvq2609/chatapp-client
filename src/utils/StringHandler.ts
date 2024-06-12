import { TConversation, TUser } from "../types/responseTypes";

const user = JSON.parse(localStorage.getItem("userInfo") ?? "null");

const formatUrlPath = (url: string): string => {
  while (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  return url.charAt(0) === "/" ? url : `/${url}`;
};

const getReceiverNameFromConversation = (
  conversation: TConversation,
): string => {
  if (user === "null") {
    return "null";
  }
  return (
    conversation.conversation_name ??
    conversation.members
      .filter((member) => member.email !== user?.email)
      .map((member) => member.username)
      .join(" ")
  );
};

const getReceiverFromConversation = (
  conversation: TConversation,
): TUser | null => {
  if (user === "null") {
    return null;
  }

  const receiver = conversation.members.find(
    (member) => member.email !== user.email,
  );
  return receiver ?? null;
};

const getConversationLatestText = (conversation: TConversation): string => {
  let message =
    conversation.messages[conversation.messages.length - 1].sender.email !==
    user?.email
      ? ""
      : "You: ";

  if (conversation.messages.length > 0) {
    return (
      message +
      conversation.messages[conversation.messages.length - 1].message_text
    );
  }

  return "No messages at all!";
};

const elipsisString = (inputString: string, limit = 60) => {
  if (inputString.length <= limit) {
    return inputString;
  }
  return inputString.slice(0, limit) + "...";
};

export {
  formatUrlPath,
  getReceiverNameFromConversation,
  getReceiverFromConversation,
  getConversationLatestText,
  elipsisString,
};
