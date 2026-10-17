( function () {
	var btn = document.querySelector( '.menu-toggle' );
	var nav = document.getElementById( 'site-nav' );
	if ( ! btn || ! nav ) {
		return;
	}
	btn.addEventListener( 'click', function () {
		var open = nav.classList.toggle( 'open' );
		btn.setAttribute( 'aria-expanded', open ? 'true' : 'false' );
	} );
	nav.addEventListener( 'click', function ( e ) {
		if ( e.target.closest( 'a' ) ) {
			nav.classList.remove( 'open' );
			btn.setAttribute( 'aria-expanded', 'false' );
		}
	} );
} )();
