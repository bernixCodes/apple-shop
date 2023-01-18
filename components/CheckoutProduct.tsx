import Image from "next/image";
import { urlFor } from "../sanity";

interface Props {
  items: Product[];
  id: string;
}

function CheckoutProduct({ id, items }: Props) {
  return (
    <div>
      <div className="relative h-44 w-44">
        <Image
          src={urlFor(items[0].image[0]).url()}
          alt=""
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="flex flex-1 items-end lg:items-center ">
        <div>
          <div>
            <h4>{items[0].title}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProduct;
