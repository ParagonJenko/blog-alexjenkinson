---
title: 'Building a Pet Adoption Platform: Why Adopt Don't Shop Exists'
date: '2024-03-10'
tags: ['adopt-dont-shop', 'react', 'typescript', 'nodejs', 'postgresql', 'side projects']
series: 'Adopt Don't Shop'
series_order: 1
draft: false
summary: 'How a passion for animal welfare and full-stack development collided to create Adopt Don't Shop — a platform connecting rescue organisations with potential adopters.'
---

Some projects start with a technical itch. Others start with a genuine problem you care about. Adopt Don't Shop was the latter.

## The Problem

Pet adoption in the UK is fragmented. Rescue organisations each run their own systems — some spreadsheets, some bespoke tools, some just Facebook groups. Potential adopters have to navigate a patchwork of different processes, different forms, and wildly inconsistent communication. The experience for the rescue organisations themselves isn't much better; they're often small teams of volunteers drowning in admin.

The core question I kept coming back to was: **what if there was one place that did this properly?**

## What It Needed to Do

Before writing a single line of code, I mapped out the core user journeys. There are three distinct types of users on a platform like this, and they all have very different needs:

- **Adopters** — browsing pets, submitting applications, communicating with rescues
- **Rescues** — managing their listings, reviewing applications, messaging applicants
- **Administrators** — overseeing the platform, handling disputes, maintaining data quality

Getting the multi-role system right from the start was critical. I didn't want to bolt it on later.

## Choosing the Stack

I've been working a lot with React and TypeScript professionally, so the frontend choice was straightforward. For the backend, I went with Node.js and Express — I wanted something I knew well enough to move fast with, while still being production-capable.

The database decision was PostgreSQL. After considering various options, a relational database made the most sense here. The data model has clear relationships — rescues have pets, pets have applications, applications have messages — and I wanted the foreign key constraints and transactional guarantees you get with a proper relational DB.

Docker Compose for local development was non-negotiable. I've been caught out before by "works on my machine" problems, and having a reproducible environment from day one saves a lot of pain down the line.

The full stack ended up as:

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript + Styled Components |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL + Sequelize ORM |
| Auth | JWT |
| Images | AWS S3 |
| CI/CD | GitHub Actions |
| Local Dev | Docker Compose |

## What I Built First

I started with authentication and the multi-role system. Everything else in the application flows from knowing *who* you are and *what* you're allowed to do. Getting this foundation right before building any features saved me from a lot of painful refactoring.

After auth, I built the pet listing system. Rescues can create listings with photos (stored in S3), descriptions, and detailed information about each animal. The image upload flow with S3 was one of the trickier parts to get right — handling file size limits, format validation, and providing sensible error messages all required more thought than I initially anticipated.

The adoption application workflow came next — a multi-step process where adopters fill in information about themselves and their home environment, which rescues can then review and respond to.

## The Messaging System

One feature I'm particularly happy with is the real-time messaging between adopters and rescues. Once an application is submitted, both parties need a way to communicate. I implemented this using WebSockets, which gave a genuinely snappy experience without the complexity of a full real-time database like Firebase.

## Where It Stands Now

The platform is live at [adoptdontshop.app](https://adoptdontshop.app). It's actively being developed!

There's a lot still to build — better matching algorithms, integration with existing rescue management tools, and potentially a mobile app down the line. But the core loop works: rescues list pets, adopters apply, and the platform facilitates the conversation.

The next post in this series will dig into some of the specific technical challenges — particularly the PostgreSQL data model and how I structured the multi-role permission system.

- [GitHub](https://github.com/ideaSquared/adopt-dont-shop)
- [Live Site](https://adoptdontshop.app)
