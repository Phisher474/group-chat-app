import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Send } from 'lucide-react-native';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MessageInput({ 
  onSendMessage, 
  placeholder = "Type a message...",
  disabled = false 
}: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <View style={[styles.container, disabled && styles.disabledContainer]}>
      <View style={[styles.inputContainer, disabled && styles.disabledInputContainer]}>
        <TextInput
          style={[styles.textInput, disabled && styles.disabledTextInput]}
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder}
          placeholderTextColor={disabled ? "#ccc" : "#999"}
          multiline
          maxLength={500}
          returnKeyType="send"
          onSubmitEditing={handleSend}
          blurOnSubmit={false}
          editable={!disabled}
        />
        <TouchableOpacity 
          style={[
            styles.sendButton, 
            message.trim() && !disabled ? styles.sendButtonActive : styles.sendButtonInactive
          ]}
          onPress={handleSend}
          disabled={!message.trim() || disabled}
        >
          <Send 
            size={20} 
            color={message.trim() && !disabled ? '#fff' : '#999'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  disabledContainer: {
    backgroundColor: '#F8F9FA',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F2F2F7',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 44,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  disabledInputContainer: {
    backgroundColor: '#F0F0F0',
    opacity: 0.6,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    maxHeight: 100,
    marginRight: 8,
    paddingVertical: 8,
    lineHeight: 20,
  },
  disabledTextInput: {
    color: '#999',
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  sendButtonActive: {
    backgroundColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonInactive: {
    backgroundColor: 'transparent',
  },
});