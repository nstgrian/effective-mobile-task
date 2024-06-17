import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
const GENDERS = ["male", "female"];

@Entity({ name: "Users"})
export class User {
    constructor(userInfo) {
        Object.assign(this, userInfo);
    }

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id;

    @Column({ type: "varchar", length: 255 })
    firstName;

    @Column({ type: "varchar", length: 255})
    lastName;

    @Column({ type: "int"})
    age;

    @Column({type: "enum", enum: GENDERS})
    gender;

    @Column({type: "bool"})
    hasIssues;

}