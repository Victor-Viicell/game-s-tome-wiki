import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Definindo a interface para o documento do arquivo
interface IArchive extends Document {
  title: string;
  content: string;
  user: mongoose.Schema.Types.ObjectId;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Definindo o esquema do arquivo
const archiveSchema = new mongoose.Schema<IArchive>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
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
  profileImage?: string;
  description?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  archives: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Archive' }],
  stars: { type: Number, default: 0 },
  mentions: { type: Number, default: 0 },
  profileImage: { type: String, default: '' },
  description: { type: String, default: '' },
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

export async function createArchive(
  title: string,
  content: string,
  userId: string,
  description: string,
): Promise<boolean> {
  try {
    console.log('Dados recebidos para criar arquivo:', { title, content, userId, description });
    const newArchive = new Archive({
      title,
      content,
      user: userId,
      description,
    });

    await newArchive.save();
    console.log('Arquivo criado com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao criar arquivo:', error);
    return false;
  }
}

export async function getArchivesByUserId(userId: string): Promise<IArchive[]> {
  try {
    return await Archive.find({ user: userId }).populate('user').exec();
  } catch (error) {
    console.error('Erro ao buscar arquivos do usuário:', error);
    throw error;
  }
}

export async function updateUserProfile(userId: string, updateData: Partial<IUser>) {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    return updatedUser;
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    throw error;
  }
}

export async function getArchiveById(archiveId: string): Promise<IArchive | null> {
  try {
    return await Archive.findById(archiveId).populate('user').exec();
  } catch (error) {
    console.error('Erro ao buscar arquivo:', error);
    throw error;
  }
}

export async function updateArchive(archiveId: string, title: string, content: string, description: string): Promise<boolean> {
  try {
    const updatedArchive = await Archive.findByIdAndUpdate(
      archiveId,
      { title, content, description, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedArchive) {
      throw new Error('Arquivo não encontrado');
    }

    console.log('Arquivo atualizado com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao atualizar arquivo:', error);
    return false;
  }
}

export async function isUserAuthorOfArchive(userId: string, archiveId: string): Promise<boolean> {
  try {
    const archive = await Archive.findById(archiveId).exec();
    if (!archive) {
      throw new Error('Arquivo não encontrado');
    }
    return archive.user.toString() === userId;
  } catch (error) {
    console.error('Erro ao verificar autor do arquivo:', error);
    throw error;
  }
}

export async function getAuthorByArchiveId(archiveId: string): Promise<IUser | null> {
  try {
    const archive = await Archive.findById(archiveId).populate('user').exec();
    if (!archive) {
      throw new Error('Arquivo não encontrado');
    }
    return archive.user as unknown as IUser;
  } catch (error) {
    console.error('Erro ao buscar autor do arquivo:', error);
    throw error;
  }
}

// Adicionar esta função no final do arquivo app\utils\db.ts

export async function searchArchives(query: string): Promise<IArchive[]> {
  try {
    const regex = new RegExp(query, 'i'); // 'i' para case-insensitive
    return await Archive.find({
      $or: [{ title: regex }, { content: regex }],
    }).populate('user').exec();
  } catch (error) {
    console.error('Erro ao buscar arquivos:', error);
    throw error;
  }
}