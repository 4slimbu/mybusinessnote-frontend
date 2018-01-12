import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getAppStatus,
    getBusinessCategories, getBusinessOptionFromUrl, setBusinessCategoryId, setCurrentTipCategory,
    setSellGoods
} from "../../actions/appStatusAction";
import {map} from "lodash";
import {saveBusinessFormRequest} from "../../actions/businessActions";
import {addFlashMessage} from "../../actions/flashMessageAction";

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
                appStatus.currentBusinessOption.links.self
            ).then(
                (response) => {
                    this.setState({isLoading: false});

                    this.props.addFlashMessage({
                        type: "success",
                        text: "Saved successfully!"
                    });
                    this.props.getAppStatus();
                },
            );
        }
    }


    handleToolTip(e, id) {
        e.preventDefault();
        this.props.setCurrentTipCategory(id);
    }

    onClickNext(e) {
        e.preventDefault();
        const appStatus = this.props.appStatus;

        this.props.getAppStatus();
        const query = (appStatus.business_category_id) ? '?business_category_id=' + appStatus.business_category_id : '';
        this.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next, query);
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
                    <a className="apps-question" href="#" onClick={(e) => this.handleToolTip(e, item.id)}>
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
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    saveBusinessFormRequest: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
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
            getBusinessOptionFromUrl,
            saveBusinessFormRequest,
            getAppStatus,
            addFlashMessage
        }
    )(BusinessCategories))