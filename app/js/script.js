//All selector buttons
const selectors = document.getElementsByClassName('selector');
const selected = 'cur';

//Make first selector button the selected one
selectors.item(0).style.backgroundColor = '#3663FF';
selectors.item(0).style.color = 'white';
selectors.item(0).style.cursor = 'default';

//Change color of clicked selector
for (let i = 0; i < selectors.length; i++){
  selectors.item(i).addEventListener('click', event => {
    // selected = event.target.id;
    for (let j = 0; j <selectors.length; j++){
      if (event.target.isSameNode(selectors.item(j))){
        event.target.style.backgroundColor = '#3663FF';
        event.target.style.color = 'white';
        event.target.style.cursor = 'default';
        event.target.removeEventListener('mouseenter', addEnterTransition);
        event.target.removeEventListener('mouseleave', addLeaveTransition);
      }else{
        selectors.item(j).style.backgroundColor = '#3FC1FD';
        selectors.item(j).style.color = 'black';
        selectors.item(j).style.cursor = 'pointer';
        selectors.item(j).addEventListener('mouseenter', addEnterTransition);
        selectors.item(j).addEventListener('mouseleave', addLeaveTransition);
      }
    }
  });
}

const addEnterTransition = event => {
  event.target.style.backgroundColor = '#3663FF';
  event.target.style.color = 'white';
};

const addLeaveTransition = event => {
  event.target.style.backgroundColor = '#3FC1FD';
  event.target.style.color = 'black';
};

