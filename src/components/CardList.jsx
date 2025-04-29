// CardList.jsx
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  const limit = 10;

  const [filteredData, setFilteredData] = useState(data);
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(filteredData.slice(0, limit));

  const filterTags = (searchTerm) => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = data.filter((product) =>
      product.tags.some((tag) => tag.toLowerCase().includes(lowerTerm))
    );
    setFilteredData(filtered);
    setOffset(0);
    setProducts(filtered.slice(0, limit));
  };

  const handlePagination = (direction) => {
    const newOffset = offset + direction * limit;
    setOffset(newOffset);
  };

  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  return (
    <div className="cf pa2">
      <div className="mt2 mb2 flex items-center justify-center">
        <Search handleSearch={filterTags} />
      </div>

      <div className="mt2 mb2 flex flex-wrap justify-center">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => handlePagination(-1)}
          disabled={offset === 0}
        />
        <Button
          text="Next"
          handleClick={() => handlePagination(1)}
          disabled={offset + limit >= filteredData.length}
        />
      </div>
    </div>
  );
};

export default CardList;
