import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dtos/user-create.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const conn = this.db.getConnection();
    const [rows] = await conn.query('SELECT * FROM users');
    return rows;
  }

  async findOne(id: number) {
    const conn = this.db.getConnection();
    const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0]; 
  }

  async create(user: CreateUserDto) {
    const conn = this.db.getConnection();

    const [isUserExists]: any = await conn.execute(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [user.email]
    )

    if(isUserExists.length > 0) throw new BadRequestException("Email is aready in use!")
    
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const [result] = await conn.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [user.name, user.email, hashedPassword],
    );
    return { id: (result as any).insertId, ...user };
  }

  async update(id: number, user: { name: string; email: string }) {
    const conn = this.db.getConnection();
    await conn.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [
      user.name,
      user.email,
      id,
    ]); 
    return { id, ...user };
  }

  async remove(id: number) {
    const conn = this.db.getConnection();
    await conn.execute('DELETE FROM users WHERE id = ?', [id]);
    return { message: 'User deleted', id };
  }
}
