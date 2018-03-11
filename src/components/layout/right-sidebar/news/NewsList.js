import React, {Component} from 'react';
import request from "../../../../services/request";
import {extractSectionFromLocation, formatDate, isItemLoaded} from "../../../../utils/helper/helperFunctions";
import {map} from "lodash";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

class NewsList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.bootstrap();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.bootstrap();
        }
    }

    bootstrap() {
        const {makeRequest, news, setNews} = this.props;
        const {pathname} = this.props.location;
        const sectionSlug = extractSectionFromLocation(pathname);
        const tag = (sectionSlug) ? sectionSlug : 'general';
        if (!news[tag]) {
            makeRequest(request.News.byTag, tag).then(responseData => {
                setNews({
                    tag: tag,
                    news: responseData
                });
            });
        }
    }

    render() {
        const {pathname} = this.props.location;
        const sectionSlug = extractSectionFromLocation(pathname);
        const tag = (sectionSlug) ? sectionSlug : 'general';
        const NewsItem = map(this.props.news[tag], (item, key) => {
            return(
                <div key={key} className="news-block clearfix">
                    <a target="_blank" href={ item.link }><img src={ item.featured_image_url } alt={ item.title } /></a>
                    <h6>{ formatDate(item.date) }</h6>
                    <h5><a target="_blank" href={ item.link }>{ item.title }</a></h5>
                </div>
            )
        });

        return(
            <div className="news-item"> 
                {NewsItem}
            </div>
        );

    }

}

NewsList.propTypes = {
    makeRequest: PropTypes.func.isRequired,
    news: PropTypes.object.isRequired,
    setNews: PropTypes.func.isRequired
};

export default withRouter(NewsList);