import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CoinEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creatorBasisPoints: number;

  @Column()
  bitCloutLockedNanos: number;

  @Column()
  numberOfHolders: number;

  @Column()
  coinsInCirculationNanos: number;

  @Column()
  coinsInCirculationBitClout: number;

  @Column()
  coinPriceUSD: number;

  @Column()
  coinWatermarkNanos: number;

  @Column()
  bitCloutLocked: number;
}
