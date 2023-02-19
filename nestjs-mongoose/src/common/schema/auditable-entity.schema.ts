import { Prop } from "@nestjs/mongoose";
import { now } from "mongoose";

export class AuditableEntity {

  @Prop({ default: now() })
  createdAt?: Date;

  @Prop()
  createdBy?: String;

  @Prop({ default: now() })
  updatedAt?: Date;

  @Prop()
  updatedBy?: String;

}