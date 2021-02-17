import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Avatar from '@material-ui/core/Avatar';
import {ProgressBar, Button} from 'react-bootstrap';

import ModalWritingComment from './ModalWritingComment';

const RatingManagement = ({rating_array}) => {
    let average = 0,
    starPercentArr = [0,0,0,0,0]; //[5⭐,4⭐,3⭐,2⭐,⭐]
    
    if (rating_array) {
        average = rating_array.reduce((acc,currentValue) => acc+currentValue,0)/rating_array.length;
       
        // Calculate percentage of each rating
        for(let i=0; i<5; i++) {
            starPercentArr[i] = (rating_array.filter(el => el===5-i).length/rating_array.length)*100;
        }
    }
    

    return (
        <div>
            <Rating value={average} readOnly />
            <p>{rating_array && rating_array.length || 0} Evaluations</p>
            {
                starPercentArr.map((el,i) => (
                    <div key={i}>
                        <span>{5-i} stars</span> 
                        <ProgressBar now={el} />
                    </div>
                ))
            }
        </div>
    )
}

class Details extends React.Component {
    state = {
        comments:{},
        showModal: false
    }

    handleComments = (response,author,rating,comment) => { 
        if (response === "yes") {
            const {i} = this.props.match.params;
            const comments = this.state.comments;
            if (!comments[i]) {
                comments[i] = [{
                    author,
                    rating,
                    comment
                }];
            } else {
                comments[i].push({
                    author,
                    rating,
                    comment
                })
            }
            this.setState({comments: comments,showModal: false}); 
        } else {
            this.setState({showModal: false});
        }
        
    } 

    handleWritingComment = () => {
        this.setState({showModal: true})
    }

    render () {
        const {i} = this.props.match.params;
        const people = this.props.listOfPeople[i];
        
        return (
        <div className="details">
            <ModalWritingComment
                    show={this.state.showModal}  
                    onHide={this.handleComments} 
            />
           
            <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-5">
                    <Avatar alt={people.name} src={`https://i.mdel.net/i/db/${people.image}`}/>
                </div>
                <div className="col-xl-7 col-lg-9 col-md-7">
                    <h1>{people.name}</h1> 
                    <p>{people.type}</p> 
                    
                </div>
            </div>

            <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-5">
                    <RatingManagement rating_array={this.state.comments[i]?.map(el => el.rating)} />
                    <Button onClick= {() => this.handleWritingComment(people.name)}>Write something</Button>
                    
                </div>
            
                {
                    this.state.comments[i] ? 
                    <div className="col-xl-7 col-lg-7 col-md-7 comments">
                        {this.state.comments[i].map(el=> 
                            <div>
                            <p><b>{el.author}</b></p>
                            <Rating value={el.rating} readOnly />
                            <p>{el.comment}</p>
                            </div>)
                        }
                    </div> :
                    <p className="col-xl-7 col-lg-7 col-md-7">No comments</p>
                }
            </div>
        </div>
        )
    }
}

export default Details;