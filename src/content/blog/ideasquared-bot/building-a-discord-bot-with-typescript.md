---
title: 'Building a Discord Bot with TypeScript and Discord.js'
date: '2025-02-20'
tags: ['discord', 'typescript', 'nodejs', 'bot', 'discord.js', 'side projects']
series: 'ideaSquared Bot'
series_order: 1
draft: false
summary: 'Why I built the ideaSquared Discord bot, how TypeScript and Discord.js work together, and the architecture decisions behind a scalable command structure.'
---

At some point, every developer with a Discord community ends up building a bot. Mine was no different — it started with a few manual tasks that kept needing doing, and evolved into a proper TypeScript project that I'm actually proud of.

## Why Build One?

The ideaSquared Discord server needed a few things that off-the-shelf bots either didn't do, or did in a way I didn't like:

- Posting webhooks when things happen in our GitHub repos
- Role management that matched our specific workflow
- Custom commands that made sense for our community

I could have wired up a few existing bots and called it done. But given I was spending time in TypeScript anyway (for Adopt Don't Shop), this felt like a natural side project to reinforce that knowledge in a different context.

## Why TypeScript for a Bot?

JavaScript would have worked fine. But TypeScript gives you something valuable when working with an API like Discord's: **the types tell you what's possible**.

Discord.js has excellent TypeScript typings. When you're handling an interaction, the type system knows the difference between a slash command interaction, a button interaction, and a select menu interaction. You don't have to guess or check the docs for every property — the editor just shows you.

The type safety also catches a class of bugs I'd otherwise only find at runtime. Missing properties on an embed, wrong argument types on a command — these become compile-time errors rather than 3am production panics.

## The Command Pattern

The most important architectural decision in a Discord bot is how you structure commands. The naive approach — a giant `if/else` or `switch` statement in a message handler — falls apart immediately as soon as you have more than a handful of commands.

I went with the command pattern: each command is its own module that exports a consistent interface.

```typescript
interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
```

Every command file exports an object matching this interface. The bot loader reads all files from a `commands/` directory at startup and registers them. Adding a new command is just creating a new file — no changes to any registration logic.

```typescript
// commands/ping.ts
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Check if the bot is alive');

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply('Pong!');
}
```

```typescript
// Loading commands at startup
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.ts'));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}
```

This pattern scales well. Each command is isolated, testable on its own, and easy to reason about.

## Event-Driven Architecture

Discord.js is fundamentally event-driven — you register handlers for events that the Discord gateway emits. The same modular approach I used for commands applies here: each event gets its own file.

```typescript
// events/interactionCreate.ts
import { Events, Interaction } from 'discord.js';

export const name = Events.InteractionCreate;

export async function execute(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;
  
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) return;
  
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ 
      content: 'Something went wrong.', 
      ephemeral: true 
    });
  }
}
```

The error handling here matters. An unhandled exception in a Discord bot will typically crash the process or silently fail, leaving users confused. Wrapping every command execution in a try/catch and replying with an ephemeral error message means failures are visible and recoverable.

## Webhook Integration

One of the primary use cases was receiving webhooks from GitHub and formatting them into Discord embeds. GitHub sends a POST request to an endpoint when events happen — a push, a PR opened, a release published.

The bot runs a small Express server alongside the Discord client to receive these webhooks. When a webhook arrives, it's validated against the GitHub secret (to prevent spoofed requests), parsed, and then posted as a formatted embed to the appropriate Discord channel.

```typescript
app.post('/webhook/github', async (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  if (!verifySignature(req.body, signature)) {
    return res.status(401).send('Invalid signature');
  }
  
  const event = req.headers['x-github-event'];
  const embed = buildEmbed(event, req.body);
  
  await webhookChannel.send({ embeds: [embed] });
  res.status(200).send('OK');
});
```

## What's Next

The bot does what I need it to do right now. Future plans:

- **Moderation commands** — automated warning/mute/ban workflows with logging
- **Role reactions** — self-assignable roles via button interactions
- **More webhook integrations** — Linear issues, deployment notifications

The codebase is at a point where adding new commands or events is genuinely frictionless, which is the right outcome for a project like this.

- [GitHub](https://github.com/ideaSquared/ideasquared-bot)
