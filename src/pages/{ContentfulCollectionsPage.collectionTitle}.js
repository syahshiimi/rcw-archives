import { graphql, Link } from "gatsby";
import parse from "html-react-parser";
import React from "react";
import Masonry from "react-masonry-css";
import sanitizeHtml from "sanitize-html";
import styled from "styled-components";

import { BackTopButton } from "../components/button";
import { FeatureCard } from "../components/feature-cards";
// Components import
import { Head } from "../components/head";
import Layout from "../components/Layout";

export const query = graphql`
  query MyQuery($collectionTitle: String) {
    contentfulCollectionsPage(collectionTitle: { eq: $collectionTitle }) {
      collectionTitle
      collectionBlurb {
        childMarkdownRemark {
          html
        }
      }
      collectionTranscripts {
        id
        transcriptTitle
        interviewer
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
const CollectionsTemplate = ({ data }) => {
  const collectionsinfo = data.contentfulCollectionsPage;
  const {
    collectionTitle,
    collectionBlurb: {
      childMarkdownRemark: { html },
    },
    collectionTranscripts,
    collectionTranscripts: [{ interviewer }],
  } = collectionsinfo;

  // Sanitize html
  const sanitizedHTML = sanitizeHtml(html);

  // Metadata
  const metadata = parse(`${sanitizedHTML}`);
  const {
    props: { children },
  } = metadata;

  return (
    <Layout>
      <Head title={collectionTitle} description={children} />
      <CollectionsWrapper>
        <h1 className="c-collectionspage__title">{collectionTitle}</h1>
        <div className="c-collectionspage__blurb">
          {parse(`${sanitizedHTML}`)}
        </div>
        <hr className="c-collectionspage__border"></hr>
        <h3 className="c-collectionspage__transcriptstitle">Transcripts</h3>
        <p className="c-collectionspage__trasnscriptssubtitle">
          These transcripts were interviewed by {interviewer}
        </p>
        <div className="c-collectionspage__container">
          <Masonry
            breakpointCols={{ default: 3, 992: 1, 1280: 2, 2500: 3 }}
            columnClassName="c-collectionspage__masonrycolumn"
            className="c-collectionspage__cardcontainer"
          >
            {collectionTranscripts.map((item) => {
              const {
                id,
                transcriptTitle,
                interviewer,
                oneLineTeaser: {
                  childMarkdownRemark: { html },
                },
              } = item;
              return (
                <FeatureCard
                  key={id}
                  transcriptTitle={transcriptTitle}
                  interviewer={interviewer}
                  html={html}
                />
              );
            })}
          </Masonry>
        </div>
        <BackTopButton />
      </CollectionsWrapper>
    </Layout>
  );
};

const CollectionsWrapper = styled.section`
  display: flex;
  row-gap: 2vh;
  flex-direction: column;
  justify-contnet: center;
  text-align: center;
  padding: 2vh var(--padding-mobile);

  .c-collectionspage__blurb {
    padding: 2vh 0vw;
  }

  .c-collectionspage__border {
    border: 1px solid var(--primary-clr-100);
    margin: 1vh 0vw;
  }

  .c-collectionspage__transcriptstitle {
    margin: 1vh 0vw;
  }

  .c-collectionspage__trasnscriptssubtitle {
    font-size: 0.85rem;
  }

  .c-collectionspage__container {
    background-color: var(--primary-clr-50);
    border-radius: var(--border-rad-mobile);
  }

  .c-collectionspage__cardcontainer {
    padding: 1vh 2vw;
    width: auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .c-collectionspage__masonrycolumn {
    width: auto;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  //////////////////////////
  /////// Tablet ///////////
  //////////////////////////

  @media (min-width: 992px) {
    padding: 6vh var(--padding-desktop) 6vh var(--padding-desktop);
    row-gap: 1vh;

    .c-collectionspage__trasnscriptssubtitle {
      margin-bottom: 1vh;
    }
    .c-collectionspage__container {
      padding: 1vw;
    }

    .c-collectionspage__cardcontainer {
      padding: 0;
      margin: 0;
    }

    .c-collectionspage__masonrycolumn {
      margin: 0vh 1vw;
    }
  }

  ///////////////////////////
  ////////// Desktop ////////
  ///////////////////////////

  @media (min-width: 1280px) {
    .c-collectionspage__title {
      margin: 2vh 10vw;
    }
    .c-collectionspage__blurb {
      margin: 0vh 0vw;
    }
    .c-collectionspage__masonrycolumn {
      margin: 0;
    }

    .c-collectionspage__border {
      margin: 0;
    }
    .c-collectionspage__container {
      margin-bottom: 2vh;
    }
    .c-collectionspage__cardcontainer {
      margin: 0;
    }
    .c-collectionspage__transcriptstitle {
      margin: 2vh 0vw;
    }

    .c-collectionspage__trasnscriptssubtitle {
      margin: 0vh 0vw 4vh 0vw;
    }
  }
  ///////////////////////////
  /////// 4k Desktop ////////
  ///////////////////////////

  @media (min-width: 2500px) {
    padding: 5vh 24vw;
    .c-collectionspage__title {
      margin: 2vh 0vw;
      font-size: 4rem;
    }

    .c-collectionspage__blurb {
      margin: 1vh 0vw;
    }

    .c-collectionspage__container {
      margin: 3vh 0vw;
    }
    .c-collectionspage__masonrycolumn {
      margin: 0;
    }
    .c-collectionspage__cardcontainer {
      margin: 0vh 0vw;
    }

    .c-collectionspage__trasnscriptssubtitle {
      margin: 1vh 0vw;
      font-size: 1rem;
    }
  }
`;

export default CollectionsTemplate;
