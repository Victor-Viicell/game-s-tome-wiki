import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Definindo a interface para o documento do arquivo
interface IArchive extends Document {
  title: string;
  content: string;
}

// Definindo o esquema do arquivo
const archiveSchema = new mongoose.Schema<IArchive>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

// Registrando o modelo Archive
export const Archive: Model<IArchive> = mongoose.models.Archive || mongoose.model<IArchive>('Archive', archiveSchema);

// Definindo a interface para o documento do usuário
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  archives: Array<IArchive['_id']>;
  stars: number;
  mentions: number;
  profileImage?: string; // Adicionando o campo profileImage
}

// Definindo o esquema do usuário
const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  archives: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Archive' }],
  stars: { type: Number, default: 0 },
  mentions: { type: Number, default: 0 },
  profileImage: { type: String, default: '' }, // Adicionando o campo profileImage
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
      stars: 0,
      mentions: 0,
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
    return await User.findOne({ username }).populate('archives').exec();
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
