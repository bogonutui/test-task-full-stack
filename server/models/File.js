import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const FileModel = mongoose.model('File', fileSchema);

export default FileModel;
