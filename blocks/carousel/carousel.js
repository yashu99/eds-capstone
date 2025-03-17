export default function decorate(block) {

    if (block.children.length>1){

        const unorderedListEle=document.createElement('ul'); 
        let carouselItems=block.querySelectorAll('.carousel.block>div');
        carouselItems[0].classList.add('active-carousel');
        let index=carouselItems.length;
        while(index>0){
            let listItemEle=document.createElement('li');
            if(index===carouselItems.length){
                listItemEle.classList.add('pointer-active');
            }
            unorderedListEle.append(listItemEle);
            index-=1;
        }
        document.querySelector('div.carousel.block').append(unorderedListEle);
        let buttons=document.createElement('div');
        buttons.classList.add('button-action-container');
        buttons.innerHTML=`<button class="action--previous prev" type="button" aria-label="Prev Button">
                                    <span class="action-icon"></span>
                                    <span>Previous</span>
                                    </button>
                                    <button class="action--next " type="button"  aria-label="Next Button">
                                    <span class="action-icon"></span>    
                                    <span>Next</span>
                                    </button>`;
        document.querySelector('div.carousel.block').append(buttons);
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        const prevButton = carouselWrapper.querySelector('.action--previous');
        const nextButton = carouselWrapper.querySelector('.action--next');
        const indicators = Array.from(carouselWrapper.querySelectorAll('ul li'));

        let currentIndex = 0;

        function updateCarousel() {
            carouselItems.forEach((item, index) => {
                item.classList.toggle('active-carousel', index === currentIndex);
            });
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('pointer-active', index === currentIndex);
            });
        }
        function showPrevious() {
            currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            updateCarousel();
        }
        function showNext() {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            updateCarousel();
        }
        function showSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        prevButton.addEventListener('click', showPrevious);
        nextButton.addEventListener('click', showNext);
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showSlide(index));
        });
        updateCarousel();

    }
    else{
        block.querySelector('.carousel.block>div').classList.add('active-carousel');   
    }
    

}