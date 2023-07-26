import { getRounds, hashSync } from "bcryptjs"
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, Timestamp, OneToMany } from 'typeorm';
import OneOne from "./oneOneEntities";
import { Multer } from "multer";

@Entity('users')
class User {    
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ length: 50, })
    name: string;

    @Column({ length: 50, unique: true, })
    email: string;

    @Column({ length: 120, })
    password: string;

    @Column({ nullable: true })
    profileImage: string;

    @OneToMany(() => OneOne, (one_one) => one_one.organizerUUID)
    one_one_organizer: OneOne;
    
    @OneToMany(() => OneOne, (one_one) => one_one.guestUUID)
    one_one_guest: OneOne;

    @BeforeInsert()
    @BeforeUpdate()
    hashpassword() {
        const isEncrypted = getRounds(this.password)
        if (!isEncrypted) {
            this.password = hashSync(this.password, 10)
        }
    }   
}

export default User