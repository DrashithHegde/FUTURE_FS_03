const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client'); 
const { connectDB } = require('./config/database');
const { apiLimiter } = require('./middleware/rateLimiter');

dotenv.config();

const app = express();
const http = require('http');
const server = http.createServer(app);


const prisma = new PrismaClient();


app.use(helmet());
app.use(compression());
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiLimiter);


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.get('/api/health', async (req, res) => {
  try {
    
    const userCount = await prisma.user.count();
    res.status(200).json({
      success: true,
      status: 'healthy',
      database: 'connected',
      userCount,
      timestamp: new Date().toISOString(),
      pid: process.pid,
      uptime: process.uptime(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});


app.get('/health', (req, res) =>
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    pid: process.pid,
    uptime: process.uptime(),
  })
);


app.get('/', (req, res) =>
  res.status(200).json({
    success: true,
    name: 'CRM API',
    version: '1.0.0',
    status: 'running',
    server: `http://localhost:${process.env.PORT || 5000}`,
  })
);


app.use((err, req, res, _next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    
    await connectDB();

    
    const { init } = require('./socket');
    init(server);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
