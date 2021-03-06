<p align="center">
    <br>
    <img src="http://nextapps.de/img/xone.svg?rnd=1" alt="Xone Javascript Development Environment" width="50%">
    <br><br>
    <a target="_blank" href="https://www.npmjs.com/package/xone"><img src="https://img.shields.io/npm/v/xone.svg"></a>
    <img src="https://img.shields.io/badge/status-BETA-orange.svg">
    <a target="_blank" href="https://travis-ci.org/nextapps-de/xone"><img src="https://travis-ci.org/nextapps-de/xone.svg?branch=master"></a>
    <a target="_blank" href="https://coveralls.io/github/nextapps-de/xone?branch=master"><img src="https://coveralls.io/repos/github/nextapps-de/xone/badge.svg?branch=master"></a>
    <a target="_blank" href="https://github.com/nextapps-de/xone/issues"><img src="https://img.shields.io/github/issues/nextapps-de/xone.svg"></a>
    <a target="_blank" href="https://github.com/nextapps-de/xone/blob/master/LICENSE.md"><img src="https://img.shields.io/npm/l/xone.svg"></a>
</p>

<h1></h1>
<h3>Mobile Application Development Kit / MVC Framework</h3>

__Xone__ provides you a lightweight full stack environment on top of Node.js to develop beautiful applications for every use (based on HTML5 and JavaScript) and enables the optimal integration of an universal codebase into a wide range of systems (e.g. mobile devices, tablets, desktops, browser environments).

<!--
> __Notice:__ Actually this is a beta state of this repository.
-->

<!--
Some breaking changes could possibly be introduced in upcoming versions. Do not use for production until this message has been removed.
-->

