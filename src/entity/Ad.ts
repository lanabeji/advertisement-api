import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Ad {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    offerMessage: string;

    @Column()
    url: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    category: string;
}
