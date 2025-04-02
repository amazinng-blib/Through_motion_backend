import axios from 'axios';
import dotenv from 'dotenv';
import { AppError } from '../middleware/errorHandler';
dotenv.config();

export async function verifyPayment(
  reference_number: string
): Promise<boolean> {
  const data = await axios.get(
    `${process.env.PAYSTACK_VERIFY_LINK}${reference_number}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
      },
    }
  );

  if (data?.data?.data?.status === 'failed') {
    throw new AppError('Payment verification failed', 400);
  }

  return data?.data?.data.status === 'success';
}
