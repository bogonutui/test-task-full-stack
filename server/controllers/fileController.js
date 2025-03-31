import csvParser from 'csv-parser';
import { Readable } from 'stream';
import FileModel from '../models/File.js';
import { toCamelCase } from '../helpers/toCamleCase.js';

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    await FileModel.deleteMany();

    const results = [];
    const stream = Readable.from(req.file.buffer.toString());

    stream
      .pipe(
        csvParser({
          separator: ';',
          mapHeaders: ({ header }) => toCamelCase(header),
        })
      )
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', async () => {
        if (results.length === 0) {
          return res.status(400).json({ message: 'No valid data found in file' });
        }

        await FileModel.insertMany(results);
        res.json({ message: 'File uploaded successfully', data: results });
      })
      .on('error', (err) => {
        console.error('Stream error:', err);
        res.status(500).json({ message: 'Error processing file' });
      });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFileData = async (req, res) => {
  const { pageIndex = 0, pageSize = 10 } = req.query;

  try {
    const skip = pageIndex * pageSize;
    const data = await FileModel.find()
      .skip(skip)
      .limit(Number(pageSize));

    const total = await FileModel.countDocuments();

    res.json({
      data,
      total,
      page: Number(pageIndex),
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error('Error fetching file data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
};
