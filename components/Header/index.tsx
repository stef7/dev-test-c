import React from "react";
import { useRouter } from "next/dist/client/router";
import { GlobalsObj } from "../../lib/api/cms";
import Container from "../Container";
import LocationIcon from "../../assets/icons/Location";
import PhoneIcon from "../../assets/icons/Phone";

interface HeaderProps {
  globals: GlobalsObj;
}

const Header: React.FC<HeaderProps> = ({ children, globals: { header } }) => {
  const router = useRouter();
  const LogoTag = router.pathname === "/" ? "h1" : "div";

  return (
    <>
      <style jsx>{`
        header {
          --top-size: 2rem;
          --btm-size: 0.4rem;
          --mid-size: calc(57rem / 16);
          position: relative;
          z-index: 10;
          height: calc(var(--top-size) + var(--btm-size) + var(--mid-size));
        }
        header::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          border-top: var(--top-size) var(--color-green) solid;
        }
        header::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          border-bottom: var(--btm-size) var(--color-grey-mid) solid;
        }

        .inner {
          position: relative;
          display: flex;
          justify-content: space-between;
        }

        .logo {
          position: relative;
          z-index: 2;
          align-self: flex-start;

          margin: 0 0 calc(-44rem / 16);
          background: var(--color-grey-darker);
          color: var(--color-white);
        }
        .logo a {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-grey-darker);
          transition: background-color 0.3s linear;
        }
        .logo :global(svg) {
          width: calc(224 / 16 * 1rem);
          padding: calc(36rem / 16) calc(40rem / 16) calc(30rem / 16);
          height: auto;
          transition: padding 0.7s ease, width 0.7s ease;
        }
        .logo a:hover,
        .logo a:focus {
          background: var(--color-blackish);
        }

        nav {
          position: relative;
          margin-top: var(--top-size);
          margin-bottom: var(--btm-size);
          display: flex;
        }

        ul,
        li {
          display: flex;
        }

        nav a {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 1rem;
          font-size: calc(12rem / 16);
          letter-spacing: calc(1em / 13);
          font-weight: bold;
          text-transform: uppercase;
          min-height: var(--mid-size);
          min-width: var(--mid-size);
        }
        nav a:hover,
        nav a:focus {
          text-decoration: underline;
        }
        nav a :global(svg) {
          margin-right: 0.75rem;
        }

        @media not screen and (min-width: 768px) {
          header {
            --top-size: calc(10rem / 16);
            --btm-size: 0;
            --mid-size: calc(40rem / 16);
          }

          .logo :global(svg) {
            width: calc(121 / 16 * 1rem);
            padding: calc(20rem / 16) calc(21rem / 16) calc(16rem / 16);
          }

          nav a {
            padding: 0;
          }
          nav a :global(svg) {
            margin: 0;
          }
          nav a span {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
          }
        }
      `}</style>

      <header>
        <Container>
          <div className="inner">
            <LogoTag className="logo">
              <a href="#">
                <svg viewBox="0 0 146 72" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="72" cy="146" r="146" fill="currentColor" />
                </svg>
              </a>
            </LogoTag>

            <nav>
              {children}
              <ul className="unlist">
                <li>
                  <a href="#" title={header.visitCentreLabel}>
                    <LocationIcon />
                    <span>{header.visitCentreLabel}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${header.phoneNumber.replace(/[^\d]/gi, "")}`}
                    title={header.phoneNumber}
                  >
                    <PhoneIcon />
                    <span>{header.phoneNumber}</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
