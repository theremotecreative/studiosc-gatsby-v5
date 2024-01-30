import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

const HeaderMenu = () => {

    return(
        <MainNav>
            <ul class="main-menu">
                <li><Link to={"/projects/"}>Projects</Link></li>
                <li><Link to={"/studio/"}>Studio</Link></li>
                <li><Link to={"/press/"}>Press</Link></li>
            </ul>
        </MainNav>
    )

}

const MainNav = styled.nav`
    opacity: 1;
    visibility: visible;
    transition-duration: .3s;
    ul.main-menu {
        list-style: none;
        display: flex;
        margin-bottom: 0;
        margin-top: 0px;
        > li {
            color: #000;
            font-family: 'Carlito', sans-serif;
            font-weight: 400;
            font-size: 24px;
            line-height: 1;
            padding-right: 35px;
            margin-bottom: 0;
            position: relative;
            overflow: hidden;
            &:last-child {
                padding-right: 0;
            }
            a {
                color: #000;
                font-family: 'Carlito', sans-serif;
                font-style: normal;
                text-decoration: none;
            }
            > ul.submenu {
                position: absolute;
                left: 0;
                visibility: hidden;
                opacity: 0;
                z-index: 3;
                transition: opacity .2s ease-in;
                width: 240px;
                margin: 0;
                background-color: #f2efef;
                font-family: 'Carlito', sans-serif;
                font-weight: 500;
                letter-spacing: 0px;
                font-style: normal;
                line-height: 34px;
                list-style: none;
                border-top: 3px solid #25afb4;
                box-shadow: 1px 1px 30px rgb(0 0 0 / 6%);
                li {
                    margin-bottom: 0;
                    a {
                        display: block;
                        width: 100%;
                        font-family: 'Carlito', sans-serif;
                        font-weight: 500;
                        padding: 7px 20px;
                        border-bottom-color: #dcdadb;
                        color: #333333;
                        background-color: #f2efef;
                        font-size: 14px;
                        line-height: 34px;
                        text-transform: uppercase;
                        transition-duration: .3s;
                        &:hover {
                            background-color: #f8f8f8;
                        }
                    }
                }
            }
            &: hover {
                overflow: visible;
                cursor: pointer;
                > ul.submenu {
                    opacity: 1;
                    visibility: visible;
                }
            }
        }
    }
    @media(max-width: 767px) {
        display: none;
        opacity: 0;
        visibility: hidden;
    }
`

export default HeaderMenu