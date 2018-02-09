import React, {Component} from 'react';
import * as axios from "axios";
import {formatDate} from "../navigation/helperFunctions";
import {map} from "lodash";

class NewsList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentWillReceiveProps() {
        this.fetchNews(this.props.currentNewsTerm);

    }

    fetchNews(newsTerm) {
       
        const currentNewsTerm = ( newsTerm === undefined) ? 'General' : newsTerm;
        const fetchURL = 'http://staging.mybusinessjourney.com.au/wp-json/mbj-feed/v1/posts?tag='+currentNewsTerm;
        console.log(fetchURL);
        axios({
                method: "GET",
                url: fetchURL,
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }).then(response => {
               
                this.setState({
                    posts:response.data
                });
               
        });

    }

    render() {

        const NewsItem = map(this.state.posts, (post, key) => {
            return(
                <div key={key} className="news-block clearfix">
                    <a target="_blank" href={ post.link }><img src={ post.featured_image_url } alt={ post.title } /></a>
                    <h6><a href="#">{ formatDate(post.date) }</a></h6>
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


export default NewsList;