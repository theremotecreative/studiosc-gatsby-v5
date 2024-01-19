import React, { Component } from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

class MobileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            aboutOpen: false,
            conditionsOpen: false,
            resourcesOpen: false,
            servicesOpen: false
        };
    }
    
    toggleAboutMenu() {
        this.setState({ aboutOpen: !this.state.aboutOpen });
        this.setState({ conditionsOpen: false });
        this.setState({ resourcesOpen: false });
        this.setState({ servicesOpen: false });
    }

    toggleConditionsMenu() {
        this.setState({ aboutOpen: false });
        this.setState({ conditionsOpen: !this.state.conditionsOpen });
        this.setState({ resourcesOpen: false });
        this.setState({ servicesOpen: false });
    }

    toggleResourcesMenu() {
        this.setState({ aboutOpen: false });
        this.setState({ conditionsOpen: false });
        this.setState({ resourcesOpen: !this.state.resourcesOpen });
        this.setState({ servicesOpen: false });
    }

    toggleServicesMenu() {
        this.setState({ aboutOpen: false });
        this.setState({ conditionsOpen: false });
        this.setState({ resourcesOpen: false });
        this.setState({ servicesOpen: !this.state.servicesOpen });
    }

    render() {
        let aboutMenu = "aboutMenu";
        if (this.state.aboutOpen) {
          aboutMenu += ' subMenuOpen';
        }
        let conditionsMenu = "conditionsMenu";
        if (this.state.conditionsOpen) {
          conditionsMenu += ' subMenuOpen';
        }
        let resourcesMenu = "resourcesMenu";
        if (this.state.resourcesOpen) {
          resourcesMenu += ' subMenuOpen';
        }
        let servicesMenu = "servicesMenu";
        if (this.state.servicesOpen) {
          servicesMenu += ' subMenuOpen';
        }
        return (
            <MobileMenuFull id={"mobileMenu"}>      
                <MainMobileMenu id={"mainMobileMenu"}>
                    <ul>
                        <li><Link to={"/projects/"}>Projects</Link></li>
                        <li><Link to={"/studio/"}>Studio</Link></li>
                        <li><Link to={"/press/"}>Press</Link></li>
                    </ul>
                </MainMobileMenu>
            </MobileMenuFull>
        );
    }
}


const MobileMenuFull = styled.div`
    transition: all .5s cubic-bezier(.77,0,.175,1);
    visibility: hidden;
    z-index: 1004;
    padding: 0px;
    @media(max-width:1100px) {
        visibility: visible !important;
        display: block !important;
    }
`

const MainMobileMenu = styled.nav`
    position: relative;
    width: 100%;
    height: 100%;
    > ul {
        list-style: none;
        margin: 0;
        > li {
            font-family: 'Calibri', sans-serif;
            font-size: 20px;
            font-weight: bold;
            padding: 0 20px;
            text-align: center;
            color: #4c5166;
            > a {
                color: #4c5166;
                text-decoration: none;
            }
            svg {
                margin-left: 10px;
            }
            &:hover {
                cursor: pointer;
            }
        }
        .subMenu {
            list-style: none;
            margin: 0;
            padding: 0;
            opacity: 0;
            visibility: hidden;
            height: auto;
            max-height: 0;
            overflow: hidden;
            transition: all 0s cubic-bezier(.25,.46,.45,.94);
            transition-duration: .5s;
            li {
                font-family: 'Calibri', sans-serif;
                font-size: 16px;
                font-weight: 400;
                letter-spacing: 1px;
                padding: 0 20px;
                text-align: center;
                > a {
                    color: #4c5166;
                    text-decoration: none;
                }
            }
        }
        .aboutMenu,
        .conditionsMenu,
        .resourcesMenu,
        .servicesMenu {
            button {
                position: absolute;
                margin-left: 10px;
                background-color: transparent;
                border: none;
                outline: 0;
                color: #fff;
                margin-top: 5px;
                transition: all 0s cubic-bezier(.25,.46,.45,.94);
                transition-duration: .5s;
                &:hover {
                    cursor: pointer;
                }
            }
            &.subMenuOpen {
                button {
                    transform: rotate(-180deg);
                }
                .subMenu {
                    opacity: 1;
                    visibility: visible;
                    padding: 10px 0;
                    max-height: 200px;
                }
            }
        }
    }
`

export default MobileMenu