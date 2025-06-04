import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertCartItemSchema, insertBookingSchema, insertSoundTrackSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  // Sound tracks routes
  app.get("/api/sound-tracks", async (req, res) => {
    try {
      const soundTracks = await storage.getAllSoundTracks();
      res.json(soundTracks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sound tracks" });
    }
  });

  app.get("/api/sound-tracks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const soundTrack = await storage.getSoundTrack(id);
      if (!soundTrack) {
        return res.status(404).json({ message: "Sound track not found" });
      }
      res.json(soundTrack);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sound track" });
    }
  });

  app.get("/api/sound-tracks/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const soundTracks = await storage.getSoundTracksByCategory(category);
      res.json(soundTracks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sound tracks by category" });
    }
  });

  // Cart routes (simplified without authentication for demo)
  app.get("/api/cart", async (req, res) => {
    try {
      // For demo purposes, using a fixed user ID
      const userId = 1;
      const cartItems = await storage.getCartItems(userId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const result = insertCartItemSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid cart item data", errors: result.error.issues });
      }

      const cartItem = await storage.addToCart(result.data);
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.removeFromCart(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item from cart" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      // For demo purposes, using a fixed user ID
      const userId = 1;
      await storage.clearCart(userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Bookings routes
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch booking" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const result = insertBookingSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid booking data", errors: result.error.issues });
      }

      const booking = await storage.createBooking(result.data);
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const booking = await storage.updateBookingStatus(id, status);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking status" });
    }
  });

  // Wellness recommendations endpoint (AI-powered)
  app.post("/api/recommendations", async (req, res) => {
    try {
      const { preferences, goals, timeOfDay } = req.body;
      
      // Simple recommendation logic based on inputs
      const recommendations = [];
      
      if (goals?.includes("sleep")) {
        recommendations.push({
          type: "sound-therapy",
          title: "Evening Sleep Sounds",
          description: "Try our rain sounds for 10 minutes before bed",
          action: "Play Now"
        });
      }
      
      if (goals?.includes("stress")) {
        recommendations.push({
          type: "breathing",
          title: "4-7-8 Breathing",
          description: "Practice this technique for instant stress relief",
          action: "Start Now"
        });
      }
      
      if (timeOfDay === "morning") {
        recommendations.push({
          type: "meditation",
          title: "Morning Mindfulness",
          description: "5-minute meditation to start your day right",
          action: "Begin Session"
        });
      }

      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate recommendations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
