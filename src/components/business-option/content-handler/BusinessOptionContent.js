import React, {Component} from 'react';
import PropTypes from "prop-types";
import BusinessCategories from "../elements/BusinessCategories";
import SellGoods from "../elements/SellGoods";
import RegisterUser from "../elements/RegisterUser";
import CreateBusiness from "../elements/CreateBusiness";
import RegisterBusiness from "../elements/RegisterBusiness";
import SingleImageField from "../elements/SingleImageField";
import SingleTextField from "../elements/SingleTextField";
import BrandColor from "../elements/BrandColor";
import SocialMediaField from "../elements/SocialMediaField";
import YesAndLinkField from "../elements/YesAndLinkField";
import {map} from "lodash";
import ShortCode from "./ShortCode";
import {isItemLoaded} from "../../../utils/helper/helperFunctions";
import ParentShortCode from "./ParentShortCode";

class BusinessOptionContent extends Component {
    //Register Shortcodes here
    shortcodes = {
        BusinessCategories: BusinessCategories,
        SellGoods: SellGoods,
        RegisterUser: RegisterUser,
        CreateBusiness: CreateBusiness,
        RegisterBusiness: RegisterBusiness,
        form: '',
        file: SingleImageField,
        SingleTextField: SingleTextField,
        BrandColor: BrandColor,
        SocialMediaField: SocialMediaField,
        YesAndLinkField: YesAndLinkField,
    };

    constructor(props) {
        super(props);
    }

