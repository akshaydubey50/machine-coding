import React, { useState } from "react";

export default function VirtualizedList({ height, width, itemHeight, LIST }) {
  const [indices, setIndices] = useState([0, Math.floor(height / itemHeight)]);
  console.log("indices:::", indices);
  const visibleList = LIST.slice(indices[0], indices[1] + 1);

  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    console.log(scrollTop);
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + Math.floor(height / itemHeight);
    setIndices([newStartIndex,newEndIndex])
  };
  return (
    <>
      <div
        onScroll={handleScroll}
        className="container"
        style={{
          height,
          width,
          backgroundColor: "grey",
          margin: "50px",
          padding: "0px",
          overflow: "auto",
        }}
      >
        <div style={{ height: LIST.length * itemHeight, position:"relative" }}>
          {visibleList?.map((item,index) => (
            <div
              key={item}
              className="item"
              style={{
                height: itemHeight,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "coral",
                boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
                transform: `translateY(${(indices[0] + index) * itemHeight}px)`,
                position: "absolute",
                left: 0,
              }}
            >
              Item {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
