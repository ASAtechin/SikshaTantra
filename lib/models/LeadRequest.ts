import { Schema, models, model, type InferSchemaType } from "mongoose";
import { moduleOptions, roleOptions, studentCountOptions } from "@/lib/validation";

const leadRequestSchema = new Schema(
  {
    schoolName: { type: String, required: true, trim: true, maxlength: 160 },
    contactName: { type: String, required: true, trim: true, maxlength: 120 },
    role: { type: String, required: true, enum: roleOptions },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    city: { type: String, required: true, trim: true, maxlength: 120 },
    studentCount: { type: String, required: true, enum: studentCountOptions },
    modules: {
      type: [{ type: String, enum: moduleOptions }],
      required: true,
      validate: {
        validator: (value: string[]) => Array.isArray(value) && value.length > 0,
        message: "At least one module must be selected",
      },
    },
    message: { type: String, trim: true, maxlength: 2000, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "scheduled", "closed"],
      default: "new",
    },
    source: { type: String, default: "website" },
  },
  { timestamps: true }
);

leadRequestSchema.index({ createdAt: -1 });

export type LeadRequestDocument = InferSchemaType<typeof leadRequestSchema>;

export const LeadRequest = models.LeadRequest || model("LeadRequest", leadRequestSchema);
