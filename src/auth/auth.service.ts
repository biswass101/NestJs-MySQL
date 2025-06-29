import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4} from 'uuid';

@Injectable()
export class AuthService {
    constructor(private readonly db: DatabaseService, private jwtservice: JwtService) {}

    async login(loginData: LoginDto) {
        const conn = this.db.getConnection();
        const {email, password} = loginData;

        const [isUserExists]: any = await conn.execute(
            'SELECT id FROM users WHERE email = ? LIMIT 1',
            [email]
        )
        if(!isUserExists[0]) throw new UnauthorizedException("Wrong Credentials");
        const [user] = await conn.query('SELECT * FROM users WHERE id = ?', [isUserExists[0].id]);
        const matchPassword = await bcrypt.compare(password, user[0].password)
        if(!matchPassword) throw new UnauthorizedException("Wrong Credentials");

        //jwt tokenize
        const tokens = await this.generateAccessTockes(user[0].id);

        return {
            ...tokens,
            userId: user[0].id
        }
    }
    async generateAccessTockes(userId) {
        const accessToken = this.jwtservice.sign({userId}, {expiresIn: '1h'});
        const refreshToken = uuidv4();

        await this.storeRefreshToken(refreshToken, userId);
        return {
            accessToken,
            refreshToken
        }
    }

    async refreshTokens(refreshToken: string) {
        const conn = this.db.getConnection();
        const [rows]: any = await conn.execute(
            `SELECT * FROM refresh_token 
            WHERE token = ? 
            AND expiryDate > NOW()
            LIMIT 1`,
            [refreshToken]
        );

        if(rows.length === 0) throw new UnauthorizedException('Refresh token is invalid or expired.');
        const tokenRecord = rows[0];

        return this.generateAccessTockes(tokenRecord.userId);
    }

    async storeRefreshToken(token: string, userId) {
        const conn = this.db.getConnection();
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 3);

        //deleting previoud tokens
        await conn.execute(
            `DELETE FROM refresh_token
             WHERE userId = ?`,
            [userId]
        )

        //storing refresh token
        await conn.execute(
            'INSERT INTO refresh_token (token, userId, expiryDate) VALUES (?, ?, ?)',
            [token, userId, expiryDate],
        )
    }
}
