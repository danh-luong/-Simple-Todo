import { CustomValidationPipe } from './pipes/validation.pipe';
import { TodoService } from './todo.service';
import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoRequestCreate, TodoRequestUpdate } from './dto/todo.request.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return await this.todoService.findAll();
  }

  @Post()
  async addTodo(
    @Body(new CustomValidationPipe()) todo: TodoRequestCreate,
  ): Promise<Todo> {
    return await this.todoService.create(todo);
  }

  @Get(':id')
  async findTodoById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Todo> {
    return await this.todoService.findTodoById(id);
  }

  @Delete(':id')
  async deleteTodoById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Todo> {
    return await this.todoService.delete(id);
  }

  @Put()
  async updateTodo(
    @Body(new CustomValidationPipe()) todo: TodoRequestUpdate,
  ): Promise<Todo> {
    return await this.todoService.update(todo);
  }
}
