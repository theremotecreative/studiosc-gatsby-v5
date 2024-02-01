import React, { Component} from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import styled from 'styled-components'

// import "@fontsource/roboto"
// import "@fontsource/roboto/300.css"

import "../css/slick.css"
import "../css/slick-theme.css"

import HeaderLogo from "../components/header-logo"
import HomeMobileLogo from "../components/mobile-logo"
import HeaderMenu from "../components/header-menu"
import MobileMenu from "../components/mobile-menu"
import Footer from "../components/footer"

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.container = null;
        this.trigger = null;
    }
    
    toggleMenu() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const children = this.props.children
        const isHomePage = this.props.isHomePage
        let headerName = "headerStatus";
        if (this.state.isOpen) {
          headerName += ' mobileOpen';
        }
        return (
            <Main className={isHomePage ? "is-homepage" : "is-not-homepage"}>

                <HeaderMain className={headerName}>

                    <div class="header-flex">
                        <Link to={'/'} className={"header-logo"}>
                            <HeaderLogo/>
                            <HomeMobileLogo/>
                        </Link>

                        <HeaderMenu/>

                        <div class="mobile-menu-icon">
                            <button onClick={() => this.toggleMenu()} aria-label="Open Mobile Menu">
                                <div></div>
                                <div></div>
                                <div></div>
                            </button>
                        </div>
                    </div>

                    <div class="mobile-menu">
                        <MobileMenu />
                    </div>

                </HeaderMain>

                <MainLayout className={headerName}>

                        <MainContent>
                            <main>{children}</main>
                        </MainContent>

                </MainLayout>

                <Footer />

            </Main>
        );
    }
}

const Main = styled.div`
    position: relative;
    overflow: hidden;
    background-color: #fff;
    .home-mobile-logo {
        display: none !important;
    }
    &.is-homepage {
        .mobile-menu-icon {
            button {
                > div {
                    background-color: #fff;
                }
            }
        }
        .mobile-menu {
            ul > li {
                font-size: 24px;
                font-weight: 400;
                text-transform: uppercase;
                text-shadow: 0 0 2px rgb(0 0 0 / 50%);
                > a {
                    color: #fff;
                }
            }
        }
        header {
            position: absolute;
            z-index: 10;
            background: #fff;
        }
        footer {
            display: none;
        }
    }
    @media(max-width:767px) {
        &.is-homepage {
            .main-logo {
                display: none !important;
            }
            .home-mobile-logo {
                display: block !important;
            }
            .mobile-menu {
                background-color: transparent;
                box-shadow: none;
            }
        }
        &.is-not-homepage {
            padding-top: 95px;
            .header-flex {
                background-color: #fff;
            }
        }
    }
`

const HeaderMain = styled.header`
    position: relative;
    width: 100%;
    height: auto;
    .header-flex {
        padding: 15px 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .mobile-menu-icon {
        display: none;
        opacity: 0;
        visibility: hidden;
        transition-duration: .3s;
        button {
            width: 35px;
            height: 23px;
            position: relative;
            padding: 0;
            border: none;
            background-color: transparent;
            > div {
                position: absolute;
                width: 35px;
                height: 3px;
                background-color: #2b5172;
                border-radius: 3px;
                transition-duration: .3s;
                &:first-child {
                    top: 0;
                    left: 0;
                }
                &:nth-child(2) {
                    top: 10px;
                    left: 0;
                }
                &:last-child {
                    top: 20px;
                    left: 0;
                }
            }
            &:hover {
                cursor: pointer;
            }
        }
    }
    .mobile-menu {
        position: fixed;
        top: 95px;
        z-index: 10;
        background-color: #fff;
        box-shadow: 0px 6px 4px rgba(0,0,0,.1);
        width: 100%;
        padding: 0px;
        opacity: 0;
        visibility: hidden;
        display: none;
        transition: all 0s cubic-bezier(.25,.46,.45,.94);
        transition-duration: .6s;
        max-height: 0px;
        height: auto;
        overflow: hidden;
    }
    &.mobileOpen {
        .mobile-menu-icon {
            button {
                > div {
                    &:first-child {
                        transform: rotate(45deg);
                        top: 9px;
                    }
                    &:nth-child(2) {
                        opacity: 0;
                    }
                    &:last-child {
                        transform: rotate(-45deg);
                        top: 9px;
                    }
                }
            }
        }
        .mobile-menu {
            max-height: 800px;
        }
    }
    @media(max-width:767px) {
        .mobile-menu-icon {
            display: block;
            opacity: 1;
            visibility: visible;
        }
        .mobile-menu {
            display: block;
            opacity: 1;
            visibility: visible;
        }
        .header-flex {
            position: fixed;
            z-index: 100;
            width: 100%;
            padding: 20px;
            top: 0;
            left: 0;
            .header-logo {
                .gatsby-image-wrapper {
                    max-width: 140px;
                }
            }
        }
    }
`

const MainLayout = styled.div``

const MainContent = styled.div``

Layout.propTypes = {
    children: PropTypes.node.isRequired,
  }
  
export default Layout
