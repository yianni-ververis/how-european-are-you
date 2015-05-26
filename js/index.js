/*global require, alert*/
/*
 * 
 * @yianni.ververis@qlik.com
 *
 * 
 */
var me = {
	config: {
		id: '82f1b03c-cde2-4c91-8bb3-c8b5f0343860',
		host: 'sense-demo.qlik.com',
		prefix: "/",
		port: 443,
		isSecure: true
	},
	baseurl: 'https://sense-demo.qlik.com/resources'
};

require.config({
  baseUrl: me.baseurl
});

require(['jquery', 'js/qlik'], function($, qlik) {

	// Initilize App
	me.init = function () {
		//Open app
		me.app = qlik.openApp(me.config.id, me.config);
	}

	me.boot = function () {
		me.init();
		me.renderObjects();	

		//Clear Selections
		$('#clear').on('click', function(event) {	
			event.preventDefault();
			me.app.clearAll();
		});

	}

	//Load any qlik objects on the page.
	me.renderObjects = function () {
		$('#template').find('.qvobject').each(function() {
			var qvid = $(this).data("qvid");
			me.app.getObject(this, qvid);
		})

		//Call resize to re-render
		pubsub.publish('resize/end');
	}

	app = me;

	app.boot();
});

