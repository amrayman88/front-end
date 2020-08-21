import React, { Component } from 'react';
import './Table.css';
import axios from 'axios';

class Table extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            departments: [],
            items: [],
            displayID: false,
            header: "this is the departments table\nplease click on a department",
            depId: 0
        }
        this.getDep()
    }

    getDep() {
        fetch("https://localhost:44397/api/home")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result[0])
                    this.setState({
                        departments: result
                    });
                },
                (error) => {
                    console.log('error')
                }
            )
    }

    depClick(id, name) {
        fetch("https://localhost:44397/api/values/" + id)
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState({
                        depId: id,
                        items: result,
                        displayID: true,
                        header: ("These are the items in " + name + " department, click to delete an item")
                    });
                    console.log(this.state.header)
                },
                (error) => {
                    console.log('error')
                }
            )
    }

    deleteClick(delId) {
        console.log("3aaaaaa")
        axios.delete("https://localhost:44397/api/values/" + delId).then(res => {
            console.log(res); 
            this.depClick(1, "dep1");
        }
        )

    }

    renderTableData() {

        if (!this.state.displayID) {
            return this.state.departments.map((department, index) => {
                const { id, name } = department //destructuring
                return (
                    <tr className='students' key={id}>
                        <td className='students' >{id}</td>
                        <button className='button' onClick={() => this.depClick(id, name)}>{name}</button>
                    </tr>
                )
            })
        }
        else {
            return this.state.items.map((item, index) => {
                const { id, name, price } = item //destructuring
                return (
                    <tr className='students' key={id}>
                        <td className='students' >{id}</td>
                        <td className='students' >{name}</td>
                        <td className='students' >{price}</td>
                        <button className='button' onClick={() => this.deleteClick(id)} >Delete</button>
                    </tr>
                )
            })
        }
    }

    renderTableHeader() {
        if (!this.state.displayID) {
            if (this.state.departments.length === 0)
                return;
            console.log(this.state.departments)
            let header = Object.keys(this.state.departments[0])

            return header.map((key, index) => {
                if (index > 1) return null;
                return <th className='students' key={index}>{key.toUpperCase()}</th>
            })
        }
        else {
            let header = Object.keys(this.state.items[0])
            return header.map((key, index) => {
                if (index > 3) return null;
                if (index == 3)
                    return <th className='students' key={index}>{"Delete"}</th>
                return <th className='students' key={index}>{key.toUpperCase()}</th>
            })
        }
    }

    render() {
        return (
            <div>
                <h1 className='title'>{this.state.header}</h1>
                <table className='students'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table;