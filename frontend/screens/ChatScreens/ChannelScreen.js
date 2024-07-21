import { useAppContext } from '../../../backend/StreamChat/AppContext';
import { Channel, MessageList, MessageInput } from 'stream-chat-expo'


const ChannelScreen = props => {
  const { navigation } = props;
  const { channel, setThread } = useAppContext();

  return (
    <Channel channel={channel}>
      <MessageList
        onThreadSelect={(message) => {
          if (channel?.id) {
            setThread(message);
            navigation.navigate('ThreadScreen');
          }
        }}
      />
      <MessageInput />
    </Channel>
  );
};

export default ChannelScreen;