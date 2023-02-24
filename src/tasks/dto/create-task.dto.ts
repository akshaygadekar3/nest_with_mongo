import { TaskStatus } from '../taskStatus.enum';

export class CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
}
