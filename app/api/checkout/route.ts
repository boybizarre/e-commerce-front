import { NextResponse } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongoose';
import { Product } from '@/app/models/Product';
import { Order } from '@/app/models/Order';
const stripe = require('stripe')(process.env.STRIPE_SK);

export const POST = async (req: Request, res: Response) => {
  try {
    await mongooseConnect();

    const body = await req.json();
    // console.log(body);

    const { name, email, city, postalCode, streetAddress, country, products } =
      body;

    // splitting the string of product ids into an array of strings
    const productIds: string[] = products.split(',');

    // fetching unique ids in productIds
    // the set Object removes duplicates from the productIds array
    const uniqueIds: string[] = [...new Set(productIds)];

    // fetching the products from the database using the uniqueIds
    const productsInfos = await Product.find({ _id: uniqueIds });

    let line_items = [];

    // looping through the uniqueIds: for each product do this
    for (const uniqueId of uniqueIds) {
      // finding the single product in the productsInfo array using the uniqueId of uniqueIds
      const productInfo = productsInfos.find(
        (product) => product._id.toString() === uniqueId
      );

      // finding the quantity of that uniqueId in the products sent to the body
      const quantity = productIds.filter((id) => id === uniqueId)?.length || 0;

      if (quantity > 0 && productInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: 'USD',
            product_data: {
              name: productInfo.title,
            },
            unit_amount: quantity * productInfo.price * 100,
          },
        });
      }
    }

    const orderDoc = await Order.create({
      line_items,
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      paid: false,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      customer_email: email,
      success_url: process.env.PUBLIC_URL + '/cart?success=1',
      cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
      metadata: {
        orderID: orderDoc._id.toString(),
      },
    });

    console.log(session.url);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.log(err, 'CHECKOUT ERROR');
    return new NextResponse('My Internal Error', { status: 500 });
  }
};
