import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Challenge } from '../challenges/challenge.entity';

@Entity('test_inputs')
export class TestInput {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'input', type: 'text' })
  input: string;

  @ManyToOne(
    () => Challenge,
    challenge => challenge.testInputs,
  )
  challenge: Challenge;

  constructor(params: { input: string }) {
    if (params !== undefined) {
      this.input = params.input;
    }
  }
}
