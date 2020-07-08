import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Test' })
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;
}
