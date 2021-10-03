const hueStep = 2;
const saturationStep1 = 0.16;
const saturationStep2 = 0.05;
const brightnessStep1 = 0.05;
const brightnessStep2 = 0.15;
const lightColorCount = 5;
const darkColorCount = 4;

import { antColors } from './ant-colors.js'
import { getCSSCustomProperties, getCSSProp } from './get-custom-properties.js'
/*
// Dark theme color mapping table
const darkColorMap = [
    { index: 7, opacity: 0.15 },
    { index: 6, opacity: 0.25 },
    { index: 5, opacity: 0.3 },
    { index: 5, opacity: 0.45 },
    { index: 5, opacity: 0.65 },
    { index: 5, opacity: 0.85 },
    { index: 4, opacity: 0.9 },
    { index: 3, opacity: 0.95 },
    { index: 2, opacity: 0.97 },
    { index: 1, opacity: 0.98 },
  ];
*/

function createColorBox(colorValue) {
  const colorEle = document.createElement('span')

  colorEle.classList.add('color-box')
  colorEle.style.backgroundColor = `var(${colorValue})`
  colorEle.setAttribute(
    'aria-label',
    getCSSProp(colorValue).trim()
  )
  colorEle.setAttribute(
    'data-microtip-pos',
    'right'
  )
  colorEle.setAttribute(
    'role',
    'tooltip'
  )
  return colorEle;
}

function createAntColorBox(color, index) {
  const colorEle = document.createElement('span')

  colorEle.classList.add('color-box')
  colorEle.style.backgroundColor = antColors[color][index]
  colorEle.setAttribute(
    'aria-label',
    antColors[color][index]
  )
  colorEle.setAttribute(
    'data-microtip-pos',
    'right'
  )
  colorEle.setAttribute(
    'role',
    'tooltip'
  )

  return colorEle;
}

const colors = getCSSCustomProperties()
  .filter(cssProperty => (!cssProperty[0].includes('hue')))
  .map(cssProperty => cssProperty[0])

const colorPalette = {
  red: colors.filter(color => color.startsWith('--red')),
  blue: colors.filter(color => color.startsWith('--blue')),
  volcano: colors.filter(color => color.startsWith('--volcano')),
  orange: colors.filter(color => color.startsWith('--orange')),
  gold: colors.filter(color => color.startsWith('--gold')),
  lime: colors.filter(color => color.startsWith('--lime')),
  green: colors.filter(color => color.startsWith('--green')),
  cyan: colors.filter(color => color.startsWith('--cyan')),
  geekblue: colors.filter(color => color.startsWith('--geekblue')),
  purple: colors.filter(color => color.startsWith('--purple')),
  magenta: colors.filter(color => color.startsWith('--magenta')),
}

const colorBoxesElement = document.getElementsByClassName('color-boxes')[0]

Object.entries(colorPalette).forEach(([color, colorRange]) => {

  const colorBoxContainer = document.createElement('div');
  colorBoxContainer.classList.add('colorbox-container');

  const colorBoxTitle = document.createElement('h4');
  colorBoxTitle.textContent = color;
  colorBoxTitle.classList.add('color-box-title');

  const colorBox = document.createElement('div');
  colorBox.classList.add('color-box-list')
  colorRange.forEach((colorRangeItem, index) => {
    const colorEle1 = createColorBox(colorRangeItem)
    const colorEle2 = createAntColorBox(color, index)
    colorBox.appendChild(colorEle1)
    colorBox.appendChild(colorEle2)
  })

  colorBoxContainer.appendChild(colorBoxTitle);
  colorBoxContainer.appendChild(colorBox);
  colorBoxesElement.appendChild(colorBoxContainer);
})
