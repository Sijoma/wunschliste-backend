import { Entity, model, property, hasMany } from "@loopback/repository";
import { Wish } from "./wish.model";

@model()
export class User extends Entity {
  @property({
    type: "number",
    id: true,
    generated: false
  })
  userid: number;

  @property({
    type: "string",
    required: true
  })
  firstname: string;

  @property({
    type: "string",
    required: true
  })
  lastname: string;

  @property({
    type: "string",
    required: true,
    index: {
      unique: true
    }
  })
  email?: string;

  @hasMany(() => Wish, { keyTo: "userid" })
  wishes: Wish[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
