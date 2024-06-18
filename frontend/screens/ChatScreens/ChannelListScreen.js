import React, { useEffect, useState } from 'react';
import { ChannelList } from 'stream-chat-expo';
import { chatUserId } from '../../../backend/StreamChat/ChatConfig';
import { useAppContext } from '../../../backend/StreamChat/AppContext';
import { Text } from 'react-native';

const ChannelListScreen = ({ navigation }) => {
  const { setChannel } = useAppContext();
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatUserId = async () => {
      try {
        const userData = await chatUserId();
        const userId = userData[0]?.username;
        setFilters({
          members: {
            '$in': [userId],
          },
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chat user ID:', error);
      }
    };

    fetchChatUserId();
  }, []);

  if (loading) {
    return <Text>Loading chat channels...</Text>;
  }

  const sort = {
    last_message_at: -1,
  };

  return (
    <ChannelList
      filters={filters}
      sort={sort}
      onSelect={(channel) => {
        setChannel(channel);
        navigation.navigate('ChannelScreen');
      }}
    />
  );
};

export default ChannelListScreen;

