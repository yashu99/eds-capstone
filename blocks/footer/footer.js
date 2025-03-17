import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent='';
  const footerContainer=document.createElement('div');
  const footerSpace=document.createElement('div');
  footerSpace.classList.add('blank-space');
  const footerClasses=['footer-navigation','footer-text'];
  let ind=0;
  while(fragment.firstElementChild){
    fragment.firstElementChild.classList.add(footerClasses[ind]);
    footerContainer.append(fragment.firstElementChild)
    if(ind==0){
      footerContainer.append(footerSpace);
    }
    ind+=1;
  }
  block.append(footerContainer);
}