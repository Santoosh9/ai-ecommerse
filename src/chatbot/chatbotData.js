// Chatbot Data - All questions, responses, and conversation flows

export const quickQuestions = [
  "How do I place an order?",
  "What payment methods do you accept?",
  "How long does shipping take?",
  "What is your return policy?",
  "Do you ship internationally?",
  "How can I track my order?",
  "What if my item arrives damaged?",
  "Do you have a loyalty program?",
  "How do I reset my password?",
  "What are your business hours?",
  "Do you offer student discounts?",
  "Can I cancel my order?",
  "What's your privacy policy?",
  "Do you have a mobile app?",
  "How do I contact customer service?"
];

export const chatbotResponses = {
  // Greetings
  "hello": [
    "Hello! 👋 Welcome to E-Shop. How can I help you today?",
    "Hi there! 😊 Welcome to our store. What can I assist you with?",
    "Hello! Welcome to E-Shop. I'm here to help with any questions!"
  ],
  "hi": [
    "Hi there! 😊 I'm here to help with any questions about our products and services.",
    "Hello! 👋 How can I make your shopping experience better today?",
    "Hi! Welcome to E-Shop. What would you like to know?"
  ],
  "hey": [
    "Hey! 👋 How can I help you today?",
    "Hi there! 😊 What can I assist you with?"
  ],

  // Help
  "help": [
    "I can help you with:\n• Order placement and tracking\n• Payment and shipping\n• Returns and refunds\n• Product information\n• Account issues\n\nJust ask me anything!",
    "Here's what I can help with:\n• Shopping and orders\n• Payment methods\n• Shipping information\n• Returns and exchanges\n• Account management\n• Product questions\n\nWhat would you like to know?"
  ],

  // Ordering
  "order": [
    "To place an order:\n1. Browse our products\n2. Add items to cart\n3. Click 'Checkout'\n4. Enter shipping details\n5. Choose payment method\n6. Confirm order\n\nNeed help with any step?",
    "Here's how to order:\n1. Find products you like\n2. Add them to your cart\n3. Go to checkout\n4. Fill in your details\n5. Pay securely\n6. Get confirmation\n\nAny questions about the process?"
  ],
  "place order": [
    "To place an order:\n1. Browse our products\n2. Add items to cart\n3. Click 'Checkout'\n4. Enter shipping details\n5. Choose payment method\n6. Confirm order\n\nNeed help with any step?"
  ],
  "buy": [
    "To buy from us:\n1. Browse our products\n2. Add items to cart\n3. Click 'Checkout'\n4. Enter shipping details\n5. Choose payment method\n6. Confirm order\n\nNeed help with any step?"
  ],

  // Payment
  "payment": [
    "We accept:\n• Credit/Debit Cards (Visa, MasterCard, American Express)\n• PayPal\n• Apple Pay\n• Google Pay\n• Bank transfers\n\nAll payments are secure and encrypted.",
    "Payment options:\n• Credit/Debit Cards\n• PayPal\n• Digital wallets (Apple Pay, Google Pay)\n• Bank transfers\n\nAll transactions are secure! 🔒"
  ],
  "pay": [
    "We accept:\n• Credit/Debit Cards (Visa, MasterCard, American Express)\n• PayPal\n• Apple Pay\n• Google Pay\n• Bank transfers\n\nAll payments are secure and encrypted."
  ],
  "credit card": [
    "Yes, we accept all major credit cards:\n• Visa\n• MasterCard\n• American Express\n• Discover\n\nAll transactions are secure and encrypted! 🔒"
  ],

  // Shipping
  "shipping": [
    "Shipping times:\n• Standard: 3-5 business days\n• Express: 1-2 business days\n• Free shipping on orders over $50\n• International: 7-14 business days\n\nWe'll send tracking info once your order ships!",
    "Our shipping options:\n• Standard (3-5 days): $5.99\n• Express (1-2 days): $12.99\n• Free shipping on orders over $50\n• International: 7-14 days\n\nWe'll email you tracking info!"
  ],
  "delivery": [
    "Delivery times:\n• Standard: 3-5 business days\n• Express: 1-2 business days\n• Free shipping on orders over $50\n• International: 7-14 business days\n\nWe'll send tracking info once your order ships!"
  ],
  "when": [
    "Shipping times:\n• Standard: 3-5 business days\n• Express: 1-2 business days\n• Free shipping on orders over $50\n• International: 7-14 business days\n\nWe'll send tracking info once your order ships!"
  ],

  // Returns
  "return": [
    "Our return policy:\n• 30-day return window\n• Items must be unused and in original packaging\n• Free returns for defective items\n• Refunds processed within 5-7 business days\n\nContact us if you need to return something!",
    "Returns:\n• 30 days to return\n• Must be unused and in original packaging\n• Free returns for damaged items\n• Refunds in 5-7 business days\n\nNeed to return something?"
  ],
  "refund": [
    "Refund process:\n• 30-day return window\n• Items must be unused and in original packaging\n• Refunds processed within 5-7 business days\n• Money back to original payment method\n\nContact us to start a return!"
  ],

  // International
  "international": [
    "Yes, we ship worldwide! 🌍\n• Most countries: 7-14 business days\n• Customs fees may apply\n• Tracking available for all international orders\n• Contact us for specific country information",
    "International shipping:\n• We ship to most countries\n• 7-14 business days delivery\n• Customs fees may apply\n• Full tracking included\n\nWhere are you located?"
  ],
  "worldwide": [
    "Yes, we ship worldwide! 🌍\n• Most countries: 7-14 business days\n• Customs fees may apply\n• Tracking available for all international orders\n• Contact us for specific country information"
  ],

  // Tracking
  "track": [
    "To track your order:\n1. Log into your account\n2. Go to 'My Orders'\n3. Click on your order\n4. View tracking information\n\nOr check your email for tracking updates!",
    "Track your order:\n1. Sign in to your account\n2. Visit 'My Orders'\n3. Click on your order\n4. See tracking details\n\nWe'll also email you updates!"
  ],
  "tracking": [
    "To track your order:\n1. Log into your account\n2. Go to 'My Orders'\n3. Click on your order\n4. View tracking information\n\nOr check your email for tracking updates!"
  ],

  // Damaged Items
  "damaged": [
    "If your item arrives damaged:\n1. Take photos of the damage\n2. Contact us within 48 hours\n3. We'll arrange a replacement or refund\n4. No return shipping cost for damaged items\n\nWe're sorry this happened! 😔",
    "Damaged item?\n1. Take photos immediately\n2. Contact us within 48 hours\n3. We'll replace or refund\n4. No return shipping cost\n\nWe apologize for the inconvenience!"
  ],
  "broken": [
    "If your item arrives damaged:\n1. Take photos of the damage\n2. Contact us within 48 hours\n3. We'll arrange a replacement or refund\n4. No return shipping cost for damaged items\n\nWe're sorry this happened! 😔"
  ],

  // Loyalty Program
  "loyalty": [
    "Yes! Our loyalty program includes:\n• Points on every purchase\n• Exclusive member discounts\n• Early access to sales\n• Birthday rewards\n• Free shipping threshold\n\nSign up in your account settings!",
    "Loyalty program benefits:\n• Earn points on purchases\n• Member-only discounts\n• Early sale access\n• Birthday rewards\n• Free shipping at $50\n\nJoin in your account settings!"
  ],
  "rewards": [
    "Yes! Our loyalty program includes:\n• Points on every purchase\n• Exclusive member discounts\n• Early access to sales\n• Birthday rewards\n• Free shipping threshold\n\nSign up in your account settings!"
  ],

  // Account
  "account": [
    "Account help:\n• Reset password: Use 'Forgot Password' link\n• Update info: Go to Profile settings\n• Delete account: Contact customer service\n• Privacy: Check our Privacy Policy\n\nNeed specific help?",
    "Account assistance:\n• Password reset: Use 'Forgot Password'\n• Update profile: Go to settings\n• Delete account: Contact support\n• Privacy: See Privacy Policy\n\nWhat do you need help with?"
  ],
  "password": [
    "To reset your password:\n1. Click 'Forgot Password' on login page\n2. Enter your email address\n3. Check your email for reset link\n4. Create new password\n\nNeed help with this process?"
  ],

  // Contact
  "contact": [
    "You can contact us:\n• Email: support@eshop.com\n• Phone: +1 (555) 123-4567\n• Live chat: Available 24/7\n• Social media: @eshop_official\n\nWe typically respond within 2 hours!",
    "Contact information:\n• Email: support@eshop.com\n• Phone: +1 (555) 123-4567\n• Live chat: 24/7\n• Social: @eshop_official\n\nWe respond within 2 hours!"
  ],
  "support": [
    "You can contact us:\n• Email: support@eshop.com\n• Phone: +1 (555) 123-4567\n• Live chat: Available 24/7\n• Social media: @eshop_official\n\nWe typically respond within 2 hours!"
  ],

  // Products
  "products": [
    "We offer:\n• Electronics (phones, laptops, accessories)\n• Fashion & Apparel (clothing, shoes, bags)\n• Home & Living (furniture, decor, kitchen)\n• Local Products (handcrafted items)\n\nBrowse our categories to explore!",
    "Our product categories:\n• Electronics & Tech\n• Fashion & Apparel\n• Home & Living\n• Local Artisan Products\n\nWhat type of products interest you?"
  ],
  "categories": [
    "We offer:\n• Electronics (phones, laptops, accessories)\n• Fashion & Apparel (clothing, shoes, bags)\n• Home & Living (furniture, decor, kitchen)\n• Local Products (handcrafted items)\n\nBrowse our categories to explore!"
  ],

  // Pricing
  "price": [
    "Our pricing:\n• Competitive market prices\n• Regular sales and discounts\n• Student discounts available\n• Bulk order discounts\n• Price match guarantee\n\nCheck our website for current prices!",
    "Pricing information:\n• Competitive prices\n• Regular sales\n• Student discounts\n• Bulk discounts\n• Price match guarantee\n\nBrowse our site for current prices!"
  ],
  "cost": [
    "Our pricing:\n• Competitive market prices\n• Regular sales and discounts\n• Student discounts available\n• Bulk order discounts\n• Price match guarantee\n\nCheck our website for current prices!"
  ],

  // Quality
  "quality": [
    "We guarantee:\n• Authentic products only\n• Quality assurance on all items\n• Manufacturer warranties\n• 30-day satisfaction guarantee\n• Customer reviews on all products\n\nWe stand behind everything we sell!",
    "Quality assurance:\n• Authentic products only\n• Quality checked items\n• Manufacturer warranties\n• 30-day satisfaction guarantee\n• Customer reviews\n\nWe guarantee quality!"
  ],
  "authentic": [
    "We guarantee:\n• Authentic products only\n• Quality assurance on all items\n• Manufacturer warranties\n• 30-day satisfaction guarantee\n• Customer reviews on all products\n\nWe stand behind everything we sell!"
  ],

  // Security
  "security": [
    "Your security is our priority:\n• SSL encrypted transactions\n• PCI DSS compliant\n• Secure payment processing\n• Data protection measures\n• Privacy policy compliance\n\nYour information is safe with us! 🔒",
    "Security measures:\n• SSL encryption\n• PCI DSS compliant\n• Secure payments\n• Data protection\n• Privacy compliance\n\nYour data is safe! 🔒"
  ],
  "safe": [
    "Your security is our priority:\n• SSL encrypted transactions\n• PCI DSS compliant\n• Secure payment processing\n• Data protection measures\n• Privacy policy compliance\n\nYour information is safe with us! 🔒"
  ],

  // Business Hours
  "hours": [
    "Our business hours:\n• Monday-Friday: 9 AM - 6 PM EST\n• Saturday: 10 AM - 4 PM EST\n• Sunday: Closed\n• Online orders: 24/7\n• Customer service: 24/7 via chat",
    "Business hours:\n• Weekdays: 9 AM - 6 PM EST\n• Saturday: 10 AM - 4 PM EST\n• Sunday: Closed\n• Online: 24/7\n• Support: 24/7 chat"
  ],
  "open": [
    "Our business hours:\n• Monday-Friday: 9 AM - 6 PM EST\n• Saturday: 10 AM - 4 PM EST\n• Sunday: Closed\n• Online orders: 24/7\n• Customer service: 24/7 via chat"
  ],

  // Student Discount
  "student": [
    "Yes! Student discounts:\n• 10% off with valid student ID\n• Available on most products\n• Cannot be combined with other offers\n• Verification required\n\nContact us with your student ID!",
    "Student discount:\n• 10% off with student ID\n• Most products eligible\n• Cannot combine with other offers\n• ID verification needed\n\nShow us your student ID!"
  ],
  "discount": [
    "Our discounts:\n• Student discount: 10% off\n• Loyalty program rewards\n• Seasonal sales\n• Bulk order discounts\n• First-time buyer discount\n\nCheck our website for current offers!"
  ],

  // Cancel Order
  "cancel": [
    "To cancel your order:\n• Contact us immediately\n• Orders can be cancelled before shipping\n• Refund processed within 5-7 days\n• No cancellation fee\n\nEmail us with your order number!",
    "Cancelling orders:\n• Contact us right away\n• Cancel before shipping\n• Refund in 5-7 days\n• No fees\n\nEmail with order number!"
  ],

  // Privacy
  "privacy": [
    "Our privacy policy:\n• We protect your personal information\n• No sharing with third parties\n• Secure data storage\n• You control your data\n• Full policy on our website\n\nYour privacy matters to us! 🔒",
    "Privacy protection:\n• Secure personal data\n• No third-party sharing\n• Safe data storage\n• You control your info\n• Full policy online\n\nWe protect your privacy!"
  ],

  // Mobile App
  "app": [
    "Mobile app features:\n• Easy shopping on the go\n• Push notifications for deals\n• Quick checkout\n• Order tracking\n• Wishlist management\n\nDownload from App Store or Google Play!",
    "Our mobile app:\n• Shop anywhere\n• Deal notifications\n• Fast checkout\n• Track orders\n• Manage wishlist\n\nGet it from App Store or Google Play!"
  ],
  "mobile": [
    "Mobile app features:\n• Easy shopping on the go\n• Push notifications for deals\n• Quick checkout\n• Order tracking\n• Wishlist management\n\nDownload from App Store or Google Play!"
  ],

  // Default response
  "default": [
    "I'm not sure I understand. Could you please rephrase your question? I can help with:\n• Ordering and shipping\n• Payments and returns\n• Product information\n• Account issues\n• General inquiries\n\nOr try one of the quick questions above! 😊",
    "I didn't catch that. Could you rephrase? I can help with:\n• Shopping and orders\n• Payment methods\n• Shipping info\n• Returns\n• Account help\n• Product questions\n\nTry a quick question above! 😊"
  ]
};

