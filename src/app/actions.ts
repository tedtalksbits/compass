// 'use server';

// import webpush, { PushSubscription } from 'web-push';
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import Subscription from '@/mongodb/models/subscription';
// import { Subscription as ISubscription } from '@/types/subscription';
// import CryptoJS from 'crypto-js';
// webpush.setVapidDetails(
//   'mailto:tedaneblake@gmail.com',
//   process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
//   process.env.VAPID_PRIVATE_KEY!
// );

// export async function subscribeUser(sub: PushSubscription) {
//   if (!sub) {
//     throw new Error('Invalid subscription');
//   }

//   // Check if user is authenticated
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();
//   console.log('User:', user);
//   if (!user) {
//     throw new Error('Unauthorized');
//   }

//   // Check if the subscription already exists
//   const existingSubscription = await Subscription.findOne({
//     userId: user.id,
//     endpoint: sub.endpoint,
//   });

//   console.log('Existing Subscription:', existingSubscription);
//   if (!existingSubscription) {
//     // Save the new subscription to the database
//     const res = await Subscription.create<ISubscription>({
//       userId: user.id,
//       endpoint: sub.endpoint,
//       keys: sub.keys,
//     });
//     console.log('Subscription saved to db:', res);
//   } else {
//     console.log('Subscription already exists.');
//   }

//   console.log('Subscription:', sub);
//   return { success: true };
// }

// export async function unsubscribeUser() {
//   // check if user is authenticated
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     throw new Error('Unauthorized');
//   }

//   // delete the subscription
//   const res = await Subscription.deleteOne({ userId: user.id });
//   console.log('Deleted Subscription:', res);

//   return { success: true };
// }

// export async function sendNotification(
//   userId: string,
//   title: string,
//   message: string
// ) {
//   console.log('Sending notification:', message);

//   // Fetch all subscriptions for the user
//   const subscriptions = await Subscription.find({ userId });

//   if (subscriptions.length === 0) {
//     throw new Error('No subscriptions found for user');
//   }

//   // Prepare the payload
//   const payload = JSON.stringify({
//     title,
//     body: message,
//     icon: '/icon.png',
//   });

//   // Send notifications to all subscriptions
//   const sendPromises = subscriptions.map(async (subscriptionRecord) => {
//     const subscription: PushSubscription = {
//       endpoint: subscriptionRecord.endpoint,
//       keys: subscriptionRecord.keys,
//     };

//     try {
//       await webpush.sendNotification(subscription, payload);
//     } catch (error) {
//       console.error('Error sending push notification:', error);
//       // Optionally, handle errors (e.g., remove invalid subscriptions)
//     }
//   });

//   await Promise.all(sendPromises);

//   return { success: true };
// }

// export async function encrypt(string: string) {
//   if (!string) {
//     throw new Error('String is required to encrypt');
//   }
//   if (!process.env.CRYPTO_SECRET) {
//     throw new Error('Crypto secret is required to generate collaboration link');
//   }
//   const encryptedUserId = CryptoJS.AES.encrypt(
//     string,
//     process.env.CRYPTO_SECRET
//   ).toString();
//   return encryptedUserId;
// }

// export async function decrypt(string: string) {
//   if (!string) {
//     throw new Error('String is required to decrypt');
//   }
//   if (!process.env.CRYPTO_SECRET) {
//     throw new Error('Crypto secret is required to generate collaboration link');
//   }
//   const decryptedUserId = CryptoJS.AES.decrypt(
//     string,
//     process.env.CRYPTO_SECRET
//   ).toString(CryptoJS.enc.Utf8);
//   return decryptedUserId;
// }
