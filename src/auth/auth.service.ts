import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private jwtservice: JwtService,
    private mailService: MailService
  ) {}

  async login(loginData: LoginDto) {
    const conn = this.db.getConnection();
    const { email, password } = loginData;

    const [isUserExists]: any = await conn.execute(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [email],
    );
    if (!isUserExists[0]) throw new UnauthorizedException('Wrong Credentials');
    const [user] = await conn.query('SELECT * FROM users WHERE id = ?', [
      isUserExists[0].id,
    ]);
    const matchPassword = await bcrypt.compare(password, user[0].password);
    if (!matchPassword) throw new UnauthorizedException('Wrong Credentials');

    //jwt tokenize
    const tokens = await this.generateAccessTockes(user[0].id);

    return {
      ...tokens,
      userId: user[0].id,
    };
  }
  async generateAccessTockes(userId: any) {
    const accessToken = this.jwtservice.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string) {
    const conn = this.db.getConnection();
    const [rows]: any = await conn.execute(
      `SELECT * FROM refresh_token 
            WHERE token = ? 
            AND expiryDate > NOW()
            LIMIT 1`,
      [refreshToken],
    );

    if (rows.length === 0)
      throw new UnauthorizedException('Refresh token is invalid or expired.');
    const tokenRecord = rows[0];

    return this.generateAccessTockes(tokenRecord.userId);
  }

  async storeRefreshToken(token: string, userId: any) {
    const conn = this.db.getConnection();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    //deleting previoud tokens
    await conn.execute(
      `DELETE FROM refresh_token
             WHERE userId = ?`,
      [userId],
    );

    //storing refresh token
    await conn.execute(
      'INSERT INTO refresh_token (token, userId, expiryDate) VALUES (?, ?, ?)',
      [token, userId, expiryDate],
    );
  }

  async changePassword(userId: any, oldPassword: string, newPassword: string) {
    const conn = this.db.getConnection();
    
    //find userById
    const [isUserExists] = await conn.execute(`
      SELECT * FROM users
      WHERE id = ?
      `, [userId]);
      // console.log(isUserExists);
    if(!isUserExists[0]) throw new NotFoundException("User Not Found!");

    const matchPassword = await bcrypt.compare(oldPassword, isUserExists[0]?.password);

    if(!matchPassword) throw new UnauthorizedException("Wrong credentials");
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    
    await conn.execute(`
      UPDATE users 
      SET password = ?
      WHERE id = ?`, [newHashedPassword, userId]);
    

    return "Password has been Changed";
  }


  async forgotPassword(email: string) {
    const conn = this.db.getConnection();

    const [isUserExists] = await conn.execute(`
      SELECT id FROM users WHERE email = ?`, [email]);
    
    if(!isUserExists[0]) throw new UnauthorizedException("User Not Found!");
    console.log("id is: " + isUserExists[0].id);

    const resetToken = uuidv4();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    //deleting previous refresh tokens
    await conn.execute(
      `DELETE FROM reset_tokens
             WHERE user_id = ?`,
      [isUserExists[0]?.id],
    );

    await conn.execute(
      'INSERT INTO reset_tokens (token, user_id, expiry_date) VALUES (?, ?, ?)',
      [resetToken, isUserExists[0]?.id, expiryDate]);

    
    this.mailService.sendPasswordResetEmail(email, resetToken)

    return {
      messsage: 'Please check your email!'
    }
  }

  async resetPassword(newPassword: string, resetToken: string) {
    const conn = this.db.getConnection();

    //find token
    const [isTokenExists] = await conn.execute(`
      SELECT * FROM reset_tokens 
      WHERE token = ? AND expiry_date > ?`, [resetToken, new Date()])
    if(!isTokenExists[0]) throw new UnauthorizedException("Unauthorized user!");
    const [getUser] = await conn.execute(`
      SELECT * FROM users WHERE id = ?`, [isTokenExists[0].user_id]);
    
    if(!getUser[0]) throw new InternalServerErrorException("Something went wrong!");
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    console.log(getUser[0]);
    
    await conn.execute(`
      UPDATE users 
      SET password = ?
      WHERE id = ?`, [newHashedPassword, isTokenExists[0].user_id])
    
    return {
      message: "Password Changed",
    }

  }
}