* [License](LICENSE.md)
* [Installation](doc/install.md)
* [API](doc/api.md) (work in progress)
* [Codebase Structure](doc/code_structure.md)
* [Global App Configuration](doc/app_config.md)
* [Basic Examples: MVC Pattern / Routes / Events / Templates / Dev Tools](doc/xone.md)
* [Persistent Models](doc/xone_model.md)
* [Core Library](doc/xone_core.md)
* [Dependency Management & Calculation](doc/xone_deps.md)
* [AMD Loader, Build Plugin](doc/xone_amd.md)
* [Validations](doc/xone_validate.md)
* [Demo/Tutorial: Todo App](https://nextapps-de.github.io/xone/)

---

### Announcement Xone v1.0.0 stable

Xone will get some major changes. This was required to open capabilities for upcoming features we are working now like __Xone Native__. The plan is to release a final architecture until v.1.0.0 and then also to be done with most of the breaking changes.

##### v0.9.0 beta (coming in Q1/2018)

- Xone Native (Cordova-based wrapper)
    - Enables native features without changing anything on your codebase, like:
        - Native Transitions
        - Native Filesystem/Storage
        - Native Image Library
        - Native Media Player
        - Native Device Access (Camera, Photo Library, Statusbar, etc)
        - Native Map
    - Provides default Cordova-based project build configurations (which already including all required plugins as well as platform configurations)
- Available Source Code of Demo Apps
- Native Demo App (through App Stores), including:
    - technical demos
    - components demo
    - demo apps
    - xone developer tools
    - documentation
- \> 90% test coverage

<img src="doc/xone_processing_model.png" alt="" width="50%;" align="right" style="float:right; padding: 0 0 20px 20px">

##### v0.8.0 beta (in progress)

- Xone Non-Blocking UI Processing Model, controllable via: 
    - Util.Process.`async`
    - Util.Process.`paint`
    - Util.Process.`promise`
    - Util.Process.`queue`
    - Util.Process.`stack`
    - Util.Process.`asap`
    - Util.Process.`run` (Pseudo Thread Runner Instance)
- Fully transfer to Asynchronous Module Definition (replaces the poorly Closure Compiler dependency system)
- Replace most of global namespaces of the framework to constructors and also changing capitalized style for the new AMD namespacing:
    - ___Note:___ By using AMD you can internally customize naming of all references of Xone (conflicts with global namespace is not possible in AMD)
    - `APP.CONTROLLER[name]` → `new Controller(name)` or `Controller.new(name)`
    - `APP.VIEW[name]` → `new View(name)` or `View.new(name)`
    - `APP.EVENT[query]` → `new Event(query)` or `Event.new(query)`
    - `APP.ROUTE[route]` → `new Route(route)` or `Route.new(route)`
    - `APP.MAPPER[name]` → Is now a part of View, Model and/or Route (see: _View Mappings_, _Model Mappings_, _Payload Mappings_)
    - `APP.MODEL[name]` → `new Model(name)` or `Model.new(name)`
    - `APP.WORKER[name]` → `new Worker(name)` or `Worker.new(name)`
    - `APP.HANDLER` → you are free to use any style (like before)
    - `APP.HELPER` → you are free to use any style (like before)
    - `APP.SETTING.get(key)` → `Setting.get(key)`
    - `APP.PLUGIN.Filesystem` → `Filesystem`
    - `CORE.*` → `Util.{Package}.*` (e.g. `Util.Array.merge`)
    - alternatively of calling the method _.new()_ it is also possible to use _.create()_ as well as _.register()_
    - Singular naming coding convention is still valid
    - new constructors can either be instantiated via the builtin method .new() or via the classical new keyword
    - the new concept of using constructors opens a lot of nice features, they will coming soon, and also adds some missing OOP styles
- User Interface Components
    - Slider
    - Side Drawer (Side Menu)
    - Internal App Status Notification
    - Adjustable Statusbar-Visibility and Webview-Overlays-Statusbar per Screen/View
- Provides package definitions (packages can group or import html-templates, javascript, css styles and assets)
- Provide dependency management of whole modules/packages through the keyword import("package") and export("package", ...)
- Worker to de-/compress contents in background (lzip)

<img src="doc/xone_gui.png" alt="" width="35%;" align="right" style="float:right; padding: 0 0 20px 20px">

- Xone Development User Interface (Browser replacement for any console commands)
- Model supports now virtual properties everywhere (not only in views)
- Model can now define a structural schema to save in storage (this also improves extraction of nested models)
- New Templating Implementation and Compiler
    - allows inserting Javascript
    - allows nesting of for-loops and if-conditionals
    - better handling of virtual and mapped properties
    - ultra fast through new pre-compilation strategy and usage of model-bind-caching (instead of view-bind cache)

##### v0.7.0 beta

- Support for Web Components
- Support for Web Templates
- Support for Native Filesystem
- Implements Web Animation API
- Virtual DOM Integration (Inferno)
- Xone Native Adapter for Cordova-based Apps
    - Popups, Alerts, Confirmations, Status
    - Filesystem Storage
    - Native Transition
    - Action Sheet
    - Notifications
    - Reminder
    - Calendar
    - Native Image Library
    - Native Map
- New View Controller Engine 
- New Layout Controller (the old was completely removed)
- Simplified Project Structure
- Build Extensions:
    - CSS Auto-Prefixer
    - Manage Hooks
    - Manage Optional Dependencies
- Improved persistent storing of models
- Improved Auto Resizing Layout 
- Improved Dependency Management
- Lazy image loader (with offline filesystem cache)
- User Interface Components
    - Navigation Bar
    - Toolbar
    - Scrollpane (vertical, horizontal, split)
    - Lists
    - Tables
    - Grid Layout
    - Pull to refresh
    - Swipe-back views
- View Manager controls components
- Render Payloads

Those features will become deprecated for now (unsupported):

- Using the _CONFIG.RACK_
- Layout Controller (any calls to _APP.LAYOUT_)
- Old View Helpers (slides, pulls, popups, alerts, ...)
- Build _xone.bundle.js_
- Custom location of xone installation

---

### Features

Basically Xone  <!-- is a "cherry-picked" mixture of common programming paradigm used by major technologies like Ruby on Rails, Mustache/Handlebars, Node.js, Mithril, Google Closure and combines them into a lightweight application development environment. For this purpose Xone --> has an easy to learn high-level interface without forcing you to implement any low-level "framework-cryptofied" code as you would do with Angular or React. That also preserves huge flexibility to your codebase for upcoming technologies, ports or any other major changes.

* Manage and execute _production_, _development_, _benchmark_ and _test_ environments
* Developing seamlessly in a web browser environment (saves you tons of time!)
* Provides a dynamic template system which is readable for designers <!-- * Therefore you will get the most lightweight footprint for your codebase -->
* Provides an advanced declarative MVC architecture for your app (e.g. persistent models, routes, controller, events, views, handlers, mapper)
* Uses Closure Compiler to achieve optimal dead code elimination
* Xone libraries compiles with your codebase (the used code remains in a single javascript build file)
* Others: build system, dependency management, environment management, platform management, unit test integration, benchmark integration
* Simple, fast and natural usage out of the box without loosing any "framework magics"
* Targeting products: hybrid apps, progressive web apps, apps based on cordova/phonegap/ionic/electron, single-page application, browser apps

---

Xone basically is available in 3 different versions:

1. __Xone Project__ (Development Environment)
    * initial project created by `xone create`
    * Provides you a scalable development stack for modern web-based applications on top of Node.js
    * Is intended for a compilation/build
2. __Xone Extern Bundle__ (Standalone)
    * [_xone.bundle.js_](//cdn.rawgit.com/nextapps-de/xone/master/dist/xone.bundle.js)
    * Alternatively use this bundle to add Xone as a dependency to an already existing build/compiler system (compatible with Closure Compiler "Advanced Mode")
    * Is intended for a compilation/build
3. __Xone Extern Library__ (Standalone)
    * [_xone.lib.js_](//cdn.rawgit.com/nextapps-de/xone/master/dist/xone.lib.js)  >  [_xone.lib.min.js_](//cdn.rawgit.com/nextapps-de/xone/master/dist/xone.lib.min.js)
    * Skips the build part completely and make Xone using like a jQuery library in your web-based project
    * Is not intended for a compilation

#### Xone Comparison: 1. Project, 2. Bundle, 3. Library

| Features by default | Xone Project (Environment) | Xone Bundle (Standalone) | Xone Library (Standalone) |
| ------------- | ------------- | ------------- | ------------- |
| Final project filesize | smallest | small | normal |
| Core Library | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> |
| MVC Framework | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> |
| Render Engine | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> |
| Unit Tests | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |
| Debugging Tools | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| Environments | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |
| Global App Configuration | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| Build/Compile Project | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| Manage Platforms | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |
| Dynamic Templates (HTML > JSON) | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |
| Dependency Management | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |
| Initial Codebase | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |
| CLI Tools | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |
| Support Closure Compiler Advanced Mode | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| Dead Code Removal | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| Is __not__ strictly bound by Conventions | - | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> |
| Does __not__ require Node.js | - | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> |
| Use as a Standalone Library (like jQuery/Underscore) | - | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> |
| Use as a Framework (like Bootstrap/Angular) | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| Use as a Dev Environment (like Sencha/Meteor) | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |

## Installation (Xone Project)

```bash
> npm install -g xone
```
> __Note:__ To make the _Xone CLI_ globally available, you have to install Xone as a global npm module (also in addition to any local installation if you want to keep simple as most as possible). You can also use a local custom versions of Xone as well as using the CLI without any global installations (read further).

> __Note:__ Xone Project binaries typically has to be installed via "xone create" or "xone install" and comes with its own pre-defined folder structure (followed by some conventions). You can pick one of the two [stand-alone](//github.com/nextapps-de/xone/tree/master/dist) versions optionally to skip as many conventions as possible (e.g. Xone acts like an extern Javascript Plugin).

#### Windows

Alternatively in the root of your project you can use the local CLI shortcut _app_ instead for _xone_, e.g.:
```bash
my_project> app build
```
> __Note:__ The options _create_ and _install_ both are not available over the shortcut _app_.

#### MacOS/Linux

On a linux machine you may use:
```bash
sudo npm install -g xone
```

If the global "xone" identifier is not registered properly try one of these lines:
```bash
hash xone
hash -r
```

<!--
If you also like to make the shortcut _app_ in your terminal available, you need to add the Xone _bin_ folder to the _PATH_ of your system:
-->
<!--
export PATH=$PATH:/path/to/node_modules/xone/bin/
-->

Alternatively you can use the local CLI fallback like:
```bash
bash xone build
```

---

### Create New Xone Project

Create a new project inside the directory _workspace/my_project_:
```bash
workspace> xone create my_project
```

Works, but it is generally not recommended to use whitespaces in a project folder name:
```bash
workspace> xone create "my project"
```

[Read further](doc/install.md)

---

### Update existing Xone project

To update Xone of an already existing project you basically need __2 steps__:

1. Fetch and install latest version via npm:
```bash
> npm install -g xone
```

2. Install update to a Xone project (automatically fetches sources from _npm_modules_)
```bash
workspace/my_project> xone install
```
> __Note:__ This will not overwrite any of your project files! Only projects xone library files located in _app/lib/xone/_ are updated.

[Read further](doc/install.md)

---

### Build Xone project

Un-compiled sources located in: _workspace/my_project/app/*_
```bash
my_project> xone build
```
Production build located in: _workspace/my_project/public/www/*_

> __Note:__ We recommended to use production builds for any external/public release and use the sources only for developing, testing and may some other internal purposes. To skip the build integration of Xone, you have to use the standalone version instead.

#### Run Xone project (Local Webserver)
```bash
my_project> xone server
```
Open your preferred webrowser and goto _'http://localhost/app/'_ or _'http://localhost/public/www/'_

Optionally you can pass custom host and port:
```bash
my_project> xone server localhost 8080
```
Open your preferred webrowser and goto _'http://localhost:8080'_

#### Run Xone project (Local Filesystem)

Open _app/index.html_ from sources or _public/www/index.html_ from production build in your preferred browser. 

#### Deploy Xone project (Cordova, Web, etc.)

Use production builds located in _workspace/my_project/public/*_ to move forward into your Cordova-based projects or upload to a webserver. 

---

### Manage platforms

Xone provides custom platform injections to perform platform specific production builds. Therefore all those builds only includes necessary code and dependencies for their related platform.

Show currently defined platforms:
```bash
my_project> xone platform
```

Perform platform specific compilation:
```bash
my_project> xone compile android
```
Compiled files remains in: _workspace/my_project/app/*_

Perform platform specific builds:
```bash
my_project> xone build android
```
Build destination: _workspace/my_project/public/android/*_

#### Add custom platforms

You can add unlimited custom platforms, e.g. create a platform 'webapp':
```bash
my_project> xone platform add webapp
my_project> xone build webapp
```
Build destination: _workspace/my_project/public/webapp/*_

---

### Build Xone Standalone

```bash
my_project> xone build bundle
```
Build destination: _workspace/my_project/app/lib/xone/dist/xone.bundle.js_

```bash
my_project> xone build lib
```
Build destination: _workspace/my_project/app/lib/xone/dist/xone.lib.js_

```bash
my_project> xone build lib min ./app/js/
```
Build destination: _workspace/my_project/app/js/xone.lib.min.js_

> __Note:__ The order of passed parameters cannot be changed actually.

### Using Xone Standalone Library

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <!-- END_OF_BODY -->
    <!-- LOAD XONE: -->
    <script src="js/xone.lib.min.js"></script>
    <!-- YOUR APP CODE: -->
    <script src="js/app.js"></script>
</body>
</html>
```

---

### Configure Build Tool

Xone build uses the Google Closure Compiler. All Xone libraries also supports compilation in _"Advanced Mode"_. The build properties can be configured in `xone.json`. The Closure Compiler also provides a simple dependency management system (provide/require) you should make use of to improve dead code removal.

> __Note:__ Actually Xone supports 2 different versions of closure compiler: 1. requires Java, 2. requires Javascript (Node). It is recommended to have a Java (JRE) properly installed on your machine to unlock some benefits of the Closure Compiler Java version. To change the type of the compiler you need to change the value of the field `closure_compiler_lib_type` from `"js"` into `"jar"` in `xone.json` accordingly.

> __Note:__ If you have less experience with the Closure Compiler you can optionally set the compilation level to _"simple"_ on the field `closure_compiler_level` within the xone config file.

#### Comparison: Closure Compiler (Java) VS. Closure Compiler (Javascript)

| Features by default | Closure Compiler (Java) | Closure Compiler (Javascript) |
| ------------- | ------------- | ------------- |
| Dependency Management | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> |
| Auto Sort Dependencies | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| "Strict" Dependencies (Entry Point) | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| "Pretty Print" Compilation | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| Build Performance | Normal | Slow |
| Compression Ratio | Best | Good |
| Memory Consumption | Normal | Extreme |

---

### Generating Docs (JSDoc)
```bash
my_project> xone docs
```
Docs will be generated in _'docs/api/'_.

---

<!--
### Xone Render Engine
-->
<!--
The render engine provides an optional "fast mode" to get the most out of performance. All internal processes of Xone takes advantage when "fast mode" is enabled (e.g. render templates, animate elements, toggle views). When it runs in "fast mode" the render engine has a very closed infrastructure you should keep notice:
-->

<!--
1. CSS Styles
    * Change styles
    * Get styles
2. CSS Classes
    * Change classes
    * Get classes
3. HTML Content
    * Change contents
    * Get contents
-->

<!--
> __Note:__ When "fast mode" is enabled it should not be mixed by any other external manipulations of the same category listed above. We recommended to disable the "fast mode" when style issues occurs by any direct style manipulations (e.g. when using an extern library).
-->
<!--
> __Note:__ The "fast mode" is enabled by default in a _Xone Project_ (may change in future) and is disabled by default in the _Xone Extern Library_.
-->

<!--
###### Performance Comparison: Native VS. jQuery VS. Xone
-->
<!--
* https://jsperf.com/xone-style-performance
-->
<!--
* https://jsperf.com/xone-dom-selector-performance
-->

<!--
###### Restrictions (when "fast mode" is enabled)
-->
<!--
The problem:
-->

<!--
```js
var display;

// get style direct:
display = document.getElementById('my_div').style.display;
console.log(display); // -> 'block'

// set style Xone:
CORE.setStyle('my_div', 'display', 'none');

// get style Xone:
display = CORE.getStyle('my_div', 'display');
console.log(display); // -> 'none'

// get style direct:
display = document.getElementById('my_div').style.display;
console.log(display); // -> 'block' !!!
```
-->

<!--
Instead do this:
-->

<!--
```js
var display;

// set style Xone:
CORE.setStyle('my_div', 'display', 'none');

// do on next refresh:
CORE.paint(function(){

    // get style direct:
    display = document.getElementById('my_div').style.display;
    console.log(display); // -> 'none'
});
```
-->

### Development Environments

Default environments are:

- production (live build)
- development (local)
- test (local)
- benchmark (local)

Change environment in `app/manifest.js`:

```json
"env": "development",
"platform": "www"
```

Or just adding parameters to the URL:

```url
http://localhost:9000/?env=test&platform=android&debug=true
```

> __Note:__ You are also able to override any `CONFIG` attribute by passing URL parameters respectively.

##### Custom Environments

Show currently defined environments:

```bash
my_project> xone env
```

Add custom environments:

```bash
my_project> xone env add offline
```

Build destination: _workspace/my_project/app/config/offline.js_


<!--
### TODO
-->

<!--
- [x] Provide Standalone Version (dependency-less)
- [x] Create/Install (CLI)
- [x] Use npm modules for system tasks (supports all platforms)
- [ ] Improve Environment Mappings
- [x] Improve Worker Integration
- [x] ~~Provide Plugin Management~~
- [x] Replace Closure Dependency Loader
- [x] Improve Dependency Management
- [x] Improve Platform Management
- [ ] Support Hooks
- [x] Support Animations
- [x] Support Asynchronous Module Definitions
- [x] Improve Versioning
- [ ] Improve Migration
- [x] Improve Benchmark Integration Part 1/2
- [ ] Improve Benchmark Integration Part 2/2
- [x] Refactor API
- [ ] Add Documentation
- [ ] Add Demos / Examples
- [ ] Add JSDoc
- [ ] Add Unit Tets
    - [x] Core Tests
    - [x] AMD Tests
    - [x] Async Tests
    - [x] Paint Tests
    - [x] Model Tests
    - [ ] MVC Tests
    - [ ] Test Xone Standalone
- [x] Platform Support
    - [x] MacOS
    - [x] Windows
    - [x] Linux
-->


<!--
### Features
-->
<!--
* Manage Development Environments:
    * production, development, test, benchmark
* Manage Process Environments (Rack):
    * webapp, cordova, native, local, browser
* Manage Platform Environments:
    * Android, iOS, Windows, Webkit, Mozilla, MSIE
* Model-View-Controller
    * Supports persistent model management
* Full MVC-managed environment:
    * Routes
    * Events
    * Handlers
    * Controller
    * Interfaces
    * Adapter
    * Models
    * Mapper
    * Views
    * Payloads
    * Threads / Worker
    * Stubs / Mocks
    * Translations
* Javascript Core Library
* Codebase Dependency Management
* Supports DOM pattern in JSON format
* Template System
    * Static Content
    * Dynamic Content
    * Partials
    * Locales
* Build System
* Template Compiler
* Local Webserver
* Layout Manager
* Multi-Platform-Injections
* Event Delegation
* NoSQL Persistent Storage
* GZIP Storage Data Compression
* FlexiCache (auto-scale, auto-clean)
* Multi Language Support
* Unit Test Integration
* Versioning & Migrations
* Dev Task Hooks (Compile, Build, Deploy, Process)
* Xone Library Hooks (MVC, Storage, Handlers, Events)
* Debug Mode
    * Debugger Tools
    * Performance Tools
    * Analytics/Statistic Tools
* Benchmark Integration
* Closure Compiler Integration ("Advanced Mode")
* Less CSS Integration
* CSS Compressor Integration
* JSDoc Integration
* Provides the most possible performance while ensuring maximum crossplatform support
* Compatible with almost each library out there (also can be mixed with similar technologies like: Angular or React)
-->

<!--
<img src="http://nextapps.de/img/xone_workflow.png">
-->
