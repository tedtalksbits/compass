import { isAuthenticated } from '@/auth-service';
import Users, { IUserDocument } from '@/mongodb/models/User';
import { cookies } from 'next/headers';
export async function GET(request: Request) {
  const auth = await isAuthenticated();
  console.log('Auth:', auth);
  if (!auth) {
    return Response.json(
      { message: 'Unauthorized' },
      { status: 401, statusText: 'Unauthorized' }
    );
  }
  const users = await Users.find<IUserDocument>({})
    .select('-password -__v')
    .exec();
  return Response.json(
    { message: 'Hello from the API!', users },
    { status: 200, statusText: 'OK' }
  );
}
