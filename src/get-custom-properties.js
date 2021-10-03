// Get a value of known custom property
/*
const colorAccent = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-accent');
*/

// Get the css-property given element & prop-name
export const getCSSProp = (propName) => getComputedStyle(document.documentElement).getPropertyValue(propName);

// Returns stylesheets array with 3rd party sheets discarded
const getOwnStyleSheets = (styleSheets, url) => {
  if (!url) return styleSheets

  return styleSheets.filter(styleSheet => (
    !styleSheet.href || styleSheet.href.includes(url)
  ))
}

// Returns rules array of all stylesheets provided
const getRulesFromStyleSheets = (styleSheets) => (
  styleSheets.reduce((rulesList, sheet) => (
    rulesList.concat(...sheet.cssRules)
  ), [])
)

const isStyleRule = (rule) => rule.type && rule.type === 1

const getCSSStyleRules = (cssRules) => (
  cssRules.filter(isStyleRule)
)

const getCSSCustomPropRules = (cssStyleRules) => (
  cssStyleRules.reduce((customProps, rule) => (
    customProps.concat(
      [...rule.style]
        .filter(styleName => (
          styleName.trim().startsWith("--")
        ))
        .map(prop => (
          [prop, rule.style.getPropertyValue(prop).trim()]
        ))
    )
  ), [])
)

/* STEPS */
export function getCSSCustomProperties() {
  // 1 - get all stylesheets
  const allStyleSheets = [...document.styleSheets]
  // 2 - discard 3rd party stylesheets
  const ownStyleSheets = getOwnStyleSheets(allStyleSheets, window.location.origin)
  // 3 - get the rules for remaining stylesheets
  const cssRules = getRulesFromStyleSheets(ownStyleSheets)
  // 5 - get style rules
  const cssStyleRules = getCSSStyleRules(cssRules)
  // 6 - get CSS Custom Properties in [key, val] pair-array
  const cssCustomPropertiesList = getCSSCustomPropRules(cssStyleRules)

  return cssCustomPropertiesList;
}