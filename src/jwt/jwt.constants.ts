export const jwtConstants = {
    accessSecret: process.env.JWT_ACCESS_SECRET ,
    accessexpiresIn: process.env.JWT_ACCESS_EXPIRATION ,
    refreshSecret: process.env.JWT_REFRESH_SECRET ,
    refreshexpiresIn: process.env.JWT_REFRESH_EXPIRATION ,
  };