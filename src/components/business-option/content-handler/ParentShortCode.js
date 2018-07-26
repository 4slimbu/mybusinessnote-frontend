import React, {Component} from 'react';
import PropTypes from "prop-types";

class ParentShortCode extends Component {

    render() {
        const {name, attributes} = this.props;
        return (
            <div>
                <p>name: {name}</p>
                { this.props.children }
                <p>name: {name}</p>
                {/*<DynamicElement onClickNext={(e) => onClickNext(e)} onComplete={(bool) => this.props.onComplete(bool)}/>*/}
            </div>
        )
    }
}

ParentShortCode.propTypes = {
    name: PropTypes.string.isRequired,
    attributes: PropTypes.object.isRequired
};

export default ParentShortCode;