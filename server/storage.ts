import { type User, type InsertUser, type ContactRequest, type InsertContactRequest, contactRequests, users } from "@shared/schema";
import { randomUUID } from "crypto";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "./db";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact Requests
  getAllContactRequests(): Promise<ContactRequest[]>;
  getContactRequest(id: string): Promise<ContactRequest | undefined>;
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  markContactRequestAsRead(id: string): Promise<ContactRequest | undefined>;
  getUnreadContactRequestsCount(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactRequests: Map<string, ContactRequest>;

  constructor() {
    this.users = new Map();
    this.contactRequests = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllContactRequests(): Promise<ContactRequest[]> {
    return Array.from(this.contactRequests.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getContactRequest(id: string): Promise<ContactRequest | undefined> {
    return this.contactRequests.get(id);
  }

  async createContactRequest(insertRequest: InsertContactRequest): Promise<ContactRequest> {
    const id = randomUUID();
    const request: ContactRequest = {
      ...insertRequest,
      id,
      lastName: insertRequest.lastName || null,
      company: insertRequest.company || null,
      isRead: 0,
      createdAt: new Date(),
    };
    this.contactRequests.set(id, request);
    return request;
  }

  async markContactRequestAsRead(id: string): Promise<ContactRequest | undefined> {
    const request = this.contactRequests.get(id);
    if (request) {
      request.isRead = 1;
      this.contactRequests.set(id, request);
      return request;
    }
    return undefined;
  }

  async getUnreadContactRequestsCount(): Promise<number> {
    return Array.from(this.contactRequests.values())
      .filter(request => request.isRead === 0)
      .length;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    return (await db!.select().from(users).where(eq(users.id, id)).limit(1))[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return (await db!.select().from(users).where(eq(users.username, username)).limit(1))[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    return (await db!.insert(users).values(user).returning())[0];
  }

  async getAllContactRequests(): Promise<ContactRequest[]> {
    return db!.select().from(contactRequests).orderBy(desc(contactRequests.createdAt));
  }

  async getContactRequest(id: string): Promise<ContactRequest | undefined> {
    return (await db!.select().from(contactRequests).where(eq(contactRequests.id, id)).limit(1))[0];
  }

  async createContactRequest(request: InsertContactRequest): Promise<ContactRequest> {
    return (await db!.insert(contactRequests).values(request).returning())[0];
  }

  async markContactRequestAsRead(id: string): Promise<ContactRequest | undefined> {
    return (await db!.update(contactRequests).set({ isRead: 1 }).where(eq(contactRequests.id, id)).returning())[0];
  }

  async getUnreadContactRequestsCount(): Promise<number> {
    const result = await db!.select({ count: sql<number>`count(*)::int` })
      .from(contactRequests)
      .where(eq(contactRequests.isRead, 0));
    return result[0]?.count ?? 0;
  }
}

const isProduction = process.env.NODE_ENV === "production";

export const storage: IStorage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : (() => {
      if (isProduction) {
        throw new Error("DATABASE_URL is required in production");
      }
      console.warn("WARNING: DATABASE_URL is not set; using non-persistent development memory storage.");
      return new MemStorage();
    })();
