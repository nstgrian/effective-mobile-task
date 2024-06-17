import {Dependencies, Module} from '@nestjs/common';
import { DatabaseModule } from './database/database.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DataSource } from "typeorm";
import { UserHistoryModule } from './user-history/user-history.module';
import {EventEmitterModule} from "@nestjs/event-emitter";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";

@Dependencies(DataSource)
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','dist/static'),
    }),
    DatabaseModule,
    UsersModule,
    UserHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

}
