import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('biker_registration')
export class BikerRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  building_id: number;

  @Column()
  is_tenant: boolean;

  @Column()
  is_admin: boolean;

  @Column()
  is_visitor: boolean;

  @Column()
  company: string;

  @Column()
  is_verified: boolean;

  @Column()
  has_building_access: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
