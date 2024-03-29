import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { BgImage } from "gbimage-bridge";
import parse from "html-react-parser";
import React from "react";
import sanitize from "sanitize-html";
import sanitze from "sanitize-html";
import styled from "styled-components";

import { DefaultButton } from "../components/button";
import { Head } from "../components/head";
import Layout from "../components/Layout";

export const query = graphql`
  {
    contentfulAboutUsPage {
      theArchives {
        childMarkdownRemark {
          thearchives: html
        }
      }
      firstImage {
        gatsbyImageData(
          placeholder: TRACED_SVG
          layout: FULL_WIDTH
          breakpoints: 992
        )
      }
      id
      principalInvestigator
      principalInvestigatorBio {
        childMarkdownRemark {
          PIBio: html
        }
      }
      principalInvestigatorImage {
        gatsbyImageData(
          aspectRatio: 1.5
          placeholder: TRACED_SVG
          resizingBehavior: THUMB
          cropFocus: TOP
          formats: WEBP
          layout: CONSTRAINED
        )
      }
      formerCurrentPostdoctoralFellows
      projectMembers {
        childMarkdownRemark {
          projectmembers: html
        }
      }
      projectMembersList
      workshopParticipants
      overseasResearchers
      phDMaUndergraduateStudents
      researchAssistant
      developerDesigner
      secondImage {
        gatsbyImageData(
          aspectRatio: 1.5
          layout: FULL_WIDTH
          placeholder: TRACED_SVG
        )
      }
      whoWeAre {
        childMarkdownRemark {
          whoweare: html
        }
      }
      ourFocus {
        childMarkdownRemark {
          ourfocus: html
        }
      }
      ourFocusImage {
        gatsbyImageData(
          placeholder: TRACED_SVG
          layout: CONSTRAINED
          aspectRatio: 1.5
          breakpoints: [200, 300, 992]
        )
      }
    }
  }
`;

