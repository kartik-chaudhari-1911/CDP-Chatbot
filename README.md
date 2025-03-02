# CDP-Chatbot

## Overview  
The **CDP-Chatbot** is designed to answer "how-to" questions related to four major Customer Data Platforms (CDPs): **Segment, mParticle, Lytics, and Zeotap**. The chatbot extracts relevant information from the official documentation of these platforms to guide users on how to perform tasks or achieve specific outcomes.

## Data Sources  
The chatbot retrieves information from the following official documentation sources:  

- **Segment**: [Segment Documentation](https://segment.com/docs/?ref=nav)  
- **mParticle**: [mParticle Documentation](https://docs.mparticle.com/)  
- **Lytics**: [Lytics Documentation](https://docs.lytics.com/)  
- **Zeotap**: [Zeotap Documentation](https://docs.zeotap.com/home/en-us/)  

## Core Functionalities  

### 1. Answer "How-To" Questions  
The chatbot understands and responds to user queries regarding specific tasks or features in each CDP. Example questions include:  

- "How do I set up a new source in Segment?"  
- "How can I create a user profile in mParticle?"  
- "How do I build an audience segment in Lytics?"  
- "How can I integrate my data with Zeotap?"  

### 2. Extract Information from Documentation  
The chatbot retrieves and processes relevant information from the provided documentation sources by:  

- Navigating through documentation pages.  
- Identifying relevant sections.  
- Extracting necessary steps or instructions to provide accurate responses.  

### 3. Handle Variations in Questions  
The chatbot is built to handle various question formats and structures, including:  

- **Size variations**: The chatbot should handle long or complex questions without breaking them down unnecessarily.  
- **Irrelevant questions**: It should identify and reject queries unrelated to CDPs (e.g., "Which movie is releasing this week?").  

## Deployed Link:
  Here is the deployed link for the application
    - https://cdp-chatbot.netlify.app/