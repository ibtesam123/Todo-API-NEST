import { TodoModule } from './modules/todo/todo.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './config/db.config';
import { Todo } from './entities/todo.entity';
@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule
      ],
      inject: [ConfigService],
      useFactory: async (dbConfig: ConfigService<DBConfig>) => {
        return {
          type: "postgres",
          host: dbConfig.get<string>("DB_HOST"),
          port: dbConfig.get<number>("DB_PORT"),
          username: dbConfig.get<string>("DB_USERNAME"),
          password: dbConfig.get<string>("DB_PASSWORD"),
          database: dbConfig.get<string>("DB_NAME"),
          entities: [Todo],
          synchronize: true,
        }
      }
    })
  ],
})
export class AppModule { }
