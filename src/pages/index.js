import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import { BACard } from "../components/ba-cards";
// components
import { SimpleButton } from "../components/simplebutton";
import { CollectionCard } from "../components/featured-collections-card";
import { Head } from "../components/head";
import Layout from "../components/Layout";
import { RecentlyAdd } from "../components/recently-added";

export const query = graphql`
  {
    allContentfulHomePage {
      nodes {
        browseArchivesBlurb
        browseArchiveImageCard {
          gatsbyImageData(
            resizingBehavior: FILL
            placeholder: TRACED_SVG
            layout: CONSTRAINED
            quality: 7
          )
          browsearchivesalt: title
        }
        workshopsImageCard {
          gatsbyImageData(
            resizingBehavior: FILL
            placeholder: TRACED_SVG
            layout: CONSTRAINED
            quality: 7
          )
          workshopalt: title
        }
        workshopBlurb
        welcomeMessageImageCard {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: TRACED_SVG
            resizingBehavior: FILL
            formats: WEBP
            quality: 7
          )
          welcomealt: title
        }
        welcomeMessage {
          childMarkdownRemark {
            html
          }
        }
        projectMembersImageCard {
          gatsbyImageData(
            placeholder: TRACED_SVG
            resizingBehavior: FILL
            layout: CONSTRAINED
            quality: 7
          )
          membersalt: title
        }
        projectMembersBlurb
      }
    }
  }
`;
const Index = () => {
    const data = useStaticQuery(query);
    const homepage = data.allContentfulHomePage.nodes;

    // 1. Destructure homepage GraphQL query
    // homepage query returns an array which has a single object
    // we destructure the array first
    const [HomeItems] = homepage;

    // 2. Afterward,s we can proceed to destructure the HomeItems obj.

    const {
        welcomeMessageImageCard,
        welcomeMessageImageCard: { welcomealt },
        browseArchivesBlurb,
        workshopBlurb,
        workshopsImageCard,
        browseArchiveImageCard,
        browseArchiveImageCard: { browsearchivesalt },
        workshopsImageCard: { workshopalt },
        welcomeMessage: {
            childMarkdownRemark: { html },
        },
        projectMembersImageCard,
        projectMembersBlurb,
        projectMembersImageCard: { membersalt },
    } = HomeItems;

    // 3. Create Image Paths with getFile for images
    const pathToWelcomeImage = getImage(welcomeMessageImageCard);
    const pathToWorkshopsImage = getImage(workshopsImageCard);
    const pathToProjectMembersImage = getImage(projectMembersImageCard);
    const pathToBrowseArchivesImage = getImage(browseArchiveImageCard);

    // Metadata
    const metadata = parse(`${html}`);
    const {
        props: { children },
    } = metadata;

    return (
        <Layout>
            <Head title="Home" description={children} />
            <IndexWrapper>
                <section className="l-welcome">
                    <h1 className="c-welcome__title">Welcome Message</h1>
                    <ImageWrapper>
                        {" "}
                        <GatsbyImage
                            image={pathToWelcomeImage}
                            alt={welcomealt}
                            className="c-welcome__image"
                        ></GatsbyImage>
                    </ImageWrapper>
                    <div className="c-welcome__blurb">{parse(`${html}`)}</div>

                    <SimpleButton title="Read More" url="/about" />
                </section>
                <section className="l-featureddocs">
                    <Link to="/collections">
                        <h1 className="c-featureddocs__title">Featured Collections</h1>
                    </Link>
                    <div className="c-featureddocs__container">
                        <CollectionCard />
                    </div>
                    {/* <SimpleButton url="/collections" title={"Read More"}/> */}
                </section>
                <hr className="c-divider__one"></hr>{" "}
                <section className="l-recentlyadded">
                    <h1 className="c-recentlyadded__title">Recently Added</h1>
                    <div className="c-recentlyadded__container">
                        {" "}
                        <RecentlyAdd />
                    </div>
                </section>
                <hr className="c-divider__two"></hr>{" "}
                <section className="l-browsearchives">
                    <h1 className="c-browsearchives__title">Browse Archives</h1>
                    <div className="c-browsearchives__container">
                        <BACard type="Search" />
                    </div>
                    <ImageWrapper>
                        {" "}
                        <GatsbyImage
                            image={pathToBrowseArchivesImage}
                            alt={browsearchivesalt}
                            className="c-browsearchives__image"
                        ></GatsbyImage>
                    </ImageWrapper>
                    <p className="c-browsearchives__blurb">{browseArchivesBlurb}</p>

                    <SimpleButton title="Read More" url="/browsemap" />
                </section>
                <section className="l-workshops">
                    <h1 className="c-workshops__title">Workshops</h1>
                    <ImageWrapper>
                        {" "}
                        <GatsbyImage
                            image={pathToWorkshopsImage}
                            alt={workshopalt}
                            className="c-workshops__image"
                        ></GatsbyImage>
                    </ImageWrapper>
                    <p className="c-workshops__blurb">{workshopBlurb}</p>

                    <SimpleButton title="Read More" url="/eventlist" />
                </section>
                <section className="l-projectmembers">
                    <h1 className="c-projectmembers__title">Project Members</h1>
                    <ImageWrapper>
                        {" "}
                        <GatsbyImage
                            image={pathToProjectMembersImage}
                            alt={membersalt}
                            className="c-projectmembers__image"
                        ></GatsbyImage>
                    </ImageWrapper>
                    <p className="c-projectmembers__blurb">{projectMembersBlurb}</p>

                    <SimpleButton title="Read More" url="/about" />
                </section>
            </IndexWrapper>
        </Layout>
    );
};

