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
@Entity("seasonal_pricing", { schema: "db_hotel_booking" })
export class SeasonalPricing {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("bigint", { name: "room_type_id", comment: "ID loại phòng" })
  roomTypeId?: string;

  @Column("date", { name: "start_date", comment: "Ngày bắt đầu" })
  startDate?: string;

  @Column("date", { name: "end_date", comment: "Ngày kết thúc" })
  endDate?: string;

  @Column("decimal", {
    name: "price_multiplier",
    comment: "Hệ số nhân giá",
    precision: 3,
    scale: 2,
  })
  priceMultiplier?: string;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date | null;

  @ManyToOne(() => RoomTypes, (roomTypes) => roomTypes.seasonalPricings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "room_type_id", referencedColumnName: "id" }])
  roomType?: RoomTypes;
}
