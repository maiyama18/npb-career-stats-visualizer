import React from 'react';
import { Grid } from 'semantic-ui-react';
import Header from './Header';
import Select from './Select';
import Chart from './Chart';
import Footer from './Footer';

const App = () => (
  <div>
    <Header />    
    <Grid divided stackable>
      <Grid.Row>
        <Grid.Column width={4}>
          <Select />
        </Grid.Column>
        <Grid.Column width={12}>
          <Chart />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Footer />
  </div>
);

export default App;
