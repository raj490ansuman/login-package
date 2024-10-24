import { RowDataPacket } from 'mysql2';
import db from '../config/db';

export interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
}
export const addUser = async (email: string, hashedPassword: string) => {
  try {
    const [result] = await db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
    return result;
  } catch (error) {
    throw error;
  }
};
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await db.query<User[]>(
    'SELECT * FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  return rows.length ? rows[0] : null;
};
