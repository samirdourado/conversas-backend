
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, Timestamp, OneToMany } from 'typeorm';
import User from "./user.entities";
import OneOne from "./oneOneEntities";
import TalkingPoints from './talkingPoints';

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

export default Notes