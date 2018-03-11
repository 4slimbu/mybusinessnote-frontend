import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getAppStatus,
    getBusinessCategories, getBusinessOption, getBusinessOptionFromUrl, setBusinessCategoryId, setCurrentTipCategory,
    setSellGoods, setToolTipContent
} from "../../../../actions/appStatusAction";
import {map} from "lodash";
import {saveBusinessFormRequest} from "../../../../actions/businessActions";
import {addFlashMessage} from "../../../../actions/flashMessageAction";
import {
    generateAppRelativeUrl,
    getAppUrlFromApiUrl, getCurrentLevelSections, getNext,
    isItemLoaded
} from "../../../../utils/helper/helperFunctions";
import {Panel, PanelGroup} from "react-bootstrap";
import * as classnames from "classnames";
import {makeRequest} from "../../../../actions/requestAction";
import request from "../../../../services/request";

class BusinessCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedBusinessCategory: null,
            businessCategories: null,
            active: null,
        };
    }

    componentDidMount() {
        this.bootstrap();
        this.displayToolTip();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.appStatus.currentBusinessOption.id !== this.props.appStatus.currentBusinessOption.id) {
            this.bootstrap();
            this.displayToolTip();
        }
    }

    bootstrap() {
        if (! isItemLoaded(this.props.appStatus.businessCategories)) {
            this.props.makeRequest(request.BusinessCategory.all);
        }
    }

    handleSelect(e, id) {
        e.preventDefault();
        if (this.props.auth.isAuthenticated) {
            this.props.makeRequest(request.Business.save, {
                business_option_id: this.props.appStatus.currentBusinessOption.id,
                business_category_id: id
            });
        } else {
            this.props.setBusinessCategoryId(id);
        }
    }


    handleToolTip(e, id) {
        e.preventDefault();
        this.displayToolTip(id);
    }

    displayToolTip(id) {
        const currentObject = this;
        const {businessCategories} = this.props.appStatus;
        const tipList = map(businessCategories.data, (item, key) => {
            const title = (item.id === id) ? <strong>{item.name}</strong> : item.name;
            return (
                <Panel key={item.id} eventKey={item.id}>
                    <Panel.Heading>
                        <Panel.Title toggle>
                            <h4>
                                <span className="accordion-titles">{title}</span>
                                <span className="acc-img"></span>
                            </h4>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <div className="content-wrap" dangerouslySetInnerHTML={{__html: item.tooltip}}/>
                    </Panel.Body>
                </Panel>
            )
        });

        let activeKey = id;
        const handleSelect = function (newKey) {
            currentObject.displayToolTip(newKey);
        };
        const toolTip = {};
        toolTip.rawHtmlContent = this.props.appStatus.currentBusinessOption.tooltip;
        toolTip.accordion = (
            <PanelGroup accordion id={`accordion-uncontrolled-categories-tooltip`} activeKey={activeKey}
                        onSelect={(newKey) => handleSelect(newKey)}>
                {tipList}
            </PanelGroup>
        );
        this.props.setToolTipContent(toolTip);
    }

    onClickNext(e) {
        e.preventDefault();
        const {appStatus, history} = this.props;
        if (appStatus.business.business_category_id === 4) {
            history.push('/level/getting-started/section/about-you/bo/3');
        } else {
            history.push('/level/getting-started/section/business-category/bo/2');
        }
    }

    render() {
        const {appStatus} = this.props;
        const {business} = appStatus;
        const next = business.business_category_id !== null;
        const businessCategories = map(appStatus.businessCategories, (item, key) => {
            const active = business.business_category_id == item.id;
            return (
                <li key={item.id} className={classnames("", {"active": active})}
                    onTouchEnd={(e) => this.handleSelect(e, item.id)} onClick={(e) => this.handleSelect(e, item.id)}>
                    <div className="link-box">
                        <a className="white-icon" href="#">
                            <img src={item.icon} alt=""/>
                        </a>
                        <a className="red-icon" href="#">
                            <img src={item.hover_icon} alt=""/>
                        </a>
                        <span> <a href="#">{item.name}</a></span>
                    </div>
                    <a onTouchEnd={(e) => this.handleToolTip(e, item.id)}
                       onMouseEnter={(e) => this.handleToolTip(e, item.id)}
                       className="apps-question" href="#" onClick={(e) => this.handleToolTip(e, item.id)}>
                        <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                    </a>
                </li>
            )
        });

        return (
            <div>
                <ul className="apps-icons clearfix apps-h-effect">
                    {businessCategories}
                </ul>
                <div className="btn-wrap">
                    {next &&
                    <button onClick={(e) => this.onClickNext(e)} className="btn btn-default btn-md">Continue</button>}
                </div>
            </div>

        )

    }
}

BusinessCategories.propTypes = {
    getBusinessCategories: PropTypes.func.isRequired,
    setBusinessCategoryId: PropTypes.func.isRequired,
    setSellGoods: PropTypes.func.isRequired,
    setCurrentTipCategory: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    getBusinessOption: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    saveBusinessFormRequest: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    setToolTipContent: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer,
        addFlashMessage: state.flashMessageReducer
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        {
            makeRequest,
            getBusinessCategories,
            setBusinessCategoryId,
            setSellGoods,
            setCurrentTipCategory,
            getBusinessOption,
            getBusinessOptionFromUrl,
            saveBusinessFormRequest,
            getAppStatus,
            addFlashMessage,
            setToolTipContent
        }
    )(BusinessCategories))