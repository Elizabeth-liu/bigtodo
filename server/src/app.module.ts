import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { VisionModule } from './vision/vision.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AppService } from './app.service';

@Module({
  imports: [
    UsersModule,
    VisionModule,
    ScheduleModule,
    GraphQLModule.forRoot({
      // typePaths: ['./**/*.graphql'],  报错：UnhandledPromiseRejectionWarning: Error: Unknown type "Query".
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
      autoLoadEntities: true, // 用法来自nest官方example: https://github.com/nestjs/nest/blob/master/sample/05-sql-typeorm/src/app.module.ts
      // entities: ["src/users/users.entity.ts"], 会报错“Cannot use import statement outside a module”
      // migrations: ["src/migration/**/*.ts"],
      // subscribers: ["src/subscriber/**/*.ts"]
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

