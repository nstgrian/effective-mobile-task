export class UserUpdatedEvent {
    constructor(payload) {
        this.newUserData = payload.newUserData;
        this.oldUserData = payload.oldUserData;
    }
}