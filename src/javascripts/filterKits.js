(function() { // scope begins here

    $(document).ready(function() { // will need the vanilla JS equivalent of this to remove JQuery

        $('.kit-border').ready(function() { // will need the vanilla JS equivalent of this to remove JQuery

            let specificSearch = document.getElementById('specificSearch');
            let searchbar = document.getElementById('searchbar');
            $(document).on('keyup', '#searchbar', filterKits); // will need the vanilla JS equivalent of this to remove JQuery

    		function styleIfMatchingOrNot(bool, element) {
    			if (bool) { // true = content matches earch-input
    				element.style.display = '';
    				element.style.cssText = "color:green;font-size:220%;";
                    // originally I tried adding a class to the element instead of the inline-styling but that didn't work
    			} else {
    				element.style.cssText = 'color:red;display:none;';
                    // originally I tried adding a class to the element instead of the inline-styling but that didn't work
    			}
    		}

            function filterKits() {
    			let searchbarValue = searchbar.value.toUpperCase();
    			let listOfKits = document.getElementById('kits');
    			let kit = listOfKits.querySelectorAll('li.collection-item');

    			for (let i = 0; i < kit.length; i++) {
    				let name = kit[i].getElementsByTagName('h3')[0];
    				let author = kit[i].getElementsByTagName('h3')[1];
    				let environment = kit[i].getElementsByTagName('h3')[2];
    				let subTool = kit[i].getElementsByTagName('h3')[3];
    				let setupTime = kit[i].getElementsByTagName('h3')[4];
    				let description = kit[i].getElementsByTagName('h3')[5];
    				let date = kit[i].getElementsByTagName('h3')[7];

    				let elements = [name, author, environment, subTool, setupTime, description, date];

    				elements.forEach(function(element) {
    					if (element.innerHTML.toUpperCase().indexOf(searchbarValue) > -1) {
							styleIfMatchingOrNot(true, element);
    					} else {
    						styleIfMatchingOrNot(false, element);
    					}

    					if (searchbarValue == 0) { // normailizes CSS when theres no input
    						element.style.cssText = 'color:black;font-size:100%;';
    					}
    				});
    			}
            }
        });
    });
/* scope ends here */ })();
