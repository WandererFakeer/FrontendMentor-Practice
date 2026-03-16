# Frontend Mentor - Password Generator App solution

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

This is a solution to the Password Generator App on Frontend Mentor.

This solution provides a password, which is generated based on the selected inclusion options. The generated password can be copied with mouse Click or keyboard Tab-Enter.

User needs to choose the character length of password from the given slider.
They can choose from 1 to 30 characters long password.

User also has 4 provided checkbox options for password - 
	i). include Uppercase Letters
	ii). include Lowercase Letters
	iii). include Numbers
	iv). Include Symbols

They can choose one or more options for password. User needs to choose at least one option to be able to generate password.

If user chooses less password character length than chosen checkbox options, then password will not be generated.

They have to at least choose the same character length for password as their chosen checkbox options for the password to get generated.

For example, if they choose password length as `3` from the slider, and choose all of the 4 checkbox options, then password will not be generated. Only if they choose `4` or more password character length and choose all of the 4 checkbox options, then the password will get generated.

After user chooses the pasword character length slider and their checkbox choices, they can generate password by clicking or entering the `GENERATE` button.

After a new password is generated, it will also show the password strength.

There are 4 types of password strength - 

	a). `TOO WEAK!`
	b). `WEAK`
	c). `MEDIUM`
	d). `STRONG`

This is provided in `STRENGTH` box with various colors to indicate the password strength.

If user is satisfied with the generated password, they can copy the password for later use by clicking on or tabbing-entering on the copy icon, which can be found at the right side of the generated password.

After user copies the generated password, they will see `COPIED` text beside the copy icon.


### Screenshot

![Password-Generator-App.jpg](https://i.postimg.cc/3rLvtQw2/Password-Generator-App.jpg)


### Links

- Live Site URL: [Frontend Mentor | Password Generator App](https://frontendmentorpasswordgeneratorapp.vercel.app/)


## My process

### Built with

- Semantic HTML5 markup
- Accessible markup
- CSS custom properties
- CSS Flexbox
- CSS Grid
- JavaScript Event listener


### What I learned

Working through this project, I hit some unknown territories - 

	First issue I encounted - I was unable to make a custom range slider. I wanted to make the custom range slider with CSS only. 
I checked this article - [Creating an Accessible Range Slider with CSS](https://www.a11ywithlindsey.com/blog/creating-accessible-range-slider-css) , where I found this solution - 

```CSS
.slider {
  /* Remove the default appearance */
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
}
```
It removed the default styling of the range slider with `-webkit-appearance: none;` and `appearance: none;`. 
With `background-color: transparent;` the range color became transparent.

According to the article, to target major browsers, we can use `::-webkit-slider-runnable-track` and `::-moz-range-track` pseudo-elements to target the slider track.

So, the appropriate CSS code is - 

```CSS
.slider::-webkit-slider-runnable-track {
  block-size: 1.25rem;
}

.slider::-moz-range-track {
  block-size: 1.25rem;
}
```

We can use `::-webkit-slider-thumb` and `::-moz-range-thumb` pseudo-elements to target the slider thumb - 

```CSS
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  inline-size: 1.25rem;
  block-size: 1.25rem;
  border-radius: 50%;
}

.slider::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  inline-size: 1.5rem;
  block-size: 1.5rem;
  border-radius: 50%;
}
```

But here I encountered another issue, because the area between the thumb and the start of the range has a different background color.

I checked another article - [Creating a custom CSS range slider with JavaScript upgrades](https://blog.logrocket.com/creating-custom-css-range-slider-javascript-upgrades/), where I found a trick of slider progress with `box-shadow: -1010px 0 0 1000px var(--mint-green);` on the slider thumb.

So the slider thumb code is - 

```CSS
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--mischka);
  inline-size: 1.25rem;
  block-size: 1.25rem;
  border-radius: 50%;
  box-shadow: -1010px 0 0 1000px var(--mint-green);
}

.slider::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--mischka);
  inline-size: 1.5rem;
  block-size: 1.5rem;
  border-radius: 50%;
  box-shadow: -1010px 0 0 1000px var(--mint-green);
}
```

	Second issue I encountered - I was unable to change the color of the icon images in `:hover` and `:focus-visible` states. 
As the icon images - the copy icon image and the Generate arrow icon image, are not svg elements, it was hard to change their colors. 
I found this article - [Coloring white Images with CSS filter](https://dev.to/domysee/coloring-white-images-with-css-filter-4bd1). Although I understood the `filter`, it was still hard for me to generate the colors I was intending to use.

Then I used - [https://codepen.io/sosuke/pen/Pjoqqp](CSS filter generator to convert from black to target hex color) this Codepen to change the color of the icon images in `:hover` and `:focus-visible` states.


	Third issue I encountered - In JavaScript, after generating the password, I was unable to classify its strength. 
After searching, I found 2 articles - [A Math-Based Approach to Password Strength](https://www.linkedin.com/pulse/math-based-approach-password-strength-walt-powell-cissp-cism) and [What is password entropy?](https://proton.me/blog/what-is-password-entropy).

From here, I found the formula to calculate the `Bits of Entropy` -

`E = L × log2(R)`, 
where *E is the password entropy
R is the possible range of character types in the password
L is the number of characters in the password (its length)
Log2 answers the question "to what power 2 must be raised to equal this number"*

So, the JavaScript code is - 

```JS
const bitOfEntropy = Math.log2(arrayPoolLength) * length;
```


### Useful resources

- [Creating an Accessible Range Slider with CSS](https://www.a11ywithlindsey.com/blog/creating-accessible-range-slider-css)

- [Creating a custom CSS range slider with JavaScript upgrades](https://blog.logrocket.com/creating-custom-css-range-slider-javascript-upgrades/)

- [CSS filter generator to convert from black to target hex color](https://codepen.io/sosuke/pen/Pjoqqp)

- [A Math-Based Approach to Password Strength](https://www.linkedin.com/pulse/math-based-approach-password-strength-walt-powell-cissp-cism)

- [What is password entropy?](https://proton.me/blog/what-is-password-entropy)


## Author

- Frontend Mentor - [@WandererFakeer](https://www.frontendmentor.io/profile/WandererFakeer)
