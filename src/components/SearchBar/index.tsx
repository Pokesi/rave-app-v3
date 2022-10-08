import styled from 'styled-components';
import {
  Dispatch,
  SetStateAction,
} from 'react';

export const SearchInputWrapper = styled.input`
    z-index: 1;
    box-shadow: 2px;
    border-radius: 20px;
    border-width: 0px;
    border-color: #282c34;
    width: 100%;
    max-width: 70%;
    margin-top: 2vh;
    background-color: rgba(0,0,0,0.2);
    background-opacity: 10%;
    /* ----- */
    height: 12.5vh;
    padding-block-start: 20px;
    padding-block-end: 20px;
    padding-right: 26%;
    padding-left: 5vh;
    ${props =>`
      ${props.mobile ? `font-size: 18px;` : `font-size: 36px;`}
      ${props.mobile ? `padding: 5px 18px;` : `padding: 12px 20px;`}
    `}
    margin: 8px 0;
    margin-right: 8px;
    box-sizing: border-box;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    outline: none;
    color: #0FFFF0;
    &:focus {
      border: 3px solid rgb(20, 20, 20);
    }
    & input::placeholder {
      color: #282c34;
      font-weight: 600;
    }`;

const forbiddenCharacters = [
  "/",
  "\\",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "+",
  "=",
  "|",
  "{",
  "}",
  "<",
  ">",
  "?",
  "~",
  "."
];

export function normaliseName(name: string) {
  for (let i = 0; i < forbiddenCharacters.length; i++) {
    name = name.replace(forbiddenCharacters[i],"");
  }
  return `${name}`;
}

export const SearchComponent = ({
  input,
  setInput,
  history
}:{
  input: string,
  setInput: Dispatch<SetStateAction<string>>,
  history: any,
}) => {
  return <SearchInputWrapper
      value={input}
      onChange={(e: any) => setInput(normaliseName(e.target.value))}
      placeholder={'Find your .ftm name...'}
      id={'rave--searchbar'}
      onKeyDown={(e) => {
        console.log(e);
        if (e.keyCode === 13)
          history(`../name/${input}`)
      }}
    />
}

export const SearchComponentMobile = ({
  input,
  setInput,
  history
}:{
  input: string,
  setInput: Dispatch<SetStateAction<string>>,
  history: any,
}) => {
  return <SearchInputWrapper
      value={input}
      onChange={(e: any) => setInput(normaliseName(e.target.value))}
      placeholder={'Find your .ftm name...'}
      id={'rave--searchbar'}
      onKeyDown={(e) => {
        console.log(e);
        if (e.keyCode === 13)
          history(`../name/${input}`)
      }}
      mobile
    />
}
