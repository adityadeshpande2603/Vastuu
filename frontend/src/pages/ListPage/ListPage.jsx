import { Await, useLoaderData } from "react-router-dom";
import Card from "../../components/CardComponent/Card";
import ListPageSearchBar from "../../components/listPageSearchBar/listPageSearchBar";
import Map from "../../components/Map/Map";
import { listData } from "../../lib/listData";
import React from "react";
const ListPage = () => {
  const data = useLoaderData();

  return (
    <div className="listPage flex">
      <React.Suspense
        fallback={<p>Loading ...</p>}
      >

        <Await
          resolve={data.responsePromise}
          errorElement={
            <p>Error loading package location!</p>
          }
        >
          {(responsePromise) => (

            <div className="container flex">
              {/* {
              {/* Left Section */}
              <div className="left flex-[3] p-4">
                <div className="top mb-4 w-full">
                  <ListPageSearchBar />
                </div>
                <div className="cardContainer">
                  <Card data={responsePromise.data} />
                </div>
              </div>

              {/* Right Section */}
              <div className="right flex-[2] p-4">
                <Map listData={responsePromise.data}></Map>
              </div>
            </div>
          )}
        </Await>
      </React.Suspense>


    </div >
  );
};

export default ListPage;