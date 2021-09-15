// using commerceJS for fetchng data from api 
import React from 'react';
import { Grid } from '@material-ui/core';
import ProductProp from './Product/ProductProp';

import useStyles from './styles';

// const productData = [
//   {
//     id: 1,
//     name: 'Shoes',
//     description: 'Running shoes',
//     price: '$5',
//     image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png"
//   },
//   {
//     id: 2,
//     name: 'Macbook',
//     description: 'Apple macbook',
//     price: '$15',
//     image: "https://www.cnet.com/a/img/5x82_qCF8P-g_8YrFXqqwceZ4nU=/1200x675/2021/06/04/6ddde02c-dd34-44c1-b8e4-353514604765/m1-13-inch-macbook-air-shankland.jpg"
//   },
// ];

const Products = ({productData}) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4} >
        {productData.map((item) => (
          <Grid item key={item.id} xs="12" sm={6} md={4} lg={3}>
            <ProductProp product={item} />
          </Grid>
        ))}
      </Grid>
    </main>
  )
}

export default Products



// hard coding the data
// import React from 'react';
// import {Grid} from '@material-ui/core';
// import ProductProp from './Product/ProductProp';

// import useStyles from './styles';

// const productData = [
//   { id: 1, 
//     name: 'Shoes', 
//     description: 'Running shoes', 
//     price: '$5',
//     image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png"
//   },
//   { id: 2, 
//     name: 'Macbook', 
//     description: 'Apple macbook', 
//     price: '$15',
//     image: "https://www.cnet.com/a/img/5x82_qCF8P-g_8YrFXqqwceZ4nU=/1200x675/2021/06/04/6ddde02c-dd34-44c1-b8e4-353514604765/m1-13-inch-macbook-air-shankland.jpg"
//   },
// ];

// const Products = () => {
//   const classes = useStyles();
//   return (
//     <main className={classes.content}>
//       <div className={classes.toolbar} />
//         <Grid container justify="center"spacing={4} >
//           {productData.map((item) => (
//             <Grid item key={item.id} xs="12" sm={6} md={4} lg={3}>
//               <ProductProp product={item} />
//             </Grid>
//           ))}
//         </Grid>
//     </main>
//   )
// }

// export default Products
