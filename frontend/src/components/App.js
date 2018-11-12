import React from 'react';
import { Grid, Container, Divider } from 'semantic-ui-react';
import Header from './Header';
import Chart from './Chart';
import Footer from './Footer';
import SelectForm from './SelectForm';
import SelectCandidates from './SelectCandidates';
import SelectedList from './SelectedList';

const App = () => (
  <div>
    <Header />    
    <Container>
      <Grid divided>
        <Grid.Row>
          <Grid.Column width={4}>
            <div style={{ height: '90px' }}>
              <SelectForm/>
            </div>
            <Divider />
            <div style={{ height: '260px' }}>
              <SelectCandidates />
            </div>
            <Divider />
            <div>
              <SelectedList />
            </div>
          </Grid.Column>
          <Grid.Column width={12}>
            <Chart />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    <Footer />
  </div>
);

export default App;
