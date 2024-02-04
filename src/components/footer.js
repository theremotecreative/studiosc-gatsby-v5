import React from "react"
import styled from 'styled-components'

import FooterLogo from "../components/footer-logo"

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return(
        <FooterMain>

            <div class="footer-bottom">
                <FooterLogo />
                <p>© {currentYear} StudioSC • 37 Greenpoint Avenue • Brooklyn, NY 11222 • 929.295.0385</p>
            </div>

        </FooterMain>
    )

}

const FooterMain = styled.footer`
    position: relative;
    padding: 20px 25px;
    background-color: #1f2124;
    .flex-row {
        max-width: 1180px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        .flex-col {
            width: 33.33%;
            padding-right: 35px;
            h4 {
                font-family: "Roboto Slab";
                font-weight: 400;
                line-height: 1.4;
                letter-spacing: 0px;
                font-style: normal;
                color: #fff;
                margin-bottom: 30px;
            }
            p {
                font-family: Roboto;
                font-size: 20px;
                font-weight: 500;
                letter-spacing: 0px;
                font-style: normal;
                color: #fff;
            }
            svg {
                margin-right: 20px;
                color: #25afb4;
                fill: #25afb4;
            }
        }
    }
    .footer-bottom {
        max-width: 1180px;
        width: 100%;
        margin: 0 auto;
        margin-top: 0px;
        text-align: center;
        p {
            font-family: Roboto;
            color: #aaaaaa;
            font-size: 14px;
            font-weight: 400;
            margin-top: 10px;
            margin-bottom: 0;
        }
    }
    @media(max-width:1100px) {
        .flex-row {
            max-width: 700px;
            flex-wrap: wrap;
            justify-content: flex-start;
            .flex-col {
                width: 50%;
            }
        }
    }
    @media(max-width:767px) {
        .flex-row {
            justify-content: center;
            .flex-col {
                width: 100%;
                padding-right: 0;
                text-align: center;
            }
        }
    }
`

export default Footer