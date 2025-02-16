---
title: 'Bigmoji 2.0: Crafting Multiline Emojis with a Fresh Perspective'
date: '2023-10-30'
tags: ['bigmoji', 'web', 'javascript']
series: 'Bigmoji'
series_order: 2
draft: false
summary: 'Get ready for "Bigmoji 2.0," the reincarnation of my multiline emoji project, where I share my refreshed perspective and introduce innovative techniques for crafting expressive multiline emojis.'
---

![bigger-movie](/static/images/bigger-movie.jpg)

Ahoy there, fellow emoji enthusiasts! If you've been keeping tabs on the emoji landscape, you might remember Bigmoji, my JavaScript-based "emoji multiliner" project. It was a Frankenstein's monster of code scraps and hope, but it got the job done and taught me a ton. Fast forward to today, armed with a better understanding of ES6 and JavaScript, I'm itching to revisit and revamp Bigmoji in its glorious 2.0 version.

## Emoji Crafting Jargon

Let's get our terms straight with this handy reference:

| Term     | Definition                                                  |
| -------- | ----------------------------------------------------------- |
| `item`   | Each whole image or GIF                                     |
| `grid`   | The layout that divides an `item` into `rows` and `columns` |
| `row`    | A horizontal division within an `item`, indexed at `0`      |
| `column` | A vertical division within an `item`, indexed at `0`        |

## The Previous Iteration

In the original Bigmoji project, I Frankensteined my way through it, using various code snippets and libraries:

- [gif.js](https://github.com/jnordberg/gif.js) and [gif.worker.js](https://github.com/jnordberg/gif.worker.js) by [jnordberg](https://github.com/jnordberg)
- [gif-frames.js](https://github.com/benwiley4000/gif-frames) by [benwiley4000](https://github.com/benwiley4000)
- [jszip.js](https://github.com/Stuk/jszip) by [Stuk](https://github.com/Stuk/jszip)

## Discovering Fresh Packages

I've been exploring newer NPM packages for the project:

- [ImageScript](https://github.com/matmen/ImageScript)
- [gif2sprite](https://www.npmjs.com/package/gif2sprite)
- [canvas-gif](https://www.npmjs.com/package/@bobwombat/canvas-gif)
- [gifsicle-wasm-browser](https://www.npmjs.com/package/gifsicle-wasm-browser)

The real game-changer is [jimp](https://github.com/jimp-dev/jimp), which includes [gifwrap](https://github.com/jimp-dev/gifwrap) - a powerful solution for all image and GIF manipulation needs.

## The Development Journey

### Initial Plan

- Continue using jszip for its reliability
- Implement jimp and gifwrap for image/GIF handling
- Create a modern, user-friendly interface

### Unexpected Turns

1. **Sharp Exploration**

   - Discovered Sharp's potential through ChatGPT
   - Found limitations in browser-based implementation

2. **Package Adventures**

   - Tried ImageScript but documentation was unclear
   - Moved to Jimp as originally planned
   - Encountered browser compatibility issues

3. **ChatGPT Collaboration**
   - Used ChatGPT as a coding companion
   - Helped solve logic puzzles and implementation challenges
   - Learned limits of AI assistance

### Technical Challenges

1. **Grid Implementation**

   - Fixed infinite image growth issue
   - Addressed maximum width concerns
   - Need to optimize canvas creation

2. **Deployment Journey**
   - GitHub Pages proved problematic
   - Successfully deployed to Netlify
   - Set up bigmoji subdomain

## Current Status and Future Plans

### Accomplished

- Basic image processing functionality
- Modern UI implementation
- Successful Netlify deployment

### Pending Tasks

1. **Code Refactoring**

   - Split PrepareImages into cropImage and cropGif
   - Improve code organization

2. **GIF Support**

   - Implement frame extraction
   - Add frame-by-frame processing
   - Reassemble processed frames

3. **File Handling**
   - Update file extension handling
   - Improve type checking

## Looking Forward

While we haven't reached MVP status with GIF support, the foundation is solid. The next phase will focus on:

- Implementing GIF functionality
- Optimizing performance
- Enhancing user experience
- Adding animated features

Stay tuned for more adventures in the world of coding and creativity. Bigmoji 2.0 is evolving, and it's going to be spectacular! 🚀💻🌟
