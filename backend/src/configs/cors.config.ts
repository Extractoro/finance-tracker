const corsConfig = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Accept',
  credentials: true,
};

export default corsConfig;
