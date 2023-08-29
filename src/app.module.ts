import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import Joi from 'joi'; // throw exception if environment variables haven't been provided

@Module({
  imports: [ConfigModule.forRoot({
    validationSchema: Joi.object({
      JWT_SECRET_KEY: Joi.string().required(),
      JWT_EXP_TIME: Joi.string().required()
    })
  }),AuthModule, UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
