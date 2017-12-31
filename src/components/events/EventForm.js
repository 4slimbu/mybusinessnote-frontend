import React, {Component} from "react";
import TextFieldGroup from "../common/TextFieldGroup";

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
    }

    render() {
        const { title, errors, isLoading } = this.state;

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Add New Event</h1>

                    <TextFieldGroup
                        error={errors.title}
                        label="Title"
                        onChange={this.onChange}
                        value={this.state.title}
                        type="text"
                        field="title"
                    />

                </form>
            </div>
        );
    }
}

export default EventForm;