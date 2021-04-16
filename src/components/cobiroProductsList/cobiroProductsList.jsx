import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Title from '../Title/Title';

const axios = require('axios');

const CobiroProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://gateway.staging-cobiro.com/v1/pim/${process.env.GATSBY_SITE_ID}/webshop/products`
      )
      .then((res) => {
        const items = res.data.data.map((item) => item.attributes);

        setProducts(items);
      });
  }, []);

  return (
    <section id="products" style={{ marginBottom: '100px' }}>
      <Container>
        <Title title="Products" />
        <div className="row mb-1">
          {products.map((item) => (
            <div className="col-3 pb-4" key={item.id}>
              <div className="card shadow-sm h-100">
                <img
                  className="card-img-top img-game-cover"
                  src={item.mainImageUrl}
                  alt={item.name}
                />
                <div className="card-body d-flex justify-content-between flex-column">
                  <p className="card-text mb-5">{item.name}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <a href="/" title="Add to cart" className="cta-btn cta-btn--hero">
                      Add to cart
                    </a>
                    <strong>{item.price.formatted}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CobiroProductsList;
