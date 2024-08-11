import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    cartItem().then((data) => setCartItems(data));
  }, []);

  const cartItem = async () => {
    try {
      const res = await axios.get("http://localhost:3030/cart/showcartitem");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // remove item from Cart
  const handleRemoveFromCart = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3030/cart/removefromcart/${id}`
      );
      if (res.status === 204) {
        // cartItem();
        window.location ="/cart";
      }
    } catch (e) {
      console.log(e);
    }
  };

  //continue to payment
  const [selectedPayment, setSelectedPayment] = useState("");
  //   const history = useHistory();

  const handlePaymentOptionChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleContinueToPayment = () => {
    switch (selectedPayment) {
      case "credit_card":
        window.location = "/credit-card-payment";
        break;
      case "paypal":
        window.location = "/paypal-payment";
        break;
      case "bank_transfer":
        window.location = "/bank-transfer-payment";
        break;
      case "upi":
        window.location = "/upi-payment";
        break;
      default:
        // Do something if no payment option is selected
        break;
    }
  };

  return (
    <div classNameName="cart">
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
            {" "}
            Cart
          </h2>
          <div className="hidden lg:grid grid-cols-2 py-6">
            <div className="font-normal text-xl leading-8 text-gray-500">
              Courses
            </div>
            <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
              <span className="w-full max-w-[200px] text-center">Price </span>
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div>No Course Found</div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item._id}>
                  {item.courseId && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                      <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                        <div className="img-box">
                          <img
                            src={item.courseId.img}
                            alt="perfume"
                            className="xl:w-[140px]"
                          />
                        </div>
                        <div className="pro-data w-full max-w-sm">
                          <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                            {item.courseId.course_name}
                          </h5>
                          <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                            {item.courseId.course_disc}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                        <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                          {item.courseId.course_price || 0}{" "}
                          {/* Added null check */}
                        </h6>
                        <button
                          className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-red-500 justify-center transition-all duration-500 hover:bg-indigo-300"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          <span className="px-2 font-semibold text-lg leading-8 text-indigo-40">
                            Remove from cart
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                <div className="flex items-center justify-between w-full py-6">
                  <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
                    Total
                  </p>
                  <div className="flex items-center space-x-4">
                    <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
                      Total Price: ${cartItems.reduce(
                        (total, item) =>
                          total + (item.courseId?.course_price || 0),
                        0
                      )}{" "} 
                      {/*Added null check */}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                <h3 className="font-manrope font-bold text-xl mb-4">
                  Payment Options
                </h3>
                <div className="flex flex-col space-y-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="payment"
                      value="credit_card" 
                      onChange={handlePaymentOptionChange}
                    />
                    <span className="ml-2">Credit Card</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="payment"
                      value="paypal"
                      onChange={handlePaymentOptionChange}
                    />
                    <span className="ml-2">PayPal</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="payment"
                      value="bank_transfer"
                      onChange={handlePaymentOptionChange}
                    />
                    <span className="ml-2">Bank Transfer</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="payment"
                      value="upi"
                      onChange={handlePaymentOptionChange}
                    />
                    <span className="ml-2">UPI</span>
                  </label>
                </div>
              </div>
            </>
          )}

          <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
            <button
              onClick={handleContinueToPayment}
              className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
            >
              Continue to Payment
              <svg
                className="ml-2"
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
              >
                <path
                  d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998"
                  stroke="white"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Cart;
