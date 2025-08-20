import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Users, Clock, MessageCircle } from 'lucide-react-native';
import { Group } from '@/types';

interface GroupCardProps {
  group: Group;
  onPress: () => void;
  onJoinToggle: () => void;
}

export function GroupCard({ group, onPress, onJoinToggle }: GroupCardProps) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]} 
      onPress={onPress}
    >
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{group.title}</Text>
            {group.isJoined && (
              <View style={styles.joinedBadge}>
                <Text style={styles.joinedBadgeText}>Joined</Text>
              </View>
            )}
          </View>
          <View style={styles.memberCount}>
            <Users size={16} color="#666" />
            <Text style={styles.memberText}>{group.memberCount}</Text>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {group.description}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.metaInfo}>
            <View style={styles.lastActivity}>
              <Clock size={14} color="#999" />
              <Text style={styles.activityText}>Active {group.lastActivity}</Text>
            </View>
            <View style={styles.chatIndicator}>
              <MessageCircle size={14} color="#999" />
              <Text style={styles.chatText}>Tap to view chat</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={[
              styles.joinButton,
              group.isJoined ? styles.leaveButton : styles.joinButtonActive
            ]}
            onPress={(e) => {
              e.stopPropagation();
              onJoinToggle();
            }}
          >
            <Text style={[
              styles.joinButtonText,
              group.isJoined ? styles.leaveButtonText : styles.joinButtonTextActive
            ]}>
              {group.isJoined ? 'Leave Group' : 'Join Group'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.12,
  },
  cardContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginRight: 8,
  },
  joinedBadge: {
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  joinedBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  memberCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  memberText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  metaInfo: {
    flex: 1,
  },
  lastActivity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  chatIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
    fontStyle: 'italic',
  },
  joinButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  joinButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  leaveButton: {
    backgroundColor: 'transparent',
    borderColor: '#FF3B30',
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  joinButtonTextActive: {
    color: '#fff',
  },
  leaveButtonText: {
    color: '#FF3B30',
  },
});