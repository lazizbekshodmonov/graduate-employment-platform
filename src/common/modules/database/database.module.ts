import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { db_config } from './config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: db_config.POSTGRES_HOST,
        port: db_config.POSTGRES_PORT,
        username: db_config.POSTGRES_USERNAME,
        password: db_config.POSTGRES_PASSWORD,
        database: db_config.POSTGRES_DBNAME,
        entities: [join(__dirname + '../../../../**/*.entity{.ts,.js}')],
        synchronize: configService.get<boolean>('db.postgres.synchronize'),
        dropSchema: configService.get<boolean>('db.postgres.dropSchema'),
      }),
    }),

    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: db_config.MONGO_URL,
        user: db_config.MONGO_USERNAME,
        pass: db_config.MONGO_PASSWORD,
        dbName: db_config.MONGO_DBNAME,
        authSource: db_config.MONGO_DBNAME,
      }),
    }),
  ],
})
export class DatabaseModule {}
