import React from 'react';
const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
class TodoHeader extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    getRandmoId() {
        //this is just for testing purposes
        //afterthat we'll get the Id from the DB..
        const id = Math.random().toString();
        return id.slice(2, 5);
    }
    handleAddTodo(e) {
        const txt = this.textInput.current;
        const inputValue = txt.value;
        if (inputValue) {
            const todo = { title: inputValue, checked: false, id: this.getRandmoId() }
            this.props.onTodoAdd(todo);
            txt.value = "";
            this.generateResponse(inputValue);
        }
    }
    async generateResponse(prompt) {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                'prompt': prompt,
                'max_tokens': 150,
                'n': 1,
                'stop': '\n',
            }),
        });
        const responseJson = await response.json();
        console.log("responseJson --->", responseJson)
        const { choices } = (responseJson && responseJson.choices && responseJson.choices[0]) || {};
        const answer = choices && choices[0] && choices[0].text;
        return answer;
    }

    render() {
        return (
            <div id="myDIV" className="header">
                <h2>My To Do List</h2>
                <input ref={this.textInput} type="text" id="myInput" placeholder="Title..." />
                <span onClick={this.handleAddTodo.bind(this)} className="addBtn">
                    Add
                </span>
            </div>
        );
    }
}

export default TodoHeader;
