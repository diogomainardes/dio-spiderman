function handleMouseEnter() {
  this.classList.add('s-card--hovered');
  document.body.id = `${this.id}-hovered`;
}

function handleMouseLeave() {
  this.classList.remove('s-card--hovered');
  document.body.id = '';
}

function getPreviousAndNextCard(currentSelectedCard) {
  const MAX_CARDS = 3;
  let previousCard = currentSelectedCard - 1;
  let nextCard = currentSelectedCard + 1;

  if (currentSelectedCard === MAX_CARDS) {
    nextCard = 1;
  }

  if (currentSelectedCard === 1) {
    previousCard = 3;
  }

  return {
    previous: previousCard,
    next: nextCard
  }
}

function changeRotateZStyle(transform, rotateZDeg) {
  return transform.replace(/rotateZ\((-?\d+deg)\)/i, `rotateZ(${rotateZDeg}deg)`);
}

function handleControllerButtonClick() {
  const currentSelectedCard = Number(this.id);
  const carousel = document.querySelector('.s-cards-carousel');
  const transform = carousel.style.transform;
  const rotateY = transform.match(/rotateY\((-?\d+deg)\)/i);
  const rotateYDeg = -120 * (currentSelectedCard - 1);
  const newTransform = transform.replace(rotateY[0], `rotateY(${rotateYDeg}deg)`);

  carousel.style.transform = newTransform;

  const activeButtonElement = document.querySelector('.s-controller__button--active');
  activeButtonElement.classList.remove('s-controller__button--active');
  this.classList.add('s-controller__button--active');

  // Rotation cards effect

  const cardsElements = document.getElementsByClassName('s-card');
  const cards = getPreviousAndNextCard(currentSelectedCard);

  cardsElements[cards.next - 1].style.transform = changeRotateZStyle(cardsElements[cards.next - 1].style.transform, -10);
  cardsElements[cards.previous - 1].style.transform = changeRotateZStyle(cardsElements[cards.previous - 1].style.transform, 10);
  cardsElements[currentSelectedCard - 1].style.transform = changeRotateZStyle(cardsElements[currentSelectedCard - 1].style.transform, 0);
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