import React from "react"
import styled from "styled-components"

const SubFilter = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <SubFilterWrapper>
      {filters.map((filter) => (
        <li
          key={filter}
          className={activeFilter === filter ? "active" : ""}
          onClick={() => onFilterChange(filter)}
        >
          {filter.toUpperCase()}
        </li>
      ))}
    </SubFilterWrapper>
  )
}

const SubFilterWrapper = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 10px 0;

  li {
    margin: 0 10px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    background: #f2efef;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background: #25afb4;
      color: white;
    }

    &.active {
      background: #25afb4;
      color: white;
    }
  }
`

export default SubFilter
