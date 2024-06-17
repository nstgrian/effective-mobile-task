import {
    Controller,
    Get,
    Post,
    Body,
    Bind,
    Dependencies,
    Render,
} from "@nestjs/common";
import {UserHistoryService} from "./user-history.service";


@Controller("user_history")
@Dependencies(UserHistoryService)
export class UserHistoryController {
    constructor(userHistoryService) {
        this.userHistoryService = userHistoryService;
    }

    @Get()
    @Render("user-history/views/index")
    async root() {}

    @Post()
    @Bind(Body())
    async getRowData (params) {
        const providedRows = await this.userHistoryService.provideRowData(params);
        return { rowData: JSON.stringify(providedRows) };
    }
}