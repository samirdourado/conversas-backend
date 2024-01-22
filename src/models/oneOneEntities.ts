import { getRounds, hashSync } from "bcryptjs"
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, Timestamp, OneToMany } from 'typeorm';
import User from "./user.entities";
import TalkingPoints from "./talkingPoints";
import Notes from "./notesEntities";

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
    
    @OneToMany(() => TalkingPoints, (talking_point) => talking_point.oneOneUUID)
    talking_points: TalkingPoints[];
    
    @OneToMany(() => Notes, (note) => note.oneOneUUID)
    notes: Notes[];
    
    
    

    
}

export default OneOne;