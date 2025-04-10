import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    originalName: String,
    path: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: false
    },
    downloadCount: {
        type: Number,
        // required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: Date,
})

const File = mongoose.model('file', fileSchema);

export default File;


