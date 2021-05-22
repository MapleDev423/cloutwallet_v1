import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ProfilesFound } from "./ProfilesFound";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profile: ProfilesFound;
}
