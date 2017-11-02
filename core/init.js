goog.provide('INIT');
goog.require('CONFIG');
goog.require('CORE');
goog.require('APP');
goog.require('DEBUGGER');
goog.require('APP.MAIN');

(function(){

    var onload_already_triggered = false;

    var window_onload = function(){

        /* Handle Multiple Startup Callbacks */

        if(onload_already_triggered) {

            return;
        }
        else {

            onload_already_triggered = true;
        }

        /* Initialize Migrations */

        (function initialize_migration(){

            var regExStrip0 = /(\.0+)+$/;
            var versions = CORE.getKeys(APP.MIGRATE);

            if(versions.length){

                var migration_success = false;
                var last_version = versions[versions.length - 1];
                var current_version;

                try{

                    current_version = window.localStorage.getItem('app_version');

                    if(current_version){

                        if(current_version !== last_version){

                            for(var i = 0; i < versions.length; i++){

                                if(compareVersions( versions[i], current_version)){

                                    APP.MIGRATE[versions[i]]();

                                    if(DEBUG) CORE.console.log("Migration done: " + versions[i]);
                                }
                            }
                        }

                        migration_success = true;
                    }
                    else{

                        if(DEBUG) CORE.console.log("Migration aborted: App version missing.");
                    }

                }
                catch(e){

                    if(DEBUG) CORE.console.log("Migration error.", e);

                    current_version = false;
                }

                if(!current_version){

                    if(DEBUG) CORE.console.log("Reset Local Storage.");

                    window.localStorage.clear();
                }

                if(migration_success){

                    if(DEBUG) CORE.console.log("Migration successfully.");
                }

                window.localStorage.setItem('app_version', last_version);

                function compareVersions(a, b){

                    var i, diff;
                    var segmentsA = a.replace(regExStrip0, '').split('.');
                    var segmentsB = b.replace(regExStrip0, '').split('.');
                    var l = CORE.Math.min(segmentsA.length, segmentsB.length);

                    for(i = 0; i < l; i++){

                        diff = parseInt(segmentsA[i], 10) > parseInt(segmentsB[i], 10);

                        if(diff){

                            return diff;
                        }
                    }

                    return segmentsA.length > segmentsB.length;
                }
            }
        })();

        /* CALL CUSTOM INIT */

        APP.INIT();

        /* INIT APP AND DEPENDENCIES */

        CORE.queue([

            initialize_settings,
            //initialize_storage,
            initialize_app,
            initialize_config,
            initialize_debug,
            initialize_layout,
            //initialize_translations,
            initialize_views,
            //initialize_domcache,
            initialize_events,
            //initialize_models,
            //initialize_handler,

            /* START MAIN */

            runApp
        ]);
    };

    /* Reset Location Hash */

    document.location.hash = '';

    /* Triggers main script execution */

    if(PLATFORM === 'cordova'/*window['cordova']*/){

        document.addEventListener("deviceready", window_onload, false);
    }
    else{

        window.addEventListener("load", window_onload, false);
        document.addEventListener("DOMContentLoaded", window_onload, false);
    }

    /**
     * @type {function()|number|null}
     */

    var runApp = function(){

        /* Wait for preloadings and prefetches */

        if(APP.CONFIG.PROC){

            return CORE.async(/** @type {Function} */ (runApp));
        }

        if(DEBUG) CORE.console.log('App initialized successfully.');

        //APP.SETUP();
        //APP.VIEWPORT.update();
        //CORE.async(APP.MAIN, CONFIG.START_DELAY || 0);

        APP.SETUP();

        CORE.async(function(){

            APP.MAIN();
            APP.MAIN = null;

        }, CONFIG.START_DELAY || 0);

        // onHashChange({
        //
        //     newURL: window.location.hash || window.location.href
        // });

        //if(APP.VARS.CURRENT_USER) initialize_storage();

        /* Clean Up & Register to Garbage Collector */

        if(CORE.System.isCordova){

            document.removeEventListener("deviceready", window_onload);
        }
        else{

            document.removeEventListener("DOMContentLoaded", window_onload);
            window.removeEventListener("load", window_onload);
        }

        APP.INIT = null;
        APP.SETUP = null;
        APP.MIGRATE = null;

        /* CLEANUP */

        initialize_settings = null;
        //initialize_storage = null;
        initialize_app = null;
        initialize_config = null;
        initialize_debug = null;
        initialize_layout = null;
        //initialize_translations = null;
        initialize_views = null;
        //initialize_domcache = null;
        initialize_events = null;
        //initialize_models = null;
        //initialize_handler = null;
        //determine_storage_size = null;
        window_onload = null;
        runApp = null;
    };

    /** @type {Function|null} */
    var initialize_settings = function(){

        if(DEBUG){

            CORE.console.log('Initialize Settings');
        }

        /** @type {_storage_interface} */
        (APP.SETTINGS = new CORE.Storage('app_settings'));
        /** @type {_storage_interface} */
        (APP.STORAGE.VIEW = new CORE.Storage('app_view'));
    };

    /** @type {Function|null} */
    var initialize_app = function(){

        if(DEBUG) {

            CORE.console.log('Initialize App');

            if(CONFIG.SHOW_DEBUG){

                CORE.setStyle('#debug-log', 'display', 'block');
                CORE.setStyle('#debug-stats', 'display', 'block');
            }
        }

        if(PLATFORM === 'webapp') {

            CORE.async(function(){

                var applicationCache = window['applicationCache'];

                if(applicationCache){

                    if(DEBUG) CORE.console.log('Check Update (ApplicationCache), Status: ' + applicationCache['status']);

                    applicationCache.addEventListener('updateready', function() {

                        if(applicationCache['status'] === applicationCache['UPDATEREADY']) {

                            applicationCache['swapCache']();

                            /*
                            APP.LAYOUT.show_confirmation('A new update of this app was installed successfully. Restart app to take effect changes?', function(){

                                //window.localStorage.clear();
                                if(APP.HANDLER['app_update']) APP.HANDLER['app_update']();
                                window.location.reload();
                            });
                            */

                            if(confirm('Updates has been installed successfully. Restart app to take effect changes?')){

                                //window.localStorage.clear();
                                if(APP.HANDLER['app_update']) APP.HANDLER['app_update']();
                                window.location.reload();
                            }
                        }

                        else if(DEBUG) CORE.console.log("Status ApplicationCache: " + applicationCache['status']);

                    }, false);

                    try{

                        applicationCache['update'](); // Attempt to update the user's cache.
                    }
                    catch(e){}
                }
            })
        }
    };

    /** @type {Function|null} */
    var initialize_config = function() {

        if(DEBUG) CORE.console.log('Initialize Config');

        APP.CONFIG.LANG = (navigator.language || navigator['userLanguage'] || 'en').substring(0, 2);
    };

    /** @type {Function|null} */
    var initialize_debug = function() {

        if(DEBUG) {

            CORE.console.log('Initialize Debug');

            if(ENV !== 'test'){

                // Experimental: Register Call Statistics (may breaks some tests)
                DEBUGGER.registerCallListener(CORE, 'CORE');
                DEBUGGER.registerCallListener(APP, 'APP');
            }

            if(window['applicationCache']) {

                var logEvent = function (event) {

                    CORE.console.log(event.type);
                };

                var applicationCacheEvents = [

                    'checking',
                    'noupdate',
                    'downloading',
                    'cached',
                    'updateready',
                    'obsolete',
                    'error'
                ];

                for(var i = 0; i < applicationCacheEvents.length; i++) {

                    window['applicationCache'].addEventListener(applicationCacheEvents[i], logEvent, false);
                }
            }
        }
    };

    /** @type {Function|null} */
    var initialize_layout = function() {

        if(DEBUG) CORE.console.log('Initialize Layout');

        var definitions = APP.CONFIG.LAYOUT;

        if(/** @type {Array<string>} */ (definitions)) {

            var html = '';

            for(var i = 0; i < definitions.length; i++) {

                if(APP.HTML[definitions[i]]) {

                    for(var a = 0; a < APP.HTML[definitions[i]].length; a++) {

                        var current = APP.HTML[definitions[i]][a];
                        var include = current.include;

                        if(include) {

                            if(APP.HTML[include]) {

                                for(var x = 0; x < APP.HTML[include].length; x++) {

                                    if(x === 0) {

                                        APP.HTML[definitions[i]][a] = current = APP.HTML[include][x];
                                    }
                                    else {

                                        APP.HTML[definitions[i]].splice(a + x, 0, APP.HTML[include][x]);
                                    }
                                }
                            }
                            else if(APP.TEMPLATE[include]){

                                for(var x = 0; x < APP.TEMPLATE[include].length; x++) {

                                    if(x === 0) {

                                        APP.HTML[definitions[i]][a] = current = APP.TEMPLATE[include][x];
                                    }
                                    else {

                                        APP.HTML[definitions[i]].splice(a + x, 0, APP.TEMPLATE[include][x]);
                                    }
                                }
                            }
                        }

                        html += current.data[0];
                    }
                }
                else{

                    if(DEBUG) CORE.console.warn("Warning: '" + definitions[i] + "' is not defined in 'view/app/'.");
                }

                /* Friendly Garbage Collection */

                //delete APP.HTML[definitions[i]];
            }

            /* Register to Garbage Collector */

            delete APP.HTML;
            delete APP.CONFIG.LAYOUT;

            var destination = document.createElement('div');

            destination.innerHTML = html;

            for(var i = destination.childNodes.length - 1; i >= 0; i--) {

                document.body.insertBefore(

                    destination.childNodes[i],
                    document.body.childNodes[0]
                );
            }

            /*
            if(CORE.queryOne('body ~ footer')){

                document.body.insertBefore(

                    CORE.queryOne('body ~ footer'),
                    CORE.queryOne('script')
                );
            }
            */

            var main = CORE.queryAll('xone-main');

            for(var i = 0; i < main.length; i++) {

                if(main[i].id) {

                    APP.VIEW[main[i].id] = new ViewModel(main[i]);
                }
                else{

                    if(DEBUG) CORE.console.warn("View container has no id: ", main[i]);
                }
            }

            CORE.setStyle([

                main, 'xone-tabbar'

            ], 'visibility', 'hidden');

            definitions = null;
            html = null;
        }
    };

    /**
     * @param node
     * @constructor
     */

    function ViewModel(node){

        this.onreload = null;
        this.onupdate = null;
        this.onshow = null;
        this.onhide = null;
        this.onreset = null;
        this.onclear = null;
        this.ondestroy = null;

        this.main = node;
        this.header = CORE.getByTag('xone-header', node);
        this.tabbar = CORE.getByTag('xone-tabbar', node);
        this.section = CORE.getByTag('xone-section', node);
        this.effect = node.dataset.effect || 'slide';
    }

    ViewModel.prototype.reload = function(){
        // todo
    };
    ViewModel.prototype.update = function(){
        // todo
    };
    ViewModel.prototype.show = function(){
        // todo
    };
    ViewModel.prototype.hide = function(){
        // todo
    };
    ViewModel.prototype.reset = function(){
        // todo
    };
    ViewModel.prototype.clear = function(){
        // todo
    };
    ViewModel.prototype.destroy = function(){
        // todo
    };
    ViewModel.prototype.getIndex = function(){
        // todo
    };
    ViewModel.prototype.setIndex = function(){
        // todo
    };
    ViewModel.prototype.isVisible = function(){
        // todo
    };
    ViewModel.prototype.animate = function(){
        // todo
    };

    /** @type {Function|null} */
    var initialize_views = function(){

        if(DEBUG) CORE.console.log('Initialize Views');

        var views = APP.TEMPLATE;

        for(var view in views) {

            if(views.hasOwnProperty(view)) {

                var template = views[view];

                for(var i = 0; i < template.length; i++) {

                    /** @type {_template_struct} */

                    var block = template[i];

                    if(block.include) {

                        for(var x = 0; x < views[block.include].length; x++) {

                            if(x === 0){

                                template[i] = views[block.include][x];
                            }
                            else{

                                template.splice(i + x, 0, views[block.include][x]);
                            }
                        }

                        block = template[i];
                    }

                    if(block.if && CORE.isType(block.if, 'string')) {

                        block.if = Function('val', 'return (' + block.if + ') ? true : false;');
                    }
                }
            }
        }

        // TODO: compare 2 strategies
        /*
         var routes = APP.ROUTES;

         for(var key in routes){

         if(routes.hasOwnProperty(key) && routes[key].view){

         // creates an own execution context to register async calls in a loop
         // otherwise the var key was mutable, this is also a good lesson of working with execution contexts
         // if you have a good JavaScript linker in your dev environment, you will get a notification
         // the approach below is also called "Factory Pattern" (the return statement is not required)

         (function(view){

         APP.CONFIG.PROC++;

         CORE.ajax({
         type: 'GET',
         header: {
         'Accepted': 'application/json'
         },
         url: view + '.json',
         success: function(data){

         for(var i = 0; i < data.length; i++){

         var item = data[i];

         if(item.if){

         item.if = Function('val', item.if);
         }
         }

         APP.VIEW[view] = data;
         APP.CONFIG.PROC--;
         },
         async: true,
         cache: false
         });

         })(routes[key].view);
         }
         }
         */
    };

    /** @type {Function|null} */
    /*
    var initialize_domcache = function(){

        if(CONFIG.ENABLE_DOM_CACHE){

            CORE.DOM || (CORE.DOM = {});

            var dom = document.getElementsByTagName("*");
            var length = dom.length;
            var count = 0;
            var id;

            for(var i = 0; i < length; i++) {

                if(id = dom[i].id){

                    if(!CORE.DOM[id]){

                        CORE.DOM[id] = dom[i];
                        count++;
                    }
                }
            }

            if(DEBUG) CORE.console.log('Initialize DOM-Cache: ' + count + ' Objects', CORE.DOM);
        }
    };
    */

    /** @type {Function|null} */
    var initialize_handler = function(){

        // var nodes = CORE.getByClass('xone-swipe');
        //
        // for(var i = 0; i < nodes.length; i++){
        //
        //     APP.VIEW.addSwipe(nodes[i]);
        // }
        //
        // nodes = CORE.getByClass('xone-pull');
        //
        // for(var i = 0; i < nodes.length; i++){
        //
        //     APP.VIEW.initPullToRefresh(nodes[i], nodes[i].dataset['route']);
        // }
    };

    /** @type {Function|null} */
    var initialize_events = function(){

        if(DEBUG) CORE.console.log('Initialize Events');

        /* Feature Detection: Passive Events */

        try {

            window.addEventListener('test', null, /** @type {?} */ (Object.defineProperty({}, 'passive', {

                'get': function() {

                    APP.CONFIG.EVENT_OPTIONS = {

                        'passive': true
                    };

                    if(DEBUG) CORE.console.log('Passive Events Supported');
                }
            })));

        } catch (e) {}

		(APP.EVENT['_body'] || (APP.EVENT['_body'] = [])).push({

			on: 'clickmove',
			if: 'a',
			do: function(event){

			    var href = this.getAttribute('href');

				if(href.indexOf('#/') === 0 || href.indexOf('!/') === 0){

				    CORE.preventEvent(event, true, true);

                    handle_routes(href);
				}
			},
			stopBubble: false,
			preventDefault: false
		});

		window.addEventListener('hashchange', function(event) {

            if(event['newURL'].lastIndexOf('#') > -1){

                handle_routes(event['newURL'].substring(event['newURL'].lastIndexOf('#')));
            }
            else{

                handle_routes("#/");
            }
        });

        for(var key in APP.EVENT){

            if(APP.EVENT.hasOwnProperty(key)){

                var events = APP.EVENT[key];

                if(!events) continue;

                var node = (

                    key === 'window' || key === '_window' ?

                        window
                    :
                        key === 'document' || key === '_document' ?

                            document
                        :
                            key === 'body' || key === '_body' ?

                                document.body
                            :
                                CORE.queryOne(key)
                );

                if(!node){

                    if(DEBUG) CORE.console.warn('WARNING: Element ' + key + ' was missing for binding event.');
                    continue;
                }

                if(events) {

                    events.length || (events = [events]);

                    for(var i = 0; i < events.length; i++) {

                        /**
                         * @type _xone_event_struct
                         */

                        var event = events[i];

                        /**
                         * @type {Function|null}
                         */

                        var event_caller = (

                            /* Connects to a request route */

                            event.to ?

                                (function(event) {

                                    return function(e) {

                                        APP.CONTROLLER.request(
                                            event.to,
                                            APP.PAYLOAD[event.to] ? APP.PAYLOAD[event.to].call(this, e) : APP.ROUTE[event.to].params
                                        );
                                    }

                                })(event)
                            :
                                /* Connects to an event route */

                                CORE.isType(event.do, 'string') ?

                                    APP.HANDLER[event.do]
                                :
                                    event.do /*|| (

                                        event.go ?

                                            (function(event){

                                                return function(e){

                                                    APP.LAYOUT.handleCache(APP.LAYOUT.lastAction = event.go);
                                                }

                                            })(event)
                                        :
                                            void 0
                                    )*/
                        );

                        if(event.if) {

                            var delegateByClass = (event.if.charAt(0) === '.');
                            var delegateByTagClass = (delegateByClass === false && event.if.indexOf('.') > 0);

                            if(delegateByTagClass) {

                                // var tmp = event.if.split('.');
                                //
                                // CORE.delegateByTagClass(
                                //     node,
                                //     tmp[0],
                                //     tmp[1],
                                //     event.on,
                                //     event_caller,
                                //     event.preventDefault,
                                //     event.stopBubble
                                // );

                                CORE.on(
                                    node,
                                    event.if,
                                    event.on,
                                    event_caller,
                                    event.preventDefault,
                                    event.stopBubble,
                                    event.at || event.go,
                                    key
                                );
                            }
                            else {

                                //if(delegateByClass) event.if = event.if.substring(1);

                                // (delegateByClass ?
                                //
                                //         CORE.delegateByClass
                                //     :
                                //         CORE.delegateByTag
                                // )(
                                //     node,
                                //     event.if,
                                //     event.on,
                                //     event_caller,
                                //     event.preventDefault,
                                //     event.stopBubble
                                // );

                                CORE.on(
                                    node,
                                    event.if,
                                    event.on,
                                    event_caller,
                                    event.preventDefault,
                                    event.stopBubble,
                                    event.at || event.go,
                                    key
                                );
                            }
                        }
                        else {

                            // CORE.addEvent(
                            //     node,
                            //     event.on,
                            //     event_caller,
                            //     event.preventDefault,
                            //     event.stopBubble
                            // );

                            CORE.on(
                                node,
                                '',
                                event.on,
                                event_caller,
                                event.preventDefault,
                                event.stopBubble,
                                event.at || event.go,
                                key
                            );
                        }
                    }
                }
            }

            // TODO: Unload Events
            //delete APP.EVENT[key];
        }

        var pull_elements = CORE.getByClass('pull');

        for(var i = 0; i < pull_elements.length; i++){

            APP.VIEW.PULL.register(pull_elements[i]);
        }
    };

    /** @type {Function|null} */
    var initialize_translations = function(){

        if(DEBUG) CORE.console.log('Initialize Translations');

        APP.CONTROLLER.changeLanguage(APP.CONFIG.LANG);
    };

    /** @type {Function|null} */
    var initialize_storage = function(){

        if(DEBUG) CORE.console.log('Load Storage');

        //determine_storage_size(/* error value: */39500);

        // for(var model in APP.MODEL){
        //
        //     if(APP.MODEL[model].all) {
        //
        //         var data = APP.MODEL[model].all();
        //
        //         if(data.length) if(DEBUG) CORE.console.log(model + ' loaded: ' + data.length);
        //     }
        // }
    };

    /** @type {Function|null} */
    var initialize_models = function(){

        if(DEBUG) CORE.console.log('Initialize Models');

        // var models = APP.MODEL;
        //
        // for(var model in APP.MODEL){
        //
        //     if(model !== 'register' && model !== 'new' && model !== 'create' && APP.MODEL.hasOwnProperty(model)){
        //
        //         APP.MODEL[model] = APP.MODEL.register.call(APP.MODEL, model, APP.MODEL[model]);
        //
        //         console.log(this);
        //         console.log(model);
        //         console.log(APP.MODEL[model]);
        //     }
        // }
    };

    function handle_routes(href){

        if(href.substring(0, 2) === "#/" || href.substring(0, 2) === "#!"){

            var pos_params = href.indexOf('?');
            var part_route = pos_params !== -1 ? href.substring(0, pos_params) : href;
            var part_view = part_route.substring(2);

            if(APP.ROUTE[part_route]) {

                var fn,
                    params = CORE.parseParams(href);

                if(typeof APP.ROUTE[part_route] === 'function'){

                    fn = APP.ROUTE[part_route];
                }
                else if(APP.ROUTE[part_route].to){

                    fn = APP.ROUTE[part_route].to;
                    params = APP.ROUTE[part_route].params || params;
                }
                else if(APP.ROUTE[part_route].do){

                    fn = APP.ROUTE[part_route].do;
                    params = APP.ROUTE[part_route].params || params;
                }

                params['href'] = part_view;

                if(fn) {

                    fn(params, CORE.query('a[href="' + part_route + '"]')[0]);
                }
            }
        }
    }

})();

// if(CONFIG.ENV !== 'production'){
//
//     CORE.ajax({
//
//         type: 'GET',
//         url: 'lib/xone/gui/node.js',
//         params: {
//             fn: "get",
//             payload: JSON.stringify({
//                 shtml: "overlay"
//             })
//         },
//         //dataType: type
//         async: true,
//         success: function(data){
//
//             if(data.json && data.json.shtml) {
//
//                 var div = document.createElement('div');
//                 div.innerHTML = data.json.shtml;
//                 document.body.appendChild(div);
//             }
//         }
//     });
// }
