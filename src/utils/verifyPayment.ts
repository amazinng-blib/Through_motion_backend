import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function verifyPayment(reference_number: string) {
  const data = await axios.get(
    `${process.env.PAYSTACK_VERIFY_LINK}${reference_number}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
      },
    }
  );

  return data?.data?.data.status === 'success';
}
