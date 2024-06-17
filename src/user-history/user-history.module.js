import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserHistoryEvent} from "./user-history.entity";
import {UserHistoryService} from "./user-history.service";
import {UserHistoryController} from "./user-history.controller";
@Module({
    imports: [TypeOrmModule.forFeature([UserHistoryEvent])],
    controllers: [UserHistoryController],
    providers: [UserHistoryService],
})
export class UserHistoryModule {}