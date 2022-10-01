
	// ==================== DISPLAY FUNCTIONS ========================


	function displayCalc() {
		console.log("displayCalc()...");
		// add collapsing attributes for mobile
				var foldingTable = '#RORCalc th, #RORCalc td';
				jQuery(foldingTable).addClass('folding');

				var flexClass = true; // start in open position
				jQuery('div.tri').html('&triangledown;'); // add little triangle

				jQuery(foldingTable).click(
					function() {
						var thisCol = jQuery(this).index() + 1;
						var flexCol = '.output-table-header th:nth-child(' + thisCol + '), .output-data-row td:nth-child(' + thisCol + ')';
						var flexHead = '.output-table-header th:nth-child(' + thisCol + ')';

						switch ( flexClass )
						{
							case true :
								jQuery(flexCol).addClass('closed');
								jQuery(flexCol).removeClass('open');
								jQuery(flexHead + ' div.tri').html('&triangleright;'); // add little triangle
								flexClass = false;
								break;

							case false :
								jQuery(flexCol).addClass('open');
								jQuery(flexCol).removeClass('closed');
								jQuery(flexHead + ' div.tri').html('&triangledown;'); // add little triangle
								flexClass = true;
								break;S

						};

				}); // end foldingTable.click handler


		// SHOW THE CALCULATOR again
		jQuery('#RORCalc .calwrapper').fadeIn({
									duration: "slow",
									queue: false,
									start: function() {
										jQuery(this).slideDown( 1000 , function() {
											//jQuery('#RORCalc .loader').fadeOut();
										});
									}
								});


	} // end displayCalc
