import mongoose from 'mongoose';
import { ITenant } from './Tenant';
import { ICustomer } from './Customer';
import { IUserDocument } from './User';

export type ICustomerNote = {
  _id: string;
  tenant: ITenant;
  customer: ICustomer;
  user: IUserDocument;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

const CustomerNoteSchema = new mongoose.Schema<ICustomerNote>(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.CustomerNote ||
  mongoose.model<ICustomerNote>('CustomerNote', CustomerNoteSchema);
