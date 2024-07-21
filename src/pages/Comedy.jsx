import React from "react";
import Header from "../components/header/Header";
import MovieCard from "../components/movieCard/MovieCard";
import styles from "./Comedy.module.css";

import img01 from "../assets/imgs/img01.jpg";
import img02 from "../assets/imgs/img02.jpg";
import img03 from "../assets/imgs/img03.jpg";
import img04 from "../assets/imgs/img04.jpg";
import { apiEndPoint, base_url } from "../constant/constant";
import { callDashGetMethod } from "../services/apiServices";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Comedy = () => {
  const [orgArray, setOrgArray] = useState([]);
  const [pageFlag, setPageFlag] = useState(true);
  

  const [pageNum, setPageNum] = useState(1)
  const [totalResult, setTotalResult] = useState(0)

  useEffect(() => {
    if (pageFlag) { 
      handleGetApiData();
    }
  }, []);

  const handleGetApiData = async () => {
    let url = `${base_url}data/page${pageNum}.json`;
    await callDashGetMethod(url)
      .then((response) => {
        if (response?.status == 200) {
          let resVal = response?.data?.page["content-items"]?.content;
          resVal = resVal?.length > 0 ? resVal : [];
          setOrgArray(orgArray.concat(resVal));
           setTotalResult(response?.data?.page["total-content-items"])
          setPageFlag(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchMoreData = async () => { 
    console.log(totalResult,orgArray.length)
     if(totalResult!==orgArray.length){
        setPageNum(pageNum+1)
        handleGetApiData()
    }; 
  };

  return (
    <div className="position-relative">
      <Header />
      <InfiniteScroll
        dataLength={orgArray.length}
        next={fetchMoreData}
        hasMore={orgArray.length !== totalResult}
        loader={<h4>Loading...</h4>}
      >
        <div className={styles.movieItem}>
          {orgArray.length > 0 &&
            orgArray.map((item, i) => (
              <MovieCard
                cardClass={styles.cardItem}
                key={i}
                preview={`${base_url}images/${item["poster-image"]}`}
                title={item?.name}
              />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Comedy;
