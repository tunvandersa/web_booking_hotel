import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoomAmenityMapping } from "./RoomAmenityMapping";

@Index("name", ["name"], { unique: true })
@Entity("room_amenities", { schema: "db_hotel_booking" })
export class RoomAmenities {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("varchar", {
    name: "name",
    unique: true,
    comment: "Tên tiện nghi",
    length: 100,
  })
  name?: string;

  @Column("text", {
    name: "description",
    nullable: true,
    comment: "Mô tả tiện nghi",
  })
  description?: string | null;

  @Column("text", {
    name: "image",
    nullable: true,
    comment: "Ảnh tiện nghi",
  })
  image?: string | null;

  @Column("tinyint", {
    name: "is_free",
    nullable: true,
    comment: "Miễn phí hay không",
    width: 1,
    default: () => "'1'",
  })
  isFree?: boolean | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date | null;

  @Column("tinyint", {
    name: "is_active",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  isActive?: boolean | null;

  @OneToMany(
    () => RoomAmenityMapping,
    (roomAmenityMapping) => roomAmenityMapping.amenity
  )
  roomAmenityMappings?: RoomAmenityMapping[];
}
