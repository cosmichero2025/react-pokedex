import * as React from 'react';

export function PokeInfo() {
    return (
      <div className="one-half column">
        <h6>Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the suns rays, the seed grows progressively larger.</h6>
        <div className="info-container">
          <div className="row">
            <div className="one-half column">
              <h5>Height</h5>
              <p>2ft</p>
            </div>
            <div className="one-half column">
              <h5>Category</h5>
              <p>Seed</p>
            </div>
          </div>
          <div className="row">
            <div className="one-half column">
              <h5>Weight</h5>
              <p>15.2</p>
            </div>
            <div className="one-half column">
              <h5>Abilites</h5>
              <p>Overgrow</p>
            </div>
          </div>
          <div className="row">
            <div>
              <h5>Gender</h5>
              <p>Male/Female</p>
            </div>
          </div>
        </div>
      </div>
    );
}
