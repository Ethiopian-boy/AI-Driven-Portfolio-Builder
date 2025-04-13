require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const documentRoutes = require('./routes/documentRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');
const aiDocumentRoutes = require('./routes/aiDocumentRoutes');
const documentDownloadRoutes = require('./routes/documentDownloadRoutes');
const portfolioRouter = require('./routes/portfolioRoutes');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/jobapplications', jobApplicationRoutes);
app.use('/api/ai-documents', aiDocumentRoutes);
app.use('/api/documentDownload', documentDownloadRoutes);
app.use('/api/portfolio', portfolioRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
