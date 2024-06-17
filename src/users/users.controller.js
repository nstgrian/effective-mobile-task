import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Bind, Dependencies,
} from "@nestjs/common";
import {UsersService} from "./users.service";

@Controller('users')
@Dependencies(UsersService)
export class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }

    @Post("create")
    @Bind(Body())
    async create(userInfo) {
        return this.usersService.create(userInfo);
    }

    @Post("update")
    @Bind(Body())
    async update({ id, userInfo }) {
        return this.usersService.update(id, userInfo);
    }

    @Get("find_all")
    async findAll() {
        return this.usersService.findAll();
    }

    @Post("update_issues_fields")
    async updateIssuesFields() {
        return this.usersService.updateIssuesFields();
    }
}