import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Hotels } from "./Hotels";
@Entity("hotel_location", { schema: "db_hotel_booking" })
export class HotelLocation {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name?: string | null;

  @OneToMany(() => Hotels, (hotels) => hotels.location)
  hotels?: Hotels[];
}
