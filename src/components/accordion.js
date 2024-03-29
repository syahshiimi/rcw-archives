import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { IconContext } from "@react-icons/all-files/lib";
import { TiArrowDown } from "@react-icons/all-files/ti/TiArrowDown";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { CheckVernacularLang } from "./langtoggle";
// Components
import { NestedTagsContainer, TagsContainer } from "./tags";
import { TranscriptContent } from "./transcriptcontent";

export const Accordion = ({ transcript = [], type, name }) => {
  const {
    discussionQuestions,
    englishFullTranscript,
    englishTranscriptSummary,
    originalTranscriptLanguage,
    vernacularFullTranscript,
    transcriptTags,
    interviewer,
    interviewee,
    transcriptNotes,
  } = transcript;

  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////

  // Rich Text Rendering
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
      [BLOCKS.LIST_ITEM]: (node, children) => {
        return <li>{children}</li>;
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <p>{children}</p>;
      },
    },
  };
  //////////////////////////////////////////////////
  ///////////// Conditional Rendering //////////////
  //////////////////////////////////////////////////

  // Dynamically render content based on the type prop

  // 1. Document Summary Accordion
  function DocumentSummary() {
    if (englishTranscriptSummary != null) {
      return (
        <div className="c-accordion__summary">
          {renderRichText(englishTranscriptSummary, options)}
        </div>
      );
    } else {
      return null;
    }
  }

  // 2. Full Document Transcript Accordion (Mobile only)

  function DocumentTranscript() {
    let englishLanguage = englishFullTranscript
      ? renderRichText(englishFullTranscript, options)
      : null;

    let vernacularLanguage = vernacularFullTranscript
      ? renderRichText(vernacularFullTranscript, options)
      : null;

    let lang = originalTranscriptLanguage ? originalTranscriptLanguage : null;

    return (
      <TranscriptContent
        englishTranscript={englishLanguage}
        vernacularTranscript={vernacularLanguage}
        lang={lang}
      />
    );
  }

  // 3. DOcument Information Accordion
  function DocumentInfo() {
    return (
      <div className="c-accordion__info">
        <p className="c-accordion__interviewer">Interviewer: {interviewer}</p>
        <p className="c-accordion__interviewee">Interviewee: {interviewee}</p>
        <div className="c-accordion__tagsandkeyscontainer">
          <p className="c-accordion__tagsandkeystitle">Tags & Keywords</p>
          <hr className="c-accordion__tagsandkeysline"></hr>
          <NestedTagsContainer tags={transcriptTags} />
        </div>
        <p className="c-transcript__contentnotesheader">Transcript Notes</p>
        <hr className="c-transcript__contentnotesline"></hr>
        <TranscriptNotes />
      </div>
    );
  }

  function TranscriptNotes() {
    if (transcriptNotes != null) {
      return (
        <div className="c-transcript__contentnotes">
          {renderRichText(transcriptNotes, options)}
        </div>
      );
    } else {
      return <p className="c-transcript__contentnotes">None</p>;
    }
  }

  // 4. Document Question Accordion
  function DocumentQns() {
    if (discussionQuestions != null) {
      return (
        <div className="c-accordion__qns">
          {renderRichText(discussionQuestions, options)}
        </div>
      );
    } else {
      return null;
    }
  }

  /////////////////////////////////////////////////////

  let component;
  if (type == "Document Summary") {
    component = <DocumentSummary />;
  } else if (type == "Document Transcript") {
    component = <DocumentTranscript />;
  } else if (type == "Document Information") {
    component = <DocumentInfo />;
  } else if (type == "Document Questions") {
    component = <DocumentQns />;
  }

  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////

  // Dropdown on click
  // 1. Hide accordion content as the intiai state where show = false
  const [show, setShow] = useState(false);
  const [normal, setRotate] = useState(true);
  // 2. Creat button handler to listen to button state change
  const handleClick = () => {
    setShow(!show); // returns opposte; where show is now TRUE
    setRotate(!normal);
  };
  // 3. Create CSS Modifier
  const accordionBody = useRef(null);
  const accordionRef = useRef(null);
  const accordionHeader = useRef(null);
  const rotateArrowIcon = normal
    ? "c-accordion__arrow"
    : "c-accordion__arrow pulled";

  useEffect(() => {
    const accordionHeight = accordionRef.current.getBoundingClientRect().height;
    if (show) {
      accordionBody.current.style.height = `${accordionHeight}px`;
      accordionBody.current.style.borderRadius = `0px 0px calc(2rem + 1px) calc(2rem + 1px)`;
      accordionHeader.current.style.border = `1px solid var(--primary-clr-200)`;
      accordionHeader.current.style.borderRadius = `calc(2rem + 1px) calc(2rem + 1px) 0px  0px`;
    } else {
      accordionBody.current.style.height = "0px";
      accordionBody.current.style.border = `0px solid var(--primary-clr-200)`;
      accordionHeader.current.style.border = `1px solid var(--primary-clr-200)`;
      accordionHeader.current.style.borderRadius = `calc(2rem + 1px)`;
    }
  }, [show]);

  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////

  return (
    <AccordionWrapper className={`c-accordion ${name}`}>
      <button
        className="c-accordion__header"
        ref={accordionHeader}
        onClick={handleClick}
      >
        <h5 className="c-accordion__title">{type}</h5>
        <IconContext.Provider value={{ className: rotateArrowIcon }}>
          <TiArrowDown />
        </IconContext.Provider>
      </button>
      <div className="c-accordion__bodycontainer" ref={accordionBody}>
        <div className="c-accordion__body" ref={accordionRef}>
          {component}
        </div>
      </div>
    </AccordionWrapper>
  );
};

