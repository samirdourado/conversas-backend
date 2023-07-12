import { getRounds, hashSync } from "bcryptjs"
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, Timestamp } from 'typeorm';

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

    // @Column({ type: 'boolean', default: false, })
    // accept: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    hashpassword() {
        const isEncrypted = getRounds(this.password)
        if (!isEncrypted) {
            this.password = hashSync(this.password, 10)
        }
    }   
}

@Entity('one_one')
class OneOne {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ length: 127, })
    title: string;

    @Column({ type: 'date'})
    date: Date;

    @Column({ type: 'time'})
    hour: Timestamp;

    @Column({ type: 'boolean', default: false })
    done: boolean;

    @ManyToOne(() => User, {cascade: true})
    @JoinColumn()
    organizerUUID: User;
    
    @ManyToOne(() => User)
    @JoinColumn()
    guestUUID: User;
}


@Entity('talking_points')
class TalkingPoints {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ length: 127 })
    point: string;

    @ManyToOne(() => OneOne, {cascade: true})
    @JoinColumn()
    oneOneUUID: OneOne;
}

@Entity('notes')
class Notes {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ length: 127 })
    note: string;

    @ManyToOne(() => OneOne, {cascade: true})
    @JoinColumn()
    oneOneUUID: OneOne;    
}

export {
    User,
    OneOne,
    TalkingPoints,
    Notes,
}