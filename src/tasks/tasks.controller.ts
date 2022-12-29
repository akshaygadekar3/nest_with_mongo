import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { GetUser } from 'src/auth/get-user.decorator';
import { Auth } from 'src/auth/schema/auth.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './schema/task.schema';
import { TasksService } from './tasks.service';

// @UseInterceptors(
//   new SanitizeMongooseModelInterceptor({
//     excludeMongooseId: false,
//     excludeMongooseV: false,
//   }),
// )
@Controller('tasks')
@UseGuards(AuthGuard())
// @UseInterceptors(new TransformInterceptor())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: Auth) {
    return await this.tasksService.create(createTaskDto, user);
  }

  @Get()
  async findAll(@GetUser() user: Auth) {
    console.log(user)
    return await this.tasksService.findAll(user);
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string, @GetUser() user: Auth) {
    return await this.tasksService.deleteById(id, user);
  }

  @Get('/:id')
  async findById(
    @Param('id') id: string,
    @GetUser() user: Auth,
  ): Promise<Task> {
    return await this.tasksService.findById(id, user);
  }
}
