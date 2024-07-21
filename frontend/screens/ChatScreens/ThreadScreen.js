import { useAppContext } from '../../../backend/StreamChat/AppContext';
import { Channel, Thread } from 'stream-chat-expo';


const ThreadScreen = props => {
    const { channel, thread } = useAppContext();
  
    return null;
    return (
      <Channel channel={channel} thread={thread} threadList>
        <Thread />
      </Channel>
    );
  }

export default ThreadScreen;