import React, {useState, useEffect} from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';

import FormInput from './CustomTextField';

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const methods = useForm();

  // to convert it from an object into the array,
  // map over it one more time to turn it into a normal array
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
  // console.log(countries);
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))
  // sO = shippingOoption
  const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))
  // console.log(shippingOptions);

  const fetchShippingCountries = async (checkoutTokenId) => {
    const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
    // console.log(countries);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  }

  const fetchSubdivisions = async (countryCode) => {
    const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  }

  const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region}); 

    setShippingOptions(options);
    setShippingOption(options[0].id);
  }

  // run when you render
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  // dependency array empty
  }, []);
  
  // we connot call right after useEffect fetchShippingCountries() above, becuase at that time we won't have the country
  useEffect(() => {
    // if it exist only then call the fetchSubdivisions()
    if (shippingCountry) fetchSubdivisions(shippingCountry);

    // the dependency is saying, whenever the shippingCountry changes were gonna recall our useEffect
  }, [shippingCountry])

  useEffect(() => {
    if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)

    // this is going to run when the shippingSubdivision changes
  }, [checkoutToken.id, shippingCountry, shippingSubdivision])

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        {/* next({}) = that object is going to have all of the properties from current form spread, spread this data into this object called next({}) */}
        <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
          <Grid container spacing={3}>
            <FormInput
              required
              name="firstName"
              label="First name"
            />
            <FormInput
              required
              name="lastName"
              label="Last name"
            />
            <FormInput
              required
              name="address1"
              label="Address"
            />
            <FormInput
              required
              name="email"
              label="Email"
            />
            <FormInput
              required
              name="city"
              label="City"
            />
            <FormInput
              required
              name="zip"
              label="Zip / Postal code"
            />
            <Grid item xs={12} sm={6} >
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {countries.map(country => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} >
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {subdivisions.map(subdivision => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} >
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {options.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }} >
            <Button component={Link} to="./cart" variant="outlined">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
