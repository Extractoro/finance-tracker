const corsConfig = {
  origin: [process.env.CLIENT_URL, process.env.CLIENT_DEV_URL],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  credentials: true,
};

export default corsConfig;
