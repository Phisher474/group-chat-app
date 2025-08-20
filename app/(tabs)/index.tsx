import React from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { GroupCard } from '@/components/GroupCard';
import { useGroups } from '@/contexts/GroupsContext';
import { Group } from '@/types';
import { Users, Sparkles } from 'lucide-react-native';

export default function GroupsScreen() {
  const router = useRouter();
  const { state, toggleGroupMembership } = useGroups();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleGroupPress = (group: Group) => {
    router.push(`/groups/${group.id}`);
  };

  const handleJoinToggle = (groupId: string) => {
    toggleGroupMembership(groupId);
  };

  const renderGroup = ({ item, index }: { item: Group; index: number }) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{
          translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        }],
      }}
    >
      <GroupCard
        group={item}
        onPress={() => handleGroupPress(item)}
        onJoinToggle={() => handleJoinToggle(item.id)}
      />
    </Animated.View>
  );

  const renderHeader = () => (
    <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
      <View style={styles.headerContent}>
        <View style={styles.titleContainer}>
          <Sparkles size={28} color="#007AFF" />
          <Text style={styles.title}>Group Chats</Text>
        </View>
        <Text style={styles.subtitle}>Connect with like-minded communities</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Users size={20} color="#007AFF" />
            <Text style={styles.statNumber}>{state.groups.length}</Text>
            <Text style={styles.statLabel}>Groups Available</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Users size={20} color="#34C759" />
            <Text style={styles.statNumber}>
              {state.groups.filter(g => g.isJoined).length}
            </Text>
            <Text style={styles.statLabel}>Groups Joined</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const renderEmpty = () => (
    <Animated.View style={[styles.emptyContainer, { opacity: fadeAnim }]}>
      <Users size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>No groups available</Text>
      <Text style={styles.emptySubtitle}>Check back later for new communities!</Text>
    </Animated.View>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={state.groups}
        renderItem={renderGroup}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: '#F8F9FA',
  },
  headerContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1a',
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 16,
  },
  separator: {
    height: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
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
});