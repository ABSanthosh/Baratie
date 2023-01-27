import "../styles/routes/Home.scss";
import { useRouter } from "next/router";

import useAuth from "../hooks/useAuth";
import Header from "../components/Header/Header";

export async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      props: {
        user: null,
      },
    };
  }

  return {
    props: { user: context.req.session.user },
  };
}

export default function Home({ user }) {
  const router = useRouter();
  const { login } = useAuth();

  // {user !== null && <a href="/app/dashboard">Open App →</a>}

  return (
    <div className="HomeWrapper">
      <Header currentItem="home" user={user} />
      <section className="HomeWrapper__hero"></section>
      <section className="HomeWrapper__promises">
        <div className="HomeWrapper__promises--item">
          <img src="/Img/Icons/quality.png" alt="quality" />
          <p>Best Quality</p>
        </div>
        <div className="HomeWrapper__promises--item">
          <img src="/Img/Icons/money.png" alt="price" />
          <p>Best Price</p>
        </div>
        <div className="HomeWrapper__promises--item">
          <img src="/Img/Icons/openBox.png" alt="shipment" />
          <p>Fast Delivery</p>
        </div>
        <div className="HomeWrapper__promises--item">
          <img src="/Img/Icons/support.png" alt="support" />
          <p>24/7 support</p>
        </div>
      </section>
    </div>
  );
}
