'use server';

import { cookies } from 'next/headers';
import dbConnect from './mongodb/dbConnect';
import User from './mongodb/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Simulated external auth server
export async function loginUser(credentials: {
  username: string;
  password: string;
}) {
  if (!credentials?.username || !credentials?.password) {
    return {
      success: false,
      message: 'Invalid username or password',
      data: null,
    };
  }

  await dbConnect();

  const user = await User.findOne({ username: credentials.username });

  console.log('User found:', user); // Debugging line

  if (!user) {
    return {
      success: false,
      message: 'Invalid username or password',
      data: null,
    };
  }

  const isPasswordCorrect = await bcrypt.compare(
    credentials.password,
    user.password
  );
  if (!isPasswordCorrect) {
    return {
      success: false,
      message: 'Invalid username or password',
      data: null,
    };
  }
  // Generate a mock token
  const token = await generateTokenWithSalt({
    id: user.id,
    email: user.email,
    username: user.username,
  });

  // Set the token in cookies
  (await cookies()).set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
  });
  return {
    success: true,
    data: { username: user.username, email: user.email },
    message: 'Login successful',
  };
}

export async function isAuthenticated(): Promise<boolean> {
  const token = (await cookies()).get('auth_token');
  return !!token; // !! converts to boolean
}

export async function logoutUser() {
  // Remove the authentication token
  (await cookies()).delete('auth_token');
}

export async function getCurrentUser() {
  const token = (await cookies()).get('auth_token');

  if (token) {
    const decoded = jwt.decode(token.value) as { [key: string]: any };
    return {
      id: decoded.userId,
      email: decoded.email,
      username: decoded.username,
    };
  }

  return null;
}

// Example of using bcryptjs salt to enhance token security
async function generateTokenWithSalt(user: {
  id: string;
  email: string;
  username: string;
}) {
  const salt = await bcrypt.genSalt(10);
  const payload = {
    userId: user.id,
    email: user.email,
    username: user.username,
    salt: salt, // Include the salt in the payload
  };
  const secretKey = process.env.JWT_SECRET_KEY!; // ! Non-null assertion operator to satisfy TypeScript
  const options: jwt.SignOptions = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, secretKey, options);
}
