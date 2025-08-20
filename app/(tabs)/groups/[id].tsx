import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Users, MessageCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageBubble } from '@/components/MessageBubble';
import { MessageInput } from '@/components/MessageInput';
import { useGroups } from '@/contexts/GroupsContext';
import { Message } from '@/types';

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getGroupById, getMessagesByGroupId, addMessage, toggleGroupMembership } = useGroups();
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const group = getGroupById(id as string);
  const messages = getMessagesByGroupId(id as string);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  if (!group) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <MessageCircle size={64} color="#ccc" />
          <Text style={styles.errorText}>Group not found</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleSendMessage = (content: string) => {
    if (!group.isJoined) {
      Alert.alert(
        'Join Group Required',
        'You need to join this group before you can send messages.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Join Group',
            style: 'default',
            onPress: () => {
              toggleGroupMembership(group.id);
              setTimeout(() => {
                addMessage(id as string, content);
              }, 100);
            },
          },
        ]
      );
      return;
    }
    
    addMessage(id as string, content);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageBubble message={item} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyMessages}>
      <MessageCircle size={48} color="#ccc" />
      <Text style={styles.emptyTitle}>No messages yet</Text>
      <Text style={styles.emptySubtitle}>
        {group.isJoined 
          ? "Be the first to start the conversation!" 
          : "Join the group to see and send messages"
        }
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Enhanced Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
            <ArrowLeft size={24} color="#007AFF" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle} numberOfLines={1}>{group.title}</Text>
            <View style={styles.headerSubtitleContainer}>
              <Users size={12} color="#666" />
              <Text style={styles.headerSubtitle}>{group.memberCount} members</Text>
              {group.isJoined && (
                <View style={styles.joinedIndicator}>
                  <Text style={styles.joinedText}>Joined</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.headerButton} />
        </Animated.View>

        {/* Group Info Banner */}
        <Animated.View style={[styles.groupBanner, { opacity: fadeAnim }]}>
          <Text style={styles.groupDescription} numberOfLines={2}>
            {group.description}
          </Text>
          {!group.isJoined && (
            <TouchableOpacity 
              style={styles.joinBannerButton}
              onPress={() => toggleGroupMembership(group.id)}
            >
              <Text style={styles.joinBannerButtonText}>Join to participate</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Messages List */}
        <Animated.View style={[styles.messagesWrapper, { opacity: fadeAnim }]}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={[
              styles.messagesContainer,
              messages.length === 0 && styles.emptyMessagesContainer
            ]}
            showsVerticalScrollIndicator={false}
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
              autoscrollToTopThreshold: 10,
            }}
          />
        </Animated.View>

        {/* Enhanced Message Input */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <MessageInput 
            onSendMessage={handleSendMessage}
            placeholder={
              group.isJoined 
                ? `Message ${group.title}...` 
                : "Join the group to send messages"
            }
            disabled={!group.isJoined}
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  headerSubtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  joinedIndicator: {
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  joinedText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  groupBanner: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  groupDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  joinBannerButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  joinBannerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  messagesWrapper: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  messagesContainer: {
    paddingVertical: 8,
  },
  emptyMessagesContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyMessages: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    marginTop: 16,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});