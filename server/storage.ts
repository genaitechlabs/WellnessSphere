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

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private products: Map<number, Product> = new Map();
  private cartItems: Map<number, CartItem> = new Map();
  private bookings: Map<number, Booking> = new Map();
  private soundTracks: Map<number, SoundTrack> = new Map();
  
  private userIdCounter = 1;
  private productIdCounter = 1;
  private cartItemIdCounter = 1;
  private bookingIdCounter = 1;
  private soundTrackIdCounter = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed products
    const products = [
      {
        id: this.productIdCounter++,
        name: "Sleep Blend Tea",
        description: "Organic chamomile, lavender & passionflower",
        price: 2400, // $24.00
        category: "herbal-tea",
        imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&h=300",
        inStock: true,
      },
      {
        id: this.productIdCounter++,
        name: "White Noise Machine",
        description: "Premium sound therapy device with 20 soothing sounds",
        price: 8900, // $89.00
        category: "sound-machine",
        imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&h=300",
        inStock: true,
      },
      {
        id: this.productIdCounter++,
        name: "Relaxation Oil Set",
        description: "Lavender, eucalyptus & bergamot essential oils",
        price: 4500, // $45.00
        category: "essential-oils",
        imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&h=300",
        inStock: true,
      },
      {
        id: this.productIdCounter++,
        name: "Meditation Cushion",
        description: "Organic cotton, ergonomic design with buckwheat hull filling",
        price: 6500, // $65.00
        category: "meditation",
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&h=300",
        inStock: true,
      }
    ];

    products.forEach(product => {
      this.products.set(product.id, product);
    });

    // Seed sound tracks
    const soundTracks = [
      {
        id: this.soundTrackIdCounter++,
        title: "Rain Sounds",
        description: "Gentle rainfall sounds to calm your mind and prepare for sleep",
        duration: 180, // 3 minutes
        category: "rain",
        audioUrl: "/audio/rain-sounds.mp3",
      },
      {
        id: this.soundTrackIdCounter++,
        title: "Ocean Waves",
        description: "Rhythmic ocean waves for deep relaxation and meditation",
        duration: 330, // 5.5 minutes
        category: "ocean",
        audioUrl: "/audio/ocean-waves.mp3",
      },
      {
        id: this.soundTrackIdCounter++,
        title: "Forest Sounds",
        description: "Birds chirping and leaves rustling in a peaceful forest setting",
        duration: 255, // 4.25 minutes
        category: "forest",
        audioUrl: "/audio/forest-sounds.mp3",
      },
      {
        id: this.soundTrackIdCounter++,
        title: "Morning Meditation",
        description: "10-minute guided meditation to start your day",
        duration: 600, // 10 minutes
        category: "meditation",
        audioUrl: "/audio/morning-meditation.mp3",
      },
      {
        id: this.soundTrackIdCounter++,
        title: "Sleep Stories",
        description: "Calming bedtime stories to help you drift off peacefully",
        duration: 900, // 15 minutes
        category: "sleep",
        audioUrl: "/audio/sleep-stories.mp3",
      }
    ];

    soundTracks.forEach(track => {
      this.soundTracks.set(track.id, track);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const product: Product = { 
      ...insertProduct, 
      id,
      imageUrl: insertProduct.imageUrl || null,
      inStock: insertProduct.inStock ?? true
    };
    this.products.set(id, product);
    return product;
  }

  // Cart methods
  async getCartItems(userId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.userId === userId);
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = this.cartItemIdCounter++;
    const cartItem: CartItem = { 
      ...insertCartItem, 
      id,
      userId: insertCartItem.userId ?? null,
      productId: insertCartItem.productId ?? null,
      quantity: insertCartItem.quantity ?? 1
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(userId: number): Promise<void> {
    Array.from(this.cartItems.entries()).forEach(([id, item]) => {
      if (item.userId === userId) {
        this.cartItems.delete(id);
      }
    });
  }

  // Booking methods
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.userId === userId);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingIdCounter++;
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date(),
      userId: insertBooking.userId ?? null,
      therapistName: insertBooking.therapistName ?? null,
      notes: insertBooking.notes ?? null,
      status: insertBooking.status ?? "pending"
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }

  // Sound track methods
  async getAllSoundTracks(): Promise<SoundTrack[]> {
    return Array.from(this.soundTracks.values());
  }

  async getSoundTrack(id: number): Promise<SoundTrack | undefined> {
    return this.soundTracks.get(id);
  }

  async getSoundTracksByCategory(category: string): Promise<SoundTrack[]> {
    return Array.from(this.soundTracks.values()).filter(track => track.category === category);
  }

  async createSoundTrack(insertSoundTrack: InsertSoundTrack): Promise<SoundTrack> {
    const id = this.soundTrackIdCounter++;
    const soundTrack: SoundTrack = { 
      ...insertSoundTrack, 
      id,
      description: insertSoundTrack.description ?? null,
      duration: insertSoundTrack.duration ?? null,
      audioUrl: insertSoundTrack.audioUrl ?? null
    };
    this.soundTracks.set(id, soundTrack);
    return soundTrack;
  }
}

export const storage = new MemStorage();
