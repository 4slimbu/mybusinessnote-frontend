import React from "react";
import PropTypes from "prop-types";

const ToolTip = (toolTip) => {
    return (
        <div>
            <h5>Hints and tips</h5>
            {toolTip.rawHtmlContent &&
            <div className="content-wrap" dangerouslySetInnerHTML={{__html: toolTip.rawHtmlContent}}/>}
            <div className="acc-wrapper">
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    {toolTip.accordion}
                </div>
            </div>
        </div>
    )
};

ToolTip.propTypes = {
    toolTip: PropTypes.object,
};

export default ToolTip;