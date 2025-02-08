import mongoose, { ObjectId } from 'mongoose';
import { ITenant } from './Tenant';
import { IUser } from './User';

/*
  ========================================
  Activity Interface
  ========================================
  Activity logs capture every interaction and action within the CRM (important for auditing and tracking user actions).
*/

export type IActivity = {
  _id: string;
  tenant: ITenant;
  user: IUser;
  action: string;
  targetType: 'customer' | 'deal' | 'lead' | 'task' | 'note' | 'tenant';
  targetId: ObjectId;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
};

const ActivitySchema = new mongoose.Schema<IActivity>(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    targetType: {
      type: String,
      enum: ['customer', 'deal', 'lead', 'task', 'note', 'tenant'],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Activity ||
  mongoose.model<IActivity>('Activity', ActivitySchema);
