import React from 'react';
import './index.css';

function Trading() {
  return (
    <>
      <header>
        {/* Add header content here */}
      </header>

      <article>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="item">
                <div className="itemImg">
                  <img
                    src="https://shopping-phinf.pstatic.net/main_4229259/42292599622.20230906071147.jpg?type=w300"
                    alt="bookImg"
                    className="img-fluid" // Make the image responsive
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="itemInfo">
                <h2>
                  <span className="badge text-bg-dark">For sale</span>
                  <span className="itemTitle">The city and its uncertain walls</span>
                </h2>

                <p>Haruki Murakami full-length novel</p>
                <p>Author: Haruki Murakami</p>
                <p>Publisher: Munhakdongne</p>
                <p>Price: 50,000</p>
                <p>Sales status: On sale</p>
                <p>Published: 2023.09.06</p>
              </div>
            </div>
          </div>

          <div className="detail">
            <div className="detailTitle">
              <h2>Detailed description</h2>
            </div>
            <div className="detailInfo">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa nulla dignissimos libero natus. Modi
              ducimus architecto assumenda accusamus facilis ab provident aut animi consequuntur pariatur? Fugiat maiores
              laborum mollitia ullam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit molestiae amet,
              cupiditate facere excepturi ratione aperiam, qui laboriosam provident quibusdam eum sint? Distinctio temporibus
              quam dolorum. Temporibus consectetur inventore possimus!
            </div>
          </div>

          <div className="bid">
            <h2>Auction Bidding</h2>
            <div className="bidInfo">There are no registered bids.</div>
          </div>

          <div className="bidsection">
            <div className="card-footer">
              <div className="bid">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Enter your bid price" />
                  <button type="button" className="btn btn-success">Bid</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default Trading;
