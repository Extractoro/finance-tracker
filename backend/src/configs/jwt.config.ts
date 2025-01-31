const jwtConfig = {
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '1h' },
};

export default jwtConfig;
