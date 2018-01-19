import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getAppStatus,
    getBusinessCategories, getBusinessOption, getBusinessOptionFromUrl, setBusinessCategoryId, setCurrentTipCategory,
    setSellGoods, setToolTipContent
} from "../../actions/appStatusAction";
import {map} from "lodash";
import {saveBusinessFormRequest} from "../../actions/businessActions";
import {addFlashMessage} from "../../actions/flashMessageAction";
import * as classnames from "classnames";
import {getAppUrlFromApiUrl} from "../navigation/helperFunctions";

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
        this.props.getBusinessCategories();
        this.displayToolTip(1);
    }

    handleSelect(e, id) {
        e.preventDefault();
        this.props.setBusinessCategoryId(id);
        const appStatus = this.props.appStatus;
        if (this.props.auth.isAuthenticated) {
            this.props.saveBusinessFormRequest({
                    business_option_id: appStatus.currentBusinessOption.id,
                    business_category_id: id
                },
                '/level/1/section/1/business-option/1'
            ).then(
                (response) => {
                    this.setState({isLoading: false});

                    this.props.addFlashMessage({
                        type: "success",
                        text: "Saved successfully!"
                    });
                    this.props.getAppStatus();
                },
                (error) => {
                    this.props.addFlashMessage({
                        type: "error",
                        text: "Failed!"
                    });
                }
            );
        }
    }


    handleToolTip(e, id) {
        e.preventDefault();
        this.displayToolTip(id);
    }

    displayToolTip(id) {
        const { businessCategories } = this.props.appStatus;
        const tipList = map(businessCategories.data, (item, key) => {
            return  (
                <div className="panel panel-default" key={`tip-list-${key}` }>
                    <div className="panel-heading " role="tab" id={`tip-heading-${key}`}>
                        <a href={`#tip-collapse-${key}`} className={ classnames("panel-title", { "collapsed" : item.id == id})} role="button" data-toggle="collapse"
                           data-parent="#accordion" aria-expanded="true" aria-controls={`tip-collapse-${key}`}>
                            <h4>
                                <span className="accordion-titles">{ item.name }</span>
                                <span className="acc-img"></span>
                            </h4>
                        </a>
                    </div>
                    <div id={`tip-collapse-${key}`} className={ classnames("panel-collapse collapse", { "in" : item.id == id})} role="tabpanel"
                         aria-labelledby={`heading${key}`}>
                        <div className="panel-body">
                            { item.tooltip }
                        </div>
                    </div>
                </div>
            )
        });
        this.props.setToolTipContent(tipList);
    }

    onClickNext(e) {
        e.preventDefault();
        const {appStatus, history} = this.props;
        this.props.getBusinessOption(
            '/level/1/section/1/business-option/1/next?business_category_id=' + appStatus.business_category_id,
            true);
        history.push(getAppUrlFromApiUrl(appStatus.currentBusinessOption.links.next));
    }

    render() {
        const { appStatus } = this.props;
        const next = (appStatus.currentBusinessOption.links && appStatus.business_category_id !== null) ? appStatus.currentBusinessOption.links.next : null;
        const businessCategories = map(appStatus.businessCategories.data, (item, key) => {
            const active = appStatus.business_category_id == item.id ? 'active' : '';
            return (
                <li key={item.id} style={{ maxWidth: "150px" }} className={active}>
                    <div onClick={(e) => this.handleSelect(e, item.id)}>
                        <a className="white-icon" href="#">
                            <img src={item.white_icon} alt=""/>
                        </a>
                        <a className="red-icon" href="#">
                            <img src={item.red_icon} alt=""/>
                        </a>
                        <span> <a href="#">{item.name}</a></span>
                    </div>
                    <a onMouseEnter={(e) => this.handleToolTip(e, item.id)}
                        className="apps-question" href="#" onClick={(e) => this.handleToolTip(e, item.id)}>
                        <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                    </a>
                </li>
            )
        });

        return (
            <div>
                <ul className="apps-icons clearfix apps-h-effect">
                    {businessCategories }
                </ul>
                <div className="btn-wrap">
                    {next && <button onClick={(e) => this.onClickNext(e)} className="btn btn-default btn-md">Continue</button>}
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