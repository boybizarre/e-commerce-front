
import Image from 'next/image';
import Header from './components/Header';
import Featured from './components/Featured';
import NewProducts from './components/NewProducts';

import { Product } from './models/Product';
import { mongooseConnect } from './lib/mongoose';

const Home = async () => {
  const featuredProductId = '650f5f21014cb2ef220a2fce';

  await mongooseConnect();

  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });

  console.log(featuredProduct);
  console.log(newProducts);

  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
};

export default Home;
