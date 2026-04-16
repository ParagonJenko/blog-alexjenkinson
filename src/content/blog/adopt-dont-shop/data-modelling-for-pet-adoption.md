---
title: 'Adopt Don't Shop: Data Modelling a Multi-Role Adoption Platform'
date: '2024-04-22'
tags: ['adopt-dont-shop', 'postgresql', 'sequelize', 'typescript', 'backend']
series: 'Adopt Don't Shop'
series_order: 2
draft: false
summary: 'A deep dive into the PostgreSQL data model behind Adopt Don't Shop — how I structured users, rescues, pets, applications, and messages in a multi-role system.'
---

In the [first post](/blog/adopt-dont-shop/building-a-pet-adoption-platform) I covered why I built Adopt Don't Shop and the high-level stack decisions. This time I want to get into the specifics of the data model, because that's where a lot of the interesting design decisions live.

## Starting with Users and Roles

The first thing to nail down was the user model. Three distinct roles — **Adopters**, **Rescues**, and **Administrators** — with meaningfully different permissions and relationships to everything else in the system.

I considered two approaches:

1. **Separate tables per role** — a `rescues` table, an `adopters` table, each with their own fields
2. **Single users table with a role field** — one table, role stored as an enum

I went with option 2 (single table, role enum), with a separate `rescue_profiles` table for rescue-specific data. The reasoning: the authentication and session management logic is the same for all users, so I didn't want to fragment that. But rescue organisations have data that doesn't apply to adopters (charity number, address, description), so that lives in its own table with a foreign key back to users.

```sql
-- Simplified schema
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL,
  role VARCHAR NOT NULL CHECK (role IN ('adopter', 'rescue', 'admin')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE rescue_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rescue_name VARCHAR NOT NULL,
  charity_number VARCHAR,
  address TEXT,
  description TEXT
);
```

## Pets and Listings

Pets belong to rescues, not directly to users. This matters because a rescue organisation has multiple staff members who might all manage listings.

Each pet record holds the core information — species, breed, age, sex, description — plus a status field that tracks where in the adoption journey the pet currently sits: `available`, `pending`, `adopted`, or `unavailable`.

Images are stored in AWS S3, with only the S3 key stored in the database. This keeps the database lean and avoids the nightmare of storing binary data in Postgres.

```sql
CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rescue_id UUID REFERENCES rescue_profiles(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  species VARCHAR NOT NULL,
  breed VARCHAR,
  age_months INTEGER,
  sex VARCHAR CHECK (sex IN ('male', 'female', 'unknown')),
  description TEXT,
  status VARCHAR DEFAULT 'available',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pet_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
  s3_key VARCHAR NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER
);
```

## Applications and Their Lifecycle

The adoption application is the heart of the platform. An adopter submits an application for a specific pet, and that application moves through a series of states.

I modelled the states as an enum: `submitted`, `under_review`, `approved`, `rejected`, `withdrawn`. Having these as explicit states (rather than boolean flags scattered across the table) made the frontend logic much cleaner — you always know exactly where an application sits.

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES pets(id),
  adopter_id UUID REFERENCES users(id),
  status VARCHAR DEFAULT 'submitted',
  home_type VARCHAR,
  has_garden BOOLEAN,
  has_other_pets BOOLEAN,
  other_pets_description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

One design decision I'm still thinking about: the application form fields are currently stored as flat columns. As the form grows, this could become unwieldy. An alternative would be a JSONB column for flexible form data, which would let rescues eventually customise their application forms. That's a future refactor.

## Messaging

Messages tie an application, a sender (either the adopter or someone from the rescue), and a body of text together.

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id),
  body TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

The `read` flag gives us unread message counts without a separate reads table. This is a simplification that works fine at the current scale, but a proper message-read tracking system (one row per user per message) would be needed if multiple people on the rescue side all need individual read states.

## Sequelize and TypeScript

I'm using Sequelize as the ORM with TypeScript. The type safety is genuinely useful here — the models define the shape of data coming out of the database, and TypeScript will catch a lot of mistakes at compile time.

The one thing I'd do differently: Sequelize's eager loading syntax for associations can get verbose quickly. I've been tempted more than once to drop down to raw SQL for complex queries. If I were starting again, I'd probably look at Prisma — the TypeScript integration is significantly better.

## What's Next

The current data model handles the core use case well. The areas I know I'll need to revisit:

- **Flexible application forms** — rescues want to ask different questions for cats vs dogs vs rabbits
- **Rescue staff management** — right now a rescue is tied to a single user; in practice, multiple staff need access
- **Audit logging** — particularly for status changes on applications, which have real-world consequences

The next post in this series will cover the real-time messaging implementation with WebSockets.

- [GitHub](https://github.com/ideaSquared/adopt-dont-shop)
