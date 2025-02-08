import mongoose from 'mongoose';
import { ITenant } from './Tenant';
import { ICustomerNote } from './CustomerNote';

/*
  ========================================
  Customer Interface
  ========================================

  The customer entity stores detailed information about each individual customer, including interactions.
*/
export type ICustomer = {
  _id: string;
  tenantId: ITenant;
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  status: string;
  leadSource: string;
  notes: ICustomerNote[];
  createdAt: Date;
  updatedAt: Date;
};

const CustomerSchema = new mongoose.Schema<ICustomer>(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    companyName: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    zip: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    leadSource: {
      type: String,
      required: false,
      enum: ['web', 'email', 'phone', 'social', 'referral', 'other'],
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomerNote',
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.models.Customer ||
  mongoose.model<ICustomer>('Customer', CustomerSchema);
