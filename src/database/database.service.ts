import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: mysql.Connection;
  
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.connection = await mysql.createConnection({
      host: this.configService.get('db.db_host') || 'localhost',
      user: this.configService.get('db.db_user')|| 'root',
      password: this.configService.get('db.db_password') || '',
      database: this.configService.get('db.db_name') || '',
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
