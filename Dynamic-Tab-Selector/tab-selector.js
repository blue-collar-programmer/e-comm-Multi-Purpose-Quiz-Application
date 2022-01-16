// create a function that swtiches the "show-active-content" when a new tab is selected
    // should remove "show-active-content" class from current div elem
    // assign "show-active-content" class to the div id that matches name of "active-tab" class text-content
    // remove active-tab class
    // reassign active-tab class to the tab that is clicked (i.e the currentTarget)

var contents = document.getElementsByClassName('content-body');    
    function showActiveContent(){

        for(var content of contents ){
        console.log(content, "test1");
        content.classList.remove('active-content');
        }
    }
    showActiveContent()
//create a loop that deselects the highlighted tab or "active-tab"
    // within this same loop we want to add a new eventListener
     // place our showActive function in the body and call it 

