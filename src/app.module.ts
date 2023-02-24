import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot(process.env.MONGODB_URL || 'mongodb://localhost/nest-project'),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
