import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ nullable: true })
    verificationToken: string;

    @Column({ nullable: true })
    verificationExpires: Date;

    @Column({ default: "user" })
    role: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 