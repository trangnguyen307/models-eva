import React from 'react';
import {Switch,Route} from 'react-router-dom';
import axios from 'axios';
import './App.css';

import List from './components/List';
import Details from './components/Details';

class App extends React.Component {
  state = {
    listOfPeople: []
  }

  getListOfPeopleFromAPI = () => {
      axios.get('https://api.models.com/prosearch/sitesearch19-json.html?mdcsearch=ce')
          .then(response => {
              this.setState({listOfPeople: response.data.people})
          })
          .catch(error => console.log('err',error))
  }
  componentDidMount () {
      this.getListOfPeopleFromAPI();
  }

  render () {
    return (
      <div className="app container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-3 col-md-5 col-sm-10 col-10">
              <List listOfPeople={this.state.listOfPeople} />
            </div>
            <div className="col-xl-9 col-lg-9 col-md-7 col-sm-10 col-10">
              <Switch>
                <Route exact path='/:i' render = {(props)=> <Details {...props} listOfPeople={this.state.listOfPeople}/>} />
              </Switch>
            </div>
          </div>
       
        
      </div>
    )
  }
}

export default App;
