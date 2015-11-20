$(function(){

	var tabIdToDisplay = 'tab-2';

	configureDefaultTab(tabIdToDisplay);

	prepareDropdownFromList();

	var selectDropdown = $('select.tab-selector');
	var horzTabsList = $('ul.tabs');

	horzTabsList.find("li").on('click', function() {
		var tabLinkToActivate = $(this);

		tabLinkToActivate.siblings('li.active').removeClass('active');
		tabLinkToActivate.addClass('active');

		tabIdToDisplay = tabLinkToActivate.data('tab');
		updateTabSelection(tabIdToDisplay);

		selectDropdown.find('option[selected=selected]').removeAttr('selected');
		selectDropdown.find('option[value=' + tabIdToDisplay + ']').attr('selected', 'selected');
	});

	selectDropdown.on('change', function() {
		var selectedOption = $(this).find('option:selected');

		selectedOption.siblings('option[selected=selected]').removeAttr('selected');
		selectedOption.attr('selected', 'selected');

		tabIdToDisplay = selectedOption.val();
		updateTabSelection(tabIdToDisplay);

		horzTabsList.find('li.active').removeClass('active');
		horzTabsList.find('li[data-tab=' + tabIdToDisplay + ']').addClass('active');
	});

	function updateTabSelection(tabIdToDisplay) {
		$('.tab-content:visible').removeClass('active');
		$('#' + tabIdToDisplay).addClass('active');
	}

	var viewToggleButton = $('.toggleView');
	viewToggleButton.on('click', function() {
		var button = $(this);

		$('.container').toggleClass('mobileView');

		button.text() == button.data("text-mobile") 
		? button.text(button.data("text-desktop")) 
		: button.text(button.data("text-mobile"));
	});
});

function configureDefaultTab(tabIdToDisplay){
	$('ul.tabs').find('li[data-tab=' + tabIdToDisplay + ']').addClass('active');
	$('#' + tabIdToDisplay).addClass('active');
}

function prepareDropdownFromList() {
	var navWrapper = $('.nav');
	var tabLinkList = $('ul.tabs').find("li");

	var selectDropdown = $("<select class='tab-selector' />");
	var option = $('<option />');

	for(var i = 0; i < tabLinkList.length; i++){
		var listItem = $(tabLinkList[i]);
		var clone = option.clone(false, false);

		clone.attr({
			value: listItem.data('tab')
		});

		clone.text(listItem.text());

		if(listItem.hasClass('active')){
			clone.attr('selected', 'selected');
		}

		selectDropdown.append(clone);
	}

	var div = $("<div class='tab-dropdown'></div>");
	div.append(selectDropdown);
	navWrapper.append(div);
}
