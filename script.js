'use strict'

// SELECTORS
const workspaceContainer = document.querySelector('.workspace');
const btnSet = document.querySelector('.btn-set');
const btnReset = document.querySelector('.btn-reset');
const btnCrazyRainbow = document.querySelector('.btn-crazy-rainbow')
const colorPicker = document.querySelector('#color-picker')
const backgroundColorPicker = document.querySelector('#background-color-picker')

// VARIABLES
let randomColor = createRandomColor();
let currentGridNumber = 32;
let currentColor = 'black';
let currentBackgroundColor;

// INIT
const box = document.createElement('div');
box.classList.add('square');
workspaceContainer.style.backgroundColor = currentBackgroundColor;
// By default generating grid 32x32
generateGrid(32)

// FUNCTIONS

// Create grid of arbitrary number (square boxes)
function generateGrid(gridNum) {
    clearGrid();
    box.style.width = `calc(100% / ${gridNum} - 2px)`;
    for (let i = 1; i <= gridNum**2; i++) { 
         workspaceContainer.append(box.cloneNode(true));
    }
}

// Clearing (deleting) current grid
function clearGrid() {
    workspaceContainer.replaceChildren()
}

// Generate random number in a range (min-max)
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min +1) + min)
}
// Generate random color in rgb
function createRandomColor() {
    return `rgb(${randomNumber(0,255)}, ${randomNumber(0,255)}, ${randomNumber(0,255)})`
}

// Fill up background color of single box. 
function drawPixel (e)  {
    if(currentColor === `rgba(0, 0, 0, 0.9)`) {
        currentColor = 'rgb(0,0,0)';
        return e.target.style.backgroundColor = currentColor;
    }
    // If current color 'black' - progressive opacity (from transparent black to non-transparent in 10 steps)
    if (currentColor === 'black') { 
        currentColor = `rgba(0, 0, 0, 0.1)`;
        return e.target.style.backgroundColor = currentColor;
    } else if (currentColor.startsWith(`rgba(0, 0, 0, 0.`)) {
        for (let i = 1; i <9; i++) {
            if (currentColor === `rgba(0, 0, 0, 0.${i})`) {
                currentColor = `rgba(0, 0, 0, 0.${i + 1})`
                return e.target.style.backgroundColor = currentColor;
            }
        }
    } else {
        return e.target.style.backgroundColor = currentColor;
    }          
}

// Fill up with random color
function drawRainbowPixel(e) {
     e.target.style.backgroundColor = `${createRandomColor()}`;  
}


// EVENTS

workspaceContainer.addEventListener('mouseover', drawPixel)

btnSet.addEventListener('click', function (e) {
    randomColor = createRandomColor()
    const grid = Number(prompt('How much squares per side would you like?', 32));
    if (typeof grid === 'number' && grid <=100 && grid > 0) {
        generateGrid(grid)
        currentGridNumber = grid;
    } else alert('Please enter only a number between 1 and 100')
})

btnReset.addEventListener('click', function () {
    clearGrid();
    generateGrid(currentGridNumber);
    colorPicker.value = '#000000';
    backgroundColorPicker.value = '#000000';
    currentColor = 'black';
    btnCrazyRainbow.classList.remove('active');
    workspaceContainer.addEventListener('mouseover', function (e) {
        e.target.style.backgroundColor = currentColor;
    })
})

btnCrazyRainbow.addEventListener('click', function () {
    this.classList.toggle('active');
    if(this.classList.contains('active')) {
        workspaceContainer.addEventListener('mouseover', function (e) {
            e.target.style.backgroundColor = `${createRandomColor()}`;    
        })
    } else {
        workspaceContainer.addEventListener('mouseover', function (e) {
            e.target.style.backgroundColor = currentColor;
        })
    }
}) 

colorPicker.addEventListener('change', function () {
    currentColor = this.value;    
})

backgroundColorPicker.addEventListener('input', function () {
    currentBackgroundColor = this.value;
    [...workspaceContainer.children].forEach(el=>el.style.backgroundColor = currentBackgroundColor)   
})