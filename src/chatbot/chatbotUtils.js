// Chatbot Utilities - Message processing and response generation

import { chatbotResponses, keywords } from './chatbotData';

/**
 * Process user message and find the best response
 * @param {string} userMessage - The user's input message
 * @returns {string} - The chatbot's response
 */
export const processMessage = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // Check for exact matches first
  if (chatbotResponses[lowerMessage]) {
    const responses = chatbotResponses[lowerMessage];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Check for keyword matches
  const matchedKeywords = findMatchingKeywords(lowerMessage);
  
  if (matchedKeywords.length > 0) {
    // Get the best matching keyword
    const bestMatch = matchedKeywords[0];
    const responses = chatbotResponses[bestMatch];
    
    if (responses) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // Check for partial matches
  const partialMatch = findPartialMatch(lowerMessage);
  if (partialMatch) {
    const responses = chatbotResponses[partialMatch];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Return default response
  const defaultResponses = chatbotResponses.default;
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

/**
 * Find keywords that match the user message
 * @param {string} message - Lowercase user message
 * @returns {Array} - Array of matching keywords
 */
export const findMatchingKeywords = (message) => {
  const matches = [];
  
  // Check each keyword category
  Object.entries(keywords).forEach(([category, keywordList]) => {
    keywordList.forEach(keyword => {
      if (message.includes(keyword)) {
        matches.push(keyword);
      }
    });
  });

  // Sort by length (longer matches are more specific)
  return matches.sort((a, b) => b.length - a.length);
};

/**
 * Find partial matches in the message
 * @param {string} message - Lowercase user message
 * @returns {string|null} - Best matching keyword or null
 */
export const findPartialMatch = (message) => {
  const words = message.split(' ');
  
  for (const word of words) {
    if (word.length > 2) { // Only check words longer than 2 characters
      for (const [key, responses] of Object.entries(chatbotResponses)) {
        if (key.includes(word) || word.includes(key)) {
          return key;
        }
      }
    }
  }
  
  return null;
};

/**
 * Check if message is a greeting
 * @param {string} message - User message
 * @returns {boolean} - True if it's a greeting
 */
export const isGreeting = (message) => {
  const greetingKeywords = keywords.greeting;
  const lowerMessage = message.toLowerCase();
  
  return greetingKeywords.some(keyword => lowerMessage.includes(keyword));
};

/**
 * Check if message is asking for help
 * @param {string} message - User message
 * @returns {boolean} - True if asking for help
 */
export const isAskingForHelp = (message) => {
  const helpKeywords = ['help', 'support', 'assist', 'guide', 'how'];
  const lowerMessage = message.toLowerCase();
  
  return helpKeywords.some(keyword => lowerMessage.includes(keyword));
};

/**
 * Extract intent from user message
 * @param {string} message - User message
 * @returns {string} - Intent category
 */
export const extractIntent = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (isGreeting(lowerMessage)) return 'greeting';
  if (isAskingForHelp(lowerMessage)) return 'help';
  
  // Check for specific intents
  if (lowerMessage.includes('order') || lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
    return 'ordering';
  }
  
  if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('credit')) {
    return 'payment';
  }
  
  if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery') || lowerMessage.includes('when')) {
    return 'shipping';
  }
  
  if (lowerMessage.includes('return') || lowerMessage.includes('refund') || lowerMessage.includes('damaged')) {
    return 'returns';
  }
  
  if (lowerMessage.includes('account') || lowerMessage.includes('password') || lowerMessage.includes('login')) {
    return 'account';
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('phone')) {
    return 'contact';
  }
  
  if (lowerMessage.includes('product') || lowerMessage.includes('item') || lowerMessage.includes('category')) {
    return 'products';
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('discount')) {
    return 'pricing';
  }
  
  if (lowerMessage.includes('security') || lowerMessage.includes('safe') || lowerMessage.includes('privacy')) {
    return 'security';
  }
  
  return 'general';
};

/**
 * Generate contextual response based on conversation history
 * @param {Array} messageHistory - Array of previous messages
 * @param {string} currentMessage - Current user message
 * @returns {string} - Contextual response
 */
export const generateContextualResponse = (messageHistory, currentMessage) => {
  const intent = extractIntent(currentMessage);
  
  // If this is a follow-up question, provide more specific help
  if (messageHistory.length > 1) {
    const lastBotMessage = messageHistory[messageHistory.length - 1];
    
    if (lastBotMessage.sender === 'bot') {
      // Check if the last bot message was about ordering
      if (lastBotMessage.text.includes('order') || lastBotMessage.text.includes('checkout')) {
        if (intent === 'payment') {
          return "Great! For payment, we accept credit cards, PayPal, and digital wallets. All payments are secure and encrypted. Which payment method would you prefer?";
        }
        if (intent === 'shipping') {
          return "Perfect! Shipping takes 3-5 business days for standard delivery, or 1-2 days for express. We offer free shipping on orders over $50. Would you like to proceed with checkout?";
        }
      }
      
      // Check if the last bot message was about payment
      if (lastBotMessage.text.includes('payment') || lastBotMessage.text.includes('pay')) {
        if (intent === 'security') {
          return "Absolutely! All our payment methods are secure. We use SSL encryption and are PCI DSS compliant. Your payment information is never stored on our servers. Is there anything else you'd like to know about security?";
        }
      }
    }
  }
  
  // Return regular processed response
  return processMessage(currentMessage);
};

/**
 * Check if message contains urgent keywords
 * @param {string} message - User message
 * @returns {boolean} - True if urgent
 */
export const isUrgent = (message) => {
  const urgentKeywords = ['urgent', 'emergency', 'broken', 'damaged', 'not working', 'problem', 'issue'];
  const lowerMessage = message.toLowerCase();
  
  return urgentKeywords.some(keyword => lowerMessage.includes(keyword));
};

/**
 * Add urgency indicator to response if needed
 * @param {string} response - Bot response
 * @param {boolean} isUrgent - Whether the user's message was urgent
 * @returns {string} - Response with urgency indicator if needed
 */
export const addUrgencyIndicator = (response, isUrgent) => {
  if (isUrgent) {
    return "🚨 " + response + "\n\nFor urgent matters, you can also call us at +44 (0) 20 7946 0958 for immediate assistance.";
  }
  return response;
};

/**
 * Generate personalized response based on user context
 * @param {string} message - User message
 * @param {Object} userContext - User context (if available)
 * @returns {string} - Personalized response
 */
export const generatePersonalizedResponse = (message, userContext = {}) => {
  let response = processMessage(message);
  
  // Add personalization if user context is available
  if (userContext.name) {
    response = response.replace(/Hello! 👋/, `Hello ${userContext.name}! 👋`);
    response = response.replace(/Hi there! 😊/, `Hi ${userContext.name}! 😊`);
  }
  
  // Add loyalty program mention for returning customers
  if (userContext.isReturningCustomer) {
    response += "\n\n💎 As a returning customer, don't forget to check your loyalty points!";
  }
  
  return response;
};

export default {
  processMessage,
  findMatchingKeywords,
  findPartialMatch,
  isGreeting,
  isAskingForHelp,
  extractIntent,
  generateContextualResponse,
  isUrgent,
  addUrgencyIndicator,
  generatePersonalizedResponse
};
