import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import User, { IUserDocument, IUser } from '@/mongodb/models/User';
import dbConnect from '@/mongodb/dbConnect';
import Tenant, { ITenant, ITenantDocument } from '@/mongodb/models/Tenant';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, username, email, password, tenant } =
      (await req.json()) as Partial<IUser>;
    if (!firstName || !lastName || !username || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne<IUserDocument>({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    let userTenant: ITenantDocument | null = null;

    if (!tenant) {
      // create a tenant
      const defaultTenant = email.split('@')[1] + "'s Company";

      const newTenant = new Tenant<Partial<ITenant>>({
        name: defaultTenant,
        domain: email.split('@')[1],
      });

      userTenant = await newTenant.save();
      console.log('New tenant created:', newTenant);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User<Partial<IUser>>({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      tenant: userTenant ? userTenant.id : tenant,
    });
    await newUser.save();

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
