---
title: 'Adding GIF Support to Bigmoji'
date: '2023-10-30'
tags: ['bigmoji', 'web', 'gif']
series: 'Bigmoji'
series_order: 3
draft: false
summary: 'Exploring the challenges and solutions of adding GIF support to the Bigmoji project, including investigating various libraries and planning a potential backend implementation.'
---

## GIFing it up with Bigmoji

The journey to add GIF support to Bigmoji has been an interesting challenge. Let's dive into the exploration and planning process.

### Previous Implementation

In the original version, we used a combination of libraries:
- [gif.js](https://github.com/jnordberg/gif.js) and [gif.worker.js](https://github.com/jnordberg/gif.worker.js) by [jnordberg](https://github.com/jnordberg)
- [gif-frames.js](https://github.com/benwiley4000/gif-frames) by [benwiley4000](https://github.com/benwiley4000)

### The Backend Possibility

One interesting discovery is that if we transition to an API with a NodeJS backend, Sharp could handle all our GIF processing needs. This would significantly simplify the implementation and potentially provide better performance.

### Current Status

After attempting to use the previous libraries, it became clear that we need a complete code rewrite to handle GIFs properly. The current frontend-only approach has limitations that make GIF processing challenging.

### Next Steps

1. **Architecture Planning**
   - Consider implementing a NodeJS backend
   - Evaluate Sharp for GIF processing
   - Design API endpoints for GIF handling

2. **Implementation Considerations**
   - Frame extraction and processing
   - Maintaining animation timing
   - Optimizing file sizes
   - Browser compatibility

3. **User Experience**
   - Preview functionality for GIFs
   - Progress indicators for processing
   - Error handling and feedback

Stay tuned as we continue to develop this feature. The addition of GIF support will make Bigmoji even more versatile and fun to use! 🎬✨ 