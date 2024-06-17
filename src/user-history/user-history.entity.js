import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

const GENDERS = ["male", "female"];

@Entity({ name: "UserHistory"})
export class UserHistoryEvent {
    constructor(userChanges) {
        Object.assign(this, userChanges);
    }

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id;

    @Column({ type: "bool"})
    created;

    @Column({ type: "varchar", length: 512 })
    firstNameChange;

    @Column({ type: "varchar", length: 512})
    lastNameChange;

    @Column({ type: "varchar", length: 32})
    ageChange;

    @Column({type: "varchar", length: 32})
    genderChange;

    @Column({type: "varchar", length: 32})
    hasIssuesChange;

}