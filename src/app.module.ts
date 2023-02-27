import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TasksModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
