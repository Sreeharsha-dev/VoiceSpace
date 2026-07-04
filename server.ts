import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.use(express.json());

const MESSAGES_FILE = path.join(process.cwd(), "messages.json");

// Initialize messages file if it doesn't exist
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([]));
}

function getMessages() {
  try {
    const data = fs.readFileSync(MESSAGES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveMessages(messages: any[]) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

// API Routes
app.get("/api/messages", (req, res) => {
  res.json(getMessages());
});

app.post("/api/messages", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const messages = getMessages();
  const newMessage = {
    id: Math.random().toString(36).substring(2, 9),
    text,
    createdAt: Date.now(),
    status: "pending",
  };
  
  const updatedMessages = [newMessage, ...messages];
  saveMessages(updatedMessages);
  
  res.status(201).json(newMessage);
});

app.patch("/api/messages/:id/resolve", (req, res) => {
  const { id } = req.params;
  const { resolution } = req.body;
  
  const messages = getMessages();
  let updated = false;
  
  const updatedMessages = messages.map((m: any) => {
    if (m.id === id) {
      updated = true;
      return { ...m, status: "resolved", resolution: resolution || "" };
    }
    return m;
  });

  if (!updated) {
    return res.status(404).json({ error: "Message not found" });
  }

  saveMessages(updatedMessages);
  res.json({ success: true });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode with Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
