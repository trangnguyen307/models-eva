import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';

class ModalWritingComment extends React.Component {
    state = {
        rating:0,
        comment:'',
        author:''
    }

    handleChangeInput = (event) => {
        const {name, value} = event.target;
        this.setState({[name]:value})
    }
    handleRating = (ratingValue) => { 
        this.setState({rating: ratingValue}); 
    } 
    
    render () {
        console.log(this.state)
            return (
                <Modal
                    {...this.props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    contentClassName="modal"
                    backdrop="static"
                    >
                   
                    <Modal.Body >
                        <label>Note</label>
                        <Rating
                            name="rating"
                            value={this.state.rating}
                            precision={1}
                            onChange={(event,newValue) => this.handleRating(newValue)}
                        />

                        <label>Comment</label>
                        <textarea type="text" name="comment" value={this.state.comment} onChange={e=>this.handleChangeInput(e)}/>

                        <label>Your name</label>
                        <input type="text" name="author" value={this.state.author} onChange={e=>this.handleChangeInput(e)}/>    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={this.state.rating !== 0 && this.state.author ? false : true} className={this.state.rating !== 0 && this.state.author ? "" : "disabled"} 
                                onClick={()=>{
                                    this.props.onHide("yes",this.state.author,this.state.rating,this.state.comment)
                                    this.setState({rating: 0,comment:"",author:""})
                                }}
                        >
                            Send Comment
                        </Button>
                        <Button variant="secondary" onClick={()=>{
                                                this.props.onHide("no",this.state.author,this.state.rating,this.state.comment)
                                                this.setState({rating: 0,comment:"",author:""})
                                            }
                                        }
                        >
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
    }
}

export default ModalWritingComment;