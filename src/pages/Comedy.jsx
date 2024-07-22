import React from "react";
import Header from "../components/header/Header";
import MovieCard from "../components/movieCard/MovieCard";
import styles from "./Comedy.module.css"; 
import { base_url } from "../constant/constant";
import { callDashGetMethod } from "../services/apiServices";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Comedy = () => {
  const [orgArray, setOrgArray] = useState([]);
  const [tempArray, setTempArray] = useState([])
  const [pageFlag, setPageFlag] = useState(true);
  

  const [pageNum, setPageNum] = useState(1)
  const [totalResult, setTotalResult] = useState(0)

  useEffect(() => {
    if (pageFlag) { 
      handleGetApiData(pageNum);
    }
  }, []);

  const handleGetApiData = async (pageNum) => {
    let url = `${base_url}data/page${pageNum}.json`;
    await callDashGetMethod(url)
      .then((response) => {
        if (response?.status == 200) {
          let resVal = response?.data?.page["content-items"]?.content;
          resVal = resVal?.length > 0 ? resVal : [];
          setOrgArray(orgArray.concat(resVal));
          setTempArray(orgArray.concat(resVal))
          setTotalResult(response?.data?.page["total-content-items"])
          setPageFlag(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchMoreData = async () => {  
      if(totalResult.toString()!==orgArray.length.toString()){
        setPageNum(pageNum+1)
        handleGetApiData(pageNum+1)
    }; 
  };

  const handleOnChange=(searchVal)=>{
    if (searchVal === "") { setTempArray(orgArray); return; }
    const filterBySearch = tempArray.filter((item) => {
        if (item?.name?.toLowerCase()
            .includes(searchVal.toLowerCase())) { return item; }
    })
     setTempArray(filterBySearch);
  }



   

  return (
    <div className="position-relative">
      <Header onchange={(e)=>handleOnChange(e)} />
      <InfiniteScroll
        dataLength={tempArray.length}
        next={fetchMoreData}
        hasMore={tempArray.length !== totalResult}
        loader={ totalResult.toString()!==orgArray.length.toString() ? <h4>Loading...</h4>:""}
      >
        <div className={styles.movieItem}>
          {tempArray.length > 0 &&
            tempArray.map((item, i) => (
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
