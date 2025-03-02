export const WELCOME_MESSAGE = `👋 Hello! I'm your CDP Chatbot assistant.

I can help you with questions about how to use Customer Data Platforms (CDPs) like Segment, mParticle, Lytics, and Zeotap.

Ask me questions like:
- "How do I set up a new source in Segment?"
- "How can I create a user profile in mParticle?"
- "How do I build an audience segment in Lytics?"
- "How can I integrate my data with Zeotap?"

What would you like to know today?`;

export const PLATFORMS = [
  { id: 'segment', name: 'Segment', color: 'green' },
  { id: 'mparticle', name: 'mParticle', color: 'blue' },
  { id: 'lytics', name: 'Lytics', color: 'purple' },
  { id: 'zeotap', name: 'Zeotap', color: 'red' }
];

export const SAMPLE_QUESTIONS = [
  "How do I set up a new source in Segment?",
  "How can I create a user profile in mParticle?",
  "How do I build an audience segment in Lytics?",
  "How can I integrate my data with Zeotap?",
  "What are the steps to implement Segment in my website?",
  "How do I track events with mParticle?",
  "How can I export data from Lytics to other platforms?",
  "What are the best practices for data collection in Zeotap?"
];

// Mock documentation data for each platform
export const DOCUMENTATION = {
  segment: {
    "set up a new source": `To set up a new source in Segment:

1. Log in to your Segment workspace
2. Navigate to Sources in the left sidebar
3. Click "Add Source" button
4. Search for and select the source type you want to add
5. Follow the configuration steps for your specific source
6. Name your source and click "Add Source"
7. Follow the implementation instructions provided

For website sources, you'll need to add the Segment snippet to your site. For server-side sources, you'll need to install the appropriate library.`,

    "implement in website": `To implement Segment in your website:

1. Log in to your Segment workspace
2. Go to Sources and add a new JavaScript source
3. Copy the Segment snippet provided
4. Paste the snippet in the <head> section of your website, before the closing </head> tag
5. Initialize the analytics object with your write key
6. Start tracking events using analytics.track() method
7. Track page views with analytics.page()
8. Identify users with analytics.identify()

Example implementation:
\`\`\`html
<script>
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="YOUR_WRITE_KEY";analytics.SNIPPET_VERSION="4.13.2";
  analytics.load("YOUR_WRITE_KEY");
  analytics.page();
  }}();
</script>
\`\`\``,

    "track events": `To track events with Segment:

1. Make sure the Segment snippet is properly installed on your site
2. Use the analytics.track() method to record user actions
3. Provide an event name and optional properties

Example:
\`\`\`javascript
analytics.track('Button Clicked', {
  buttonName: 'Sign Up',
  buttonColor: 'blue',
  signupMethod: 'email'
});
\`\`\`

Best practices:
- Use descriptive event names in past tense (e.g., "Product Added" not "Add Product")
- Be consistent with naming conventions
- Include relevant properties with each event
- Group related events with category property
- Document your tracking plan`
  },

  mparticle: {
    "create a user profile": `To create a user profile in mParticle:

1. Log in to your mParticle dashboard
2. Initialize the mParticle SDK in your application
3. Use the identify method to create or update a user profile
4. Provide a customer ID and user attributes

Example in JavaScript:
\`\`\`javascript
// Initialize mParticle
window.mParticle = {
  config: {
    isDevelopmentMode: true,
    identifyRequest: {
      userIdentities: {
        email: 'user@example.com',
        customerid: '123456'
      }
    }
  }
};

// Later in your code, identify the user
mParticle.Identity.login({
  userIdentities: {
    email: 'user@example.com',
    customerid: '123456'
  }
});

// Set user attributes
mParticle.Identity.getCurrentUser().setUserAttribute('firstName', 'John');
mParticle.Identity.getCurrentUser().setUserAttribute('lastName', 'Doe');
mParticle.Identity.getCurrentUser().setUserAttribute('premiumUser', true);
\`\`\`

User profiles will be created automatically when you identify users and will be updated with any attributes you provide.`,

    "track events": `To track events with mParticle:

1. Initialize the mParticle SDK in your application
2. Use the logEvent method to track user actions
3. Specify the event name, type, and attributes

Example in JavaScript:
\`\`\`javascript
// Track a custom event
mParticle.logEvent(
  'Button Clicked',
  mParticle.EventType.Navigation,
  {
    buttonName: 'Sign Up',
    buttonColor: 'blue',
    signupMethod: 'email'
  }
);

// Track a commerce event
var product = mParticle.eCommerce.createProduct(
  'Product Name',
  'SKU-123',
  19.99,
  1
);

var transactionAttributes = {
  Id: 'T-123',
  Revenue: 19.99,
  Tax: 1.99
};

var customAttributes = {
  couponCode: 'SUMMER20',
  storeId: '123'
};

mParticle.eCommerce.logPurchase(
  transactionAttributes,
  [product],
  customAttributes
);
\`\`\`

mParticle supports different event types:
- Custom Events
- Screen Views
- Commerce Events
- User Attribute Changes
- User Identity Changes`
  },

  lytics: {
    "build an audience segment": `To build an audience segment in Lytics:

1. Log in to your Lytics account
2. Navigate to Audiences in the left sidebar
3. Click "Create Audience" button
4. Define your segment criteria using the segment builder
5. Use filters to narrow down your audience based on:
   - User attributes
   - Behavioral data
   - Content affinity
   - Predictive scores
6. Preview your audience to see estimated size
7. Name and save your audience
8. Activate the audience to your desired destinations

Example segment criteria:
- Users who visited the pricing page in the last 30 days
- AND have opened at least 2 emails
- AND have not made a purchase

Lytics uses a powerful segment builder that allows you to combine multiple conditions with AND/OR operators and create nested conditions for complex audience definitions.`,

    "export data": `To export data from Lytics to other platforms:

1. Log in to your Lytics account
2. Navigate to Connections in the left sidebar
3. Click "Add Connection" button
4. Select the destination platform from the available integrations
5. Configure the connection settings:
   - Authentication credentials
   - Data mapping
   - Sync frequency
   - Audience selection
6. Save and activate the connection

Lytics supports various export destinations:
- Marketing platforms (Facebook, Google, etc.)
- Email service providers
- CRM systems
- Advertising platforms
- Custom API endpoints
- Data warehouses

You can also use the Lytics API to programmatically export data:
\`\`\`javascript
// Example API call to export user data
fetch('https://api.lytics.io/api/user/USER_ID', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));
\`\`\``
  },

  zeotap: {
    "integrate data": `To integrate your data with Zeotap:

1. Log in to your Zeotap account
2. Navigate to Data Sources in the dashboard
3. Click "Add New Source" button
4. Select the type of data source:
   - First-party data upload
   - Server-to-server integration
   - SDK implementation
   - Pixel tracking
5. Follow the configuration steps for your selected method
6. Map your data fields to Zeotap's standard schema
7. Set up the data transfer schedule
8. Validate and activate the integration

For server-to-server integration:
- Zeotap provides API endpoints for data transfer
- You'll need to implement API calls from your systems
- Data should be formatted according to Zeotap's specifications
- Authentication is handled via API keys

For SDK implementation:
- Add the Zeotap SDK to your mobile app or website
- Initialize the SDK with your account credentials
- Implement tracking calls for relevant user actions
- Configure user identification parameters`,

    "best practices for data collection": `Best practices for data collection in Zeotap:

1. Data Quality
   - Ensure data is accurate and up-to-date
   - Validate data before sending to Zeotap
   - Remove duplicate records
   - Standardize formats (dates, phone numbers, etc.)

2. Data Privacy and Compliance
   - Obtain proper consent before collecting user data
   - Implement data minimization principles
   - Follow GDPR, CCPA, and other relevant regulations
   - Document your data collection processes
   - Honor opt-out requests promptly

3. Implementation
   - Use server-side tracking when possible for better reliability
   - Implement proper error handling
   - Set up monitoring for data flows
   - Test thoroughly before going to production
   - Start with essential data points and expand gradually

4. Data Organization
   - Use consistent naming conventions
   - Document your data schema
   - Group related data points
   - Use appropriate data types
   - Include timestamps with all events

5. Security
   - Use encryption for data in transit
   - Implement access controls
   - Regularly audit data access
   - Use secure authentication methods
   - Keep integration credentials secure`
  }
};