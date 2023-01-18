import Head from "next/head";
import Header from "../components/Header";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../redux/basketSlice";
import Button from "../components/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CheckoutProduct from "../components/CheckoutProduct";

function Checkout() {
  const items = useSelector(selectBasketItems);
  const router = useRouter();
  const [groupItemsInBasket, setGroupItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
  );

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {} as { [key: string]: Product[] });

    setGroupItemsInBasket(groupedItems);
  }, [items]);
  return (
    <div>
      <div>
        <Head>
          <title>Checkout - Apple</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <main>
          <div>
            <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
              {items.length > 0 ? "Review your cart" : "Your cart is empty"}
            </h1>
            <p className="my-4">Free delivery and free returns</p>

            {items.length === 0 && (
              <Button
                title="Continue Shopping"
                onClick={() => router.push("/")}
              />
            )}
          </div>

          {items.length > 0 && (
            <div>
              {Object.entries(groupItemsInBasket).map(([key, items]) => (
                <CheckoutProduct key={key} items={items} id={key} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Checkout;
