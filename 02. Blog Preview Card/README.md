# Frontend Mentor - Blog Preview Card solution

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

This is a solution to the Blog Preview Card challenge on Frontend Mentor.


### Screenshot

![Blog-Preview-Card.png](https://i.postimg.cc/gjJFxx3J/Blog-Preview-Card.png)


### Links

- Live Site URL: [Frontend Mentor | Blog preview card](https://frontendmentorblogpreviewcss.netlify.app/)


## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Grid
- Mobile-first workflow


### What I learned

I faced challenge with using the intended font here.

At first I was using the intended font - `Figtree` by directly using the Google Font CDN.

But then I checked that the font is already provided here. So, I just only had to load the font in CSS.

But it was challenging for me.

I knew how to use Google Font CDN, but now self-hosting fonts.

I used [How to import fonts in CSS?](https://stackoverflow.com/questions/11737168/how-to-import-fonts-in-css) and [@font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face) sources to get to know about how to use self-hosted fonts in CSS.

We use - 
```@font-face {
  font-family: "Indtended-Font";
  src: url("Local-File-Path") format("truetype");
  font-weight: 300 900;
  font-style: normal;
  font-display: swap;
}
```

### Useful resources

- [How to import fonts in CSS?](https://stackoverflow.com/questions/11737168/how-to-import-fonts-in-css)
- [@font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face)


## Author
- Frontend Mentor - [@WandererFakeer](https://www.frontendmentor.io/profile/WandererFakeer)