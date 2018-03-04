import React, {Component} from 'react';
import request from "../../../../services/request";
import {formatDate} from "../../../../utils/helper/helperFunctions";
import {map} from "lodash";
import PropTypes from "prop-types";

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

    componentWillReceiveProps() {
        // alert(this.props.newsTerm);
        //if
        //will check if news exist for the given term in newsStore
        //if yes retrieve news and populate the state
        //if no, call api and populate the newsStore
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
        } else {
            this.setState({
                posts: news
            })
        }
    }

    render() {

        const NewsItem = map(this.state.posts, (post, key) => {
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
    news: PropTypes.object.isRequired,
    setNews: PropTypes.func.isRequired,
    newsTerm: PropTypes.string.isRequired
};

export default NewsList;