const About = ({ data }) => {
  const aboutUs = data.contentfulAboutUsPage;

  const {
    firstImage,
    secondImage,
    ourFocusImage,
    principalInvestigatorImage,
    principalInvestigator,
    principalInvestigatorBio: {
      childMarkdownRemark: { PIBio },
    },
    formerCurrentPostdoctoralFellows,
    workshopParticipants,
    overseasResearchers,
    phDMaUndergraduateStudents,
    projectMembersList,
    developerDesigner,
    researchAssistant,
    ourFocus: {
      childMarkdownRemark: { ourfocus },
    },

    whoWeAre: {
      childMarkdownRemark: { whoweare },
    },
    theArchives: {
      childMarkdownRemark: { thearchives },
    },
    projectMembers: {
      childMarkdownRemark: { projectmembers },
    },
  } = aboutUs;

  // use getImage function to provide fallback class if NO iamge exists
  const pathToFirstImage = getImage(firstImage);
  const pathToFocusImage = getImage(ourFocusImage);
  const pathToSecondImage = getImage(secondImage);
  const pathToPrincipalImage = getImage(principalInvestigatorImage);

  // sanitize HTML for parsing
  const sanitizePIBio = sanitize(PIBio, {
    allowedTags: ["b", "i", "em", "strong", "a"],
  });
  const sanitizeWhoWeAre = sanitize(whoweare, {
    allowedTags: ["b", "i", "em", "strong", "a", "p"],
  });
  const sanitizeOurFocus = sanitize(ourfocus, {
    allowedTags: ["b", "i", "em", "strong", "a", "p"],
  });
  const sanitizeTheArchives = sanitize(thearchives, {
    allowedTags: ["b", "i", "em", "strong", "a", "p"],
  });
  const sanitizeProjectMembers = sanitize(projectmembers, {
    allowedTags: ["b", "i", "em", "strong", "a", "p"],
  });
  // Metadata
  const metadata = parse(`${sanitizeWhoWeAre}`);
  const {
    props: { children },
  } = metadata;

  return (
    <Layout>
      <AboutWrapper>
        <Head title="About Us" description={children} />
        <FirstStyledBackgroundImage
          Tag="div"
          image={pathToFirstImage}
          className="c-whoweare__bgimage"
        >
          {" "}
          <section className="l-whoweare">
            <div className="c-whoweare__container">
              <h1 className="c-whoweare__title">Who We Are</h1>
              <div className="c-whoweare__content">
                {parse(`${sanitizeWhoWeAre}`)}
              </div>
            </div>
          </section>
        </FirstStyledBackgroundImage>
        <section className="l-ourfocus bg--light">
          <h1 className="c-ourfocus__title">Our Focus</h1>
          <GatsbyImage
            image={pathToFocusImage}
            alt="our_focus_image"
            className="c-ourfocus__image"
          ></GatsbyImage>
          <div className="c-ourfocus__content">
            {parse(`${sanitizeOurFocus}`)}
          </div>
        </section>
        <SecondStyledBackgroundImage Tag="div" image={pathToSecondImage}>
          {" "}
          <section className="l-thearchives">
            <div className="c-thearchives__container">
              {" "}
              <h1 className="c-thearchives__title">The Archives</h1>
              <div className="c-thearchives__content">
                {parse(`${sanitizeTheArchives}`)}
              </div>
              <DefaultButton url="/browsearchives" title="Browse Archives" />
            </div>
          </section>
        </SecondStyledBackgroundImage>
        <section className="l-projectmembers">
          <h1 className="c-projectmembers__title">Project Members</h1>
          <div className="c-projectmembers__content">
            {parse(`${sanitizeProjectMembers}`)}
          </div>
          <article className="c-projectmembers__info">
            {" "}
            <div className="c-projectmembers__pi">
              <GatsbyImage
                image={pathToPrincipalImage}
                alt="principal_investigator_image"
                className="c-projectmembers__piImage"
              ></GatsbyImage>
              <h4 className="c-projectmembers__piTitle">
                Principal Investigator
              </h4>
              <p className="c-projectmembers__piName">
                {principalInvestigator}
              </p>
              <p className="c-projectmembers__pibio">
                {parse(`${sanitizePIBio}`)}
              </p>
            </div>
            <div className="c-projectmembers__fellows">
              <h4 className="c-projectmembers__fellowsTitle">
                Postdoctoral Fellows
              </h4>
              {formerCurrentPostdoctoralFellows.map((item, index) => {
                return (
                  <p className="c-projectmembmers__fellowNames" key={index}>
                    {item}
                  </p>
                );
              })}
            </div>
            <div className="c-projectmembers__RA">
              <h4 className="c-projectmembers__RATitle">Research Assistant</h4>
              <p className="c-projectmembers__RAName">{researchAssistant}</p>
            </div>
            <div className="c-projectmembers__devdesign">
              <h4 className="c-projectmembers__developerdesignerTitle">
                Developer & Designer
              </h4>
              <p className="c-projectmembers__developerdesignerName">
                {developerDesigner}
              </p>
            </div>
            <div className="c-projectmembers__phdmastudents">
              <h4 className="c-projectmembers__phdmaTitle">
                Student Researchers{" "}
              </h4>
              {phDMaUndergraduateStudents.map((item, index) => {
                return (
                  <p
                    className="c-projectmembers__phdmastudentsnames"
                    key={index}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
            <div className="c-projectmembers__researchers">
              <h4 className="c-projectmembers__researchersTitle">
                Overseas Researchers
              </h4>{" "}
              {overseasResearchers.map((item, index) => {
                return (
                  <p className="c-projectmembmers__researcherNames" key={index}>
                    {item}
                  </p>
                );
              })}
            </div>
            <div className="c-projectmembers__workshopparticipants">
              <h4 className="c-projectmembers__workshopparticpantstitle">
                Workshop Participants
              </h4>{" "}
              <div className="c-projectmembers__participantscontainer">
                {workshopParticipants.map((item, index) => {
                  return (
                    <p
                      className="c-projectmembmers__particpantnames"
                      key={index}
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          </article>
          <button className="c-projectmembers__contributebtn">
            <Link
              to="/contribute
         "
            >
              Looking to contribute?
            </Link>
          </button>
        </section>
      </AboutWrapper>
    </Layout>
  );
};

const FirstStyledBackgroundImage = styled(BgImage)`
  ::before {
    filter: brightness(45%) blur(1px) !important;
  }
  ::after {
    filter: brightness(45%) blur(1px) !important;
  }
`;

const SecondStyledBackgroundImage = styled(BgImage)`
  ::before {
    filter: brightness(65%) blur(1px) !important;
  }
  ::after {
    filter: brightness(65%) blur(1px) !important;
  }

  @media (min-width: 992px) {
    ::after {
      filter: brightness(50%) !important;
    }
  }
`;

const AboutWrapper = styled.main`
  line-height: 1.125rem;
  section {
    padding: 4vh var(--padding-mobile) 6vh var(--padding-mobile);
  }
  .c-whoweare__title {
    text-align: center;
    margin-bottom: 6vh;
    color: var(--primary-clr-50);
  }

  .c-whoweare__content {
    font-size: 0.875rem;
    margin: 9vh 0vw;

    p {
      color: var(--primary-clr-50);
      font-size: 0.875rem;
      text-align: justify;
    }
  }

  .c-ourfocus__title {
    text-align: center;
    margin-bottom: 6vh;
  }

  .c-ourfocus__image {
    border: var(--imagecard-border-clr);
    border-radius: var(--imagecard-border-radius);
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
    max-width: 100%;
  }

  .c-ourfocus__content {
    font-size: 0.875rem;
    text-align: justify;
    margin: 4vh 0vw;

    p {
      margin: 1vh 0vw;
    }
  }

  .c-thearchives__title {
    text-align: center;
    margin-bottom: 6vh;
    color: var(--primary-clr-100);
  }

  .c-thearchives__content {
    font-size: 0.875rem;
    text-align: justify;
    margin: 9vh 0vw;
    p {
      color: var(--primary-clr-50);
    }
  }

  .l-projectmembers {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .c-projectmembers__title {
    text-align: center;
    margin-bottom: 6vh;
  }

  .c-projectmembers__content {
    font-size: 0.875rem;
    text-align: justify;
    margin: 2vh 0vw;
  }

  .c-projectmembers__info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 4vh 0vw 0vh 0vw;

    * {
      text-align: center;
      margin: 1vh 0vw;
    }
  }

  .c-projectmembers__pi > * {
    margin: 3vh 0vw;
  }
  .c-projectmembers__piImage {
    /* border: var(--imagecard-border-clr); */
    border-radius: var(--imagecard-border-radius);
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
    max-width: 80%;
    margin: 0;
    padding: 0;
  }

  .c-projectmembers__piName {
    margin: 2vh 0vw;
  }

  .c-projectmembers__pibio {
    text-align: justify;
    font-size: 0.875rem;
  }
  .c-projectmembers__contributebtn {
    margin: 4vh 0vw;
    display: flex;
    align-items: center;
    font-family: "Lora", serif;
    font-style: normal;
    font-weight: bold;
    justify-content: center;
    background-color: transparent;
    border: none;

    a {
      text-align: center;
    }
  }

  /////////////////////////////////////////
  //////////// Tablet /////////////////////
  /////////////////////////////////////////

  @media (min-width: 992px) {
    line-height: 1.5rem;
    .l-whoweare {
      padding: 10vh;
    }
    .c-whoweare__content {
      margin: 4vh 0vw;
      p {
        font-size: 1rem;
      }
    }

    .l-ourfocus {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    .c-ourfocus__title {
      margin-bottom: 3vh;
    }
    .c-ourfocus__image {
      margin: 0vh 10vw;
      padding: 0;
      height: 400px;
    }

    .c-ourfocus__content {
      margin: 2vh 0vw;
      font-size: 1rem;

      p {
        margin: 1.2vh 0vw;
      }
    }

    .l-thearchives {
      padding: 10vh;
    }

    .c-thearchives__content {
      font-size: 1rem;
    }

    .c-projectmembers__content {
      font-size: 1rem;
      margin: 0;
    }
    .c-projectmembers__info {
      flex: 1 1 auto;
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: auto;
      row-gap: 0vh;
      grid-template-areas:
        "pi pi "
        "fellows researchers "
        "phdma researchers "
        "ra researchers "
        "devdes researchers "
        "participants participants";
      * {
        margin: 0.5vh 0vw;
      }
    }

    .c-projectmembers__pi {
      margin: 4vh 0vw;
      grid-area: pi;
      align-self: center;
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: auto;
      grid-template-areas:
        "image title"
        "image name"
        "bio bio";
      * {
        margin: 0;
      }
    }

    .c-projectmembers__piImage {
      grid-area: image;
      margin-left: 2vw;
    }

    .c-projectmembers__piTitle {
      align-self: end;
      grid-area: title;
    }
    .c-projectmembers__piName {
      align-self: start;
      grid-area: name;
      margin-top: 1vh;
    }
    .c-projectmembers__pibio {
      grid-area: bio;
      margin: 3vh 0vw;
    }

    .c-projectmembers__fellows {
      margin: 0vh 0vw;
      grid-area: fellows;
      align-self: start;

      }
    }

    .c-projectmembers__RA {
      margin: 0vh 0vw;
      grid-area: ra;
    }

    .c-projectmembers__devdesign {
      margin: 0vh 0vw;
      grid-area: devdes;
      align-self: start;
    }

    .c-projectmembers__researchers {
      margin: 0vh 0vw;
      grid-area: researchers;
      align-self: start;
    }

    .c-projectmembers__phdmastudents {
      grid-area: phdma;
      align-self: start;
      margin: 0;
    }
    .c-projectmembers__workshopparticipants {
      grid-area: participants;
      margin: 1vh 9vw;
    }

    .c-projectmembers__participantscontainer {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      max-height: 550px;
    }

    .c-projectmembers__contributebtn {
      margin: 2vh 0vw 0vh 0vw;
    }
  }

  ///////////////////////////////////////
  /////////// Desktop ///////////////////
  ///////////////////////////////////////
  @media (min-width: 1280px) {
    line-height: 1.55rem;

    .l-whoweare {
      padding: 0;
      display: grid;
      min-height: 100vh;
      align-content: center;
    }

    .c-whoweare__content {
      margin: 8vh 18vw 8vh 18vw;

      p {
        font-size: 1.2rem;
      }
    }

    .l-ourfocus {
      min-height: 100%;
      display: grid;
      padding: 7vh 8vw;
      align-items: center;
      justify-items: center;
      column-gap: 5vw;
      grid-template-rows: auto;
      grid-template-columns: auto;
      grid-template-areas:
        "title title"
        "image content";
    }

    .c-ourfocus__title {
      margin-top: 0;
      margin-bottom: 4vh;
      grid-area: title;
    }
    .c-ourfocus__image {
      height: 300px;
      grid-area: image;
    }

    .c-ourfocus__content {
      grid-area: content;
      p {
        font-size: 1.2rem;
      }
    }

    .l-thearchives {
      padding: 0;
      display: flex;
      align-items: center;
      min-height: 100vh;
    }

    .c-thearchives__content {
      margin: 8vh 18vw 8vh 18vw;
      p {
        font-size: 1.2rem;
      }
    }
    .l-projectmembers {
      margin: 0 0 6vh 0;
      padding: 0;
    }

    .c-projectmembers__title {
      padding: 10vh 18vw 0vh 18vw;
      margin-top: 0;
    }

    .c-projectmembers__content {
      margin: 2vh 0vw;
      padding: 0vh 18vw;
      p {
        font-size: 1.2rem;
        margin: 2vh 0vw;
      }
    }

   .c-projectmembers__info {
      margin: 0vh 14vw 5vh 14vw;
      grid-template-rows: auto;
      grid-template-columns: .8fr .8fr 1fr;
      grid-template-areas:
        "pi pi pi "
        "fellows researchers participants "
        "phdma researchers participants  "
        "ra researchers participants  "
        "devdes researchers  participants ";
    }
    .c-projectmembers__piName,
    .c-projectmembers__RAName,
    .c-projectmembmers__fellowNames,
    .c-projectmembers__developerdesignerName,
    .c-projectmembmers__researcherNames,
    .c-projectmembmers__particpantnames {
      font-size: 1rem;
    }
    .c-projectmembers__fellowsTitle,
    .c-projectmembers__phdmaTitle,
    .c-projectmembers__RATitle,
    .c-projectmembers__developerdesignerTitle,
    .c-projectmembers__researchersTitle,
    .c-projectmembers__workshopparticpantstitle {
      margin-bottom: 2vh;

    }

    .c-projectmembers__pi {
      margin: 7vh 4vw;
    }
    .c-projectmembers__pibio {
      font-size: 1rem;
    }

    .c-projectmembers__piImage {
      margin: 0 0 1vh 4vw;
    }

    .c-projectmembers__fellows {
      p {
    text-align: left;
      }
    }
    .c-projectmembers__fellowsTitle {
      text-align: left;
    }

    .c-projectmembers__RA {
      p {
    text-align: left;
      }
    }
    .c-projectmembers__RATitle {
      text-align: left;

    }

    .c-projectmembers__devdesign {
      p {
    text-align: left;
      }
    }

    .c-projectmembers__developerdesignerTitle {
      text-align: left;

    }
    .c-projectmembers__phdmastudents {
      p {
        text-align: left;
      }
    }
    .c-projectmembers__phdmaTitle {
      text-align: left;
    }
    .c-projectmembers__researchers {
      p {
        text-align: left;
      }
    }
    .c-projectmembers__researchersTitle {
      text-align: left;
    }


    .c-projectmembers__workshopparticipants {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      margin: 0;
    }
    .c-projectmembers__workshopparticpantstitle {
      text-align: left;

    }
    .c-projectmembers__participantscontainer {
      margin: 0;
      display: flex;
      max-height: 750px;
      flex-directijn: column;
      max-height: 640px;
      p {
        margin: 0.5vh 0.2vw 0 0;
        text-align: left;
      }
    }
    .c-projectmembers__contributebtn {
      margin: 2vh 0vw;
      a {
        font-size: 1.2rem;
      }
    }
  }
  ///////////////////////////////////////
  //////// 4k Desktop ///////////////////
  ///////////////////////////////////////
  @media (min-width: 2500px) {
    h1 {
      font-size: 4.5rem;
    }

    line-height: 1.65rem;
    .l-whoweare {
      padding: 0vh 10vw;
    }

    .c-whoweare__content > h1 {
      margin: 0;
    }
    .c-whoweare__content {
      p {
        font-size: 1.25rem;
      }
    }

    .l-ourfocus {
      padding: 9vh 20vw;
    }
    .c-ourfocus__title {
      margin-bottom: 4vh;
    }
    .c-ourfocus__content {
      p {
        font-size: 1.25rem;
        margin: 2vh 0vw;
      }
    }
    .c-ourfocus__image {
      width: 512px;
      margin: 0;
    }
    .l-thearchives {
      padding: 9vh 10vw;
    }

    .c-thearchives__content {
      margin: 8vh 18vw 8vh 18vw;
      p {
        font-size: 1.25rem;
      }
    }

    .l-projectmembers {
    }

    .c-projectmembers__content {
      margin: 4vh 28vw;
      padding: 0;
      p {
        margin: 0;
        font-size: 1.25rem;
      }
    }

    .c-projectmembers__info {
      margin: 4vh 25vw;
    }
    .c-projectmembers__participantscontainer {
      max-height: 780px;
      p {
        margin-left: 1vw;
      }
    }
  }
`;

export default About;
