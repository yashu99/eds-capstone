export default function decorate(block){
    const horizontalLineDecor = document.createElement('hr');
    horizontalLineDecor.classList.add('border-line');
    block.querySelector('div').parentElement.parentElement.prepend(horizontalLineDecor);
}