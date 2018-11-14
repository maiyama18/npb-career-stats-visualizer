import React from 'react';
import { Grid, Container, Divider } from 'semantic-ui-react';
import Header from './Header';
import Graph from './Graph';
import GraphSelects from './GraphSelects';
import Footer from './Footer';
import SelectForm from './SelectForm';
import SelectCandidates from './SelectCandidates';
import SelectedList from './SelectedList';

const App = () => (
  <div>
    <div style={{ marginBottom: '14px' }}>
      <Header />    
    </div>
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
            <div style={{ height: '40px' }}>
              <GraphSelects />
            </div>
            <div style={{ height: '500px' }}>
              <Graph />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    <Footer />
  </div>
);

export default App;
