import { Entity, model, property } from "@loopback/repository";

@model()
export class Wish extends Entity {
  @property({
    type: "number",
    id: true,
    generated: false
  })
  id?: number;

  @property({
    type: "string",
    required: true
  })
  title: string;

  @property({
    type: "string"
  })
  description?: string;

  @property({
    type: "boolean"
  })
  isFulfilled?: boolean;

  @property({
    type: 'number',
  })
  userid?: number;

  constructor(data?: Partial<Wish>) {
    super(data);
  }
}

export interface WishRelations {}

export type WishWithRelations = Wish & WishRelations;
