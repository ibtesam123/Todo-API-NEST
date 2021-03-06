import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Todo])
    ],
    controllers: [
        TodoController,
    ],
    providers: [
        TodoService,
    ],
})
export class TodoModule { }
