function handleMouseEnter() {
  this.classList.add('s-card--hovered');
  document.body.id = `${this.id}-hovered`;
}

function handleMouseLeave() {
  this.classList.remove('s-card--hovered');
  document.body.id = '';
}

function handleControllerButtonClick() {
  const carousel = document.querySelector('.s-cards-carousel');
  const transform = carousel.style.transform;
  const rotateY = transform.match(/rotateY\((\d+deg)\)/i);
  // const rotateYDeg = Number(rotateY[1].replace('deg', '')) + 120;
  const rotateYDeg = 120 * Number(this.id);
  const newTransform = transform.replace(rotateY[0], `rotateY(${rotateYDeg}deg)`);

  carousel.style.transform = newTransform;

  const activeButtonElement = document.querySelector('.s-controller__button--active');
  activeButtonElement.classList.remove('s-controller__button--active');
  this.classList.add('s-controller__button--active');
}

function addEventListenersToCards() {
  const cardElements = document.getElementsByClassName('s-card');
  
  for (let index = 0; index < cardElements.length; index++) {
    const card = cardElements[index];
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
  }
}

function addEventListenersToCarouselButtons() {
  const carouselButtons = document.getElementsByClassName('s-controller__button');
  
  for (let index = 0; index < carouselButtons.length; index++) {
    const card = carouselButtons[index];
    card.addEventListener('click', handleControllerButtonClick);
  } 
}

document.addEventListener("DOMContentLoaded", addEventListenersToCards, false);
document.addEventListener("DOMContentLoaded", addEventListenersToCarouselButtons, false);