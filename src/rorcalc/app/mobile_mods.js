// MODIFICATIONS FOR MOBILE
function mobileMods($) {
	
	
	var VWidth = $( window ).width();
	//console.log('Viewport Width: ' + VWidth);


	switch ( true ) {
		case VWidth <= 380 :
			console.log('Phone');
			$('#RORCalc .calbody').addClass('collapse');
			$('#RORCalc .mobile-nav').css({ display: 'block' });
			
			$('#RORCalc .mobile-nav').click( function() {
				$('#RORCalc .calbody').removeClass('collapse');
				$('#RORCalc .mobile-nav').css({ display: 'none' });
			});
			
			$('#RORCalc .calwrapper > ul').removeClass('nav-tabs');
			$('#RORCalc .calwrapper > ul').addClass('nav-pills');
			$('#RORCalc .calwrapper > ul.nav').css({
				display: 		'block'
			});
			
			$('#RORCalc .avgYield, #RORCalc .actYield').css({ width: '43%' });
			
			$('#RORCalc ul.nav a').after('<div class="pill-container"></div>');
						
			//insert the calc output into the active pill-container div
			$('#RORCalc .caloutput').appendTo( $('#RORCalc #stocksTab.nav-link + div.pill-container') );
			$('#RORCalc .caloutputBonds').appendTo( $('#RORCalc #bondsTab.nav-link + div.pill-container') );
			$('#RORCalc .caloutputTreas').appendTo( $('#RORCalc #treasTab.nav-link + div.pill-container') );
			$('#RORCalc .caloutputIronLaw').appendTo( $('#RORCalc #ironlawTab.nav-link + div.pill-container') );
			$('#RORCalc .caloutputBlackBox').appendTo( $('#RORCalc #blackboxTab.nav-link + div.pill-container') );
			
			// adjust .tablewindow height to table
			var tableHt = $('#RORCalc table.outputTable').height();
			$('#RORCalc .tablewindow').css({ height: tableHt + 'px' });
			
			// make sure the .active is always visible up front
			$('a.nav-link.active+ div.pill-container').show();
			
			$('#RORCalc li.nav-item').click( function() {
				if ( ! $(this).children().hasClass('active') ) {
					$('a.nav-link + div.pill-container').fadeOut(100, function() {
						$('a.nav-link.active + div.pill-container').slideDown(1000);
					});
				}; // endif
				
			});
			
			break;
		
	}; // end switch
	
}; // end mobileMods