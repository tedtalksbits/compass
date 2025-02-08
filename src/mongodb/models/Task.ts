import mongoose, { ObjectId } from 'mongoose';
import { ITenant } from './Tenant';
import { IUserDocument } from './User';

/*
  ========================================
  Task Interface
  ========================================
  Tasks can be created for follow-ups, meetings, or general to-dos related to customers, deals, and leads.
*/

export type ITask = {
  _id: string;
  tenant: ITenant;
  assignedTo: IUserDocument;
  description: string;
  dueDate: Date;
  relatedTo: {
    type: 'customer' | 'deal' | 'lead';
    id: ObjectId;
  };
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed' | 'overdue';
  createdAt: Date;
  updatedAt: Date;
};

const TaskSchema = new mongoose.Schema<ITask>(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    relatedTo: {
      type: {
        type: String,
        enum: ['customer', 'deal', 'lead'],
        required: true,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'overdue'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Task ||
  mongoose.model<ITask>('Task', TaskSchema);
