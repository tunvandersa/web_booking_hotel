import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Hotels } from "./Hotels";
import { HotelAmenities } from "./HotelAmenities";

@Index("hotel_id", ["hotelId"], {})
@Index("amenity_id", ["amenityId"], {})
@Entity("hotel_amenity_mapping", { schema: "db_hotel_booking" })
export class HotelAmenityMapping {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("bigint", { name: "hotel_id", comment: "ID khách sạn" })
  hotelId?: string;

  @Column("bigint", { name: "amenity_id", comment: "ID tiện nghi" })
  amenityId?: string;

  @ManyToOne(() => Hotels, (hotels) => hotels.hotelAmenityMappings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "hotel_id", referencedColumnName: "id" }])
  hotel?: Hotels;

  @ManyToOne(
    () => HotelAmenities,
    (hotelAmenities) => hotelAmenities.hotelAmenityMappings,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "amenity_id", referencedColumnName: "id" }])
  amenity?: HotelAmenities;
}
