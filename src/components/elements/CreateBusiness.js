import React, {Component} from 'react';

export default class CreateBusiness extends Component {
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         isComplete: false,
    //         businessName: "",
    //         website: "",
    //         isBusinessNameValid: true,
    //         isWebsiteValid: true,
    //         errors: {
    //             businessName: '',
    //             website: ''
    //         }
    //     };
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }
    //
    // async componentDidMount(){
    //     this.updateFormBusinessData();
    // }
    //
    // async componentWillReceiveProps(){
    //     this.updateFormBusinessData();
    // }
    //
    // updateFormBusinessData() {
    //     this.setState({
    //         businessName: (this.props.business) ? this.props.business.business_name : '',
    //         website: (this.props.business) ? this.props.business.website : '',
    //     })
    // }
    //
    // updateBusiness(response) {
    //     this.props.onChangeBusiness(response.data);
    // }
    //
    // validateForm() {
    //     this.setState({
    //         isBusinessNameValid: (this.validateBusinessName(this.state.businessName)) ? true : false,
    //         isWebsiteValid: (this.validateWebsite(this.state.website)) ? true : false,
    //     });
    //
    //     return this.state.isBusinessNameValid &&
    //         this.state.isWebsiteValid
    // }
    //
    // validateBusinessName(businessName) {
    //     if (!businessName) {
    //         this.setState(prevState => ({
    //             errors: {
    //                 ...prevState.errors,
    //                 businessName: 'Business Name is required'
    //             }
    //         }));
    //         return false;
    //     }
    //
    //     this.setState(prevState => ({
    //         errors: {
    //             ...prevState.errors,
    //             businessName: ''
    //         }
    //     }));
    //
    //     return true;
    // }
    //
    // validateWebsite(website) {
    //     if (!website) {
    //         this.setState(prevState => ({
    //             errors: {
    //                 ...prevState.errors,
    //                 website: 'Website is required'
    //             }
    //         }));
    //         return false;
    //     }
    //
    //     this.setState(prevState => ({
    //         errors: {
    //             ...prevState.errors,
    //             website: ''
    //         }
    //     }));
    //
    //     return true;
    // }
    //
    // handleSubmit = async event => {
    //     event.preventDefault();
    //     if (! this.validateForm()) {
    //         return;
    //     }
    //     try {
    //         let self = this;
    //         let method = (this.props.business)? ((this.props.business.id) ? 'PUT' : 'POST') : 'POST';
    //         let url = (this.props.business)? ((this.props.business.id)? '/businesses/' + this.props.business.id : '/businesses' ) : '/businesses';
    //         let data;
    //         if ((this.props.business)? ((this.props.business.id) ? true : false) : false) {
    //             data = {
    //                 "business_name": this.state.businessName,
    //                 "website": this.state.website,
    //             }
    //         } else {
    //             data = {
    //                 "business_name": this.state.businessName,
    //                 "website": this.state.website,
    //                 "user_id": this.props.authUser.id,
    //                 "business_category_id": this.props.businessCategory
    //             }
    //         }
    //         axios({
    //             method: method,
    //             url: apiBaseUrl + url,
    //             data: data,
    //             crossDomain: true,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         })
    //             .then(function (response) {
    //                 self.updateBusiness(response);
    //                 self.setState({
    //                     isComplete: true,
    //                 })
    //
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //
    //     } catch (e) {
    //         alert(e);
    //     }
    //
    // }
    //
    // handleChange = event => {
    //     this.setState({
    //         [event.target.id]: event.target.value
    //     });
    // }
    // render() {
    //     const next = (this.props.links) ? this.props.links.next : null;
    //     const authUser = this.props.authUser;
    //     return (
    //         authUser ?
    //         <div>
    //             { this.state.isComplete &&
    //             <Redirect to={next} />
    //             }
    //             <form className="apps-form" onSubmit={this.handleSubmit}>
    //                 <div className="form-group">
    //                     <label>Your Business Name<span>*</span></label>
    //                     <input type="text" className={`${(!this.state.isBusinessNameValid) ? 'form-error' : ''} form-control`} id="businessName" placeholder="eg. John’s Bakery LTD PTD"
    //                            autoFocus
    //                            value={this.state.businessName}
    //                            onChange={this.handleChange}
    //                     />
    //                     <small className="form-error-message">{this.state.errors.businessName}</small>
    //                 </div>
    //                 <div className="form-group">
    //                     <label>Your Business Web Address<span>*</span></label>
    //                     <input type="text" className={`${(!this.state.isWebsiteValid) ? 'form-error' : ''} form-control`} id="website" placeholder="eg. http://www.johnsbakery.com.au"
    //                            autoFocus
    //                            value={this.state.website}
    //                            onChange={this.handleChange}
    //                     />
    //                     <small className="form-error-message">{this.state.errors.website}</small>
    //                 </div>
    //                 <span className="find-web-span">Don’t have a web address?</span><a href={ this.props.currentBusinessOption.data.affiliate_links[0].link } target="new" className="btn btn-lg btn-default clearfix btn-level-5">Find me a web address</a>
    //                 <div className="btn-wrap">
    //                     <button type="submit" className="btn btn-default btn-md">Continue</button>
    //                 </div>
    //             </form>
    //
    //         </div>
    //             :
    //             <Redirect to='/levels/1/sections/2/business-options/3'/>
    //     )
    // }

    render() {
        return (
            <div>inside create business</div>
        )
    }
}