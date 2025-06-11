const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);

app.get('/', (req, res) => res.send('Market App Auth System'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
