import { Dependencies, Injectable } from '@nestjs/common';
import { EntityManager } from "typeorm";
import {User} from "./user.entity";
import {EventEmitter2} from "@nestjs/event-emitter";
import {UserUpdatedEvent} from "./events/user-updated.event";
import {UserCreatedEvent} from "./events/user-created.event";

@Injectable()
@Dependencies(EntityManager, EventEmitter2)
export class UsersService {
    constructor (entityManager, eventEmitter) {
        this.entityManager = entityManager;
        this.eventEmitter = eventEmitter;
    }
    async create(userData) {
        const user = new User(userData);
        try {
            await this.entityManager.save(user);
        } catch (error) {
            return error.message;
        }
        this.eventEmitter.emit(
            'user.created',
            new UserCreatedEvent({ userData: userData })
        )
        return "User saved successfully";
    }
    async findAll() {
        return this.entityManager.query(`
            SELECT * FROM "Users"
            ORDER BY "id"
        `);
    }

    async update(id, newUserData) {
        try {
            const userData = await this.entityManager.findOne(User, { where: { id: id } });

            if (!userData) {
                throw new Error(`User with id "${id}" was not found.`);
            }

            await this.entityManager.update(User, id, newUserData);

            this.eventEmitter.emit(
                'user.updated',
                new UserUpdatedEvent({
                    oldUserData: userData,
                    newUserData: newUserData
                })
            );

            return "User updated successfully";
        } catch (error) {
            return error.message;
        }
    }

    async updateIssuesFields() {
        return this.entityManager.query(`
            WITH updated_users AS (
                UPDATE "Users"
                SET "hasIssues" = FALSE
                WHERE "hasIssues" <> FALSE
                RETURNING *
            )
                
            INSERT INTO "UserHistory" ("firstNameChange", "lastNameChange", "ageChange", "genderChange", "hasIssuesChange", "created")
            SELECT "firstName", "lastName", "age", "gender", 'true -> false', false
            FROM updated_users;
            
            WITH updated_users AS (
                UPDATE "Users"
                SET "hasIssues" = false
                WHERE "hasIssues" <> false
                RETURNING *
            )
            SELECT COUNT(*) AS updated_issues_fields
            FROM updated_users;
            `)
    }
}