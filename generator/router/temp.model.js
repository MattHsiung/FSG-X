import mongoose from 'mongoose';
import bcrypt   from 'bcryptjs';

const <%= upCaseName %>Schema = new mongoose.Schema({
  name: String
});

export default mongoose.model('<%= upCaseName %>', <%= upCaseName %>Schema);