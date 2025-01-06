import { Message } from '../types/chat';

export function getCurrentTimestamp(): string {
  return new Date().toLocaleTimeString();
}

export function createMessage(text: string, isBot: boolean, id: number): Message {
  return {
    id,
    text,
    isBot,
    timestamp: getCurrentTimestamp(),
  };
}