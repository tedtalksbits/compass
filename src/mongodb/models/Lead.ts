import mongoose from 'mongoose';
import { ITenant } from './Tenant';
import { ICustomer } from './Customer';
import { IUserDocument } from './User';

/*
  ========================================
  Lead Interface
  ========================================
  Leads are customers who haven’t been converted into deals yet. The lead captures information about where and how it was generated.
*/

export type ILead = {
  _id: string;
  tenant: ITenant;
  customer: ICustomer;
  status: string;
  score: number;
  source: string;
  assignedTo: IUserDocument;
  createdAt: Date;
  updatedAt: Date;
};

const LeadSchema = new mongoose.Schema<ILead>(
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
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'unqualified', 'converted'],
      default: 'new',
    },
    score: {
      type: Number,
      default: 0,
    },
    source: {
      type: String,
      required: false,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Lead ||
  mongoose.model<ILead>('Lead', LeadSchema);