// Conversation flows for more complex interactions
export const conversationFlows = {
  orderHelp: {
    trigger: ["order", "buy", "purchase", "checkout"],
    steps: [
      "Great! Let me help you place an order. First, have you found the products you want to buy?",
      "Perfect! Now let's go through the steps:\n1. Add items to your cart\n2. Click the cart icon\n3. Review your items\n4. Click 'Checkout'\n\nAre you ready to proceed?",
      "Excellent! During checkout you'll need:\n• Shipping address\n• Payment method\n• Contact information\n\nAny questions about these steps?"
    ]
  },
  
  paymentHelp: {
    trigger: ["payment", "pay", "credit card", "paypal"],
    steps: [
      "I can help you with payment options! What payment method would you prefer?",
      "We accept:\n• Credit/Debit Cards\n• PayPal\n• Digital Wallets\n• Bank Transfer\n\nWhich one works best for you?",
      "Perfect choice! All our payment methods are secure and encrypted. Is there anything specific about the payment process you'd like to know?"
    ]
  }
};

// Keywords for better matching
export const keywords = {
  greeting: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
  ordering: ["order", "buy", "purchase", "checkout", "cart", "shopping"],
  payment: ["payment", "pay", "credit card", "paypal", "money", "cost"],
  shipping: ["shipping", "delivery", "when", "arrive", "track", "tracking"],
  returns: ["return", "refund", "exchange", "damaged", "broken", "wrong"],
  account: ["account", "password", "login", "sign in", "profile"],
  contact: ["contact", "support", "help", "phone", "email", "customer service"],
  products: ["products", "items", "goods", "categories", "what do you sell"],
  pricing: ["price", "cost", "expensive", "cheap", "discount", "sale"],
  security: ["security", "safe", "secure", "protect", "privacy", "data"]
};

export default {
  quickQuestions,
  chatbotResponses,
  conversationFlows,
  keywords
};
