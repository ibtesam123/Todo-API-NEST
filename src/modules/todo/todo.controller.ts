import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoResponse } from 'src/response/todo.response';
import { TodoDTO } from 'src/validation/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

    constructor(
        private readonly todoService: TodoService
    ) { }

    @Get()
    getAllTodo(): Promise<TodoResponse> {
        return this.todoService.getAllTodo()
    }

    @Get(':id')
    getSingleTodo(@Param('id') id: number): Promise<TodoResponse> {
        return this.todoService.getSingleTodo(id)
    }

    @Post()
    addTodo(@Body() todoDTO: TodoDTO): Promise<TodoResponse> {
        return this.todoService.addTodo(todoDTO)
    }

    @Put(':id')
    updateTodo(@Param('id') id: number, @Body() todoDTO: TodoDTO): Promise<TodoResponse> {
        return this.todoService.updateTodo(id, todoDTO)
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: number): Promise<TodoResponse> {
        return this.todoService.deleteTodo(id)
    }
}
