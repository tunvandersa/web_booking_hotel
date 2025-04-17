import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoomAmenityMapping } from "./RoomAmenityMapping";
import { RoomImages } from "./RoomImages";
import { Rooms } from "./Rooms";

@Entity("room_types", { schema: "db_hotel_booking" })
export class RoomTypes {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("varchar", { name: "name", comment: "Tên loại phòng", length: 100 })
  name?: string;

  @Column("text", {
    name: "description",
    nullable: true,
    comment: "Mô tả loại phòng",
  })
  description?: string | null;

  @Column("int", { name: "capacity", comment: "Sức chứa (số người)" })
  capacity?: number;

  @Column("decimal", {
    name: "base_price",
    comment: "Giá cơ bản",
    precision: 10,
    scale: 2,
  })
  basePrice?: string;

  @Column("decimal", {
    name: "size_sqm",
    nullable: true,
    comment: "Diện tích (m2)",
    precision: 6,
    scale: 2,
  })
  sizeSqm?: string | null;

  @Column("tinyint", {
    name: "is_active",
    default: () => "'1'",
    comment: "Trạng thái",
  })
  isActive?: boolean;

  @Column("decimal", {
    name: "extra_child_price",
    nullable: true,
    comment: "Phụ thu trẻ em",
    precision: 10,
    scale: 2,
  })
  extraChildPrice?: string | null;
  
  @Column("decimal", {
    name: "extra_adult_price",
    nullable: true,
    comment: "Phụ thu người lớn",
    precision: 10,
    scale: 2,
  })
  extraAdultPrice?: string | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date | null;

  @Column("timestamp", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt?: Date | null;

  @OneToMany(
    () => RoomAmenityMapping,
    (roomAmenityMapping) => roomAmenityMapping.roomType
  )
  roomAmenityMappings?: RoomAmenityMapping[];

  @OneToMany(() => RoomImages, (roomImages) => roomImages.roomType)
  roomImages?: RoomImages[];


  @OneToMany(() => Rooms, (rooms) => rooms.roomType)
  rooms?: Rooms[];

}