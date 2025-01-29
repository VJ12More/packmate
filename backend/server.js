// // require('dotenv').config();  // Load environment variables
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const bcrypt = require('bcryptjs');
// // const User = require('./models/User');
// // const connectDB = require('./config/db');
// // const cors = require('cors');
// // const express = require('express');


// // // Initialize the express app
// // const app = express();

// // // Connect to MongoDB
// // connectDB();

// // app.use(cors());

// // // Alternatively, if you want to allow only your frontend domain
// // app.use(cors({
// //   origin: 'http://localhost:5174', // Your frontend URL
// // }));

// // // Your other routes and server setup
// // app.post('/generate_packing_list', (req, res) => {
// //   // Handle the POST request
// // });

// // app.listen(5000, () => {
// //   console.log('Server running on port 5000');
// // });

// // // Middleware
// // app.use(express.json());  // For parsing JSON data
// // app.use(cors());          // Enable Cross-Origin Resource Sharing

// // // Default route
// // app.get('/', (req, res) => {
// //   res.send('API is running...');
// // });

// // // Sign-up Route
// // app.post('/signup', async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     // Check if user exists
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: 'User already exists' });
// //     }

// //     // Hash password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Create new user
// //     const newUser = new User({
// //       email,
// //       password: hashedPassword,
// //     });

// //     await newUser.save();
// //     res.status(201).json({ message: 'User registered successfully' });

// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error });
// //   }
// // });

// // // Set the server port from environment variables or default to 5000
// // const PORT = process.env.PORT || 5000;

// // // Start the server
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// require('dotenv').config();  // Load environment variables
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const User = require('./models/User');
// const connectDB = require('./config/db');

// // Initialize the express app
// const app = express();

// // Connect to MongoDB
// connectDB();

// // Set up CORS to allow requests from your frontend
// app.use(cors({
//   origin: 'http://localhost:5174',  // Your frontend URL
//   methods: ['GET', 'POST'],        // Allowed methods
//   allowedHeaders: ['Content-Type'],// Allowed headers
// }));
// app.use(express.json());  // For parsing JSON data

// // Default route
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Your other routes and server setup
// app.post('/generate_packing_list', (req, res) => {
//   // Handle the POST request to generate packing list
//   res.json({ message: 'Packing list generated' }); // Example response
// });

// // Sign-up Route
// app.post('/signup', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });

//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// // Set the server port from environment variables or default to 5000
// const PORT = process.env.PORT || 5000;

// // Start the server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// require('dotenv').config();  // Load environment variables
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const User = require('./models/User');
// const connectDB = require('./config/db');

// // Initialize the express app
// const app = express();

// // Connect to MongoDB
// connectDB();

// // Set up CORS to allow requests from your frontend
// app.use(cors({
//   origin: 'http://localhost:5174',  // Your frontend URL
//   methods: ['GET', 'POST'],        // Allowed methods
//   allowedHeaders: ['Content-Type'],// Allowed headers
// }));

// // Middleware for parsing JSON data
// app.use(express.json());

// // Default route
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Your API route to generate packing list
// app.post('/generate_packing_list', (req, res) => {
//   // Handle the POST request to generate packing list
//   const { location, activities, date } = req.body;
  
//   // Example response based on the request data
//   res.json({
//     message: 'Packing list generated successfully!',
//     location,
//     activities,
//     date,
//   });
// });

// // Sign-up Route
// app.post('/signup', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });

//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// // Set the server port from environment variables or default to 5000
// const PORT = process.env.PORT || 5000;

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

require('dotenv').config();  // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');

// Initialize the express app
const app = express();

// Connect to MongoDB
connectDB();

// Set up CORS middleware
const corsOptions = {
  origin: 'http://localhost:5174',  // Your frontend URL
  methods: ['GET', 'POST', 'OPTIONS'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  credentials: true,  // Allow credentials (if needed for authentication)
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to handle preflight (OPTIONS) requests
app.options('*', cors(corsOptions));

// Middleware for parsing JSON data
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Fix for OPTIONS preflight request handling
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5174');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.sendStatus(200);
  }
  next();
});

// API route to generate packing list
app.post('/generate_packing_list', (req, res) => {
  const { location, activities, date } = req.body;
  
  res.json({
    message: 'Packing list generated successfully!',
    location,
    activities,
    date,
  });
});

// Sign-up Route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Set the server port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