const AccordionWrapper = styled.div`
  margin: 1vh 0vw;

  // Accordion Header
  .c-accordion__header {
    display: flex;
    flex-direction: row;
    padding: 1.2vh 6vw;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex: 1 1 auto;

    /* styling */
    background-color: var(--primary-clr-100);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: all 0.5s ease-in-out 0.2s;
  }

  .c-accordion__arrow {
    height: 2rem;
    width: 2rem;
    transition: var(--transition);
  }

  .pulled {
    transform: rotate(180deg);
    transition: var(--transition);
  }

  .c-accordion__title {
    font-size: 1rem;
    font-style: normal;
    font-weight: 500 !important;
  }

  .c-accordion__bodycontainer {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1 1 100%;
    background-color: var(--primary-clr-50);
    /* border: 1px solid var(--primary-clr-200); */
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    transition: var(--transition);
  }

  .c-accordion__body {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  /* Accordion Styling */

  /* Document Summary Accordion */
  .c-accordion__summary {
    display: flex;
    flex-direction: column;
    padding: 2vh 0vw;
  }
  .c-accordion__summary > p {
    margin: 1vh 6vw;
    text-align: left !important;
  }

  /* Document Transcript Accordion (MOBILE ONLY) */
  .c-transcript__content {
    padding: 2vh 0vw;
    display: flex;
    flex-direction: column;
    text-align: justify;
  }
  .c-transcript__content > p {
    margin: 0.5vh 6vw;
    min-height: 10px;
  }

  .c-langtoggle {
    background-color: transparent;
    border: none;
    text-decoration: underline;
    font-family: "Ubuntu", sans-serif;
    font-style: normal;
    font-size: 0.85rem;
    font-weight: normal;
    margin: 1.5vh 0vw;
  }

  /* Document Information Accordion */
  .c-accordion__info {
    display: flex;
    flex-direction: column;
    padding: 2vh 0vw;
  }
  .c-accordion__info > * {
    margin: 1vh 6vw;
  }

  .c-accordion__tagsandkeyscontainer {
    display: flex;
    flex-direction: column;
  }

  .c-accordion__tagsandkeystitle {
    font-weight: bold;
    padding: 2vh 0vw 0vh vw;
  }
  .c-accordion__tagsandkeysline {
    border: 1px solid var(--primary-clr-200);
    border-radius: 1px;
    margin: 2vh 0vw;
  }

  .c-transcript__contentnotesheader {
    font-weight: bold;
    padding: 2vh 0vw 0vh vw;
    margin-bottom: 0;
  }

  .c-transcript__contentnotesline {
    border: 1px solid var(--primary-clr-200);
    border-radius: 1px;
  }

  .c-transcript__contentnotes {
    margin: 0vh 6vw 2vh 10vw;
    li {
      padding: 1vh 0vw;
    }
  }
  ol li::marker {
    font-family: "Ubuntu";
  }

  /* Document Questions Accordion */
  .c-accordion__qns {
    display: flex;
    flex-direction: column;
    padding: 2vh 2vw;

    ol > li {
      margin: 2vh 6vw 2vh 10vw;
    }
  }

  ////////////////////////////
  ////// Tablet //////////////
  ////////////////////////////
  @media (min-width: 992px) {
    /* Global Accordion CSS */
    margin: 0;
    .c-accordion__header {
      padding: 0.5vh 3vw;
    }
    .c-accordion__title {
      font-size: 1.125rem;
    }
    .c-accordion__arrow {
      height: 2.5rem;
      width: 2.5rem;
    }

    /* Document Summary Accordion */
    .c-accordion__summary > p {
      margin: 1vh 3vw;
      text-align: center;
    }
    /* Document Information Accordion */
    .c-accordion__info > * {
      margin: 1vh 3vw;
    }
    .c-accordion__info > .c-transcript__contentnotes {
      margin: 2vh 5vw;
    }

    .c-transcript__contenttags {
      justify-content: stretch;
    }

    .c-accordion__tagsandkeyscontainer {
      display: none;
    }
    .c-accordion__tag {
      font-size: 0.85rem;
    }

    .c-transcript__content {
      display: none;
    }

    .c-transcript__contentnotesheader {
      font-weight: bold;
    }

    .c-transcript__contentnotesline {
      border: 1px solid var(--primary-clr-200);
      border-radius: 1px;
      margin: 0vh 3vw;
    }

    /* Document Question Accordion */
    .c-accordion__qns {
      padding: 1vh 0vw;
      list-style: square;

      ol > li {
        margin: 1vh 3vw 1vh 5vw;
      }

      ol > li > p {
        font-size: 1rem;
      }
    }
  }

  ////////////////////////////
  ///////// Desktop //////////
  ////////////////////////////

  @media (min-width: 1280px) {
    /* Document Summary Accordion */
    .c-accordion__summary {
      padding: 3vh 0vw;
      p {
        font-size: 1.125rem;
      }
    }

    /* Document Information Accordion */
    .c-accordion__info {
      padding: 2vh 0vw;
    }

    .c-transcript__contentnotesline {
      margin: 1vh 3vw;
    }

    /* Document Questions Accordion */
    .c-accordion__qns {
      padding: 1.5vh 2vw 1.5vh 1vw;
      ol > li {
        margin: 1vh 3vw;
      }
    }
  }

  @media (min-width: 2500px) {
    margin: 0;
    /* Document Summary Accordion */
    .c-accordion__summary {
      padding: 2vh 0vw;
      p {
        margin: 0vh 2vw;
        text-align: justify !important;
      }
    }

    /* Document Information Accordion */

    .c-accordion__info {
      margin: 0;
      padding: 1vh 0vw 2.5vh 0vw;
    }
    .c-accordion__info > * {
      margin: 1vh 2vw;
      padding: 0vh 0vw;
    }

    .c-accordion__info > .c-transcript__contentnotes {
      margin: 0vh 3vw;
    }

    /* Document Questions Accordion */
    .c-accordion__qns {
      padding: 1vh 0vw;
      ol > li {
        margin: 1vh 2.5vw;
      }
      ol > li > p {
        font-size: 1.125rem;
      }
    }
  }
`;
