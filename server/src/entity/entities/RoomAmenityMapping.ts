import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoomTypes } from "./RoomTypes";
import { RoomAmenities } from "./RoomAmenities";

@Index("room_type_id", ["roomTypeId"], {})
@Index("amenity_id", ["amenityId"], {})
@Entity("room_amenity_mapping", { schema: "db_hotel_booking" })
export class RoomAmenityMapping {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("bigint", { name: "room_type_id", comment: "ID loại phòng" })
  roomTypeId?: string;

  @Column("bigint", { name: "amenity_id", comment: "ID tiện nghi" })
  amenityId?: string;

  @ManyToOne(() => RoomTypes, (roomTypes) => roomTypes.roomAmenityMappings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "room_type_id", referencedColumnName: "id" }])
  roomType?: RoomTypes;

  @ManyToOne(
    () => RoomAmenities,
    (roomAmenities) => roomAmenities.roomAmenityMappings,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "amenity_id", referencedColumnName: "id" }])
  amenity?: RoomAmenities;
}
