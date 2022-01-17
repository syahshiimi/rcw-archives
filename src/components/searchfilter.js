import { IconContext } from "@react-icons/all-files/lib"
import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { TiArrowDown } from "@react-icons/all-files/Ti/TiArrowDown"

import { useStaticQuery } from "gatsby"
import { graphql } from "gatsby"

export const query = graphql`
  {
    allContentfulSearchFilterList {
      nodes {
        contentful_id
        countryList
        interviewerList
      }
    }
  }
`

//////////////////////////////
/// Main Filter Component ///
//////////////////////////////
export const SearchFilter = () => {
  return (
    <SearchFilterWrapper>
      <button className="c-searchfilter___header">
        <h5 className="c-searchfilter__title">Search Filter</h5>
        <IconContext.Provider value={{ className: "c-searchfilter__icon" }}>
          <TiArrowDown />
        </IconContext.Provider>
      </button>
      <div className="c-searchfilter__bodycontainer">
        <SubFilter type="Interviewer" />
        <SubFilter type="Countries" />
      </div>
    </SearchFilterWrapper>
  )
}

//////////////////////////////
/////// Sub Filters //////////
/////////////////////////////

function SubFilter({ type }) {
  const data = useStaticQuery(query)
  const interviewers = data.allContentfulSearchFilterList.nodes

  // 1. Destructre array to return the object within it
  const [item] = interviewers

  // 2. Destructure object to get the values
  const { interviewerList, countryList } = item

  // 3. Conditionally render
  // either 'Interviewers' or 'Countries'

  let FilterType
  if (type == "Interviewer") {
    FilterType = interviewerList.map((item, index) => {
      return (
        <p className="c-subfilter__${item}" key={index}>
          {item}
        </p>
      )
    })
  } else {
    FilterType = countryList.map((item, index) => {
      return (
        <p className="c-subfilter__${item}" key={index}>
          {item}
        </p>
      )
    })
  }

  // 4. Dropdown Click Effects

  // 4.1 Hide filter accordion as the initial state, where show = false
  // and also for icon direction where we start wtih southfacing
  const [show, setShow] = useState(false)
  const [normal, setRotate] = useState(true)

  // 4.2 Create button handler for onclick events
  const handleClick = () => {
    setShow(!show) // returns the opposite upon click
    //    setRotate(!normal) // returns the opposite upon click
  setRotate(!normal) // reverse thhe arrow position
  }

  // 4.3  Create CSS Modifiers with useRef

  const FilterHeader = useRef(null)
  const FilterRef = useRef(null)
  const FilterBody = useRef(null)
  const rotateArrowIcon = normal
    ? "c-subfilter__icon"
    : "c-subfilter__icon pulled"

  // 4.4 useEffect() to apply effects onto selected DOM tags
  useEffect(() => {
    const FilterListHeight = FilterRef.current.getBoundingClientRect().height

    if (show) {
      console.log(`${FilterListHeight}`)
      FilterBody.current.style.height = `${FilterListHeight}px`
      FilterBody.current.style.paddingBottom = `3vh`
      FilterBody.current.style.paddingTop = `1vh`
      FilterBody.current.style.border = `2px solid var(--primary-clr-200)`
      FilterHeader.current.style.borderRadius = ` calc(2rem + 1px) calc(2rem + 1px) 0px 0px`
    } else {
      FilterBody.current.style.height = "0px"
      FilterBody.current.style.padding = `0px`
      FilterBody.current.style.border = `0px`
      FilterHeader.current.style.borderRadius = `calc(2rem + 2px)`
    }
  }, [show])
  return (
    <SubFilterWrapper className="c-subfilter">
      <h5 className="c-subfilter__title">{type}</h5>
      <button
        className="c-subfilter__header"
        ref={FilterHeader}
        onClick={handleClick}
      >
        <p className="c-subfilter__selected">None</p>
        <IconContext.Provider value={{ className: rotateArrowIcon }}>
          <TiArrowDown />
        </IconContext.Provider>
      </button>

      <div className="c-subfilter__listcontainer" ref={FilterBody}>
        <div className="c-subfilter__list" ref={FilterRef}>
          {FilterType}
        </div>
      </div>
    </SubFilterWrapper>
  )
}
const SearchFilterWrapper = styled.div`
  @media (min-width: 1280px) {
    margin: 4vh 8vw !important;

    .c-searchfilter___header {
      display: flex;
      flex-direction: row-reverse;
      padding: 1.5vh 4vw;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      flex: 1 1 auto;

      /* styling */
      background-color: var(--primary-clr-200);
      border-radius: 40px;
      transition: all 0.5s ease-in-out 0.2s;
    }

    .c-searchfilter__title {
      color: var(--primary-clr-100);
    }

    .c-searchfilter__icon {
      color: var(--primary-clr-100);
      width: 3rem;
      height: 3rem;
    }

    .c-searchfilter__bodycontainer {
      display: flex;
      margin-top: 1vh;
      box-shadow: 0px 4px 9px rgba(51, 53, 51, 0.35);
      column-gap: 4vw;
      padding: 2vh 4vw;
      background-color: var(--primary-clr-50);
      border-radius: 0 0 calc(2rem + 2px) calc(2rem + 2px);
      align-items: start;
    }
  }
`

const SubFilterWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  padding: 0 !important;
  @media (min-width: 1280px) {
    .c-subfilter__title {
      text-decoration: underline;
    }
    .c-subfilter__title {
      text-align: left;
    }

    .c-subfilter__header {
      background-color: var(--secondary-clr-250);
      border: 2px solid var(--primary-clr-200);
      display: flex;
      flex-direction: row;
      margin: 1vh 0vw;
      padding: 1vh 2vw;
      justify-content: space-between;
      align-items: center;
      column-gap: 5vw;
      transition: var(--transition);
    }

    .c-subfilter__icon {
      height: 2rem;
      transition: var(--transition);
      width: 2rem;
      
    }
    .pulled {
        transform: rotate(180deg);
      transition: var(--transition);
      }

    .c-subfilter__selected {
      font-size: 1rem;
    }
    .c-subfilter__listcontainer {
      transition: var(--transition);
      background-color: var(--primary-clr-100);
      border-radius: 0 0 calc(2rem + 2px) calc(2rem + 2px);
      border: 2px solid var(--primary-clr-200);
      overflow: hidden;
      p {
        margin: 1vh 0vw;
      }
    }
  }
`
