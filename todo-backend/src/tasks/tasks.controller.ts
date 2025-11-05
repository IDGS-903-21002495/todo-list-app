import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  TaskResponse,
  TasksResponse,
  DeleteResponse,
} from './interfaces/task-response.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponse> {
    const task = await this.tasksService.create(createTaskDto);
    return {
      message: 'Created task successfully',
      data: task,
    };
  }

  @Get()
  async findAll(): Promise<TasksResponse> {
    const tasks = await this.tasksService.findAll();
    return {
      message: 'Got all tasks successfully',
      data: tasks,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaskResponse> {
    const task = await this.tasksService.findOne(+id);
    return {
      message: 'Got task successfully',
      data: task,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponse> {
    const task = await this.tasksService.update(+id, updateTaskDto);
    return {
      message: 'Updated task successfully',
      data: task,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<DeleteResponse> {
    await this.tasksService.remove(+id);
    return {
      message: 'Deleted task successfully',
    };
  }
}
