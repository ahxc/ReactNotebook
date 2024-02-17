import React, { Component } from "react"
import { NavLink } from "react-router-dom"

// 对NavLink的封装
export default class MyNavLink extends Component {
    render() {
        const { to, title } = this.props
        return (
            <NavLink
                activeClassName="active"
                className="list-group-item"
                to={to}
            >
                {title}
            </NavLink>
        )
    }
}
