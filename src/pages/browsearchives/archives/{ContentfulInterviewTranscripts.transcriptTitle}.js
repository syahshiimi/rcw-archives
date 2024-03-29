import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import parse from "html-react-parser";
import React, { useState } from "react";
import styled from "styled-components";

// Component Import
import { BackTopButton, BackToSummaryBtn } from "../../../components/button";
import { Head } from "../../../components/head";
import Layout from "../../../components/Layout";
import { NestedTagsContainer } from "../../../components/tags";
import { TranscriptContent } from "../../../components/transcriptcontent";

const FullTranscript = ({ data }) => {
    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////
    const transcript = data.contentfulInterviewTranscripts;
    const {
        transcriptTitle,
        transcriptTags,
        englishFullTranscript,
        transcriptEndNotes,
        originalTranscriptLanguage,
        vernacularFullTranscript,
        onelinerteaser: {
            childMarkdownRemark: { oneliner },
        },
    } = transcript || [];

    ////////////////////////////////////////
    ////////  Rich Text Render    //////////
    ////////////////////////////////////////

    const options = {
        renderMark: {
            [MARKS.BOLD]: (text) => <b className="font-bold">{text}</b>,
        },
        renderNode: {
            [INLINES.HYPERLINK]: (node, children) => {
                const { uri } = node.data;
                return (
                    <a href={uri} className="underline">
                        {children}
                    </a>
                );
            },
            [BLOCKS.HEADING_2]: (node, children) => {
                return <h2>{children}</h2>;
            },
            [BLOCKS.OL_LIST]: (node, children) => {
                return <ol>{children}</ol>;
            },
        },
    };

    let englishLanguage = renderRichText(englishFullTranscript, options);
    let vernacularLanguage = vernacularFullTranscript
        ? renderRichText(vernacularFullTranscript, options)
        : null;
    let lang = originalTranscriptLanguage ? originalTranscriptLanguage : null;

    // Conditional Rendering of Endnotes
    // Instead of destructuring first, we first check if transcriptEndNotes is
    // a null value By doing so, we avoid incurring the uncaughtError.
    function EndnotesContent() {
        if (transcriptEndNotes != null) {
            const {
                childMarkdownRemark: { endnotes },
            } = transcriptEndNotes;
            return (
                <div className="c-fulltranscript__endnotescontent">
                    {parse(`${endnotes}`)}
                </div>
            );
        } else if (transcriptEndNotes == null) {
            return <p className="c-fulltranscript__endnotescontent">None </p>;
        }
    }

    ////////////////////////////////////////
    /////////// Component Render ///////////
    ////////////////////////////////////////

    // Metadata
    const metadata = parse(`${oneliner}`);
    const {
        props: { children },
    } = metadata;

    return (
        <Layout>
            <Head title={transcriptTitle} description={children} />
            <FullTranscriptWrapper>
                <h1 className="c-fulltranscript__title">{transcriptTitle}</h1>
                <div className="c-fulltranscript__oneliner">{parse(`${oneliner}`)}</div>
                <BackToSummaryBtn />
                <hr className="c-fulltranscript__border"></hr>
                <TranscriptContent
                    englishTranscript={englishLanguage}
                    vernacularTranscript={vernacularLanguage}
                    lang={lang}
                />
                <hr className="c-fulltranscript__border"></hr>
                <h2 className="c-fulltranscript__tagsandkeywords">Tags & Keywords</h2>
                <NestedTagsContainer tags={transcriptTags} />
                <div className="c-fulltranscript__endnotescontainer">
                    <h5 className="c-fulltranscript__endnotes">Endnotes</h5>
                    <hr className="c-fulltranscript__endnotesborder"></hr>
                    <EndnotesContent />
                </div>
                <BackTopButton />
            </FullTranscriptWrapper>
        </Layout>
    );
};
export const query = graphql`
  query ($transcriptTitle: String) {
    contentfulInterviewTranscripts(transcriptTitle: { eq: $transcriptTitle }) {
      transcriptEndNotes {
        childMarkdownRemark {
          endnotes: html
        }
      }
      interviewer
      interviewee
      transcriptTitle
      transcriptTags
      contentful_id
      originalTranscriptLanguage
      englishTranscriptSummary {
        raw
      }
      vernacularFullTranscript {
        raw
      }
      englishFullTranscript {
        raw
      }
      discussionQuestions {
        raw
      }
      onelinerteaser: childContentfulInterviewTranscriptsOneLineTeaserTextNode {
        childMarkdownRemark {
          oneliner: html
        }
      }
      transcriptImage {
        gatsbyImageData(
          placeholder: TRACED_SVG
          layout: CONSTRAINED
          aspectRatio: 1.5
        )
      }
    }
  }
`;

