import React from 'react';
import {Link} from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';

class List extends React.Component {
  render () {
    return (
      <div className="list"> 
        <h1>List of people</h1>
        {
          this.props.listOfPeople?.map((el,i) => <div key={i}>
                                                    <Avatar src={`https://i.mdel.net/i/db/${el.image}`} alt={el.name} />
                                                    <div className="category">
                                                      <Link to={`/${i}/${el.name}`}>{el.name}</Link>
                                                      <p>{el.type}</p>
                                                    </div>
                                                  </div>
                                      )
        }   
      </div>
    )
  }
}

export default List;