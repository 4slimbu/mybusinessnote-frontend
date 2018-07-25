import React, {Component} from 'react';
import PropTypes from "prop-types";

class ShortCode extends Component {

    render() {
        const {name, attributes} = this.props;
        return (
            <div className="content-wrap">
                <p>name: {name}</p>
                {/*<DynamicElement onClickNext={(e) => onClickNext(e)} onComplete={(bool) => this.props.onComplete(bool)}/>*/}
            </div>
        )
    }
}

ShortCode.propTypes = {
    name: PropTypes.string.isRequired,
    attributes: PropTypes.object.isRequired
};

export default ShortCode;