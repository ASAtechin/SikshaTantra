import { Schema, models, model, type InferSchemaType } from "mongoose";
import {
  boardOptions,
  campusOptions,
  contactPreferenceOptions,
  currentSystemOptions,
  goLiveOptions,
  moduleOptions,
  roleOptions,
  studentCountOptions,
} from "@/lib/validation";

const nonEmptyArray = (message: string) => ({
  validator: (value: string[]) => Array.isArray(value) && value.length > 0,
  message,
});

const leadRequestSchema = new Schema(
  {
    schoolName: { type: String, required: true, trim: true, maxlength: 160 },
    city: { type: String, required: true, trim: true, maxlength: 120 },
    studentCount: { type: String, required: true, enum: studentCountOptions },
    boards: {
      type: [{ type: String, enum: boardOptions }],
      required: true,
      validate: nonEmptyArray("At least one board must be selected"),
    },
    campuses: { type: String, enum: campusOptions },

    contactName: { type: String, required: true, trim: true, maxlength: 120 },
    role: { type: String, required: true, enum: roleOptions },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, required: true, trim: true, maxlength: 25 },
    preferredContact: { type: String, enum: contactPreferenceOptions },

    modules: {
      type: [{ type: String, enum: moduleOptions }],
      required: true,
      validate: nonEmptyArray("At least one module must be selected"),
    },
    currentSystem: { type: String, enum: currentSystemOptions },
    currentErp: { type: String, trim: true, maxlength: 120 },
    goLive: { type: String, enum: goLiveOptions },
    message: { type: String, trim: true, maxlength: 2000, default: "" },

    /** The submitter ticked "I agree to be contacted about this request" at this time. */
    consentAt: { type: Date, required: true },

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
