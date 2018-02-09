import React, {Component} from 'react';
import * as axios from "axios";
import {formatDate} from "../navigation/helperFunctions";

class NewsList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    fetchNews(newsTerm) {
       
        const currentNewsTerm = ( newsTerm === undefined) ? 'General' : newsTerm;
        const fetchURL = 'http://staging.mybusinessjourney.com.au/wp-json/wp/v2/posts?filter[tag]='+currentNewsTerm;
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


    componentWillReceiveProps() {

        this.fetchNews(this.props.currentNewsTerm);

    }


    render() {

        const NewsItem = this.state.posts.map((post, index) => {
            return(
                <div key={index} className="news-block clearfix">
                    <a target="_blank" href={ post.link }><img src={ post.featured_image_url } alt={ post.title.rendered } /></a>
                    <h6><a href="#">{ formatDate(post.date) }</a></h6>
                    <h5><a target="_blank" href={ post.link }>{ post.title.rendered }</a></h5>
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