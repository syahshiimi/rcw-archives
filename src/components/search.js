import { BiSearchAlt } from "@react-icons/all-files/bi/BiSearchAlt";
import { IconContext } from "@react-icons/all-files/lib";
import scrollTo from "gatsby-plugin-smoothscroll";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export const SearchBar = ({ queryState, setSearchQuery, queries }) => {
  const refContainer = useRef(null);

  // const LiveSearch = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Smooth scroll to selected DOM element
    scrollTo(".l-browsearchives__search");
  };
  const resultsClick = (e) => {
    e.preventDefault();
    scrollTo(".l-browsearchives__search");
  };

  // Search Results Query + Container Alert
  const SearchResultsCounter = () => {
    if (queryState == "") {
      return null;
    } else {
      return (
        <p className="c-browsearchives__counter" onClick={resultsClick}>
          '{queryState}' returned {queries.length} search results.{" "}
        </p>
      );
    }
  };

  return (
    <SeaerchBarWrapper>
      <form
        className="c-browsearchives__searchbar"
        method="get"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <label htmlFor="c-browsearchives__searchinput">
          {/* <span className="visually-hidden">Browse the archives </span> */}
        </label>
        <input
          autoFocus="autofocus"
          type="text"
          className="c-browsearchives__searchinput"
          placeholder="Browse the archives"
          name="s"
          ref={refContainer}
          value={queryState} // this is the input value in the form itself!
          onInput={(e) => setSearchQuery(e.target.value)}
        />
        <button className="c-browsearchives__searchbutton" type="submit">
          <IconContext.Provider
            value={{ className: "c-browsearchives__searchicon" }}
          >
            <BiSearchAlt />
          </IconContext.Provider>
        </button>
      </form>
      <SearchResultsCounter />
    </SeaerchBarWrapper>
  );
};

const SeaerchBarWrapper = styled.div`
  .visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  .c-browsearchives__searchbar {
    display: flex;
    text-align: center;
    justify-content: center;
    margin: 2vh 0vw 1vh 0vw;
    border: 3px solid var(--primary-clr-200);
    border-radius: calc(4rem + 3px);
    background-color: var(--primary-clr-50);
  }

  .c-browsearchives__counter {
    margin-top: 2vh;
    font-size: 0.75rem;
    opacity: 0.5;
    color: var(--primary-clr-200);
    text-decoration: underline;
  }

  .c-browsearchives__searchinput {
    width: 100%;
    height: 6vh;
    border: none;
    border-radius: calc(4rem + 3px) 0 0 calc(4rem + 3px);
    background-color: var(--primary-clr-50);

    ::placeholder {
      font-size: 0.745rem;
      text-align: center;
      padding-left: 65px;
      opacity: 40%;
    }
  }

  // disable input field border highlighting

  input[type='text']: focus {
    outline: none;
  }

  .c-browsearchives__searchbutton {
    background-color: var(--primary-clr-100);
    width: 25%;
    border: none;
    border-radius: 0 calc(4rem + 3px) calc(4rem + 3px) calc(4rem + 3px);
  }

  .c-browsearchives__searchicon {
    height: 1.7em;
    width: 1.7em;
  }

  @media (min-width: 992px) {
    .c-browsearchives__searchbar {
      margin-left: 12vw;
      margin-right: 12vw;
    }

    .c-browsearchives__searchinput {
      height: 4vh;

      ::placeholder {
        text-align: center;
        font-size: 1rem;
        padding-left: 20%;
      }
    }

    .c-browsearchives__searchbutton {
      width: 20%;
    }
    .c-browsearchives__searchicon {
      height: 2.2rem;
      width: 2.2rem;
    }

    .c-browsearchives__counter {
      font-size: 1rem;
    }
  }

  @media (min-width: 1280px) {
    .c-browsearchives__searchbar {
      margin-bottom: 3vh;
    }
    .c-browsearchives__searchinput {
      height: 8vh;

      ::placeholder {
        text-align: center;
        font-size: 1.125rem;
        padding-left: 20%;
      }
    }

    .c-browsearchives__searchbutton {
      width: 15%;
    }

    .c-browsearchives__searchicon {
      width: 2.5rem;
      height: 2.5rem;
    }
  }

  @media (min-width: 2500px) {
    .c-browsearchives__searchbar {
      margin-left: 19vw;
      margin-right: 19vw;
    }

    .c-browsearchives__searchinput {
      ::placeholder {
        font-size: 1.75rem;
        padding-left: 5rem; // we use the widht of the icon box as offset
      }
    }

    input[type="text"] {
      font-size: 2rem;
    }

    .c-browsearchives__searchicon {
      width: 3.5rem;
      height: 3.5rem;
    }
  }
`;
