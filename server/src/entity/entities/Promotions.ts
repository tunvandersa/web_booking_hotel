import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoomTypes } from "./RoomTypes";

@Index("code", ["code"], { unique: true })
@Entity("promotions", { schema: "db_hotel_booking" })
export class Promotions {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("varchar", {
    name: "code",
    unique: true,
    comment: "Mã khuyến mãi",
    length: 50,
  })
  code?: string;

  @Column("text", {
    name: "description",
    nullable: true,
    comment: "Mô tả khuyến mãi",
  })
  description?: string | null;

  @Column("decimal", {
    name: "discount_percentage",
    comment: "Phần trăm giảm giá",
    precision: 4,
    scale: 2,
  })
  discountPercentage?: string;

  @Column("date", { name: "start_date", comment: "Ngày bắt đầu" })
  startDate?: string;

  @Column("date", { name: "end_date", comment: "Ngày kết thúc" })
  endDate?: string;

  @Column("int", {
    name: "minimum_stay",
    nullable: true,
    comment: "Số đêm tối thiểu",
    default: () => "'1'",
  })
  minimumStay?: number | null;

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

  @ManyToMany(() => RoomTypes, (roomTypes) => roomTypes.promotions)
  roomTypes?: RoomTypes[];
}
