import { NextResponse } from 'next/server';
import { mongooseConnect } from '../../lib/mongoose';
// import Product from '../../models/Product';
import { Product } from '@/app/models/Product';

export const POST = async (req: Request, res: Response) => {
  try {
    await mongooseConnect();

    const { ids } = await req.json();
    // const { ids } = body;
    const products = await Product.find({ _id: ids });

    return NextResponse.json(products);
  } catch (err) {
    console.log(err, 'CART ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const GET = async (req: Request, res: Response) => {
  try {
    await mongooseConnect();

    // getting the query parameter from the url
    const id = new URL(req.url).searchParams.get('id');

    // checking if it's a query string; then get single product matching query id
    if (id) {
      const singleProduct = await Product.findOne({ _id: id });
      return NextResponse.json(singleProduct);
    } else {
      // else get all products
      const products = await Product.find();
      return NextResponse.json(products);
    }
    
  } catch (err: any) {
    console.log(err, 'ALL PRODUCTS ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
};
