import { Schema, model, models } from "mongoose";
const ObjectId = Schema.ObjectId;

const newSchema = new Schema(
    {
        // Google provided info
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true, trim: true },
        img: { type: String, default: null },

        // More
        gender: { type: String, enum: ["Male", "Female", "Other"], default: "Male" },

        // Role based info for Student
        academicId: Number,
        sessionId: ObjectId, // FK session._id
        programId: ObjectId, // FK program._id 

        // Role based info for Teacher
        departmentId: ObjectId, // FK dept._id
        designation: String,
        about: { type: String, default: null },

        role: {
            admin: { type: Boolean, default: false },
            coAdmin: { type: Boolean, default: false },
            student: { type: Boolean, default: false },
            teacher: { type: Boolean, default: false },
            other: { type: Boolean, default: false },
            deptChairman: { type: Boolean, default: false },
        },
        access: {
            lastLoginAt: { type: Date, default: Date.now },
            muted: { type: Boolean, default: false },
            mutedBy: { type: ObjectId, default: null }, // FK users._id
            mutedAt: { type: Date, default: null },
        },
    },
    { timestamps: true, versionKey: false }
)

// Create models or use existing ones
const users = models.users || model("users", newSchema);
export default users