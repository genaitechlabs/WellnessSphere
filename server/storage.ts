import { 
  users, 
  products, 
  cartItems, 
  bookings, 
  soundTracks,
  type User, 
  type Product, 
  type CartItem, 
  type Booking, 
  type SoundTrack,
  type InsertUser, 
  type InsertProduct, 
  type InsertCartItem, 
  type InsertBooking, 
  type InsertSoundTrack 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product management
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Cart management
  getCartItems(userId: number): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  removeFromCart(id: number): Promise<void>;
  clearCart(userId: number): Promise<void>;

  // Booking management
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;

  // Sound track management
  getAllSoundTracks(): Promise<SoundTrack[]>;
  getSoundTrack(id: number): Promise<SoundTrack | undefined>;
  getSoundTracksByCategory(category: string): Promise<SoundTrack[]>;
  createSoundTrack(soundTrack: InsertSoundTrack): Promise<SoundTrack>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.seedData();
  }

  private async seedData() {
    try {
      // Check if products already exist
      const existingProducts = await db.select().from(products).limit(1);
      if (existingProducts.length > 0) {
        return; // Data already seeded
      }

      // Seed products
      const productData = [
        {
          name: "Sleep Blend Tea",
          description: "Organic chamomile, lavender & passionflower",
          price: 2400, // $24.00
          category: "herbal-tea",
          imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&h=300",
          inStock: true,
        },
        {
          name: "White Noise Machine",
          description: "Premium sound therapy device with 20 soothing sounds",
          price: 8900, // $89.00
          category: "sound-machine",
          imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&h=300",
          inStock: true,
        },
        {
          name: "Relaxation Oil Set",
          description: "Lavender, eucalyptus & bergamot essential oils",
          price: 4500, // $45.00
          category: "essential-oils",
          imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&h=300",
          inStock: true,
        },
        {
          name: "Meditation Cushion",
          description: "Organic cotton, ergonomic design with buckwheat hull filling",
          price: 6500, // $65.00
          category: "meditation",
          imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&h=300",
          inStock: true,
        }
      ];

      await db.insert(products).values(productData);

      // Seed sound tracks
      const soundTrackData = [
        {
          title: "Rain Sounds",
          description: "Gentle rainfall sounds to calm your mind and prepare for sleep",
          duration: 180, // 3 minutes
          category: "rain",
          audioUrl: "/audio/rain-sounds.mp3",
        },
        {
          title: "Ocean Waves",
          description: "Rhythmic ocean waves for deep relaxation and meditation",
          duration: 330, // 5.5 minutes
          category: "ocean",
          audioUrl: "/audio/ocean-waves.mp3",
        },
        {
          title: "Forest Sounds",
          description: "Birds chirping and leaves rustling in a peaceful forest setting",
          duration: 255, // 4.25 minutes
          category: "forest",
          audioUrl: "/audio/forest-sounds.mp3",
        },
        {
          title: "Morning Meditation",
          description: "10-minute guided meditation to start your day",
          duration: 600, // 10 minutes
          category: "meditation",
          audioUrl: "/audio/morning-meditation.mp3",
        },
        {
          title: "Sleep Stories",
          description: "Calming bedtime stories to help you drift off peacefully",
          duration: 900, // 15 minutes
          category: "sleep",
          audioUrl: "/audio/sleep-stories.mp3",
        }
      ];

      await db.insert(soundTracks).values(soundTrackData);
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  // Cart methods
  async getCartItems(userId: number): Promise<CartItem[]> {
    return await db.select().from(cartItems).where(eq(cartItems.userId, userId));
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    const [cartItem] = await db.insert(cartItems).values(insertCartItem).returning();
    return cartItem;
  }

  async removeFromCart(id: number): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }

  async clearCart(userId: number): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.userId, userId));
  }

  // Booking methods
  async getAllBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.userId, userId));
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const bookingData = {
      ...insertBooking,
      createdAt: new Date(),
      status: insertBooking.status || "pending"
    };
    const [booking] = await db.insert(bookings).values(bookingData).returning();
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const [booking] = await db.update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    return booking || undefined;
  }

  // Sound track methods
  async getAllSoundTracks(): Promise<SoundTrack[]> {
    return await db.select().from(soundTracks);
  }

  async getSoundTrack(id: number): Promise<SoundTrack | undefined> {
    const [soundTrack] = await db.select().from(soundTracks).where(eq(soundTracks.id, id));
    return soundTrack || undefined;
  }

  async getSoundTracksByCategory(category: string): Promise<SoundTrack[]> {
    return await db.select().from(soundTracks).where(eq(soundTracks.category, category));
  }

  async createSoundTrack(insertSoundTrack: InsertSoundTrack): Promise<SoundTrack> {
    const [soundTrack] = await db.insert(soundTracks).values(insertSoundTrack).returning();
    return soundTrack;
  }
}

export const storage = new DatabaseStorage();
