import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisionModule } from './vision/vision.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AppService } from './app.service';

@Module({
  imports: [
    VisionModule,
    ScheduleModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: '12345678',
      database: 'bigtodo',
      synchronize: true,
      logging: true,
      autoLoadEntities: true, // example: https://github.com/nestjs/nest/blob/master/sample/05-sql-typeorm/src/app.module.ts
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

