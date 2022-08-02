import React, { Component } from 'react';
import styled from "styled-components";

class Count extends Component {
    constructor(props) {
        super(props);
        this.Increase = this.Increase.bind(this);
        this.Decrease = this.Decrease.bind(this);
    }

    state = 
        {
            counter : Number(this.props.count)
        }

    Increase = () => {
        this.setState({
            counter : this.state.counter + 1
        })
    }

    Decrease = () => {
        if (this.state.counter > 0) {
            this.setState({
                counter : this.state.counter - 1
            })
        }
    }

    Edit = (e) => {
        const parent = e.target.closest('.list-div');

        if (parent.classList.contains('slide')) {
            parent.classList.remove('slide');
            parent.nextElementSibling.classList.remove('slide');
        } else {
            parent.classList.add('slide');
            parent.nextElementSibling.classList.add('slide');
        }
    }

    handleChange = (e) => {
        this.setState({
            counter : Number(e.target.value)
        })
    }

    render() {
        return (
            <Data>
                <div className="count-wrap">
                    <button type="button" onClick={this.Decrease}>
                        <span className="material-symbols-outlined">do_not_disturb_on</span>
                    </button>
                    <input 
                        placeholder="0"
                        className="ex-count"
                        value={this.state.counter}
                        onChange={this.handleChange}/>
                    <button type="button" onClick={this.Increase}>
                        <span className="material-symbols-outlined">add_circle</span>
                    </button>
                    <button type="button" onClick={this.Edit}>
                        <span className="material-symbols-outlined">edit_square</span>
                    </button>
                </div>
            </Data>
        )
    }
}

const Data=styled.div`
    .count-wrap{
        display: flex;
        gap:5px;
    }

    .count-wrap input{
        width:50px;
        text-align: center;
        padding:10px;
        margin:0;
    }

    .count-wrap button{
        background: none;
        border: none;
        display: flex;
        align-items: center;
    }

    .count-wrap button:last-child{
        margin-bottom:5px;
    }
`

export default Count;