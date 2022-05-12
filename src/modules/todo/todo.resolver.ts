import { DeleteResult, UpdateResult } from 'typeorm';
import { TodoService } from './todo.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';

@Resolver((of) => Todo)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  async findAll(): Promise<Todo[]> {
    return await this.todoService.findAll();
  }

  @Mutation(() => Todo)
  async addTodo(@Args('description') description: string): Promise<Todo> {
    return await this.todoService.create({ description });
  }

  @Query(() => Todo, { name: 'findTodoById' })
  async findTodoById(@Args('id') id: string): Promise<Todo> {
    return await this.todoService.findTodoById(id);
  }

  @Mutation(() => Todo)
  async deleteTodo(@Args('id') id: string): Promise<Todo> {
    return await this.todoService.delete(id);
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Args('description') description: string,
    @Args('id') id: string,
  ): Promise<UpdateResult | Todo> {
    return await this.todoService.update({
      id,
      description,
    });
  }
}
