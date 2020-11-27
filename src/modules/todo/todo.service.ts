import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';
import { TodoResponse } from 'src/response/todo.response';
import { TodoDTO } from 'src/validation/todo.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
    ) { }

    async getAllTodo(): Promise<TodoResponse> {
        let todos = await this.todoRepo.find();
        return {
            success: true,
            data: todos,
        }
    }

    async getSingleTodo(id: number): Promise<TodoResponse> {
        const todo = await this.todoRepo.findOne(id)

        if (!todo)
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND)

        return {
            success: true,
            data: todo
        }
    }

    async addTodo(todoDTO: TodoDTO): Promise<TodoResponse> {

        const todo = await this.todoRepo.save({
            title: todoDTO.title,
            description: todoDTO.description
        })

        if (!todo)
            throw new HttpException('Cannot insert todo', HttpStatus.BAD_REQUEST)

        return {
            success: true,
            data: todo,
        }
    }

    async updateTodo(id: number, todoDTO: TodoDTO): Promise<TodoResponse> {
        try {

            const res = await this.todoRepo.update(id, todoDTO)
            console.log(res.generatedMaps)

            let todo = await this.todoRepo.findOne(id)

            return {
                success: true,
                data: todo,
            }

        } catch ({ message }) {
            console.log(message)
            throw new HttpException('Cannot update todo', HttpStatus.BAD_REQUEST)
        }

    }

    async deleteTodo(id: number): Promise<TodoResponse> {
        let todo = await this.todoRepo.findOne(id)

        if (!todo)
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND)

        await this.todoRepo.delete(id)

        return {
            success: true,
            data: todo
        }

    }

}
