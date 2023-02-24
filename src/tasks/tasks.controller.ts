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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
@ApiBearerAuth()
@ApiTags('tasks ')
@Controller('tasks')
@UseGuards(AuthGuard())
// @UseInterceptors(new TransformInterceptor())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // @ApiOkResponse({ type: Task })
  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({
    status: 201,
    description: 'The task created',
    type: Task,
  })
  async create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: Auth) {
    return await this.tasksService.create(createTaskDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'The found tasks',
    type: Task,
  })
  async findAll(@GetUser() user: Auth) {
    return await this.tasksService.findAll(user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete task by id' })
  @ApiResponse({
    status: 200,
    description: 'The deleted task',
    type: Task,
  })
  async deleteById(@Param('id') id: string, @GetUser() user: Auth) {
    return await this.tasksService.deleteById(id, user);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiResponse({
    status: 200,
    description: 'The found task',
    type: Task,
  })
  async findById(
    @Param('id') id: string,
    @GetUser() user: Auth,
  ): Promise<Task> {
    return await this.tasksService.findById(id, user);
  }
}
