# Frontend Mentor - Product Preview Card Component solution

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

This is a solution to the Product Preview Card Component challenge on Frontend Mentor.


### Screenshot

![Product-Preview-Card-Component.png](https://i.postimg.cc/13psfvzT/Product-Preview-Card-Component.png)


### Links

- Live Site URL: [Frontend Mentor | Product Preview Card Component](https://frontendmentorproductpreviewcss.netlify.app/)


## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Flex
- CSS Grid
- Mobile-first workflow


### What I learned

For the product image, I was using both images - `assets\images\image-product-desktop.jpg` and `assets\images\image-product-mobile.jpg` in the HTML markup with `<figure>`, and then was controlling their views in CSS with `display: none;` and `display: block`.

According to MDN, image is called as *replaced element* ([<img>: The Image Embed element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img)), I was bit confused as to in which element should I nest the images.

I found out that it is better to use `<picture>`, where we can define multiple image sources for different conditions and inside it, we can add `<source>` with `srcset`,  and `type` attribute. We can also use `media` attribute to tell the browser how wide the image will be displayed ([The picture element](https://web.dev/learn/design/picture-element)). Then we add one `<img>` element to offer alternative versions of an image for different display/device scenarios. ([<picture>: The Picture element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture)).

The HTML code snippets looks like this -

```
<picture>
          <source
            class="desktop-image"
            media="(min-width: 620px)"
            srcset="assets/images/image-product-desktop.jpg"
            type="image/jpg"
          />

          <img
            src="assets/images/image-product-mobile.jpg"
            alt="Image of the perfume bottle named 'Gabrielle' by CHANEL"
            class="product-image"
          />
        </picture>

```

### Useful resources

- [The picture element](https://web.dev/learn/design/picture-element)
- [<picture>: The Picture element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture)


## Author
- Frontend Mentor - [@WandererFakeer](https://www.frontendmentor.io/profile/WandererFakeer)