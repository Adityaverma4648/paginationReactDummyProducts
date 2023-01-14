import "./styles.css";
import { useState, useEffect } from "react";

function App() {
  async function fetchProduct() {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }

    console.log(data);
  }

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const pageIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [liked, setLiked] = useState(false);

  const ChngLikeState = (e) => {
    if (!liked) {
      setLiked(true);
      e.target.classList.add("btnRed");
    } else {
      setLiked(false);
      e.target.classList.remove("btnRed");
    }
  };

  const pageHandler = (mypageIndex) => {
    setPage(mypageIndex);
  };
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    if (page > 1) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((ar) => {
            return (
              <span key={ar.id} id={ar.id}>
                <div className="prodBtnCont">
                  <i className="fa fa-heart" onClick={ChngLikeState} />
                  <i class="fas fa-shopping-cart"></i>
                </div>
                <img src={ar.images[0]} alt={ar.title}></img>
                <strong>{ar.title}</strong>
              </span>
            );
          })}
        </div>
      )}
      <div className="Pagination">
        <span className={page === 1 ? "navBtnHid" : "navBtn"}>
          <button type="button" onClick={() => previousPage()}>
            Previous
          </button>
        </span>
        <span>
          {pageIndex.map((ar) => {
            return (
              <span
                className="pageIndexes"
                key={ar}
                id={ar}
                onClick={() => pageHandler(ar)}>
                {ar}
              </span>
            );
          })}
        </span>
        <span className={page === 10 ? "navBtnHid" : "navBtn"}>
          <button type="button" onClick={() => nextPage()}>
            Next
          </button>
        </span>
      </div>
    </div>
  );
}

export default App;