    extractAtts(shortCode) {
        let re = /(\s+|\W)|(\w+)/g;
        let repar = /(\[.+?\](?:.+?\[\/.+?\])?)/g
        let match;
        let token;
        let curAttribute = '';
        let quoteChar;
        let mode = 'NOT STARTED';
        let parsedValue = {
            name: '',
            attributes: {}
        };

        while ((match = re.exec(shortCode)) != null) {
            token = match[0];
            switch (mode) {
                case 'NOT STARTED':
                    if (token == '[') {
                        mode = 'GETNAME';
                    }
                    break;
                case 'GETNAME':
                    if (!(/\s/.test(token))) {
                        parsedValue.name += token;
                    } else if (parsedValue.name) {
                        mode = 'PARSING';
                    }
                    break;
                case 'PARSING':
                    // if non text char throw it
                    if (token == "]") { mode = 'COMPLETE'; }
                    else if (token == "=") {
                        if (!curAttribute) throw ('invalid token: "' + token + '" encountered at ' + match.index);
                        else mode = 'GET ATTRIBUTE VALUE';
                    }
                    else if (!/\s/.test(token)) {
                        curAttribute += token;
                    } else if (curAttribute) {
                        mode = 'SET ATTRIBUTE'
                    }
                    break;
                case 'SET ATTRIBUTE':
                    // these are always from match[1]
                    if (/\s/.test(token)) { parsedValue.attributes[curAttribute] = null; }
                    else if (token == '=') { mode = 'GET ATTRIBUTE VALUE'; }
                    else { throw ('invalid token: "' + token + '" encountered at ' + match.index); }
                    break;
                case 'GET ATTRIBUTE VALUE':
                    if (!(/\s/.test(token))) {
                        if (/["']/.test(token)) {
                            quoteChar = token;
                            parsedValue.attributes[curAttribute] = '';
                            mode = 'GET QUOTED ATTRIBUTE VALUE';
                        } else {
                            parsedValue.attributes[curAttribute] = token;
                            curAttribute = '';
                            mode = 'PARSING';
                        }
                    }
                    break;
                case 'GET QUOTED ATTRIBUTE VALUE':
                    if (/\\/.test(token)) { mode = 'ESCAPE VALUE'; }
                    else if (token == quoteChar) {
                        mode = 'PARSING';
                        curAttribute = '';
                    }
                    else { parsedValue.attributes[curAttribute] += token; }
                    break;
                case 'ESCAPE VALUE':
                    if (/\\'"/.test(token)) { parsedValue.attributes[curAttribute] += token; }
                    else { parsedValue.attributes[curAttribute] += '\\' + token; }
                    mode = 'GET QUOTED ATTRIBUTE VALUE';
                    break;

            }
        }
        if (curAttribute && !parsedValue.attributes[curAttribute]) {
            parsedValue.attributes[curAttribute] = '';
        }
        return parsedValue;
    }

    splitContentAndShortCode(rawContent) {
        // Split the content in to normal content and shortcode tags
        const shortCodeRegex = new RegExp('(\\[.+?\\](?:.+?\\[\\/.+?\\])?)', 'gs');
        const splittedContent = rawContent.split(shortCodeRegex);

        // Parse the splitted content for shortcode;
        const parsedContent = [];

        map(splittedContent, (item) => {
            if (! item.match(shortCodeRegex)) {
                parsedContent.push({
                    type: 'content',
                    'content': item
                })
            } else {
                const parentShortCodeRegex = new RegExp('(\\[.+?\\])(.+?)\\[\\/.+?\\]', 'gs');
                let arr;
                if (item.match(parentShortCodeRegex)) {
                    arr = item.split(parentShortCodeRegex);
                    let returnObject = {
                        type: 'parent-shortcode'
                    };
                    if (isItemLoaded(arr[1])) {
                        let shortcodeData = this.extractAtts(arr[1]);
                        returnObject['name'] = shortcodeData['name'];
                        returnObject['attributes'] = shortcodeData['attributes'];
                    }
                    if (isItemLoaded(arr[2])) {
                        returnObject['content'] = arr[2]
                    }

                    parsedContent.push(returnObject);
                } else {
                    let returnObject = {
                        type: 'shortcode'
                    };

                    let shortcodeData = this.extractAtts(item);
                    returnObject['name'] = shortcodeData['name'];
                    returnObject['attributes'] = shortcodeData['attributes'];

                    parsedContent.push(returnObject);
                }
            }
        });

        return parsedContent;
    }

    parseShortCode(rawContent) {
        if (typeof rawContent !== 'string') {
            return;
        }

        let splittedContent = this.splitContentAndShortCode(rawContent);

        const output = [];
        map(splittedContent, (item, itemKey) => {
            switch(item.type) {
                // If parent-shortcode
                case 'parent-shortcode':
                    // Split the content of parent-shortcode in a array of content and shortcode
                    let splittedChildContent = this.splitContentAndShortCode(item.content);
                    let parsedContent = [];

                    // For each item in the splitted content array, parse for shortcode if exist
                    map(splittedChildContent, (childItem) => {
                        parsedContent.push(this.parseShortCode(childItem));
                    });

                    //Wrap the content in parent shortcode element
                    let parsedParentShortCode = (
                        <ParentShortCode key={itemKey} name={item.name} attributes={item.attributes}>
                            { parsedContent }
                        </ParentShortCode>
                    );

                    output.push(parsedParentShortCode);
                    break;
                case 'shortcode':
                    let shortcode = <ShortCode key={itemKey} name={item.name} attributes={item.attributes} />;

                    output.push(shortcode);
                    break;
                default:
                    output.push(<div key={itemKey} dangerouslySetInnerHTML={{__html: item.content}}/>);
            }
        });

        return output;
    }

    render() {
        const {content, onClickNext} = this.props;
        const DynamicElement = this.shortcodes[content];

        return (
            <div className="content-wrap">
                { content && this.parseShortCode(content) }
                {/*<DynamicElement onClickNext={(e) => onClickNext(e)} onComplete={(bool) => this.props.onComplete(bool)}/>*/}
            </div>
        )
    }
}

BusinessOptionContent.propTypes = {
    content: PropTypes.string.isRequired,
    onClickNext: PropTypes.func
};

export default BusinessOptionContent;