import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("Guest"),
  status: text("status").notNull().default("Active"),
  lastLogin: timestamp("last_login"),
  avatar: text("avatar"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  name: true,
  email: true,
  password: true,
  role: true,
  status: true,
  avatar: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  value: text("value").notNull(),
  change: text("change").notNull(),
  direction: text("direction").notNull(),
  icon: text("icon").notNull(),
  iconBg: text("icon_bg").notNull(),
});

export const insertStatSchema = createInsertSchema(stats).pick({
  title: true,
  value: true,
  change: true,
  direction: true,
  icon: true,
  iconBg: true,
});

export type InsertStat = z.infer<typeof insertStatSchema>;
export type Stat = typeof stats.$inferSelect;
