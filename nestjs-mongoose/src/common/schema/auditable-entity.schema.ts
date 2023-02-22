import { Prop } from "@nestjs/mongoose";
import { now } from "mongoose";

export class AuditableEntity {

  @Prop({ default: now() })
  createdAt?: Date;

  @Prop()
  createdBy?: string;

  @Prop({ default: now() })
  updatedAt?: Date;

  @Prop()
  updatedBy?: string;

}