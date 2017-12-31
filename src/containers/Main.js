import React, {Component} from "react";
import {connect} from "react-redux";
import {setName} from "../actions/userAction";

class Main extends Component {
    render() {
        return (
            <div>
                Enter Username <br />
                <input onChange={(e)=> this.props.setName(e.target.value)} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch(setName(name))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Main)