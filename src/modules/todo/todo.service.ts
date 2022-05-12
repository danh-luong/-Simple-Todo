import { InvalidIdException } from './../../exception/invalid-id-exception.filter';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoRequestUpdate, TodoRequestCreate } from './dto/todo.request.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  create(todo: TodoRequestCreate): Promise<Todo> {
    const result = this.todoRepository.create(todo);
    return this.todoRepository.save(result);
  }

  async delete(id: string): Promise<Todo> {
    const deletedTodo = await this.findTodoById(id);
    if (deletedTodo) {
      await this.todoRepository.delete(id);
      return deletedTodo;
    } else {
      throw new InvalidIdException();
    }
  }

  async update(todo: TodoRequestUpdate): Promise<Todo> {
    const { description } = todo;
    const result = await this.todoRepository.update(todo.id, {
      description,
    });
    if (result.affected) {
      return this.findTodoById(todo.id);
    } else {
      throw new InvalidIdException();
    }
  }

  findTodoById(id: string): Promise<Todo> {
    return this.todoRepository.findOne(id);
  }
}
