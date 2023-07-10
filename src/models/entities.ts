import { getRounds, hashSync } from "bcryptjs"
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn } from 'typeorm';

// Tabela users
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

    @Column({ nullable: true, })
    profileImage: string;

    @Column({ type: 'boolean', default: false, })
    accept: boolean;

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
    date: string | Date;

    @Column({ type: 'time'})
    hour: string;

    @ManyToOne(() => User)
    @JoinColumn()
    schedule: User;
}

@Entity('talking_points')
class TalkingPoints {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ length: 127 })
    title: string;

    @ManyToOne(() => OneOne)
    @JoinColumn()
    talkingPoints: OneOne;
    
}

export {
    User,
    OneOne,
    TalkingPoints,
}