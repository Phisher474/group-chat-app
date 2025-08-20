import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { User, Settings, Bell, CircleHelp as HelpCircle, LogOut, Users, MessageCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGroups } from '@/contexts/GroupsContext';

export default function ProfileScreen() {
  const { state } = useGroups();
  const joinedGroups = state.groups.filter(group => group.isJoined);

  const menuItems = [
    { icon: Settings, label: 'Settings', color: '#666' },
    { icon: Bell, label: 'Notifications', color: '#666' },
    { icon: HelpCircle, label: 'Help & Support', color: '#666' },
    { icon: LogOut, label: 'Sign Out', color: '#FF3B30' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <User size={48} color="#007AFF" />
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Activity</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Users size={24} color="#007AFF" />
              <Text style={styles.statNumber}>{joinedGroups.length}</Text>
              <Text style={styles.statLabel}>Groups Joined</Text>
            </View>
            <View style={styles.statCard}>
              <MessageCircle size={24} color="#34C759" />
              <Text style={styles.statNumber}>
                {Object.values(state.messages).flat().filter(m => m.isOwn).length}
              </Text>
              <Text style={styles.statLabel}>Messages Sent</Text>
            </View>
          </View>
        </View>

        {/* Joined Groups Section */}
        {joinedGroups.length > 0 && (
          <View style={styles.joinedSection}>
            <Text style={styles.sectionTitle}>Your Groups</Text>
            {joinedGroups.map((group) => (
              <View key={group.id} style={styles.joinedGroupItem}>
                <View style={styles.joinedGroupInfo}>
                  <Text style={styles.joinedGroupTitle}>{group.title}</Text>
                  <View style={styles.joinedGroupMeta}>
                    <Users size={12} color="#666" />
                    <Text style={styles.joinedGroupMembers}>{group.memberCount} members</Text>
                  </View>
                </View>
                <View style={styles.activeIndicator} />
              </View>
            ))}
          </View>
        )}

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <item.icon size={20} color={item.color} />
                <Text style={[styles.menuItemText, { color: item.color }]}>
                  {item.label}
                </Text>
              </View>
              <Text style={styles.menuItemArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Group Chats v1.0.0</Text>
          <Text style={styles.appInfoSubtext}>Built with React Native & Expo</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  statsSection: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
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
  joinedSection: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  joinedGroupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  joinedGroupInfo: {
    flex: 1,
  },
  joinedGroupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  joinedGroupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinedGroupMembers: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34C759',
  },
  menuSection: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#ccc',
    fontWeight: '300',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  appInfoText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
    marginBottom: 4,
  },
  appInfoSubtext: {
    fontSize: 12,
    color: '#ccc',
    fontWeight: '500',
  },
});