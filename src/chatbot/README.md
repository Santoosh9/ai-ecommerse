# E-Shop Chatbot

A simple, rule-based chatbot for the E-Shop e-commerce platform that helps customers with common questions and provides support.

## 🚀 Features

### Core Features
- **Floating Chat Interface**: Fixed position chat button that opens a beautiful chat window
- **Quick Questions**: Pre-defined common questions for easy access
- **Smart Response System**: Keyword-based response matching with fallback
- **Typing Indicators**: Realistic typing animation for better UX
- **Message History**: Maintains conversation context
- **Auto-scroll**: Automatically scrolls to latest messages
- **Responsive Design**: Works on all screen sizes
- **Dark Mode Support**: Adapts to the site's dark mode theme

### E-commerce Specific Features
- **Order Support**: Help with placing orders, tracking, and cancellations
- **Payment Information**: Details about accepted payment methods
- **Shipping & Delivery**: Information about shipping times and options
- **Returns & Refunds**: Policy information and process guidance
- **Account Management**: Password reset, profile updates, etc.
- **Product Information**: Category details and product availability
- **Customer Service**: Contact information and support channels

## 📁 File Structure

```
src/chatbot/
├── Chatbot.jsx          # Main chatbot component
├── chatbotData.js       # Questions, responses, and conversation flows
├── chatbotUtils.js      # Utility functions for message processing
├── index.js            # Export file for easy imports
└── README.md           # This documentation
```

## 🎯 Quick Questions Available

The chatbot includes these pre-defined quick questions:

1. **How do I place an order?**
2. **What payment methods do you accept?**
3. **How long does shipping take?**
4. **What is your return policy?**
5. **Do you ship internationally?**
6. **How can I track my order?**
7. **What if my item arrives damaged?**
8. **Do you have a loyalty program?**
9. **How do I reset my password?**
10. **What are your business hours?**
11. **Do you offer student discounts?**
12. **Can I cancel my order?**
13. **What's your privacy policy?**
14. **Do you have a mobile app?**
15. **How do I contact customer service?**

## 🔧 How It Works

### Message Processing Flow

1. **User Input**: User types a message or selects a quick question
2. **Intent Detection**: System analyzes the message for keywords and intent
3. **Response Matching**: Finds the best matching response from the database
4. **Context Awareness**: Considers conversation history for better responses
5. **Urgency Detection**: Identifies urgent messages and adds priority indicators
6. **Response Generation**: Returns appropriate response with typing animation

### Response Categories

The chatbot can handle these types of queries:

- **Greetings**: Hello, hi, hey
- **Help Requests**: Help, support, assist
- **Ordering**: Order, buy, purchase, checkout
- **Payment**: Payment, pay, credit card, PayPal
- **Shipping**: Shipping, delivery, when, track
- **Returns**: Return, refund, damaged, broken
- **Account**: Account, password, login, profile
- **Contact**: Contact, support, phone, email
- **Products**: Products, items, categories
- **Pricing**: Price, cost, discount, sale
- **Security**: Security, safe, privacy, data

## 🛠️ Customization

### Adding New Responses

To add new responses, edit `chatbotData.js`:

```javascript
export const chatbotResponses = {
  "new_keyword": [
    "Response 1",
    "Response 2 (alternative)"
  ],
  // ... existing responses
};
```

### Adding New Quick Questions

Add to the `quickQuestions` array in `chatbotData.js`:

```javascript
export const quickQuestions = [
  "Your new question here?",
  // ... existing questions
];
```

### Extending Keywords

Add new keyword categories in `chatbotData.js`:

```javascript
export const keywords = {
  newCategory: ["keyword1", "keyword2", "keyword3"],
  // ... existing categories
};
```

### Custom Response Logic

Modify `chatbotUtils.js` to add custom processing:

```javascript
export const customProcessMessage = (userMessage) => {
  // Your custom logic here
  return response;
};
```

## 🎨 Styling

The chatbot uses Tailwind CSS classes and includes:

- **Glassmorphism Effect**: Modern, translucent design
- **Smooth Animations**: Hover effects and transitions
- **Responsive Layout**: Adapts to different screen sizes
- **Dark Mode**: Automatic theme switching
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔮 Future Enhancements

### AI Integration
- **OpenAI GPT Integration**: Replace rule-based responses with AI
- **Natural Language Processing**: Better understanding of user intent
- **Machine Learning**: Learn from user interactions

### Advanced Features
- **Voice Chat**: Speech-to-text and text-to-speech
- **File Upload**: Allow users to upload images/screenshots
- **Live Agent Handoff**: Transfer to human agent when needed
- **Multi-language Support**: Support for multiple languages
- **Analytics**: Track conversation metrics and user satisfaction

### E-commerce Integration
- **Order Status**: Real-time order tracking
- **Inventory Check**: Check product availability
- **Price Queries**: Real-time pricing information
- **Recommendations**: Suggest products based on conversation
- **Cart Integration**: Add items to cart via chat

## 📱 Usage

The chatbot is automatically included in the main App component and appears as a floating chat button in the bottom-right corner of every page.

### User Interaction

1. **Open Chat**: Click the chat bubble icon
2. **Ask Questions**: Type your question or select a quick question
3. **Get Responses**: Receive instant, helpful responses
4. **Continue Conversation**: Ask follow-up questions
5. **Close Chat**: Click the X button to close

### Developer Usage

```javascript
import { Chatbot } from './chatbot';

// In your component
<Chatbot />
```

## 🚀 Performance

- **Lazy Loading**: Chatbot loads only when needed
- **Optimized Responses**: Efficient keyword matching
- **Memory Management**: Automatic cleanup of old messages
- **Minimal Bundle Size**: Lightweight implementation

## 🔒 Security

- **Input Sanitization**: All user inputs are sanitized
- **No Data Storage**: Messages are not persisted
- **Privacy Compliant**: No personal data collection
- **XSS Protection**: Secure message rendering

## 📞 Support

For questions about the chatbot implementation or to request new features, please refer to the main project documentation or contact the development team.

---

**Note**: This is a rule-based chatbot designed for demonstration and educational purposes. For production use, consider integrating with AI services like OpenAI GPT for more sophisticated responses.
