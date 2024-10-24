import { Request, Response } from 'express';
import { findUserByEmail } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { addUser } from '../models/userModel';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Add the user to the database
    const newUser = await addUser(email, hashedPassword);

    if (newUser) {
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } else {
      res.status(400).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string, password: string };

    const user = await findUserByEmail(email);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
