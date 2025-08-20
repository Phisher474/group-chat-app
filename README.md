# Group Chats - React Native App

A modern, lightweight community chat/forum application built with React Native and Expo Router.

## Features

- **Groups List**: Browse available focus groups with titles, descriptions, and member counts
- **Join/Leave Groups**: Simple one-tap functionality to join or leave groups
- **Group Chat**: Real-time chat interface for group discussions (users can only chat in a group after joining)
- **Access Control**: Users cannot chat in a group until they join it
- **Profile Joined Groups**: Users can see the total number of groups they've joined in their profile
- **Tab Navigation**: Intuitive navigation structure
- **Responsive Design**: Works seamlessly on iOS and Android

## Architecture

### Project Structure

```
app/
├── _layout.tsx              # Root layout with stack navigator
├── (tabs)/                  # Tab-based navigation
│   ├── _layout.tsx         # Tab navigator configuration
│   ├── index.tsx           # Groups list screen
│   ├── profile.tsx         # User profile screen
│   └── groups/
│       └── [id].tsx        # Group detail screen
├── components/             # Reusable UI components
│   ├── GroupCard.tsx       # Individual group card
│   ├── MessageBubble.tsx   # Chat message component
│   └── MessageInput.tsx    # Chat input component
├── contexts/              # State management
│   └── GroupsContext.tsx   # Global groups state
├── types/                 # TypeScript definitions
│   └── index.ts           # App-wide type definitions
└── utils/                 # Utility functions
    └── mockData.ts        # Sample data for development
```

### Key Technologies

- **Expo Router**: File-based routing system
- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **Context API**: State management
- **Lucide Icons**: Modern icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended)
- Expo CLI

### Installation

1. **Clone and setup the project**
   ```bash
   pnpm install
   ```

2. **Start the development server**
   ```bash
   pnpm dev
   ```

3. **Run on device/simulator**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press 'i' for iOS simulator, 'a' for Android emulator

## Usage

### Groups List Screen
- Browse available focus groups
- View group titles, descriptions, and member counts
- Tap "Join Group" to join a group (button changes to "Leave Group")
- Tap on a group card to navigate to the chat screen

### Group Detail Screen
- View group information and description
- Read chat messages in chronological order
- Send new messages using the input field at the bottom
- Navigate back to groups list

## State Management

The app uses React Context API for managing global state:

- **GroupsContext**: Manages groups data, membership status, and messages
- **Local State**: Component-level state for UI interactions


### Adding New Groups
Modify `utils/mockData.ts` to add new groups to the application.

### Styling Approach
- Uses React Native's StyleSheet API
- Consistent spacing and typography
- Platform-adaptive components
- Accessible design patterns

### Navigation Flow
```
Groups List → Group Detail
     ↕
  Profile Tab
```

## Future Enhancements

- Real-time messaging with WebSocket integration
- User authentication and profiles
- Push notifications for new messages
- Image and file sharing in chats
- Group creation and management
- Search and filtering capabilities

## Explanations of Design Choices

- **Expo Router**: Chosen for its file-based routing and seamless navigation experience in React Native apps.
- **Context API**: Used for global state management to keep the app simple and avoid extra dependencies.
- **TypeScript**: Ensures type safety and reduces runtime errors.
- **Component Structure**: UI components are modular and reusable for maintainability.
- **SafeAreaView**: Used to handle device status bar and notches for a consistent UI.
- **Access Control**: Users must join a group before chatting, improving privacy and engagement.

## Time Spent on Each Part

- **part 1**: 5 hour
- **part 2**: 30 minutes
- **part 3**: 20 minutes
