import React from "react";
import parse from "html-react-parser";
import styled from "styled-components";
import slugify from "slugify";
import { Link } from "gatsby";
import { TagsContainer } from "./tags";

export const SearchCard = ({ id, transcriptTitle, transcriptTags, html }) => {
  // remove dots in strings (if exists)
  const cleanString = transcriptTitle.replace(".", " ");
  // use slugify to return a string in a slug format
  const slug = slugify(cleanString, { lower: true });
  return (
    <SearchCardWrapper>
      <div className="l-searchcard">
        <div className="c-searchcard__title">{transcriptTitle}</div>
        <div className="c-searchcard__summary">{parse(`${html}`)}</div>
        <span className="c-searchcard__tagscontainer">
          <TagsContainer tags={transcriptTags} />
        </span>
        <span className="c-searchcard__read">
          <Link to={`${slug}`}>Read More </Link>
        </span>
      </div>
    </SearchCardWrapper>
  );
};

const SearchCardWrapper = styled.main`
  .l-searchcard {
    display: flex;
    background-color: var(--primary-clr-100);
    padding: 3vh 7vw;
    margin: 0.85vh 2vw;

    /* styling */
    border-radius: calc(2rem + 6px);
    display: flex;
    box-shadow: 0px 4px 9px rgba(51, 53, 51, 0.45);
    flex-direction: column;
  }

  .c-searchcard__title {
    font-family: "Lora", Serif;
    font-weight: bold;
    font-size: 0.95rem;
    margin: 0.45vh 0vw;
  }

  .c-searchcard__summary {
    margin: 1vh 0vw;
    p {
      font-size: 0.75rem;
      line-height: 1.25;
      text-align: justify;
    }
  }

  .c-searchcard__read {
    font-family: "Ubuntu", Serif;
    font-weight: normal;
    text-align: right;
    font-size: 0.75rem;
    margin: 1vh 0vw;
    color: var(--primary-clr-150);
    text-align: center;
  }

  .c-searchcard__tagscontainer {
    display: none;
  }

  //////////////////////////////
  ////////// Tablet ////////////
  //////////////////////////////

  @media (min-width: 992px) {
    .l-searchcard > * {
      margin: 0;
    }

    .l-searchcard {
      padding: 3vh 5vw 1.5vh 5vw;
      margin: 0.65vh 1vw;
    }

    .c-searchcard__title {
      font-size: 1.25rem;
    }

    .c-searchcard__summary {
    }

    .c-searchcard__summary {
      margin: 1vh 0vw;
      p {
        font-size: 1.025rem;
      }
    }

    .c-searchcard__read {
      font-size: 1rem;
      margin: 1vh 0vw;
      font-style: normal;
      font-weight: 500;
    }

    .c-searchcard__tagscontainer {
      display: flex;
      margin: 0.5vh 0vw;
    }

    //////////////////////
    ///// Desktop ////////
    //////////////////////

    @media (min-width: 1280px) {
      .l-searchcard > * {
        margin: 0;
      }

      .l-searchcard > a {
        margin: 1vh;
      }

      .l-searchcard {
        padding: 4vh 6vw 2vh 6vw;
        margin: 2vh 2vw;
      }

      .c-searchcard__title {
        font-size: 1.25rem;
        margin: 1vh 0vw;
      }

      .c-searchcard__summary {
        text-align: left;
        margin: 1vh 0vw;

        p {
          font-size: 1.125rem;
        }
      }

      .c-searchcard__tagscontainer {
        margin: 1vh 0vw;
      }

      .c-searchcard__read {
        margin: 1.2vh;
        font-size: 1.125rem;
      }
    }
  }
`;
