import React, { useState } from "react";

import "./shop-collections.styles.scss";

import SearchBox from "../search-box/search-box.component";
import CollectionItem from "../collection-item/collection-item.component";
import Spinner from "../spinner/spinner.component";

const ShopPageCollections = ({ collections }) => {
  const [searchInput, setSearchInput] = useState("");

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="shop-collections">
      <div className="shop-collections__header-bar">
        <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} />
        <span className="shop-collections__header-bar__sell">
          Want To Sell?
        </span>
      </div>
      <div className="shop-collections__body">
        {filteredCollections.length ? (
          filteredCollections.map((collection) => (
            <CollectionItem key={collection.id} collection={collection} />
          ))
        ) : (
          <h1
            style={{
              color: "#f64352",
              fontSize: 20,
            }}
          >
            <Spinner />
            No items :{"("} try checking your connection or modifying your
            result
          </h1>
        )}
      </div>
    </div>
  );
};

export default ShopPageCollections;
