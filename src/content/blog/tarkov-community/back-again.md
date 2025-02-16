---
title: 'Tarkov Community - Back Again'
date: '2023-10-14'
tags: ['tarkov', 'video games', 'web', 'api']
series: 'Tarkov Community'
series_order: 2
draft: false
summary: 'Revisiting the Tarkov Community project after Twitter's transformation to X, exploring new directions and potential features to better serve the Tarkov gaming community.'
---

Better late than never! The project took an unexpected pause during Twitter's transformation into X.com, which significantly impacted our original vision. The [@tarkovcommunity](https://twitter.com/tarkovcommunity) Twitter account, which was central to our initial plan, was discontinued, necessitating a pivot in our approach.

## New Vision

Our revised vision for the project encompasses:

- Creating a comprehensive one-stop hub for all Tarkov-related needs
- Displaying real-time in-game events
- Implementing seasonal variations and themes
- Potential integration with Logical's [Tarkov API](https://docs.tarkov-changes.com/#introduction)

## Recent Changes and Improvements

### UI Refinements

- Removed the interactive map (wasn't meeting our vision for interactivity)
- Implemented a top navigation bar using flexbox buttons instead of Bootstrap's navbar
- Attempted SASS theme color implementation (pending investigation)

### Data Management

- Developed a JavaScript object for storing static Tarkov map data
- Exploring modern tech stack options:
  - React/Vite for frontend
  - Firebase/PouchDB/WatermelonDB for data storage
  - Implementing data caching with 12-hour refresh cycles

## Future Features Wishlist

1. **Seasonal Events System**

   - Halloween themes
   - Christmas celebrations
   - Other special event overlays

2. **Community Tools**
   - "Days Since Wipe" counter
   - Event flags for easy feature toggling
   - Real-time game status updates

## Technical Considerations

The idea of using a local database solution like PouchDB or WatermelonDB is particularly interesting for caching Tarkov API data. This would help us:

- Reduce API calls
- Improve load times
- Maintain data freshness with controlled sync intervals

## Looking Forward

While there are many exciting possibilities for this project, time constraints remain a challenge. However, the foundation is laid for some interesting features and improvements.

Till next time 👋
