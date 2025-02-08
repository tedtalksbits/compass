import mongoose from 'mongoose';
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

const TenantSchema = new mongoose.Schema<ITenant>(
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
      theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light',
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Tenant ||
  mongoose.model<ITenant>('Tenant', TenantSchema);
