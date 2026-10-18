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

// Homepage: underline the menu item for the section in view, as you scroll.
( function () {
	if ( ! document.body.classList.contains( 'home' ) || ! ( 'IntersectionObserver' in window ) ) {
		return;
	}
	var links = {};
	document.querySelectorAll( '#site-nav li:not(.menu-cta) > a' ).forEach( function ( a ) {
		var url = new URL( a.href, location.href );
		if ( url.pathname === location.pathname ) {
			links[ url.hash ? url.hash.slice( 1 ) : 'top' ] = a.parentNode;
		}
	} );
	var current = null;
	function mark( id ) {
		var li = links[ id ] || links.top;
		if ( ! li || li === current ) {
			return;
		}
		Object.keys( links ).forEach( function ( k ) {
			links[ k ].classList.remove( 'current-menu-item' );
		} );
		li.classList.add( 'current-menu-item' );
		current = li;
	}
	var ids = Object.keys( links ).filter( function ( k ) { return k !== 'top' && document.getElementById( k ); } );
	var visible = {};
	var io = new IntersectionObserver( function ( entries ) {
		entries.forEach( function ( e ) { visible[ e.target.id ] = e.isIntersecting; } );
		var active = 'top';
		ids.forEach( function ( id ) { if ( visible[ id ] ) { active = id; } } );
		mark( window.scrollY < 200 ? 'top' : active );
	}, { rootMargin: '-45% 0px -50% 0px' } );
	ids.forEach( function ( id ) { io.observe( document.getElementById( id ) ); } );
} )();