const FullTranscriptWrapper = styled.section`
  /* DO NOT DISPLAY ON MOBILE */
  display: none;

  ///////////////////////////
  //////// Tablet ///////////
  ///////////////////////////

  @media (min-width: 992px) {
    display: flex;
    flex-direction: column;
    padding: 6vh var(--padding-desktop) 6vh var(--padding-desktop);
    row-gap: 1.2vh;
  }

  hr {
    display: block;
    border: 1px solid var(--primary-clr-200);
    border-radius: 1px;
  }
  .c-fulltranscript__title {
    text-align: center;
    font-size: 2.5rem;
    margin: 0;
    margin-bottom: 2vh;
  }

  .c-fulltranscript__oneliner {
    text-align: center;
    margin: 2vh 0vw;
  }

  .c-fulltranscript__border {
    margin: 1vh 0vw;
  }

  .c-langtoggle {
    font-size: 0.85rem;
    background-color: var(--primary-clr-100);
    display: flex;
    justify-content: center;
    border: none;
    font-family: "Ubuntu", sans-serif;
    font-style: normal;
    font-weight: normal;
    padding: 1vh 1vw;
    margin: 1vh uvw;
    width: 200px;
    border-radius: var(--border-rad-tablet);
  }

  .c-transcript__content {
    display: flex;
    justify-content: center;
    flex-direction: column;

    p {
      font-family: "Lora", serif;
      font-weight: 500;
      font-style: normal;
      margin: 1vh 0vw;
    }
  }

  .c-fulltranscript__tagsandkeywords {
    font-family: "Lora", serif;
    text-decoration: underline;
    font-size: 1.5rem;
  }

  .c-tagscontainer {
    justify-content: left;
    margin: 1vh 0vw !important;
  }

  .c-fulltranscript__endnotes {
  }
  .c-fulltranscript__endnotesborder {
    margin: 1vh 0vw;
    width: 25vw;
  }

  @media (min-width: 1280px) {
    padding: 10vh var(--padding-desktop);
    .c-fulltranscript__border {
      margin: 3.5vh 0vw;
    }
    .c-fulltranscript__oneliner {
      p {
        font-size: 1rem;
      }
    }
    .c-transcript__content {
      p {
        font-size: 1.2rem;
      }
    }

    .c-langtoggle {
      margin-bottom: 2vh;
      transition: var(--hover-transition);
      :hover {
        color: var(--primary-clr-100);
        background-color: var(--primary-clr-150);
        transition: var(--hover-transition);
      }
    }

    .c-tagscontainer {
      margin: 3vh 0vw;
    }
    .c-fulltranscript__endnotescontainer {
      margin: 2vh 0vw;
    }
    .c-fulltranscript__endnotesborder {
      margin: 2vh 0vw;
      width: 25vw;
    }
  }

  @media (min-width: 2500px) {
    padding: 6vh 24vw;
    .c-fulltranscript__oneliner {
      margin: 2vh 4vw;
        p {
            font-size: 1.2rem;
        }

    }

    .c-fulltranscript__border {
      margin: 2vh 0vw;
    }
  }
`;

export default FullTranscript;
