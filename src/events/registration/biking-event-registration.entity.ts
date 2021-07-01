import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('biker_event_details')
export class BikingEventRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  biker_registration_id: number;

  @Column()
  event_id: number;

  @Column()
  is_waiver_signed: boolean;

  @Column()
  has_biker_reported: boolean;

  @Column()
  has_biker_completed: boolean;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
