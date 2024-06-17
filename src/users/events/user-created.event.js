export class UserCreatedEvent {
    constructor(payload) {
        this.userData = payload.userData;
    }
}