import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, Timestamp, OneToMany } from 'typeorm';
import OneOne from "./oneOneEntities";

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

export default TalkingPoints