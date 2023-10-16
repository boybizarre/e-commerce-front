import { NextResponse } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongoose';
import { Order } from '@/app/models/Order';
import { buffer } from 'micro';
const stripe = require('stripe')(process.env.STRIPE_SK);

export const POST = async (req: Request, res: Response) => {
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    const endpointSecret =
      'whsec_8d2e68b671e1d4812a4c8e59a43a46cbf723bae20a6734a88d2ec8f51298d412';

    event = stripe.webhooks.constructEvent(
      buffer(await req.json()),
      sig,
      endpointSecret
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        })
      }
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json('OK');
};

// deft-lavish-defeat-won

// acct_1NxctOId6jX26Jnh