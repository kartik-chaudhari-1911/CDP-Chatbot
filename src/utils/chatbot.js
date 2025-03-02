import { DOCUMENTATION } from './constants';

// Function to generate a response based on user input
export const generateResponse = async (userInput, selectedPlatforms) => {
  // Convert input to lowercase for easier matching
  const input = userInput.toLowerCase();
  
  // Check if the question is not related to CDPs
  if (!isRelevantToCDP(input)) {
    return `I'm sorry, but I'm specifically designed to answer questions about Customer Data Platforms (CDPs) like Segment, mParticle, Lytics, and Zeotap. I can't provide information about other topics.

Could you please ask me something related to these CDPs? For example:
- How to set up a source in Segment
- How to track events in mParticle
- How to create segments in Lytics
- Best practices for data collection in Zeotap`;
  }
  
  // Determine which platform(s) the question is about
  let platformsToSearch = [];
  
  // Check if the question mentions specific platforms
  for (const platform of selectedPlatforms) {
    if (input.includes(platform)) {
      platformsToSearch.push(platform);
    }
  }
  
  // If no specific platform was mentioned, search all selected platforms
  if (platformsToSearch.length === 0) {
    platformsToSearch = selectedPlatforms;
  }
  
  // Find relevant information in the documentation
  let responses = [];
  
  for (const platform of platformsToSearch) {
    const platformDocs = DOCUMENTATION[platform];
    if (!platformDocs) continue;
    
    // Search for relevant topics in the platform's documentation
    for (const [topic, content] of Object.entries(platformDocs)) {
      if (input.includes(topic)) {
        responses.push({
          platform,
          content,
          relevance: calculateRelevance(input, topic)
        });
      }
    }
  }
  
  // Sort responses by relevance
  responses.sort((a, b) => b.relevance - a.relevance);
  
  // If we found relevant information
  if (responses.length > 0) {
    // If the question is about multiple platforms, combine the responses
    if (responses.length > 1 && new Set(responses.map(r => r.platform)).size > 1) {
      return formatMultiPlatformResponse(responses, platformsToSearch);
    }
    
    // Otherwise, return the most relevant response
    const platformName = getPlatformName(responses[0].platform);
    return `Here's how to ${getActionFromInput(input)} in ${platformName}:\n\n${responses[0].content}`;
  }
  
  // If no specific information was found, provide a general response
  return generateGeneralResponse(input, platformsToSearch);
};

// Check if the question is relevant to CDPs
const isRelevantToCDP = (input) => {
  const cdpKeywords = [
    'segment', 'mparticle', 'lytics', 'zeotap', 'cdp', 'customer data', 
    'data platform', 'tracking', 'analytics', 'source', 'destination', 
    'integration', 'event', 'user profile', 'audience', 'segment', 'data collection'
  ];
  
  return cdpKeywords.some(keyword => input.includes(keyword));
};

// Calculate relevance score between user input and documentation topic
const calculateRelevance = (input, topic) => {
  const inputWords = input.split(' ');
  const topicWords = topic.split(' ');
  
  let matchCount = 0;
  for (const word of inputWords) {
    if (topicWords.includes(word)) {
      matchCount++;
    }
  }
  
  return matchCount / inputWords.length;
};

// Format response for multiple platforms
const formatMultiPlatformResponse = (responses, platforms) => {
  let result = `I found information about your question for multiple platforms:\n\n`;
  
  // Group responses by platform
  const platformResponses = {};
  for (const response of responses) {
    if (!platformResponses[response.platform]) {
      platformResponses[response.platform] = [];
    }
    platformResponses[response.platform].push(response);
  }
  
  // Add each platform's most relevant response
  for (const platform of platforms) {
    if (platformResponses[platform] && platformResponses[platform].length > 0) {
      const bestResponse = platformResponses[platform][0];
      const platformName = getPlatformName(platform);
      result += `## ${platformName}\n\n${bestResponse.content}\n\n`;
    }
  }
  
  return result;
};

// Generate a general response when no specific information is found
const generateGeneralResponse = (input, platforms) => {
  const action = getActionFromInput(input);
  
  if (platforms.length === 1) {
    const platformName = getPlatformName(platforms[0]);
    return `I don't have specific information about how to ${action} in ${platformName}. 

However, you might want to check the official ${platformName} documentation at ${getPlatformDocUrl(platforms[0])} for detailed instructions.

Is there something else I can help you with regarding Customer Data Platforms?`;
  }
  
  return `I don't have specific information about how to ${action} in the platforms you're interested in.

You might want to check the official documentation for each platform:
${platforms.map(p => `- ${getPlatformName(p)}: ${getPlatformDocUrl(p)}`).join('\n')}

Is there something else I can help you with regarding Customer Data Platforms?`;
};

// Extract the action from the user input
const getActionFromInput = (input) => {
  // Common patterns in how-to questions
  const patterns = [
    /how (?:do|can|to) (?:i|you) (.*?)(?:\?|$)/i,
    /how (?:to|do|can) (.*?)(?:\?|$)/i,
    /what (?:is|are) the (?:steps|process|way) to (.*?)(?:\?|$)/i,
    /what (?:is|are) the best (?:way|practice|method) (?:to|for) (.*?)(?:\?|$)/i
  ];
  
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  // If no pattern matches, return a generic action
  return "do that";
};

// Get the full name of a platform from its ID
const getPlatformName = (platformId) => {
  const platforms = {
    'segment': 'Segment',
    'mparticle': 'mParticle',
    'lytics': 'Lytics',
    'zeotap': 'Zeotap'
  };
  
  return platforms[platformId] || platformId;
};

// Get the documentation URL for a platform
const getPlatformDocUrl = (platformId) => {
  const docUrls = {
    'segment': 'https://segment.com/docs/',
    'mparticle': 'https://docs.mparticle.com/',
    'lytics': 'https://docs.lytics.com/',
    'zeotap': 'https://docs.zeotap.com/'
  };
  
  return docUrls[platformId] || '';
};