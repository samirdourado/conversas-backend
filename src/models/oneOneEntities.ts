import { getRounds, hashSync } from "bcryptjs"
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, Timestamp, OneToMany } from 'typeorm';
import User from "./user.entities";

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

export default OneOne;