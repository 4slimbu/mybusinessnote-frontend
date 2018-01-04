import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import * as axios from "axios";
import {apiBaseUrl} from "../config";

export default class RegisterBusiness extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isComplete: false,
            abn: "",
            acn: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        this.updateFormBusinessData();
    }

    async componentWillReceiveProps(){
        this.updateFormBusinessData();
    }

    updateFormBusinessData() {
        this.setState({
            abn: (this.props.business) ? this.props.business.abn : '',
        })
    }

    updateBusiness(response) {
        this.props.onChangeBusiness(response.data);
    }

    handleSubmit = async event => {
        event.preventDefault();
        try {
            var self = this;
            axios({
                method: 'PUT',
                url: apiBaseUrl + '/businesses/' + this.props.business.id,
                data: {
                    "abn": this.state.abn
                },
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(function (response) {
                    self.updateBusiness(response);
                    self.setState({
                        isComplete: true
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });

        } catch (e) {
            alert(e);
        }

    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        const next = (this.props.links) ? this.props.links.next : null;
        const business = this.props.business;
        return (
            business ?
            <div>
                { this.state.isComplete &&
                <Redirect to={next} />
                }
                <form className="apps-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Enter your Australian Business Number (ABN)</label>
                        <input type="text" className="form-control" id="abn" placeholder="eg. 3522 2525 2524"
                            autoFocus
                               value={this.state.abn}
                               onChange={this.handleChange}
                        />
                    </div>
                    <span className="find-web-span">Don’t have a ABN?</span><a href={ this.props.currentBusinessOption.data.affiliate_links[0].link } target="new" className="btn btn-lg btn-default clearfix btn-level-5">Register for an ABN</a>
                    <div className="btn-wrap">
                        <button type="submit" className="btn btn-default btn-md">Done</button>
                    </div>
                </form>
            </div>
                :
                <Redirect to='/levels/1/sections/3/business-options/4'/>

        )
    }
}