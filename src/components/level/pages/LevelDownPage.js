import React from "react";
import PropTypes from "prop-types";
import {ROUTES} from "../../../constants/routes";
import {Link} from "react-router-dom";

const LevelDownPage = (props) => {
    const {
        currentLevel
    } = props;
    return (
        <div className="level-complete">
            <h5 className="obvious-h5 hidden-xs">{currentLevel.name}</h5>
            <div className="content-wrap" dangerouslySetInnerHTML={{__html: currentLevel.down_message}}/>
            <div className="btn-wrap">
                <Link to={ROUTES.HOME} className="btn btn-default btn-md">Back to Home</Link>
                <br/><br/>
            </div>
        </div>
    );
};

LevelDownPage.propTypes = {
    currentLevel: PropTypes.object.isRequired,
    nextLevel: PropTypes.object.isRequired,
};

export default LevelDownPage;