const ImageWrapper = styled.article`
  margin: 0;
  display: flex;
  justify-content: center;

  .c-welcome__image {
    margin: 2vh 0vw;
    border-radius: calc(1.5rem + 4px);
    border: 1px solid var(--primary-clr-200);
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
  }

  .c-workshops__image {
    margin: 2vh 0vw;
    border-radius: calc(1.5rem + 4px);
    border: 1px solid var(--primary-clr-200);
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
  }

  .c-projectmembers__image {
    margin: 2vh 0vw;
    border-radius: calc(1.5rem + 4px);
    border: 1px solid var(--primary-clr-200);
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
  }

  .c-browsearchives__image {
    display: none; // display in mobile
    margin: 2vh 0vw;
    border-radius: calc(1.5rem + 4px);
    border: 1px solid var(--primary-clr-200);
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
  }

  @media (min-width: 992px) {
    .c-welcome__image {
      margin: 0vh 0vw 1vh 0vw;
      width: 95%;
    }
    .c-workshops__image {
      margin: 1vh 0vw;
      width: 95%;
    }
    .c-projectmembers__image {
      margin: 1vh 0vw;
      width: 95%;
    }
    .c-browsearchives__image {
      display: inline-block; //enable in non-mobile layouts
      width: 95%;
      margin: 1vh 0vw;
    }
  }

  @media (min-width: 1280px) {
    .c-welcome__image {
      width: 100%;
    }
    .c-browsearchives__image {
      width: 100%;
    }

    .c-workshops__image {
      width: 100%;
    }

    .c-projectmembers__image {
      width: 100%;
    }
  }
  @media (min-width: 2560px) {
    .c-welcome__image {
    }
    .c-browsearchives__image {
    }

    .c-workshops__image {
    }

    .c-projectmembers__image {
    }
  }
`;

