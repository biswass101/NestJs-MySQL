import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: mysql.Connection;

  async onModuleInit() {
    this.connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || '',
    });

    await this.connection.connect();

    console.log('MySQL Connected');
  }

  getConnection(): mysql.Connection {
    return this.connection;
  }

  async onModuleDestroy() {
    if (this.connection) await this.connection.end();
  }
}
