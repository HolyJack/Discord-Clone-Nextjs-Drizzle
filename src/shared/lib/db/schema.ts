import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  nickname: text("nickname").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const userRelations = relations(user, ({ many }) => ({
  usersToServers: many(usersToServers),
}));

export const server = pgTable("server", {
  id: serial("id").primaryKey(),
  name: text("name"),
  owner: integer("owner").references(() => user.id),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const serverRelations = relations(server, ({ many }) => ({
  usersToServers: many(usersToServers),
  channels: many(channel),
}));

export const usersToServers = pgTable(
  "users_to_servers",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => user.id),
    serverId: integer("server_id")
      .notNull()
      .references(() => server.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.serverId),
  }),
);

export const usersToServersRelations = relations(usersToServers, ({ one }) => ({
  server: one(server, {
    fields: [usersToServers.serverId],
    references: [server.id],
  }),
  user: one(user, { fields: [usersToServers.userId], references: [user.id] }),
}));

export const channel = pgTable("channel", {
  id: serial("id").primaryKey(),
  name: text("name").default("new channel"),
  serverId: integer("server_id"),
});

export const channelRelations = relations(channel, ({ one }) => ({
  server: one(server, {
    fields: [channel.serverId],
    references: [server.id],
  }),
}));

export const message = pgTable("messages", {
  id: serial("id").primaryKey(),
  content: text("content").default(""),
  userId: integer("user_id").references(() => user.id),
  channelId: integer("channel_id").references(() => channel.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const attachment = pgTable("attachment", {
  id: serial("id").primaryKey(),
  messageId: integer("message_id").references(() => message.id),
  url: text("url"),
});
