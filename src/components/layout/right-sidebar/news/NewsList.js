import React, {Component} from 'react';
import request from "../../../../services/request";
import {formatDate} from "../../../../utils/helper/helperFunctions";
import {map} from "lodash";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

class NewsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        this.fetchNews(this.props.newsTerm);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.fetchNews(this.props.newsTerm);
        }
    }

    fetchNews(newsTerm) {

        const tag = ( newsTerm) ? newsTerm : 'general';
        const news = this.props.news[tag];
        if (!news) {
            this.props.makeRequest(request.News.byTag, tag).then(responseData => {
                this.props.setNews({
                    tag: tag,
                    news: responseData
                });
            });
        }
    }

    render() {
        const newsTerm = this.props.newsTerm;
        const tag = ( newsTerm) ? newsTerm : 'general';
        const news = this.props.news[tag] ? this.props.news[tag] : this.props.news['general'];
        const NewsItem = map(news, (post, key) => {
            return(
                <div key={key} className="news-block clearfix">
                    <a target="_blank" href={ post.link }><img src={ post.featured_image_url } alt={ post.title } /></a>
                    <h6>{ formatDate(post.date) }</h6>
                    <h5><a target="_blank" href={ post.link }>{ post.title }</a></h5>
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
    news: PropTypes.array.isRequired,
    setNews: PropTypes.func.isRequired,
    newsTerm: PropTypes.string
};

export default withRouter(NewsList);