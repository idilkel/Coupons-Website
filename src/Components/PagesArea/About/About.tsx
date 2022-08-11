import "./About.css";

function About(): JSX.Element {
  return (
    <div className="About">
      <h1>About</h1>
      <p>
        You reached the best coupon system website ever. You can find coupons
        from five different categories: Restaurants 🍔 , Travel ✈️ ,
        Entertainment 🥳 , Fashion 👗 and Electronics 💻 .
      </p>
      <p>
        Companies, selling coupons and customers buying coupons are welcome to
        subscribe by sending us an{" "}
        <a href="mailto:idilkasuto@gmail.com">email</a> to and start enjoying
        the website. Our administrator will add you to our database. Only the
        administrator can add, update and delete companies and customers.
      </p>
      <p>
        In order to use the website you must login as the customer or company or
        administrator. Your login is valid for 30 minutes. Companies can add,
        update or delete a coupon. Customers can purchase a coupon.
      </p>
      <p>The coupons can be sorted by categories or maximum price.</p>
      <p>Enjoy our website!</p>
    </div>
  );
}

export default About;
