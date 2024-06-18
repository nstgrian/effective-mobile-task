import {Dependencies, Injectable} from "@nestjs/common";
import {OnEvent} from "@nestjs/event-emitter";
import {UserHistoryEvent} from "./user-history.entity";
import {EntityManager} from "typeorm";

const KEY_DICTIONARY = {
    "firstName": "firstNameChange",
    "lastName": "lastNameChange",
    "age": "ageChange",
    "gender": "genderChange",
    "hasIssues": "hasIssuesChange",
}

@Injectable()
@Dependencies(EntityManager)
export class UserHistoryService {
    constructor (entityManager) {
        this.entityManager = entityManager;
    }

    @OnEvent("user.created")
    async handleUserCreatedEvent(payload) {
        const { userData } = payload;
        const userHistoryData = {};

        for (const key in userData) {
            if (KEY_DICTIONARY[key]) {
                userHistoryData[KEY_DICTIONARY[key]] = `${userData[key]}`;
            } else {
                console.warn(`Key "${key}" was not found in KEY_DICTIONARY.`);
            }
        }
        userHistoryData["created"] = true;
        const userHistoryEvent = new UserHistoryEvent(userHistoryData);
        try {
            await this.entityManager.save(userHistoryEvent);
        } catch (error) {
            return error.message;
        }
    }
    @OnEvent("user.updated")
    async handleUserUpdatedEvent(payload) {
        const { oldUserData, newUserData } = payload;
        const userHistoryData = {};
        let differenceCounter = 0;

        delete oldUserData.id;
        for (const key in oldUserData) {
            if (KEY_DICTIONARY[key]) {
                if (!newUserData.hasOwnProperty(key) || oldUserData[key] === newUserData[key]) {
                    userHistoryData[KEY_DICTIONARY[key]] = `${oldUserData[key]}`;
                    continue;
                } else {
                     differenceCounter += 1;
                     userHistoryData[KEY_DICTIONARY[key]] = `${oldUserData[key]} -> ${newUserData[key]}`;
                }

            } else {
                console.warn(`Key "${key}" was not found in KEY_DICTIONARY.`);
            }

        }
        userHistoryData["created"] = false;
        if (differenceCounter !== 0) {
            const userHistoryEvent = new UserHistoryEvent(userHistoryData);
            try {
                await this.entityManager.save(userHistoryEvent);
            } catch (error) {
                return error.message;
            }
        }
    }

    async getHistoryTable() {
        return this.entityManager.query(`
            SELECT * FROM "UserHistory"
            ORDER BY "id"
        `);
    }

    async provideRowData(params) {
        const { startRow, endRow, filterModel, sortModel } = params;
        return this.entityManager.query(`
            SELECT * FROM "UserHistory"
            WHERE "id" BETWEEN ${startRow + 1} AND ${endRow}
            ORDER BY "id" 
        `);
        // return this.entityManager.createQueryBuilder("UserHistory")
    }
}