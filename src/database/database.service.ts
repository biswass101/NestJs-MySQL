import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2/promise'

@Injectable()
export class DatabaseService implements OnModuleInit,OnModuleDestroy {
    private connection: mysql.Connection;

    async onModuleInit() {
        this.connection = await mysql.createConnection({
            host: 'localhost',
            user: 'biswass101',
            password: '2025Niloy',
            database: 'nestjs_db',
        });
        console.log('MySQL Connected');
    }

    getConnection(): mysql.Connection {
        return this.connection
    }

    async onModuleDestroy() {
        if(this.connection) await this.connection.end();
    }
}
