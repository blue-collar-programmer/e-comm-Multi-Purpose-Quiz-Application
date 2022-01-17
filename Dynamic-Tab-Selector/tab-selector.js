var contents = document.getElementsByClassName('content-body');
var tabs =     document.getElementsByClassName('tab');

// create a function that swtiches the "active-content" when a new tab is selected
function showActiveContent(clickedTab){
    
    // should remove "show-active-content" class from current div elem
    for(var content of contents ){
        content.classList.remove('active-content');
    }
    // reassign "active-content" class to the div id that matches name of "active-tab" class text-content
     document.getElementById(clickedTab.textContent).classList.add('active-content');
    
    // remove active-tab class
    for(var tab of tabs){
        console.log('test-2', tab)
        tab.classList.remove('active-tab');
    }
    clickedTab.classList.add('active-tab');
    // reassign active-tab class to the tab that is clicked (i.e the currentTarget)
    }
    
    //create a loop that deselects the highlighted tab or "active-tab"
    for(var tab of tabs){
        tab.classList.remove('active-tab');
    tab.addEventListener('click', function(e){
        showActiveContent(e.currentTarget);
    });
}
    // within this same loop we want to add a new eventListener
     // place our showActive function in the body and call it 

