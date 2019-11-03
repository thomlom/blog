import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
  html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace, monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type="button"],[type="reset"],[type="submit"],button{-webkit-appearance:button}[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}
  @import url('https://rsms.me/inter/inter.css');

  .visually-hidden { 
    position: absolute !important;
    height: 1px; 
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap; /* added line */
  }

  :root {
    --grey-900: hsl(209, 61%, 16%);
    --grey-800: hsl(211, 39%, 23%);
    --grey-700: hsl(209, 34%, 30%);
    --grey-600: hsl(209, 28%, 39%);
    --grey-500: hsl(210, 22%, 49%);
    --grey-400: hsl(209, 23%, 60%);
    --grey-300: hsl(211, 27%, 70%);
    --grey-200: hsl(210, 31%, 80%);
    --grey-100: hsl(212, 33%, 89%);
    --grey-white: hsl(210, 36%, 96%);

    --blue-900: hsl(205, 100%, 21%);
    --blue-600: hsl(205, 76%, 39%);
    --blue-white: hsl(205, 79%, 92%);

    --small-radius: 5px;
    --medium-radius: 10px;

    --m-1: 0.25rem;
    --m-2: 0.5rem; /* 8px */
    --m-3: 0.75rem;
    --m-4: 1rem; /* 16px */
    --m-5: 1.5rem;
    --m-6: 2rem; /* 32 px */
    --m-7: 3rem;
    --m-8: 4rem;

    --p-1: 0.25rem;
    --p-2: 0.5rem; /* 8px */
    --p-3: 0.75rem;
    --p-4: 1rem; /* 16px */
    --p-5: 1.5rem;
    --p-6: 2rem; /* 32 px */
    --p-7: 3rem;
    --p-8: 4rem;

    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 1.875rem;
    --text-4xl: 2.25rem;
    --text-5xl: 3rem;

    --shadow-small: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-large: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);

    --tablet: 768px;
    --phone: 480px;
  }

  html {
    font-family: 'Inter', sans-serif;
    background-color: var(--grey-white);
  }
`;

export default GlobalStyle;
