import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Group, Message } from '@/types';
import { mockGroups, mockMessages } from '@/utils/mockData';

interface GroupsState {
  groups: Group[];
  messages: { [groupId: string]: Message[] };
}

type GroupsAction =
  | { type: 'TOGGLE_GROUP_MEMBERSHIP'; groupId: string }
  | { type: 'ADD_MESSAGE'; groupId: string; message: Message }
  | { type: 'SET_GROUPS'; groups: Group[] }
  | { type: 'SET_MESSAGES'; messages: { [groupId: string]: Message[] } };

interface GroupsContextType {
  state: GroupsState;
  toggleGroupMembership: (groupId: string) => void;
  addMessage: (groupId: string, content: string) => void;
  getGroupById: (groupId: string) => Group | undefined;
  getMessagesByGroupId: (groupId: string) => Message[];
}

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

function groupsReducer(state: GroupsState, action: GroupsAction): GroupsState {
  switch (action.type) {
    case 'TOGGLE_GROUP_MEMBERSHIP':
      return {
        ...state,
        groups: state.groups.map(group =>
          group.id === action.groupId
            ? {
                ...group,
                isJoined: !group.isJoined,
                memberCount: group.isJoined ? group.memberCount - 1 : group.memberCount + 1
              }
            : group
        )
      };

    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.groupId]: [
            ...(state.messages[action.groupId] || []),
            action.message
          ]
        }
      };

    case 'SET_GROUPS':
      return {
        ...state,
        groups: action.groups
      };

    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.messages
      };

    default:
      return state;
  }
}

export function GroupsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(groupsReducer, {
    groups: mockGroups,
    messages: mockMessages
  });

  const toggleGroupMembership = (groupId: string) => {
    dispatch({ type: 'TOGGLE_GROUP_MEMBERSHIP', groupId });
  };

  const addMessage = (groupId: string, content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      groupId,
      content,
      author: 'You',
      timestamp: new Date(),
      isOwn: true
    };
    dispatch({ type: 'ADD_MESSAGE', groupId, message });
  };

  const getGroupById = (groupId: string) => {
    return state.groups.find(group => group.id === groupId);
  };

  const getMessagesByGroupId = (groupId: string) => {
    return state.messages[groupId] || [];
  };

  const value: GroupsContextType = {
    state,
    toggleGroupMembership,
    addMessage,
    getGroupById,
    getMessagesByGroupId
  };

  return (
    <GroupsContext.Provider value={value}>
      {children}
    </GroupsContext.Provider>
  );
}

export function useGroups() {
  const context = useContext(GroupsContext);
  if (context === undefined) {
    throw new Error('useGroups must be used within a GroupsProvider');
  }
  return context;
}