import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/auth/schema/auth.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './schema/task.schema';
import { TaskStatus } from './taskStatus.enum';

@Injectable()
export class TaskRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
  async create(createTaskDto: CreateTaskDto, user: Auth): Promise<Task> {
    const { title, description } = createTaskDto;
    const createdTask = new this.taskModel({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    // await createdTask.populate('user');
    const result = await createdTask.save();
    return result;
  }

  async findAll(user: Auth): Promise<Task[]> {
    return await this.taskModel.find({ user }).exec();
  }

  async deleteById(id: string, user: Auth): Promise<object> {
    const result = await this.taskModel.deleteOne({ _id: id, user });
    if (result.deletedCount !== 0) {
      return { message: `Task with id : ${id} deleted succesfully` };
    } else {
      throw new NotFoundException(`Task with id : ${id} not found`);
    }
  }

  async findById(id: string, user: Auth): Promise<Task> {
    const result = await this.taskModel.findOne({ _id: id, user });
    if (!result) {
      throw new NotFoundException(`Task with id : ${id} not found`);
    } else {
      return result;
    }
  }
}
