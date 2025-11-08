import { type User, type InsertUser, type ContactRequest, type InsertContactRequest } from "@shared/schema";
import { randomUUID } from "crypto";

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

export const storage = new MemStorage();
