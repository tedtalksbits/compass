import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  tenant: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'admin' | 'user' | 'sales' | 'support';
  permissions: string[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends Document, Omit<IUser, '_id'> {
  _id: Types.ObjectId;
}

interface IUserModel extends mongoose.Model<IUserDocument> {
  build(attrs: IUser): IUserDocument;
}

const UserSchema = new Schema<IUserDocument>(
  {
    tenant: {
      type: String,
      required: true,
      ref: 'Tenant',
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'sales', 'support'],
      default: 'user',
    },
    permissions: {
      type: [String],
      default: [],
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

UserSchema.virtual('id').get(function (this: IUserDocument) {
  return this._id.toHexString();
});
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

// Prevent recompiling the model
export default (mongoose.models.User as IUserModel) ||
  mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
