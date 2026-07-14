const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // --- NEW: Node file-system helper to drop files ---
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/reboot-venue')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('Database connection error:', err));

// Schema Matrix
const LookbookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const LookbookItem = mongoose.model('LookbookItem', LookbookSchema);

// Configure Multer Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Helper to safely delete a physical file from the disk based on its URL database string
const deletePhysicalFile = (imageUrl) => {
  try {
    if (!imageUrl) return;
    // Extract the filename out from the URL string
    const filename = imageUrl.split('/uploads/')[1];
    if (filename) {
      const filePath = path.join(__dirname, 'uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Successfully removed file from storage folder: ${filename}`);
      }
    }
  } catch (err) {
    console.error("Error clearing physical asset file:", err);
  }
};

// --- API ENDPOINTS ---

app.get('/api/lookbook', async (req, res) => {
  try {
    const items = await LookbookItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lookbook assets' });
  }
});

app.post('/api/lookbook', upload.single('image'), async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image file' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const newItem = new LookbookItem({
      title,
      category: category.toUpperCase().trim(),
      imageUrl
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save lookbook asset' });
  }
});

// DELETE: Single item with file clearing extension
app.delete('/api/lookbook/:id', async (req, res) => {
  try {
    const item = await LookbookItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Asset not found inside database.' });
    }

    // 1. Drop the file off your hard drive disk space
    deletePhysicalFile(item.imageUrl);

    // 2. Clear database record document
    await LookbookItem.findByIdAndDelete(req.params.id);

    res.json({ message: 'Asset and physical file deleted cleanly.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error processing asset deletion.' });
  }
});

// DELETE: Bulk wipe category with dynamic file system cleaning loop
app.delete('/api/lookbook/category/:categoryName', async (req, res) => {
  try {
    const categoryToPurge = req.params.categoryName.toUpperCase().trim();

    // Find all matching entries first to get file paths
    const itemsToPurge = await LookbookItem.find({ category: categoryToPurge });

    // Clean out every associated storage file
    itemsToPurge.forEach(item => {
      deletePhysicalFile(item.imageUrl);
    });

    // Run the collection clearance
    const result = await LookbookItem.deleteMany({ category: categoryToPurge });

    res.json({
      message: `Category wiped completely. Clear count: ${result.deletedCount} items removed.`
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error running cascading category wipe.' });
  }
});

// ==========================================
// PHASE 2: EVENT SCHEDULE MATRIX EXTENSION
// ==========================================

// 1. Define Event Database Schema Matrix
// ==========================================
// PHASE 2 & 3: EVENT MATRIX WITH TICKET TIERS
// ==========================================

// 1. Define Ticket Tier Sub-Schema Structure
const TicketTierSchema = new mongoose.Schema({
  tierName: { type: String, required: true },    // e.g., "VIP", "Premium Table of 6"
  price: { type: Number, required: true },       // e.g., 10000, 20000
  description: { type: String, default: '' }     // e.g., "Includes 1 premium bottle & express entry"
});

// 2. Define Event Database Schema Matrix
const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  performers: { type: String, required: true },
  flyerUrl: { type: String, required: true },
  isPaid: { type: Boolean, default: true },
  ticketTiers: [TicketTierSchema],               // <-- NEW: Array of pricing tiers
  createdAt: { type: Date, default: Date.now }
});

const EventItem = mongoose.model('EventItem', EventSchema);

// 3. GET: Fetch all scheduled upcoming events
app.get('/api/events', async (req, res) => {
  try {
    const events = await EventItem.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scheduled club events.' });
  }
});

// 4. POST: Schedule a new club flyer event card with pricing tiers
app.post('/api/events', upload.single('flyer'), async (req, res) => {
  try {
    const { title, date, description, performers, ticketTiers, isPaid } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an event flyer image.' });
    }

    let parsedTiers = [];
    if (ticketTiers) {
      try {
        parsedTiers = JSON.parse(ticketTiers);
      } catch (e) {
        console.error("Error parsing ticket tiers:", e);
      }
    }

    const flyerUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const newEvent = new EventItem({
      title: title.trim(),
      date,
      description: description.trim(),
      performers: performers.trim(),
      flyerUrl,
      isPaid: isPaid === 'true' || isPaid === true, // <-- NEW: Convert string form data to Boolean
      ticketTiers: parsedTiers
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Event creation error:", error);
    res.status(500).json({ error: 'Failed to create event.' });
  }
});

// 5. DELETE: Drop event and purge its associated physical flyer from local disk
app.delete('/api/events/:id', async (req, res) => {
  try {
    const event = await EventItem.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Target scheduled event item not found.' });
    }

    deletePhysicalFile(event.flyerUrl);
    await EventItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event entry and flyer asset wiped successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error processing event removal.' });
  }
});


// START THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});