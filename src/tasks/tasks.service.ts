import { Injectable } from '@nestjs/common';
import { Task } from './schema/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './tasks.repository';
import { Auth } from 'src/auth/schema/auth.schema';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto, user : Auth): Promise<Task> {
    return await this.taskRepository.create(createTaskDto, user);
  }

  async findAll(user: Auth): Promise<Task[]> {
    return await this.taskRepository.findAll(user);
  }

  async deleteById(id: string, user : Auth): Promise<object> {
    return this.taskRepository.deleteById(id, user);
  }

  async findById(id: string, user: Auth): Promise<Task>{
    return this.taskRepository.findById(id, user)
  }

}
