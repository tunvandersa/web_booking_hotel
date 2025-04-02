import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoomTypes } from "./RoomTypes";

@Index("room_type_id", ["roomTypeId"], {})
@Entity("room_images", { schema: "db_hotel_booking" })
export class RoomImages {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("bigint", { name: "room_type_id", comment: "ID loại phòng" })
  roomTypeId?: string;
  
  @Column("varchar", {
    name: "image_url",
    comment: "URL hình ảnh",
    length: 255,
  })
  imageUrl?: string;

  @Column("tinyint", {
    name: "is_primary",
    nullable: true,
    comment: "Ảnh chính",
    width: 1,
    default: () => "'0'",
  })
  isPrimary?: boolean | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date | null;

  @ManyToOne(() => RoomTypes, (roomTypes) => roomTypes.roomImages, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "room_type_id", referencedColumnName: "id" }])
  roomType?: RoomTypes;
}
