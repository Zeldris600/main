import { Entity, Column, PrimaryGeneratedColumn,} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    Name: string;

    @Column({nullable: true})
    password: string;

    
    @Column({unique: true, nullable: false})
    email: string;
}