const IndexWrapper = styled.main`
  padding: 0vh var(--padding-mobile) 6vh var(--padding-mobile);

  .c-divider__one {
    display: none;
  }
  .c-divider__two {
    display: none;
  }

  .c-welcome__title {
    text-align: center;
    text-decoration: none;
  }

  .c-welcome__blurb {
    text-align: justify;
    margin: 2vh 0vw;
    font-style: normal;
    font-weight: 500;
  }

  .l-featureddocs {
    margin: 6vh 0vw;
  }
  .c-featureddocs__container {
    background-color: var(--primary-clr-50);
    padding: 1.5vh 3vw;
    margin: 2vh 0vw;
    border-radius: var(--border-rad-mobile);
  }
  .c-featureddocs__title {
    text-align: center;
    margin-bottom: 3vh;
    text-decoration: none;
  }

  .l-recentlyadded {
    margin: 6vh 0vw;
  }

  .c-recentlyadded__container {
    background-color: var(--primary-clr-100);
    padding: 1.5vh 3vw;
    margin: 2vh 0vw;
    border-radius: var(--border-rad-mobile);
  }

  .c-recentlyadded__title {
    text-align: center;
    margin-bottom: 3vh;
    text-decoration: none;
  }

  .l-browsearchives {
    margin: 6vh 0vw;
  }
  .c-browsearchives__title {
    text-align: center;
    text-decoration: none;
  }

  .c-browsearchives__blurb {
    font-style: normal;
    font-weight: 500;
    text-align: center;
    margin: 2vh 0vw;
  }

  .c-browsearchives__container {
    margin: 2vh 0vw;
  }

  .c-browsearchives__button {
    display: none;
  }

 .l-workshops {
    margin: 6vh 0vw;
  }
  .c-workshops__title {
    text-align: center;
    text-decoration: none;
  }

  .c-workshops__blurb {
    margin: 2vh 0vw;
    font-style: normal;
    font-weight: 500;
    text-align: center;
  }

  .l-projectmembers {
    margin: 6vh 0vw;
  }

  .c-projectmembers__title {
    text-align: center;
    text-decoration: none;
  }

  .c-projectmembers__blurb {
    text-align: center;
    font-style: normal;
    font-weight: 500;
    margin: 2vh 0vw;
  }

  ///////////////////////////////////
  /////////// Tablet ////////////////
  ///////////////////////////////////
  @media (min-width: 992px) {
    padding: 2vh 5vw 6vh 5vw;
    max-width: 100vw;
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1.5fr;
    grid-template-auto: auto;
    grid-template-areas:
      "featured divider recentlyadded dividertwo welcome"
      "featured divider recentlyadded dividertwo browsearchives"
      "featured divider recentlyadded dividertwo workshops"
      "featured divider recentlyadded dividertwo projectmembers";

    .c-divider__one {
      display: flex;
      opacity: 0.2;
      grid-area: divider;
      height: 80%;
      margin: 5vh 2vw 20vh 2vw;
      border: 1px solid var(--primary-clr-150);
    }

    .c-divider__two {
      opacity: 0.2;
      display: flex;
      grid-area: dividertwo;
      height: 80%;
      margin: 5vh 2vw 20vh 2vw;
      border: 1px solid var(--primary-clr-150);
    }

    .l-welcome {
      display: flex;
      flex-direction: column;
      grid-area: welcome;
    }

    .c-welcome__title {
      font-size: 1.5rem;
    }

    .c-welcome__blurb {
      margin: 1vh 0vw;
      font-size: 0.85rem;
    }

    .l-featureddocs {
      grid-area: featured;
      margin: 0;
    }

    .c-featureddocs__title {
      font-size: 1.5rem;
      margin-bottom: 0;
    }

    .c-featureddocs__container {
      background-color: transparent;
      padding: 0;
    }

    .l-recentlyadded {
      grid-area: recentlyadded;
      margin: 0;
    }

    .c-recentlyadded__title {
      font-size: 1.5rem;
      margin-bottom: 2.5vh;
    }

    .c-recentlyadded__container {
      background-color: transparent;
      padding: 0;
      margin: 0vh 0vw;
      border-radius: calc(5vw + 4px);
    }

    .l-browsearchives {
      grid-area: browsearchives;
      margin: 0;
      margin-bottom: 2vh;
    }

    .c-browsearchives__title {
      font-size: 1.5rem;
    }

    .c-browsearchives__container {
      display: none;
    }

    .c-browsearchives__blurb {
      display: flex;
      margin: 1vh 0vw;
      font-size: 0.85rem;
      text-align: center;
      justify-content: center;
    }

    .c-browsearchives__button {
      display: flex;
    }

    .c-bacard__Search {
      display: none;
    }
    .c-bacard__Geography {
      display: none;
    }

    .l-workshops {
      grid-area: workshops;
      margin: 0;
      margin-bottom: 2vh;
    }

    .c-workshops__title {
      font-size: 1.5rem;
    }

    .c-workshops__blurb {
      margin: 1vh 0vw;
      font-size: 0.85rem;
    }
    .l-projectmembers {
      grid-area: projectmembers;
      margin: 0;
      margin-bottom: 2vh;
    }

    .c-projectmembers__title {
      font-size: 1.5rem;
    }

    .c-projectmembers__blurb {
      margin: 1vh 0vw;
      font-size: 0.85rem;
    }
  }
  ////////////////////////////////
  ////////// Desktop /////////////
  ////////////////////////////////
  @media (min-width: 1280px) {
    padding: 4vh 10vw;

    .c-divider__one {
      margin: 5vh 0.5vw 20vh 0.5vw;
    }
    .c-divider__two {
      margin: 5vh 0.5vw 20vh 0.5vw;
    }

    .l-welcome {
      margin: 0vh 1vw 0vh 1vw;
    }
    .c-welcome__title {
      font-size: 1.7rem;
    }
    .c-welcome__blurb {
      margin: 3vh 0vw 1vh 0vw;
      p {
        line-height: 1.215;
        font-size: 0.9rem;
      }
    }
    .c-featureddocs__title {
      font-size: 1.7rem;
    }

    .c-recentlyadded__title {
      font-size: 1.7rem;
    }

    .l-browsearchives {
      margin: 0vh 1vw 0vh 1vw;
    }
    .c-browsearchives__title {
      font-size: 1.7rem;
      margin-bottom: 2vh;
      font-size: 2rem;
    }
    .c-browsearchives__container {
      margin-bottom: 3vh;
    }
    .c-browsearchives__blurb {
      margin: 3vh 0vw 1vh 0vw;
      text-align: center;
      justify-content: center;
      font-size: 0.9rem;
    }

    .l-workshops {
      margin: 0vh 1vw 0vh 1vw;
    }

    .c-workshops__title {
      margin-bottom: 2vh;
      font-size: 1.7rem;
    }

    .c-workshops__blurb {
      margin: 3vh 0vw 1vh 0vw;
      font-size: 0.9rem;
    }

    .l-projectmembers {
      margin: 0vh 1vw 0vh 1vw;
    }
    .c-projectmembers__title {
      margin-bottom: 2vh;
      font-size: 1.7rem;
    }

    .c-projectmembers__blurb {
      font-size: 0.9rem;
      margin: 3vh 0vw 1vh 0vw;
    }
  }

  ///////////////////////////////////
  ///////// 4k Display //////////////
  ///////////////////////////////////
  @media (min-width: 2500px) {
    padding: 2vh 20vw 4vh 20vw;
    .c-divider__one {
      margin: 5vh 0.25vw 20vh 0.25vw; 
    }
    .c-divider__two {
      margin: 5vh 0.25vw 20vh 0.25vw;  
    }
 
    .l-welcome,
    .l-workshops,
    .l-browsearchives,
    .l-projectmembers {
      margin-bottom: 1vh;
    }

    .c-welcome__blurb,
    .c-browsearchives__blurb,
    .c-workshops__blurb,
    .c-projectmembers__blurb {
      margin-bottom: 0;
    }
  }

    .c-featureddocs__title,
    .c-recentlyadded__title,
    .c-welcome__title {
      margin-bottom: 2.5vh;
    }

    .c-welcome__blurb {
    }
  }
`;

export default Index;
