import { graphql, Link, useStaticQuery } from "gatsby";
import parse from "html-react-parser";
import React from "react";
import slugify from "slugify";
import styled from "styled-components";

import { SimpleButton } from "./simplebutton";

const query = graphql`
  {
    allContentfulInterviewTranscripts(
      sort: { order: DESC, fields: createdAt }
    ) {
      nodes {
        transcriptTitle
        oneLineTeaser {
          oneLineTeaser
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;

const isBrowser = typeof window !== "undefined";
export const RecentlyAdd = () => {
    const data = useStaticQuery(query);
    const recentadded = data.allContentfulInterviewTranscripts.nodes;

    // We slice array to limit the amount based on media queries

    if (isBrowser) {
        let recentaddedsliced; // Create a media condition that targets viewports at least 768px wide
        const mediaQuery = window.matchMedia("(min-width: 2500px)");
        // Check if the media query is true
        if (mediaQuery.matches) {
            recentaddedsliced = recentadded.slice(0, 10);
        } else {
            recentaddedsliced = recentadded.slice(0, 8);
        }

        return (
            <article className="l-recentlyaddedcardcard">
                {" "}
                {recentaddedsliced.map((item) => {
                    const {
                        transcriptTitle,
                        oneLineTeaser: {
                            childMarkdownRemark: { html },
                        },
                    } = item;

                    // remove dots in strings (if exists)
                    const cleanString = transcriptTitle
                        .replace(".", " ")
                        .replace("(", " ")
                        .replace(")", " ")
                        .replace("&", "and");
                    // use slugify to return a string in a slug format
                    const slug = slugify(cleanString, { lower: true });

                    return (
                        <RecentlyAddWrapper key={transcriptTitle}>
                            <div className="c-recentlyaddedcard">
                                <div className="c-recentlyaddedcard__title">
                                    {transcriptTitle}
                                </div>
                                <div className="c-recentlyaddedcard__oneliner">
                                    {parse(`${html}`)}
                                </div>
                                <SimpleButton
                                    url={`browsearchives/${slug}`}
                                    title="Read More"
                                />
                            </div>
                        </RecentlyAddWrapper>
                    );
                })}
            </article>
        );
    } else {
        return null;
    }
};

const RecentlyAddWrapper = styled.section`
  .c-recentlyaddedcard {
    display: flex;
    background-color: var(--primary-clr-50);
    padding: 3vh 7vw;
    margin: 1.5vh 2vw;

    /* styling */
    border-radius: calc(2rem + 6px);
    display: flex;
    box-shadow: 0px 4px 9px rgba(51, 53, 51, 0.65);
    flex-direction: column;
  }

  .c-recentlyaddedcard__title {
    text-align: center;
    font-family: "Lora", Serif;
    font-weight: bold;
    font-size: 0.95rem;
    margin: 0.45vh 0vw;
  }

  .c-recentlyaddedcard__oneliner {
    margin: 1vh 1vw;
    text-align: justify;
    p {
      font-size: 0.85rem;
      line-height: 1.25;
    }
  }
  /////////////////////////////
  //////// Tablet /////////////
  /////////////////////////////

  @media (min-width: 992px) {
    .c-recentlyaddedcard {
      padding: 2vh 1.5vh;
      margin: 1vh 0vw;
      transition: var(--hover-transition);
    }
    .c-recentlyaddedcard:hover {
      transform: translateY(-4px);
      box-shadow: 0px 5px 14px rgba(51, 53, 51, 0.65);
    }

    .c-recentlyaddedcard__title {
      font-size: 0.85rem;
    }
    .c-recentlyaddedcard__oneliner {
      margin: 1vh 0vw;
      text-align: left;
      p {
        font-size: 0.75rem;
      }
    }

  }

  /////////////////////////////
  /////// Desktop /////////////
  /////////////////////////////

  @media (min-width: 1280px) {
    .c-recentlyaddedcard {
      margin: 2vh 1vw;
      padding: 3vh 0.5vh;
    }

    .c-recentlyaddedcard__title {
      margin: 0vh 2vw;
      font-size: 0.95rem;
    }

    .c-recentlyaddedcard__oneliner {
      margin: 1.5vh 1.8vw;
      p {
        font-size: 0.85rem;
      }
    }

    .c-simplebutton {
      margin: 0vh 2vw;
    }
  }

  //////////////////////////////
  //////// 4k Display //////////
  //////////////////////////////

  @media (min-width: 2500px) {
    .c-recentlyaddedcard {
      margin: 1.5vh 0.5vw;
      padding: 2.5vh 0.5vw;
    }
    .c-recentlyaddedcard__title {
      font-size: 1.125rem;
    }

    .c-recentlyaddedcard__oneliner {
      margin: 1vh 1vw;
    }

    .c-recentlyaddedcard__read {
      margin: 0.25vh;
    }

    .c-simplebutton {
      margin: 0vh 1vw;
    }
  }
`;
