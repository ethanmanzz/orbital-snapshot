import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { chatApiKey, chatUserId } from './ChatConfig';

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const chatClient = StreamChat.getInstance(chatApiKey); // Instantiate chat client outside useEffect

  useEffect(() => {
    const setupClient = async () => {
      try {
        const userId = await chatUserId();
        const thisId = userId[0]["username"];
        await chatClient.connectUser(
          {
            id: thisId,
            name: thisId,
            image: 'https://getstream.io/random_svg/?name=John',
          },
          chatClient.devToken(thisId),
        );
        setClientIsReady(true);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`An error occurred while connecting the user: ${error.message}`);
        }
      }
    };

    // If the chat client has a value in the field `userID`, a user is already connected
    if (!chatClient.userID) {
      setupClient();
    } else {
      setClientIsReady(true);
    }
  }, []);

  return {
    clientIsReady,
  };
};

