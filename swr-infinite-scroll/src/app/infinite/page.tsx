"use client";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const infinite = () => {
  const [items, setItems] = useState(Array.from({ length: 100 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= 500) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 100 more records in .5 secs
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 100 })));
    }, 500);
  };

  return (
    <div>
      <h1>demo: react-infinite-scroll-component</h1>
      <hr />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((i, index) => (
          <div style={style} key={index}>
            div - #{index}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default infinite;
