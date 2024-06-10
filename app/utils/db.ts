import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Definindo a interface para o documento do usuário
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Definindo o esquema do usuário
const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Verifica se o modelo já foi definido para evitar o erro de sobrescrita
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export async function createUser(username: string, email: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log('Usuário criado com sucesso');
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
}

export async function getUserByUsername(username: string): Promise<IUser | null> {
  try {
    return await User.findOne({ username }).exec();
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
}

export async function verifyPassword(user: IUser, password: string): Promise<boolean> {
  return await bcrypt.compare(password, user.password);
}

export function generateToken(user: IUser): string {
  const payload = { id: user._id, username: user.username };
  return jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
}
