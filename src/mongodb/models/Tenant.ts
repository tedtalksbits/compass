import mongoose, { Document, Schema, Types } from 'mongoose';
export type ITenant = {
  _id: string;
  name: string;
  domain: string;
  logo: string;
  branding: {
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    quaternaryColor: string;
    theme: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export interface ITenantDocument extends Document, Omit<ITenant, '_id'> {
  _id: Types.ObjectId;
}

interface ITenantModel extends mongoose.Model<ITenantDocument> {
  build(attrs: ITenant): ITenantDocument;
}

const TenantSchema = new Schema<ITenantDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
      required: false,
    },
    branding: {
      primaryColor: {
        type: String,
        required: false,
      },
      secondaryColor: {
        type: String,
        required: false,
      },
      tertiaryColor: {
        type: String,
        required: false,
      },
      quaternaryColor: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true }
);

TenantSchema.virtual('id').get(function (this: ITenantDocument) {
  return this._id.toHexString();
});
TenantSchema.set('toJSON', {
  virtuals: true,
});
TenantSchema.set('toObject', {
  virtuals: true,
});

export default (mongoose.models.Tenant as ITenantModel) ||
  mongoose.model<ITenantDocument, ITenantModel>('Tenant', TenantSchema);
