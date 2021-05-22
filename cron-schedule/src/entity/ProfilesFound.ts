import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { CoinEntry } from "./CoinEntry";

@Entity()
export class ProfilesFound {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  description: string;

  @Column()
  profilepic: string;

  @Column()
  isHidden: boolean;

  @Column()
  isReserved: boolean;

  @Column()
  isVerified: string;

  @Column()
  comments: string;

  @Column()
  coinPriceBitCloutNanos: number;

  @Column()
  stakeMultipleBasisPoints: number;

  @Column()
  usersThatHODL: string[];

  @Column()
  coinEntry: CoinEntry;

  @Column()
  coinPriceBitClout: number;
}
