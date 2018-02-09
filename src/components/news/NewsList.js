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
                    <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/news_events/img_1.jpg`} alt=""/></a>
                    <h6><a href="#">{ formatDate(post.date) }</a></h6>
                    <h5><a target="_blank" href={ post.link }>{ post.title.rendered }</a></h5>
                    <ul>
                        <li><a href=""><i className="fa fa-share-alt" aria-hidden="true"></i></a></li>
                        <li><a href=""><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                        <li><a href=""><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                        <li><a href=""><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                    </ul>
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