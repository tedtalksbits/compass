import mongoose from 'mongoose';
import { ITenant } from './Tenant';
import { ICustomer } from './Customer';
import { IUserDocument } from './User';
/*
  ========================================
  Deal Interface
  ========================================
  Deals are associated with customers and represent potential sales.
*/
export type IDeal = {
  _id: string;
  tenant: ITenant;
  customer: ICustomer;
  value: number;
  stage: string;
  pipeline: string;
  closeDate: Date;
  probability: number;
  assignedTo: IUserDocument;
  createdAt: Date;
  updatedAt: Date;
};

const DealSchema = new mongoose.Schema<IDeal>(
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
    value: {
      type: Number,
      required: true,
    },
    stage: {
      type: String,
      enum: [
        'prospecting',
        'qualification',
        'proposal',
        'negotiation',
        'closed',
      ],
      default: 'prospecting',
    },
    pipeline: {
      type: String,
      required: false,
    },
    closeDate: {
      type: Date,
      required: false,
    },
    probability: {
      type: Number,
      default: 0,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Deal ||
  mongoose.model<IDeal>('Deal', DealSchema);
