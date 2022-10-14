import { Entity, BeforeInsert, PrimaryGeneratedColumn, Column,AfterInsert } from "typeorm";
@Entity()
class Users {

    @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
    user_id: string;

    @Column("varchar")
    user_name: string;

    @Column("varchar")
    email: string;

    @Column("int")
    mobile_number: number;

    @Column("varchar")
    user_location: string;

    @Column({ name: 'created_on', type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_on: Date;

    @Column({ name: 'updated_on', type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_on: Date;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.created_on = new Date();
    }
    @AfterInsert()
    public async updatedDetails(): Promise<void> {
        this.updated_on = new Date();
    }

}
export default Users