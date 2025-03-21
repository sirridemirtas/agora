import { useApi } from '@/hooks';
import { useCallback, useMemo } from 'react';
import { MessageService, Conversation, UnreadCountResponse } from '@/services/MessageService';

export const useMessageService = () => {
  // Create messageService instance once with useMemo
  const messageService = useMemo(() => new MessageService(), []);
  
  // Memoize bound API functions
  const getConversationsFn = useMemo(() => 
    messageService.getConversations.bind(messageService), 
  [messageService]);
  
  const getUnreadCountFn = useMemo(() => 
    messageService.getUnreadCount.bind(messageService), 
  [messageService]);
  
  const getConversationFn = useMemo(() => 
    messageService.getConversation.bind(messageService), 
  [messageService]);
  
  const sendMessageFn = useMemo(() => 
    messageService.sendMessage.bind(messageService), 
  [messageService]);
  
  const markAsReadFn = useMemo(() => 
    messageService.markAsRead.bind(messageService), 
  [messageService]);
  
  const deleteConversationFn = useMemo(() => 
    messageService.deleteConversation.bind(messageService), 
  [messageService]);

  // Get all conversations
  const {
    data: conversations,
    error: conversationsError,
    loading: conversationsLoading,
    execute: executeGetConversations,
  } = useApi<Conversation[], []>(getConversationsFn);

  // Get unread count
  const {
    data: unreadCountData,
    error: unreadCountError,
    loading: unreadCountLoading,
    execute: executeGetUnreadCount,
  } = useApi<UnreadCountResponse, []>(getUnreadCountFn);

  // Get conversation with specific user
  const {
    data: conversation,
    error: conversationError,
    loading: conversationLoading,
    execute: executeGetConversation,
  } = useApi<Conversation, [string]>(getConversationFn);

  // Send message
  const {
    data: sentMessageResponse,
    error: sendMessageError,
    loading: sendMessageLoading,
    execute: executeSendMessage,
  } = useApi<Conversation, [string, string]>(sendMessageFn);

  // Mark as read
  const {
    error: markAsReadError,
    loading: markAsReadLoading,
    execute: executeMarkAsRead,
  } = useApi<void, [string]>(markAsReadFn);

  // Delete conversation
  const {
    error: deleteConversationError,
    loading: deleteConversationLoading,
    execute: executeDeleteConversation,
  } = useApi<void, [string]>(deleteConversationFn);

  // Callback wrappers
  const getConversations = useCallback(async () => {
    return executeGetConversations();
  }, [executeGetConversations]);

  const getUnreadCount = useCallback(async () => {
    return executeGetUnreadCount();
  }, [executeGetUnreadCount]);

  const getConversation = useCallback(async (username: string) => {
    return executeGetConversation(username);
  }, [executeGetConversation]);

  const sendMessage = useCallback(async (username: string, content: string) => {
    return executeSendMessage(username, content);
  }, [executeSendMessage]);

  const markAsRead = useCallback(async (username: string) => {
    return executeMarkAsRead(username);
  }, [executeMarkAsRead]);

  const deleteConversation = useCallback(async (username: string) => {
    return executeDeleteConversation(username);
  }, [executeDeleteConversation]);

  return {
    // Conversation list data and operations
    conversations,
    conversationsError,
    conversationsLoading,
    getConversations,
    
    // Unread count data and operations
    unreadCount: unreadCountData?.unreadCount || 0,
    unreadCountError,
    unreadCountLoading,
    getUnreadCount,
    
    // Specific conversation data and operations
    conversation,
    conversationError,
    conversationLoading,
    getConversation,
    
    // Send message operations
    sentMessageResponse,
    sendMessageError,
    sendMessageLoading,
    sendMessage,
    
    // Mark as read operations
    markAsReadError,
    markAsReadLoading,
    markAsRead,
    
    // Delete conversation operations
    deleteConversationError,
    deleteConversationLoading,
    deleteConversation,
  };
};
