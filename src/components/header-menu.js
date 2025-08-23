import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import styled from "styled-components";

const HeaderMenu = () => {
  const { pathname } = useLocation();      // ← current path

  // Helper: returns "active" if this link is the current page
  const isActive = (to) =>
    pathname === to || (to !== "/" && pathname.startsWith(to)) ? "active" : "";

  return (
    <MainNav>
      <ul className="main-menu">
        <li className={isActive("/projects/")}>
          <Link to="/projects/">Projects</Link>
        </li>
        <li className={isActive("/studio/")}>
          <Link to="/studio/">Studio</Link>
        </li>
        <li className={isActive("/press/")}>
          <Link to="/press/">Press</Link>
        </li>
      </ul>
    </MainNav>
  );
};

const MainNav = styled.nav`
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s;
  /* ——— menu layout ——— */
  ul.main-menu {
    list-style: none;
    display: flex;
    margin: 0;
    gap: 35px;
    > li {
      font-family: "Carlito", sans-serif;
      font-size: 24px;
      font-weight: 400;
      line-height: 1;
      position: relative;
      &:last-child {
        padding-right: 0;
      }
        &.active::before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        height: 5px;
        width: 100%;
        background: #111111;
        top: -30px;
      }
      a {
        text-decoration: none;
        color: #000;
      }

      /* (keep your submenu styles intact) */
      > ul.submenu {
        position: absolute;
        left: 0;
        visibility: hidden;
        opacity: 0;
        width: 240px;
        margin: 0;
        background: #f2efef;
        list-style: none;
        border-top: 3px solid #25afb4;
        transition: opacity 0.2s ease-in;
        li a {
          display: block;
          padding: 7px 20px;
          font-size: 14px;
          text-transform: uppercase;
          color: #333;
          &:hover {
            background: #f8f8f8;
          }
        }
      }
      &:hover {
        cursor: pointer;
        > ul.submenu {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }

  /* hide on mobile */
  @media (max-width: 767px) {
    display: none;
  }
`;

export default HeaderMenu;
