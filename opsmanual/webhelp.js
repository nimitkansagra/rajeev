//4.1
var Kbase = {};

Kbase._layout = null;
Kbase._contentPanel = null;
Kbase._tocTree = null;
Kbase._tocToolbar = null;
Kbase._jsonToc = null;
Kbase._baseUrl = "";
Kbase._homeTopicId = -1;
Kbase._openingTopicId = -1;
Kbase._subTopicUrl = null;
Kbase._addingHistory = false;
Kbase._addHistory = true;
Kbase._indexPanel = null;
Kbase._indexData = null;
Kbase._indexPage = null;
Kbase._indexTabLoaded = false;
Kbase._indexPageFileLoaded = false;
Kbase._startSearchTime = null;
Kbase._jsonSearchStore = null;
Kbase._searchField = null;
Kbase._searchResultsPanel = null;
Kbase._isSearch = false;
Kbase._searchTerm = "";
Kbase._previousUrl = "";
Kbase._searchPartialWord = false;
Kbase._nodeUrl = "";
Kbase._googleAnalyticsAccId = "UA-866938-35";
Kbase._locale = "en";
Kbase._requestedUrl = "";
Kbase._allowTocTreeSelection = true;

//Google Analytics
Ext.Ajax.on('requestcomplete', function(connection, options, requestArge){ 

    if(Kbase._googleAnalyticsAccId){
        try{
            var pageTracker = _gat._getTracker(Kbase._googleAnalyticsAccId);
            var location = document.location.pathname;
            pageTracker._trackPageview(location.substring(0, location.lastIndexOf('/') + 1) + '#' + requestArge.url);
        }
        catch(err){ 
            err.description;
        }
    }
}); 

//@class AjaxDataStore
Ext.define('AjaxDataStore', {
		extend: 'Ext.util.Observable',
			constructor:function() {
			this.data = {};
	        this.addEvents({
	            "load" : true
	        });
	        this.callParent(arguments);
		},
		request: function(url) {
	        if(!url) return;
	        Ext.Ajax.request({
	           url: url,
	           success: function(response){
	                this.setData(response.responseText, url);
	                this.fireEvent("load", this.data);
	           },
	           failure: function(response){
	                this.fireEvent("load", {});
	           },
	           scope: this
	        });
	    },
		setData: function(rawString, url) {
			if((url && url.indexOf(".json") != -1) || (!url)) {
				var data = null;
				try {
					eval("data = " + rawString + ";");
				}
				catch(ex){}
				this.data = data;
			}
			else 
				this.data = rawString;
		}
	}
);

Ext.define('PreOrderTreeIterator', {

	getNext: function(node, root) {
        if(node.firstChild)
            return node.firstChild;
        else if(node.nextSibling)
            return node.nextSibling;
            
        while(node = node.parentNode) {
            if(root && node == root)
                return null;
            if(node.nextSibling)
                return node.nextSibling;        
        }
		return null;
    },
	
	getPrevious: function(node) {
		if(!node.previousSibling)
			return node.parentNode;
			
		//deepest last child of previous sibling
		node = node.previousSibling;
		while(node.lastChild)
			node = node.lastChild;
		return node;
	}
});

//Custom tree loader that enables us to filter the data before adding it to the tree
Ext.define('TocTreeItem', {
   extend: 'Ext.data.Model',
   fields: [
      { name: 'id',     type: 'integer' },
      { name: 'o',      type: 'integer' },
      { name: 'text',   type: 'string' },
      { name: 'url',    type: 'string' },
      { name: 'node',   type: 'string' }
    ]
});

Ext.define('TocReader', {
	extend: 'Ext.data.reader.Json',
	
	constructor:function(config) {
		this.filter = config.filter;
		this.callParent(arguments);
	},

	getResponseData: function(response){
		var o = Ext.decode(response.responseText.replace(/\u2028/g,' ')); //Firefox and Chrome fix (eval fail if the string contains the unicode character u2028)		
		this.data = o;
		if(this.filter)
			o = this.filter(o);
		return this.readRecords(o);
	}
});

Kbase.getLocalizedResource = function(name){
    if(typeof resources === 'undefined' || !resources[name]) return name;
    return resources[name];
}

//----------- init function ------------ 
Kbase.init = function(){
	// Enable/Disable caching for Extjs get requests 
	var disableCaching = true;
	var enableCachingEl = document.getElementById('enableCaching');
	if(enableCachingEl && enableCachingEl.value.toLowerCase() == "true")
		disableCaching = false;
					
	Ext.Ajax.disableCaching = disableCaching; 

    //Google Analytics 
    if(!Kbase._googleAnalyticsAccId){
        var googleAnalyticsAccIdEl = document.getElementById('googleAnalyticsAccId');
        if(googleAnalyticsAccIdEl && googleAnalyticsAccIdEl.value)
            Kbase._googleAnalyticsAccId = googleAnalyticsAccIdEl.value;
    }
    
	//Set locale if exist (if not exist 'en' English will be used as default) 
	var localeEle = document.getElementById('locale');
	if(localeEle && localeEle.value != "") Kbase._locale = localeEle.value;
	
    //load search.json
	this._jsonSearchStore = new AjaxDataStore(); 
    this._jsonSearchStore.on('load', this._searchFileLoaded, this);
    this._jsonSearchStore.request('search.json');

    //load indexpage.htm
    Kbase._indexData = new AjaxDataStore();
    Kbase._indexData.on('load', 
		function(indexpage){
			//Get the content of indexpage only (remove unwanted tags and content)
			var tempHtml = document.createElement('div');
			tempHtml.innerHTML = indexpage;
			if(typeof tempHtml.children != "undefined" && typeof tempHtml.children != null) {
				var childEls = tempHtml.children;
				var childrenRemove = [];
				for(var i = 0, ci = childEls.length; i < ci; i++){
					var tagName = childEls[i].tagName.toLowerCase()
					if(tagName == "meta" || tagName == "link" || tagName == "title" || tagName == "base")
						childrenRemove.push(childEls[i]);
				}
				for(var j = 0, cj = childrenRemove.length; j < cj; j++){
					tempHtml.removeChild(childrenRemove[j]);
				}
			}

			Kbase._indexPage = tempHtml.innerHTML;
			Kbase._indexPageFileLoaded = true; 
		}
	, this);
	
	Kbase._indexData.request('indexpage.htm');

    // Set base url
    this._baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf("/")) + "/";
    
    Ext.QuickTips.init();
    Ext.History.init();
 
    this._topicContent = Ext.create('Ext.panel.Panel',{
		id: 'topicContentPanelId',
		border: false,
		preventHeader: true,
		autoScroll: true,
		contentEl: 'topic-content'
	});
	
	this._contentPanel = Ext.create('Ext.panel.Panel', {
        id: 'content-panel',
        region: 'center',
        layout: 'card',
        margins: '0 0 0 -2',
        activeItem: 0,
        title: '&nbsp;',
		border: true,
		autoScroll: false,
        items: [ this._topicContent ]   
    }); 	 	
	
    var showCollapseAllIcon = Kbase._showIt("treeCollapsAll");
    var showExpandAllIcon = Kbase._showIt("treeExpandAll");
    
    this._tocToolbar = Ext.create('Ext.toolbar.Toolbar', {
        id: 'toc-toolbar',
        cls: 'tree-node-toolbar-no-bg-image',
        border: false,
        items:[ '->', 
            {
                hidden: (!showCollapseAllIcon),
                iconCls: 'collapse', 
                handler : Kbase._onClick_collapse_icon,   
                scope: this, 
                tooltip: Kbase.getLocalizedResource("Collapse All"),
                tooltipType: 'title'
            }, ' ', {
                hidden: (!showExpandAllIcon),
                iconCls: 'expand', 
                handler : Kbase._onClick_expand_icon, 
                scope: this, 
                tooltip: Kbase.getLocalizedResource("Expand All"), 
                tooltipType: 'title'
            }
        ]
    });
	
	var store = Ext.create('Ext.data.TreeStore', {
        model: 'TocTreeItem',
		proxy: {
            type: 'ajax',
            url: 'toc.json',
            reader: Ext.create('TocReader', { filter: Kbase._filterData })
        }
    });

	// TOC Tree panel   
    this._tocTree = Ext.create('Ext.tree.Panel', {
        id: 'tree-panel',
        title: Kbase.getLocalizedResource("Contents"),
        preventHeader: true,
        minSize: 150,
        border: false,
        margins: '0 0 0 0',
        rootVisible: false,
        lines: true,
        singleExpand: false,
        useArrows: true,
        containerScroll: true,
        animate: false,
        autoScroll: true,
        tbar: ((showCollapseAllIcon || showExpandAllIcon) ? this._tocToolbar : ''), //adds the CollapseAll/ExpandAll buttons    
		store: store
    });

     // index Panel
    this._indexPanel = Ext.create('Ext.panel.Panel',{
        id: 'index-panel',
        title: Kbase.getLocalizedResource("Index"),
        preventHeader: true,
        border: false,
        layout: 'fit',
        autoScroll: true,
        html: '<table align="center"><tr><td class="loading">' + Kbase.getLocalizedResource("Loading") + '</td></tr></table>'
	});

    this._indexPanel.on('render', Kbase._onRender_indexTab, this);

    // To show/hide icons
    // Home icon 
    var showHomeIcon = Kbase._showIt("homeIcon");
    // Tree Navigation Arrows 
    var showTreeNavigationArrows = Kbase._showIt("treeNavigationArrows");
    // Email This Page icon
    var showEmailIcon = Kbase._showIt("emailIcon");
    // Feedback icon 
    var showFeedbackIcon = Kbase._showIt("sendFeedbackIcon");
    // Print icon
    var showPrintIcon = Kbase._showIt("printIcon");
    // Edit This Topic icon
    var showEditIcon = Kbase._showIt("editIcon");
    // Edit Live icon (hidden by default)
    var showEditLiveIcon = false;
    
    // Show/Hide header
    var showHeader = Kbase._showIt("showHeader");
    
    // Start with collapsed West panel
    var collapsedWestPanel = Kbase._showIt("collapsedWestPanel");
    
    //Set search results to match partial words by default 
    //Note: this setting will apply regardless whether the 'Match partial words' showing or not 
    var matchPartialWordsInResult = Kbase._showIt("matchPartialWordsInResult");
	
	var checked = matchPartialWordsInResult ? "checked" : "";
    
    // Show Match partial words with Search
    var MatchPartialWords = Kbase._showIt("matchPartialWords");
    
    var MatchPartialWordsForm;
    var style = "";
    
    if(!MatchPartialWords)//hide Match Partial Words option
        style = 'style="display: none;"';

    MatchPartialWordsForm = '<form id="checkBoxForm" ' + style + '><input type="checkbox" ' + checked + ' name="matchPartialWord" onClick="Kbase._setSearchPartialWord()"><span class="checkbox-text">' + Kbase.getLocalizedResource("Match partial words") + '</span></form>';
    
    // West Panel Width
    var WestPanelWidth = 250;
    var WestPanelWidthElement = document.getElementById("westPanelWidth");
    if(WestPanelWidthElement){
        var wpw = parseInt(WestPanelWidthElement.value);
        if(!isNaN(wpw))
            WestPanelWidth = wpw;
    } 
    
    // West panel maximum width limit
    var WestPanelMaxWidth = 400;
    var WestPanelMaxWidthElement = document.getElementById("westPanelMaxWidth");
    if(WestPanelMaxWidthElement){
        var wpmaxw = parseInt(WestPanelMaxWidthElement.value);
        if(!isNaN(wpmaxw))
            WestPanelMaxWidth = wpmaxw;
    } 
    
    // West panel minimum width limit
    var WestPanelMinWidth = 190;
    var WestPanelMinWidthElement = document.getElementById("westPanelMinWidth");
    if(WestPanelMinWidthElement){
        var wpminw = parseInt(WestPanelMinWidthElement.value);
        if(!isNaN(wpminw))
            WestPanelMinWidth = wpminw;
    } 
    
    // Enable show/hide option for 'Edit Live icon' only if IE6 and over
    if(Ext.isIE){
        //getting IE version from userAgent (Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1 .....)
        var userAgent = navigator.userAgent;
        var ieIndex = userAgent.indexOf("MSIE");
        var ieVersion = userAgent.substr(userAgent.indexOf("MSIE") + 5, 1);
        showEditLiveIcon = Kbase._showIt("editLiveIcon") && (parseInt(ieVersion) >= 6);
    }
    
    var headerHeight = 50;
    var ToolbarHeight = 35;//25 is the height for Toolbar below header (the mainToolbar)
    //check whether the header is hidden or not
    if(!showHeader){
        headerHeight = 0;
    }else {
        //set the header height dynamically from whatever set in css i.e. (div#header { height: 80px; ...... } 
        var header = Ext.get("header");
        if(header)
            headerHeight = header.getHeight();
    }
   
    //search field to add to toolbar 
    this._searchField = Ext.create('Ext.form.field.Text', {id: 'search-textfield', top: 100, width: 200, height: 20, emptyText: Kbase.getLocalizedResource("Search")})
    this._searchField.on('specialkey', this._searchField_specialkey, this);
    this._searchField.setValue(Kbase.getLocalizedResource("Search loading"));
   
    // build the main layout
	this._layout = Ext.create('Ext.container.Viewport',{
        layout: 'border',
        margins: '0 0 0 0',
        items: [ this._contentPanel,
            Ext.create('Ext.panel.Panel',{ //Header and Toolbar
                id: 'north-panel',
                border: false,
                region: 'north',
                height: (headerHeight + ToolbarHeight),
                items: [
                    {//Header
                        el:'header',
                        border:false,
                        xtype: 'box',
                        hidden: (!showHeader),
                        height: headerHeight
                    },
                    Ext.create('Ext.toolbar.Toolbar',{//Toolbar
                        id: 'mainToolbar',
                        cls: 'x-small-editor-no-bg-image',
                        items: [ ' ', ' ',
                            {
                                hidden: (!showHomeIcon),
                                iconCls: 'homeIcon',
								text: 'Home',
			                    tooltip: Kbase.getLocalizedResource("Home"),
			                    tooltipType: 'title',
			                    scope: this,
			                    handler: this._onClick_home_icon
                            }
                            ,' ',' ',
                             {
                                hidden: (!showTreeNavigationArrows),
                                iconCls: 'upIcon',
			                    tooltip: Kbase.getLocalizedResource("Previous"),
			                    tooltipType: 'title',
			                    scope: this,
			                    handler: this._tocTree_selectPrevious
                            }
                            ,' ',' ',
                             {
                                hidden: (!showTreeNavigationArrows),
                                iconCls: 'downIcon',
			                    tooltip: Kbase.getLocalizedResource("Next"),
			                    tooltipType: 'title', 
			                    scope: this,
			                    handler: this._tocTree_selectNext
                            }
                            ,'->',
                            {
                                hidden: (!showEditIcon),
                                iconCls: 'EditIcon',
			                    tooltip: Kbase.getLocalizedResource("Edit in Author-it"),
			                    tooltipType: 'title',
			                    handler: this._onClick_edit_icon
                            }
                            ,' ',' ',
                            {
                                hidden: (!showEditLiveIcon),
                                iconCls: 'editLiveIcon',
			                    tooltip: Kbase.getLocalizedResource("Edit in Contribute"),
			                    tooltipType: 'title',
			                    handler: this._onClick_edit_live_icon
                            }
                            ,' ',' ',
                            { 
                                hidden: (!showEmailIcon),
                                iconCls: 'emailThisPageIcon',
			                    tooltip: Kbase.getLocalizedResource("Email this page"),
			                    tooltipType: 'title',
			                    handler: this._onClick_email_icon
                            }
                            ,' ',' ',
                            {
                                hidden: (!showFeedbackIcon),
                                iconCls: 'sendFeedbackIcon',
			                    tooltip: Kbase.getLocalizedResource("Send feedback"),
			                    tooltipType: 'title',
			                    handler: this._onClick_feedback_icon
                            }
                            ,' ',' ',
                             {
                                hidden: (!showPrintIcon),
                                iconCls: 'printIcon',
			                    tooltip: Kbase.getLocalizedResource("Print this page"),
			                    tooltipType: 'title', 
			                    scope: this,
			                    handler: this._onClick_print_icon
                            }
                            ,' ',' ',' ',' ',
                            //search
                            this._searchField
		                    , ' ', ' ',
		                    {
		                        id: 'search-Icon',
                                iconCls: 'searchIcon',
			                    tooltip: Kbase.getLocalizedResource("Search"),
                                tooltipType: 'title',
                                handler: this._search
                            }
                            , ' ', ' ',
                            
                            MatchPartialWordsForm
                             
                            ,' ', ' ',' '
                        ]
                    })
                ]
            })
        , {
            id: 'westPanelID',
            //region: (Kbase._locale == 'ar' || Kbase._locale == 'fa' || Kbase._locale == 'he') ? 'east' : 'west',
			region: Util.isRTL(Kbase._locale) ? 'east' : 'west',
            collapsible: true,
            collapsed: collapsedWestPanel,
            title: '',
            header: true,
            split: true,
            width: WestPanelWidth,
            minWidth: WestPanelMinWidth,
            maxWidth: WestPanelMaxWidth,
			layout: 'fit',
            margins: '0 0 0 0',
            border: true,
            titlebar: true,
            animate: true,
            items: [
                { xtype: 'tabpanel',
                id: 'tab-panel',
                border: false,
                activeTab: 1,
                margins: '0 0 0 0',
                tabPosition: 'bottom',
                items: [this._tocTree, this._indexPanel] }
            ]
        }
		],
        renderTo: Ext.getBody()
    });

    // To Add Attribute 'title' (to view on mouse hover) to the West panel expand collapse bar 
    Kbase._addToolTip();
    Ext.getCmp('westPanelID').on('collapse', Kbase._addToolTip, this);
    
    Ext.getCmp('search-Icon').disable();
    this._searchField.disable();

    this._tocTree.getStore().on('load', this._onLoad_tocTreeLoaded, this);
	
/* 	if(Ext.isIE && document.location.protocol == 'file:')
		Kbase._waitForLocalTocLoad(); */
	this._tocTree.on('itemmouseenter', Kbase._onMouseover_treePanel); 
    
    //--- To prevent the tree panel 'this._tocTree' Selecting nodes on mouse right click ----------------------
     this._tocTree.on('beforeitemmousedown', function(grid, record, item, index, event, eOpts) { 
        if (event.button == 2) {
            Kbase._allowTocTreeSelection = false;
		}
        else {
             Kbase._allowTocTreeSelection = true; 
		 }
    });
    this._tocTree.on('beforeselect', function(grid, record, index, eOpts) { 
        if(Kbase._allowTocTreeSelection)
			return true;
		else {
			Kbase._allowTocTreeSelection = true; 
			return false;
		}
    }); 
	//-----------------------------------------------------------------------------------------------------

    //'selection change' event for the Tree panel (this._tocTree) to load the content of the Node selected 
    this._tocTree.getSelectionModel().on('selectionchange', this._onSelectionchange_tocTree, this);
  
    Ext.getCmp('tab-panel').on('tabchange', this._onTabchange_tabPanel, this);
    
    // When history changed load related topic (if its not in add history mode)
    Ext.History.on('change', function(token){
        if(Kbase._addingHistory){ 
            Kbase._addingHistory = false;
        }else if(token){
            Kbase._addHistory = false;
            if(token == "#") token = "";
            Kbase._addingHistory = false;
            Kbase._F_openTopicByUrl(token);
        } else { 
            Kbase._addHistory = false;
            if(Ext.isGecko) Kbase._F_openTopicById(Kbase._homeTopicId); 
        }
    });
    
    //set the value of Kbase._searchPartialWord depends on if the checkbox 'matchPartialWord' is checked or not
    var checkBoxForm = document.forms['checkBoxForm'];
    if( checkBoxForm && checkBoxForm.matchPartialWord )
        Kbase._searchPartialWord = checkBoxForm.matchPartialWord.checked;

    Ext.defer(this._init_changeActiveTab, 1, this);
	
	this._topicContent.on('resize', Kbase._updateTopOfPageLink, this);
};
//----------- End of init function ------------  
 
//check the value return false if so
Kbase._showIt = function(configHfId){
        var IconHf = document.getElementById(configHfId);
        if(!IconHf) return true;
        if(IconHf.value.toLowerCase().indexOf("false") != -1) return false;
        
        return true;
};

Kbase._init_changeActiveTab = function(){
    Ext.getCmp('tab-panel').setActiveTab('tree-panel');
};

//----------------- Events Handlers --------------------
//Re write tree nods href on mouseover
Kbase._onMouseover_treePanel = function(view, record, item, index, e, eOpts){
    Ext.defer(Kbase._addLink, 50, this, [view, record, item, index, e, eOpts]);
};


Kbase._addLink = function(view, record, item, index, e, eOpts) {
	var td = item.childNodes[0];
    var children = item.childNodes[0].childNodes[0];
    if(children.innerHTML.indexOf('<a') == -1){
		children.innerHTML = "<a style='color:inherit !important;' href='" + Kbase._baseUrl + "#" + record.data.url + "'>" +  children.innerHTML + "</a>";
	}
};

Kbase._addToolTip = function(){
    // Add Attribute 'title' (to view on mouse hover) to the West panel expand collapse bar 
    var westPanelIDxcollapsed = document.getElementById("westPanelID-xcollapsed");
    if(westPanelIDxcollapsed){
        westPanelIDxcollapsed.setAttribute("title", Kbase.getLocalizedResource("Click to Expand/Collapse"));
        // Add Attribute 'title' (to view on mouse hover) to the West panel expand collapse bar button
        if(westPanelIDxcollapsed.firstChild) westPanelIDxcollapsed.firstChild.setAttribute("title", Kbase.getLocalizedResource("Click to Expand (Auto hide off)"));
    }
};

Kbase._setSearchPartialWord = function(){
    var checkBoxForm = document.forms['checkBoxForm'];
    if( checkBoxForm && checkBoxForm.matchPartialWord ){
        Kbase._searchPartialWord = checkBoxForm.matchPartialWord.checked;
    }
};

// West TabPanel Tab Change 
Kbase._onTabchange_tabPanel = function(){
    var tabPanelCmp = Ext.getCmp('tab-panel');
    // Set West Panel Title (change the title when tab clicked)
    Ext.getCmp('westPanelID').setTitle(tabPanelCmp.getActiveTab().title);
    if(tabPanelCmp.getActiveTab().id == "index-panel" && !Kbase._indexTabLoaded){
        Ext.defer(Kbase._updateIndexTab, 1);
    }

    if(tabPanelCmp.getActiveTab().id != "extSearchResultsPanel") Kbase._isSearch = false;
};

Kbase._filterData = function(input){  
    var output = [];
    Kbase._recurseFilterData(input, output);
    return output;
};

Kbase._recurseFilterData = function(input, output){
    for(var i = 0, ci = input.length; i < ci; i++){
        var inputData = input[i];
        if(inputData.hidden) continue;
        
        var outputData = {
            id:     inputData.id,
            text:   inputData.text,
            leaf:   inputData.leaf,
            node:   inputData.node,
            url:    inputData.url,
            children: []
        };
        
        if(inputData.children)
            Kbase._recurseFilterData(inputData.children, outputData.children);
                
        output.push(outputData);
    }
};

// When tree loaded
Kbase._onLoad_tocTreeLoaded = function(){
    // Assign toc.json data to Kbase._jsonToc (not filtered -with all nodes including hidden nodes)
    Kbase._jsonToc = this._tocTree.getStore().getProxy().getReader().data;
    //set _homeTopicId to start with (as default)
    var firstNode = Kbase._tocTree.getRootNode().firstChild;
    Kbase._homeTopicId = firstNode.data.id;
    var url = document.location.href;
    Kbase._F_openTopicByUrl(url);
};

// Calls appropriate open topic function.  Wired to onclicks.
Kbase._H_openTopicHandler = function(e, source, url){
    if(e) e.preventDefault();
    Kbase._F_openTopicByUrl(url);
};

// open topic function
Kbase._F_openTopicByUrl = function(url){
	Kbase._requestedUrl = url;
    Kbase._openingTopicId = Kbase._homeTopicId;
    // Get topic id from url (if any)
    var topicFileName = url.replace(Kbase._baseUrl, "");
    
    if(topicFileName != "" && topicFileName != "index.htm"){
        topicFileName = topicFileName.replace("index.htm", "");
        //remove first hash (if url Kbase._baseUrl/index.htm#...  or Kbase._baseUrl/#...)
        topicFileName = topicFileName.replace(/^#/, "");
		//what left from url e.g. either 1234.htm or 1234.htm#o2345 or 1234.htm#sectionName 
		//save hash value if any
		var subTopicHashIndex = topicFileName.indexOf("#o");
		var sectionHashIndex = topicFileName.indexOf("#");
		if(subTopicHashIndex > 0){//url has link to sub topic
			Kbase._subTopicUrl = topicFileName.substring(subTopicHashIndex);
			topicFileName = topicFileName.substring(0, subTopicHashIndex);
		}
		else if (sectionHashIndex > 0){//url has link to section
			Kbase._subTopicUrl = topicFileName.substring(sectionHashIndex);
			topicFileName = topicFileName.substring(0, sectionHashIndex);
		}
		else Kbase._subTopicUrl = null;
        Kbase._setOpenTopic(topicFileName, false);
    }else{
        // There is no topic in url so get home page (to open it) from config section in index.htm 
        var homeTopicEl = document.getElementById('homeTopic');
        if(homeTopicEl && homeTopicEl.value != "" ){
            topicFileName = homeTopicEl.value;
            Kbase._setOpenTopic(topicFileName, true);
        }
    }  
    Kbase._F_openTopicById(Kbase._openingTopicId);
};

Kbase._setOpenTopic = function(topicFileName, isHome){
    // To be used in Kbase._openTopic when topic not included in toc
    Kbase._nodeUrl = topicFileName;
    var nodeData = Kbase._F_getDataNodeByParameter(Kbase._jsonToc,"url", topicFileName + (Kbase._subTopicUrl || ""));
    if(!nodeData){ //node not found
        Kbase._openingTopicId = Kbase._homeTopicId; 
        return;
    }
    
	var treeNode = Kbase._tocTree.getRootNode();
	
    if(treeNode){
        var path = nodeData.node.split("+");
        for (var i = 0, ci = path.length; i < ci; i++)
        {
            if(treeNode.childNodes.length > 0 ){//&& !treeNode.attributes.hidden
                treeNode = treeNode.childNodes[path[i]];
                if(!treeNode)//not exist i.e. the main parent node is hidden and all its children 
                    break;
                else if(!treeNode.leaf && i != ci-1)
                    treeNode.expand();  
            }
        }
    }
	
    var nodeId = nodeData.id;
    Kbase._openingTopicId = nodeId;
    if(isHome) Kbase._homeTopicId = nodeId;
};

Kbase._F_getDataNodeByParameter = function(dataStore, parameterName, parameterValue){
	if(!dataStore || !dataStore.length) return null;
	
    for(var i = 0, ci = dataStore.length; i < ci; i++){
        if(dataStore[i][parameterName] == parameterValue)
            return dataStore[i];

        var dataStoreChildren = dataStore[i].children;
        if(dataStoreChildren){
            var nodeFound = Kbase._F_getDataNodeByParameter(dataStoreChildren, parameterName, parameterValue);
            if(nodeFound) return nodeFound;
        }
    }
};

// Open topic by topic id
Kbase._F_openTopicById = function(topicId){
    var topicNode = Kbase._tocTree.getStore().getNodeById(topicId);
    if(topicNode){
		var sm = Kbase._tocTree.getSelectionModel();
		//Make sure the content tab is active before calling select() otherwise the 'selectionchange' event will not be triggered
		var activeTab =  Ext.getCmp('tab-panel').getActiveTab();
		Ext.getCmp('tab-panel').setActiveTab('tree-panel');
		if(sm.isSelected(topicNode)) 
			sm.deselect(topicNode);
			
		Kbase._tocTree.getSelectionModel().select([topicNode]);
		if(activeTab && typeof activeTab.id != "undefined")
			Ext.getCmp('tab-panel').setActiveTab(activeTab.id);
    }else{
        //The topic/node is not included in the tree (hidden)
        Kbase._openTopic(topicId, Kbase._nodeUrl);
    }
};

// Back to Home Icon   
Kbase._onClick_home_icon = function(){
	var topicNode = Kbase._tocTree.getStore().getNodeById(Kbase._homeTopicId)
    //Make sure the content tab is active before calling select() otherwise the 'selectionchange' event will not be triggered
	Ext.getCmp('tab-panel').setActiveTab('tree-panel');
	if(topicNode){


		Kbase._tocTree.collapseAll();


		
		Kbase._setOpenTopic(topicNode.data.url, true);		
		Kbase._tocTree.getSelectionModel().select(topicNode);
		Kbase._tocTree.getView().getSelectedNodes(Kbase._homeTopicId - 1); // Subtract one from the topic Id to keep the value in sync with the ID of the node in the store.
    }
};

// Select previous (up)
Kbase._tocTree_selectPrevious = function(){
    Ext.getCmp('tab-panel').setActiveTab('tree-panel');
    var sm = Kbase._tocTree.getSelectionModel();
    sm.selectPrevious();
};

// Select next (down)
Kbase._tocTree_selectNext = function(){
    Ext.getCmp('tab-panel').setActiveTab('tree-panel');
    var sm = Kbase._tocTree.getSelectionModel();
	if(!sm) return;
    var lastSelectedNode = sm.getLastSelected();
	if(!lastSelectedNode) sm.selectNext();
	if(!lastSelectedNode.isExpanded())	
		Kbase._tocTree_expandNode(lastSelectedNode);
	
	sm.selectNext();
};

Kbase._tocTree_select = function(methodName) {
	Ext.getCmp('tab-panel').setActiveTab('tree-panel');
	var sm = Kbase._tocTree.getSelectionModel();
    var nodes = sm.getSelection();
	if(!nodes || nodes.length == 0)
		return;
		
	var treeIterator = Ext.create('PreOrderTreeIterator');
	var nextNode = treeIterator[methodName](nodes[0], Kbase._tocTree.getRootNode());
	
	if(nextNode) {
		//Make sure the content tab is active before calling select() otherwise the 'selectionchange' event will not be triggered
		Ext.getCmp('tab-panel').setActiveTab('tree-panel');
		sm.select([nextNode]);
		Kbase._tocTree_expandNode(nextNode);
	}
};

Kbase._tocTree_expandNode = function(node){ 
    node.expand(); 
};

// Edit this Topic
Kbase._onClick_edit_icon = function(){
    var editCommandEl = document.getElementById('sys_library_command_line');
    var editCommand = "";
    if(editCommandEl)
        editCommand = editCommandEl.value;

    var bookIdEl = document.getElementById('bookId');
    var bookId = "";
    if(bookIdEl)
        bookId = bookIdEl.value;

    var topicIdEl = document.getElementById('topicId');
    var topicId = "";
    if(topicIdEl)
        topicId = topicIdEl.value;
        
    window.open("authorit: " + editCommand + " /bookid" + bookId + " /objectid" + topicId);
};

// Edit in Contribute
Kbase._onClick_edit_live_icon = function(){
    var editEl = document.getElementById('liveServer');
    var topicIdEl = document.getElementById('topicId');
    var aliasEl = document.getElementById('liveServerAlias');
    
    if(editEl && topicIdEl && aliasEl){
        var live_server = editEl.value;
        var topicId = topicIdEl.value;
        var alias = aliasEl.value;
        window.open(live_server + "/?alias=" + alias + "&opentopic=" + topicId);
    } 
};

// Email this page
Kbase._onClick_email_icon = function(){
    var siteNameEl = document.getElementById('siteName');
    var siteName = "";
    if(siteNameEl)
        siteName = escape(siteNameEl.value);
    
    var sm = Kbase._tocTree.getSelectionModel();
    var articleName = "";
    if(sm.data)
        articleName = escape("(" +sm.data.text + ")");
        
    var topicIdEl = document.getElementById('topicId');
    var topicId = "";
    if(topicIdEl)
        topicId = escape(" " + topicIdEl.value  );

    var pageUrl = escape(document.location.href);
    
    document.location.href=("mailto:?Subject=(" + Kbase.getLocalizedResource("Link")+ ") " + siteName + " : " + topicId + " " + articleName + "&Body=" +  pageUrl) ;  
};

// Send Feedback
Kbase._onClick_feedback_icon = function(){
    var feedbackEmailEl = document.getElementById('feedbackEmail');
    var feedbackEmail = "";
    if(feedbackEmailEl)
        feedbackEmail = escape(feedbackEmailEl.value);//URL encode 
    
    var topicIdEl = document.getElementById('topicId');
    var topicId = "";
    if(topicIdEl)
        topicId = escape(topicIdEl.value);

    var sm = Kbase._tocTree.getSelectionModel();
    var articleName = "";
    if(sm.data)
        articleName = escape(" (" + sm.data.text + ")");
        
    var siteNameEl = document.getElementById('siteName');
    var siteName = "";
    if(siteNameEl)
        siteName = escape(siteNameEl.value);
        
    var pageUrl = escape(document.location.href);

    var feedBackTextEl = document.getElementById('feedBackText');
    var feedBackText = "";
    if(feedBackTextEl)
        feedBackText = feedBackTextEl.value;

    document.location.href= "mailto:" + feedbackEmail +"?Subject=(" + Kbase.getLocalizedResource("Feedback")+ ") " + siteName + " : " + topicId + articleName + "&Body=" + feedBackText + "%20%0D%0A%0D%0AURL%20" + pageUrl;
};

// Print Icon
Kbase._onClick_print_icon = function(){
    var DocumentContainer = document.getElementById('topic-content');
    var WindowObject = window.open('','', 'toolbar=yes,status=yes,width=800,height=600,scrollbars=yes,resizable=yes,menubar=yes');
    var linkElements = document.getElementsByTagName("link");                 
    var links = "";
    for(var i = 0; i < linkElements.length; i++ ){
        if(Ext.isIE) links += linkElements[i].outerHTML;
        else {
            var linkTag = "<link ";
            for(var j = 0; j < linkElements[i].attributes.length; j++ ){
                linkTag += linkElements[i].attributes[j].nodeName + "='" + linkElements[i].attributes[j].nodeValue + "' ";
            }
            linkTag += "></link>";
            links += linkTag;
        }
    }
                              
    WindowObject.document.writeln("<html><body style='overflow: scroll'>"+ links + DocumentContainer.parentNode.innerHTML + "</body></html>");
    WindowObject.document.close();
    WindowObject.focus();
    //Kbase_print.defer(100, this, [WindowObject]);
	Ext.defer(Kbase_print, 100, this, [WindowObject]);
};

Kbase_print = function(WindowObject){
    WindowObject.print();
    //WindowObject.close();
}

// Toc Tree CollapseAll 
Kbase._onClick_collapse_icon = function(){
    Kbase._tocTree.collapseAll();
};

// Toc Tree Expand All 
Kbase._onClick_expand_icon = function(){
    Kbase._tocTree.expandAll();
};

// Special key pressed inside search field
Kbase._searchField_specialkey = function(field, e){
    if(e.getKey() == e.ENTER)
        Kbase._search();
};

Kbase._onRender_indexTab = function(){
    Kbase._indexPanel.rendered = true;
};

Kbase._updateIndexTab = function(){
    // --- Load index --- To load index content 
    if(Kbase._indexPageFileLoaded && Kbase._indexPanel.rendered && !Kbase._indexTabLoaded){
        //Kbase._doUpdateIndexTab.defer(1);
		Ext.defer(Kbase._doUpdateIndexTab, 1);
    }
    else 
		Ext.defer(Kbase._updateIndexTab, 1);//Kbase._updateIndexTab.defer(1);
};

Kbase._doUpdateIndexTab = function(){
    Kbase._indexPanel.body.dom.id = 'index';
    var indexDivID = Kbase._indexPanel.body.dom.id;
    Ext.get(indexDivID).update(Kbase._indexPage);
    // Remove index heading
    var headingElems = Ext.DomQuery.select('#'+ indexDivID +' h1');
    if(headingElems[0]) Ext.get(headingElems[0]).remove();
       
    // Remove any images
    var imageElems = Ext.DomQuery.select('#'+ indexDivID +' img');
    for (var i = imageElems.length - 1; i >= 0; i--){
        Ext.get(imageElems[i]).remove();
    }

    // ----------------- Rewrite index letters links ---------------------
    var letterElems = Ext.DomQuery.select('#'+ indexDivID +' p.indexatoz a');

    for (var k = 0, ck = letterElems.length; k < ck; k++){
        var letterElem = letterElems[k];
        var letterId = letterElem.href.substring(letterElem.href.lastIndexOf('#') + 1);
        letterElem.href = '#';
        Ext.get(letterElem).on('click', Kbase._navigateToIndexLetter, this, letterId);

        // If not ie browser, rewrite name element on letters to id
        if (!Ext.isIE){
            var linkTarget = document.getElementsByName(letterId);
            if (linkTarget.length == 1)
                linkTarget[0].id = linkTarget[0].name;
        }
    } 
    //'onmouseover' event for the index panel to re wright links to topics
    if(Ext.getCmp('index-panel').body){
        Ext.getCmp('index-panel').body.on('mouseover', Kbase._onMouseover_indexPanel); 
        Ext.getCmp('index-panel').body.on('click', Kbase._onClick_indexPanel); 
    }

    Kbase._indexTabLoaded = true;
};

 Kbase._onMouseover_indexPanel = function(e, t){
    var link = Ext.fly(t).up('td.indexlink');
    if(link){
        var contentUrl = "";
        var linkEl = null;
        if(link.dom.childNodes[0].tagName){
            if(link.dom.childNodes[0].tagName.toLowerCase() == "a"){
                contentUrl = link.dom.childNodes[0].href;
                linkEl = link.dom.childNodes[0];
                
            }
        }else if(link.dom.childNodes[0].nextSibling.tagName){
            if(link.dom.childNodes[0].nextSibling.tagName.toLowerCase() == "a"){
                contentUrl = link.dom.childNodes[0].nextSibling.href;
                linkEl = link.dom.childNodes[0].nextSibling;
            }
        }
        
        if(contentUrl != ""){
            contentUrl = contentUrl.substring(contentUrl.lastIndexOf("/") + 1);
            if(contentUrl.replace("index.htm#", "").indexOf("#") != 0){
                var topicUrl = Kbase._baseUrl + "#" + contentUrl;//index.htm
                linkEl.href = topicUrl;
                Ext.get(linkEl).on('click', Kbase._H_openTopicHandler, this, topicUrl);
            }
        }
    }
 };

Kbase._onClick_indexPanel = function(e, t){
    var link = Ext.fly(t).up('td.indexlink');
    if(link){
        var contentUrl = "";
        var linkEl = null;
        if(link.dom.childNodes[0].tagName){
            if(link.dom.childNodes[0].tagName.toLowerCase() == "a"){
                contentUrl = link.dom.childNodes[0].href;
            }
        }else if(link.dom.childNodes[0].nextSibling.tagName){
            if(link.dom.childNodes[0].nextSibling.tagName.toLowerCase() == "a"){
                contentUrl = link.dom.childNodes[0].nextSibling.href;
            }
        }
    }
};

// Scroll index to a letter
Kbase._navigateToIndexLetter = function(e, source, letterName){
    e.preventDefault();
    var letterElem = Ext.query("A[name="+ letterName +"]")
    if(letterElem && letterElem.length > 0){
        Util.scrollToTop(letterElem[0], Kbase._indexPanel);
    }
};

// TOC Tree clicked or using .select() function will trigger 'selectionchange' event for Kbase._tocTree which calls Kbase function '_onSelectionchange_tocTree'  
Kbase._onSelectionchange_tocTree = function(selectionModel, tocTreeItems){ 
	var tocTreeItem = tocTreeItems[0];
	if(!tocTreeItem) return;
    Kbase._openTopic(tocTreeItem.get('id'), tocTreeItem.get('url'));
	//Phil -- I made the change block below, this will expand TOC (if has child nodes) on first click
	Ext.getCmp('tab-panel').setActiveTab('tree-panel');
    var sm = Kbase._tocTree.getSelectionModel();
	if(!sm) return;
    var lastSelectedNode = sm.getLastSelected();
	if(!lastSelectedNode) sm.selectNext();
	if(!lastSelectedNode.isExpanded())	
		Kbase._tocTree_expandNode(lastSelectedNode);
}; 

String.prototype.count = function(char){   
	return this.split(char).length-1;   
};

Kbase._openTopic = function (id, topicUrl){
    Kbase._openingTopicId = id;
    var url = topicUrl; 
    //add to history
    if(Kbase._addHistory && url != null){
        Kbase._addingHistory = true;
        Ext.History.add(url);
    }
    
    Kbase._addHistory = true;
    Ext.Ajax.on('requestexception', Kbase._showError);
    
    //striping subtopic of contentUrl and store it in Kbase._subTopicUrl (Author-it uses '#o' in topic url to indicate a subtopic)
    var subtopicIndex = topicUrl.indexOf("#o");
	var hashCount = topicUrl.count('#');
    if(subtopicIndex > 0){
       Kbase._subTopicUrl = topicUrl.substring(subtopicIndex);
       topicUrl = topicUrl.substring(0, subtopicIndex);
    } 
	else if (hashCount == 2){//check if there is a link to a section in the topic
		 var lastHashIndex = topicUrl.lastIndexOf("#");
		 if(lastHashIndex > 0){
			var sectionName = topicUrl.substring(lastHashIndex);
			if(sectionName.length > 0){
				Kbase._subTopicUrl = sectionName;
				topicUrl = topicUrl.substring(0, lastHashIndex);
			}
		 }
    }
	else if(Kbase._subTopicUrl != null && Kbase._requestedUrl.indexOf(Kbase._subTopicUrl) == -1){
        Kbase._subTopicUrl = null; 
		Kbase._requestedUrl = "";
    }

    // Request content
    Ext.Ajax.request({
        url: topicUrl,
        success: Kbase._content_response,
        failure: Kbase._showError(this),
        scope: this
    });
};

Kbase._showError = function(response){
    Ext.get('start-panel').update(response.responseText, true);
};

// Content received load it into start-panel in content panel
Kbase._content_response = function(response){
	var bodyInnerHTML = this._getBodyInnerHTML(response.responseText);
	Ext.get('start-panel').update(bodyInnerHTML, true);
	var currentNode = Kbase._tocTree.getStore().getNodeById(Kbase._openingTopicId);
	var contentTopicUrl = currentNode.data.url;
	
	//Set class to home page (e.g. set different background)
	var homeEl = document.getElementById('homeTopic');
	if(homeEl && homeEl.value != "" ){
		if(homeEl.value == contentTopicUrl){
			Ext.get('start-panel').addCls('homepage');
		}else {
			Ext.get('start-panel').removeCls('homepage');
		}
	}
	
    //------------------ build breadcrumb links ----------------------    
    // Build & set content panel title as breadcrumb trail to topic title
    var title = "&nbsp;";
	var place="<span class=\"place\" >You are here:&nbsp;&nbsp; </span>";
	
    if(currentNode){
        title = currentNode.get('text');
        title = "<span class=\"breadcrumb\" >" + title + "&nbsp;</span>";
        
        while(currentNode.getDepth() > 1){
            currentNode = currentNode.parentNode;
            var contentUrl = currentNode.get('url');
			if (Util.isRTL(Kbase._locale))
				title += "&nbsp;&lt;&nbsp;"+ "<a class=\"breadcrumb\" href=\"" + Kbase._baseUrl + "#" + contentUrl +  "\" topicId=\"" + currentNode.get('id')  + "\">" + currentNode.get('text') + "</a>";//index.htm
			else
				title = "<a class=\"breadcrumb\" href=\"" + Kbase._baseUrl + "#" + contentUrl +  "\" topicId=\"" + currentNode.get('id') + "\">" + currentNode.get('text') + "</a>&nbsp;&gt;&nbsp;" + title;//index.htm
		}
    }else {// node is not included in toc 
        // Check if hidden node in TOC set to show in breadcrumb
        var showInBreadcrumb = Kbase._showIt('hiddenTocTopics');
        if(showInBreadcrumb){
            var jsonTocDataNode = Kbase._F_getDataNodeByParameter(Kbase._jsonToc,"id", Kbase._openingTopicId);
            if(jsonTocDataNode){
                var title = "<span class=\"breadcrumb\" >" + jsonTocDataNode.get('text') + "&nbsp;</span>",
                    nodePath = jsonTocDataNode.node,
                    path = nodePath.split("+"),
                    breadcrumb = "",
                    currentPath;
                
                for (var i = 0, ci = path.length; i < ci; i++){
                   if(i == ci - 1) continue;// We are after the parent nodes 
                    currentPath = i == 0 ? path[i] : currentPath + "+" + path[i];
                    var dataNode = Kbase._F_getDataNodeByParameter(Kbase._jsonToc,"node", currentPath);
                    if(dataNode) {
                        var url = dataNode.get('url');
						if (Util.isRTL(Kbase._locale))
							breadcrumb += "&nbsp;&lt;&nbsp;" + "<a class=\"breadcrumb\" href=\"" + Kbase._baseUrl + "#" + url +  "\" topicId=\"" + dataNode.get('id')  + "\">" + dataNode.get('text') + "</a>";//index.htm
						else
							breadcrumb += "<a class=\"breadcrumb\" href=\"" + Kbase._baseUrl + "#" + url +  "\" topicId=\"" + dataNode.get('id')  + "\">" + dataNode.get('text') + "</a>" + "&nbsp;&gt;&nbsp;";//index.htm
					}
                }
				
				if (Util.isRTL(Kbase._locale))
					title += place+breadcrumb;	
				else
					title = breadcrumb + title;                
            }
        }
    }

    Ext.getCmp('content-panel').setTitle(place+title);  
    
    //adding onclick event to breadcrumb links to load related topic
    var breadcrumbLinks = Ext.DomQuery.select('a.breadcrumb');
    for(var j = 0, cj = breadcrumbLinks.length; j < cj; j++){
        var breadcrumbLink = Ext.get(breadcrumbLinks[j]);
        var url = breadcrumbLink.dom.href;
        breadcrumbLink.on('click', Kbase._H_openTopicHandler, this, url);
    }

    //----------------- Write topic links -----------------------
    var linkElems = Ext.DomQuery.select('#start-panel a');
	
	var publicationExtensionsCfgEle = document.getElementById('publicationExtensions'),
		publicationExtensionsCfg = (publicationExtensionsCfgEle) ? publicationExtensionsCfgEle.value : "htm",
		publicationExtensions = publicationExtensionsCfg.split(","),
		extns = {};
	for(var i = 0, ci = publicationExtensions.length; i < ci; i++)
		extns[publicationExtensions[i]] = true;

    for(var i = 0, ci = linkElems.length; i < ci; i++){
        var link = linkElems[i],
			url = link.href;
        
		// Skip non-local links
        if(url.indexOf(Kbase._baseUrl) == -1)
            continue;
		
		// Ignore links made to non-topic content
		var topicFileName = url.split( '/' ).pop();

		if(topicFileName == null || typeof topicFileName == "null" || typeof topicFileName == "undefined" || topicFileName.length == 0)

			continue;	
			

		if(topicFileName == "index.htm" || topicFileName == "#top")

			continue;

		var dotInx = topicFileName.indexOf('.');

		var extn = topicFileName.substr(dotInx + 1);

		var hashInx = extn.indexOf('#');

		if(hashInx >= 0)

			extn = extn.substr(0, hashInx);
			

		if(!extns[extn])

			continue;
			

		var topicUrl = Kbase._baseUrl + "#" + topicFileName;//index.htm

		link.href = topicUrl;

		Ext.get(link).on('click', Kbase._H_openTopicHandler, this, topicUrl);  	
    //-----------------------------------------------------------          
    }
    // Scroll to the required hash value(sub topic)
    if(Kbase._subTopicUrl != null){
        var tagName = Kbase._subTopicUrl.replace("#", "");
        var query = "#topic-content a[name=" + tagName + "]";
        var toScroll = Ext.DomQuery.select(query);//Ext.query(query);

        if(toScroll[0] != null)
			Util.scrollToTop(toScroll[0], Ext.get('topic-content').dom.parentNode.id);
			
    }else{
		Kbase._topOfPage();
	}
    
    if(Kbase._isSearch == true){
        var panel = "start-panel";
        Ext.defer(Kbase._searchHighlight, 1, this, [panel]);//Highlight searchTerm words in result topic content
    }
	
    //gets input values from topic file e.g (845.htm) and update the footer with this values
    if(document.getElementById('footer')){
        var variables = document.getElementById('footer').getElementsByTagName('div');
        if(variables){
            for (var v = 0; v < variables.length ; v++){
               var inputEl = document.getElementById('footer-' + variables[v].id);
               if( inputEl ){
                   Ext.get(variables[v].id).update(inputEl.value);
               }
            }
        }
    } 
	Kbase._requestedUrl = "";
	
	//show/hide top of page link depends on page height
	Kbase._addTopOfPageLink(); 
	
	//add handler to update TopOfPage Link if the topic content length change after the content been added e.g. Expanding Blocks 
	var topicEl = document.getElementById('topic-content');
	if(topicEl){
		var contentEl = topicEl.parentNode;
		if(contentEl && contentEl.addEventListener)
			contentEl.addEventListener("click", Kbase._updateTopOfPageLink, true);
	} 
};


Kbase._getBodyInnerHTML = function(responseText){
	var startBody = responseText.indexOf("<body");
	if(startBody == -1) return responseText;
	var endBody = responseText.indexOf("</body>");
	if(endBody == -1) return responseText;
	var body = responseText.substring(startBody, endBody + 7);//7 number of characters of </body>
	var divEl = document.createElement('div');
	divEl.innerHTML = body;
	
	return divEl.innerHTML;
}

Kbase._updateTopOfPageLink = function(){
	Ext.defer(Kbase._addTopOfPageLink, 500);
};

//show/hide top of page link depends on page height
Kbase._addTopOfPageLink = function(){
    var topicEl = document.getElementById('topic-content').parentNode;
	if(topicEl){
		//Add Top Of Page Link when panel height has been increased
		if(topicEl.scrollHeight <= topicEl.clientHeight){
			var topp = document.getElementById('topOfPage');
			if(topp){
				document.getElementById('topOfPage').innerHTML = "";
			}
		} else {
			var topg = document.getElementById('topOfPage');
			if(!topg){
				topg = new Ext.Element(document.createElement('div'));
				topg.innerHTML = "";
				var isCreated = true;
			}
			
			if(topg.innerHTML == "")
			{
				topg.innerHTML = "<div id='topOfPage' class='topOfPage'><a onclick='Kbase._topOfPage()'>" + Kbase.getLocalizedResource("Top of Page") + "</a></div>";
			}
			
			if(isCreated){
				var startpanel = document.getElementById('start-panel');
				if(startpanel){
					startpanel.innerHTML = startpanel.innerHTML + topg.innerHTML;
				}
			}
		}
	}	
};

Kbase._searchHighlight = function(id){
    if (!document.createElement) return;
    // Remove old css class 'searchword1' if exist
    var spanElems = Ext.get('topic-content').select('span[class=searchword1]');

    for (var i = 0, ci = spanElems.elements.length; i < ci; i++){
        if(Ext.isIE)
            spanElems.elements[i].clearAttributes();
        else spanElems.elements[i].removeAttribute('class');
    }
    
    var words = Kbase._searchTerm.replace(/\+/g,' ').split(/\s+/);

	for (var w=0;w<words.length;w++){	    
		var word = Util.trim(words[w]);
		if(words[w])
		    Kbase._highlightWord(document.getElementById(id), word, 1, Kbase._searchPartialWord);
	}
	
	Kbase._isSearch = false;
};

Kbase._highlightWord = function(node, word, instance, partial){
    // Iterate into this nodes childNodes
    if (node.hasChildNodes()){
        for (var cn = 0; cn < node.childNodes.length; cn++){
            Kbase._highlightWord(node.childNodes[cn], word, instance, partial);
        }
    }

    // And do this node itself
    if (node.nodeType == 3){ // text node
        var tempNodeVal = node.nodeValue.toLowerCase();
        var tempWordVal = word.toLowerCase();

        var ni = 0;
        if (partial){
            ni = tempNodeVal.indexOf(tempWordVal);
        } else {
			ni = Kbase._findWord(tempNodeVal, tempWordVal);
        }

        if (ni != -1){
            var pn = node.parentNode;
            if (pn.className.substr(0, 10) != "searchword"){
                // word has not been highlighted!
                var nv = node.nodeValue;
                // Create a load of replacement nodes
                var before = document.createTextNode(nv.substr(0, ni));
                var docWordVal = nv.substr(ni, word.length);
                var after = document.createTextNode(nv.substr(ni + word.length));
                var hiWordText = document.createTextNode(docWordVal);
                var hiWord = document.createElement("span");
                hiWord.className = "searchword1";
                hiWord.appendChild(hiWordText);
                pn.insertBefore(before, node);
                pn.insertBefore(hiWord, node);
                pn.insertBefore(after, node);
                pn.removeChild(node);
            }
        }
    }
}; 

Kbase._searchFileLoaded = function(){
   var icon = null;
   try { icon = Ext.getCmp('search-Icon'); } catch(ex){}

   if(!Kbase._searchField || !icon){
		Ext.defer(Kbase._searchFileLoaded, 30);//Kbase._searchFileLoaded.defer(30);
		return;
   }

   Kbase._searchField.enable();
   Kbase._searchField.setValue("");
   icon.enable();
}

// Ensure results panel exists
Kbase._ensureSearchResultsPanel = function(){
    var tabPanelCmp = Ext.getCmp('tab-panel');
    if(Ext.get('searchResultsPanel') == null){  
        Kbase._searchResultsPanel = Ext.create('Ext.panel.Panel', { 
			id: 'extSearchResultsPanel', 
			layout: 'fit', 
			title: Kbase.getLocalizedResource("Search"), 
			closable: true,
			autoScroll: true,
			html: '<div id="searchResultsPanel"><div id="searchMessage"></div><div id="searchResults"></div></div>' 
		});

        tabPanelCmp.add(Kbase._searchResultsPanel);
        tabPanelCmp.doLayout();
        tabPanelCmp.setActiveTab(Kbase._searchResultsPanel);

		Kbase._searchResultsPanel.body.dom.setAttribute('className', 'searchResultsPanel');
		Kbase._searchResultsPanel.body.dom.setAttribute('class', 'searchResultsPanel');
            
            
        if(Ext.get('searchResults'))
            Ext.get('searchResults').on('click', Kbase._onClick_searchPanel);//used for topic content heighlight
               
    }else tabPanelCmp.setActiveTab(Kbase._searchResultsPanel); 
    
    Ext.get('searchResults').update("");
    Ext.get('searchMessage').update("<p>" + Kbase.getLocalizedResource("Searching") + "...</p>");
	
	Kbase._clearSearchAndSlideOut();

    Ext.defer(Kbase._startSearch, 1);
};

// ------ Perform search--------------------------
Kbase._search = function(){ 
    Kbase._startSearchTime = new Date().getTime();   
    Ext.defer(Kbase._ensureSearchResultsPanel, 1);//Kbase._ensureSearchResultsPanel.defer(1);
};

Kbase._startSearch = function(){
    var ds = Kbase._jsonSearchStore;
    if(!ds.data.pages) return; 
        
    var PageCount = ds.data.pages.length;
    var searchTerm = Kbase._searchField.getValue();
    
    searchTerm = Util.trim(searchTerm);
    // Escape characters
    if(searchTerm.length == 1)
    {
        var regex = new RegExp("[^a-zA-Z0-9]", "gi");
        var result = searchTerm.match(regex);
        if(result) searchTerm = "";
    }
    if( searchTerm.length == 2 && (searchTerm.indexOf("\\\\") == 0 || searchTerm.indexOf("//") == 0) )
    {
         searchTerm = "";
    }
    
    if(searchTerm.length >= 1){
        while( searchTerm.indexOf("<")>-1 || searchTerm.indexOf(">")>-1 || searchTerm.indexOf('"')>-1 || searchTerm.indexOf('\'')>-1 || searchTerm.indexOf("?") >-1){
            searchTerm = searchTerm.replace("<"," ").replace(">"," ").replace('"'," ").replace('\''," ").replace("?"," ");//&lt;  &gt; &quot;
        }
    }
    // End Escape characters
    
    searchTerm = Util.trim(searchTerm);//Remove multiple, leading or trailing spaces
    if(searchTerm == ""){
		Kbase._showSearchMsg("No search performed");
		return;
    }

	searchTerm = searchTerm.toLowerCase();
	Kbase._searchTerm = searchTerm;
	
	var phrases = Kbase._searchTerm.replace(/\+/g,' ').split(/\s+/);
	var phrasesCount = phrases.length;
	Kbase._result = [];
	Kbase._resultGroupsRank = [];
	Kbase._rankIndex = 0;
	Kbase._resultCount = 0;
	resultString = "";
	
	//Search pages (iterate through each page)
	for (var i = 0, ci = ds.data.pages.length; i < ci; i++){
		var page = ds.data.pages[i];
		Kbase._currentPageToSearch = page;
		Kbase._searchPage(phrases, 0, phrasesCount);
	}	
	
	if(Kbase._resultCount == 0){
		Kbase._showSearchMsg("No search performed");
		return;
    }
	//Ranking the result
	for (var j = 0, cj = Kbase._result.length; j < cj; j++){
		if(Kbase._result[j]){
			var indexStr = j + "";
			var numberOfDigits = indexStr.length;
			var firstDigit = (numberOfDigits == 1) ? indexStr : indexStr.substring(0, 1);	
			var groupRankIndex = new Number(numberOfDigits + firstDigit);
			if(Kbase._resultGroupsRank[groupRankIndex])
				Kbase._resultGroupsRank[groupRankIndex][j] = Kbase._result[j];
			else {
				Kbase._resultGroupsRank[groupRankIndex] = [];
				Kbase._resultGroupsRank[groupRankIndex][j] = Kbase._result[j];
			}
		}
	}
	//Construct result string
	var lastIndex = Kbase._resultGroupsRank.length - 1;
	for (var m = lastIndex; m >=0; m--){
		if(Kbase._resultGroupsRank[m]){
			for (var k = 0, ck = Kbase._resultGroupsRank[m].length; k < ck; k++){
				if(Kbase._resultGroupsRank[m][k])
					resultString += Kbase._resultGroupsRank[m][k];
			}
		}
	}

	var searchMessageEl = Ext.get('searchMessage');
	var searchResultsPanelEl = Ext.get('searchResultsPanel');
	
	// Display results
	var resultHtml = '<p><table class="searchResults"><tbody><tr><td class="srtd">' + resultString + "</td></tr></tbody></table><p>";
	Ext.get('searchResults').update(resultHtml);
	var t1 = Kbase._startSearchTime;
	var t2= new Date().getTime(); 
	var t = (t2-t1)/1000; 
	var resultFound = "<p id='searchDetails' class='searchDetails'>&nbsp;" + Kbase._resultCount + " " + Kbase.getLocalizedResource("result(s) found") + "<br />("+ t +") " + Kbase.getLocalizedResource("seconds") + "</p><br />";
	searchMessageEl.update(resultFound);
	searchMessageEl.show();
	if(searchResultsPanelEl.parent())
		searchResultsPanelEl.parent().scroll("top", 100000, false); 
}; 

Kbase._searchPage = function (phrases, start, end){
	var pageTitle = Kbase._currentPageToSearch.title;
	var pageContents = Kbase._currentPageToSearch.text;
	var searchPhrases = Kbase._constructSearchPhrases(phrases, start, end);
	if(!searchPhrases) return;
	
	var foundInTitleIndex = -1;
	
	if (Kbase._searchPartialWord){//Search in Title
		foundInTitleIndex = pageTitle.toLowerCase().indexOf(searchPhrases);
	} else {
		foundInTitleIndex = Kbase._findWord(pageTitle, searchPhrases);
	}  
	
	//construct rank index
	var startStr = start + "";
	var endStr = end + "";
	var searchPhrasesSeperated = searchPhrases.replace(/\+/g,' ').split(/\s+/);
	var searchPhrasesCount = searchPhrasesSeperated.length + "";
	var rankIndex = new Number(searchPhrasesCount + startStr + endStr);
	
	if(foundInTitleIndex != -1){//Found in Title
		var contentUrl = Kbase._currentPageToSearch.url; 
		var topicUrl = "#" + contentUrl;//index.htm
		var sb_pageTitle = new StringBuilder();
		sb_pageTitle.append('<a href="'+ topicUrl +'" >' + Kbase._startSearch_highlightText(searchPhrases, pageTitle) + "</a><br />" + Kbase._startSearch_highlightText(searchPhrases, Kbase._trimText(pageContents, searchPhrases, foundInTitleIndex))); 
		sb_pageTitle.append("<br /><br />");  

		Kbase._result[rankIndex] = (Kbase._result[rankIndex] ? Kbase._result[rankIndex] : "") + sb_pageTitle.toString();
		Kbase._resultCount++; 
	}
	else {//Search in Content
		var foundInContentIndex = -1;
		if (Kbase._searchPartialWord){
			foundInContentIndex = pageContents.toLowerCase().indexOf(searchPhrases);
		} else {
			foundInContentIndex = Kbase._findWord(pageContents, searchPhrases);
		}
		
		if(foundInContentIndex != -1){//Found in Content 
			var contentUrl = Kbase._currentPageToSearch.url; 
			var topicUrl = "#" + contentUrl;//index.htm
			var sb_pageContents = new StringBuilder();
			sb_pageContents.append('<a href="'+ topicUrl +'" >' + Kbase._startSearch_highlightText(searchPhrases, pageTitle) + "</a><br />" + Kbase._startSearch_highlightText(searchPhrases, Kbase._trimText(pageContents, searchPhrases, foundInContentIndex))); 
			sb_pageContents.append("<br /><br />");
			//Add to result
			Kbase._result[rankIndex] = (Kbase._result[rankIndex] ? Kbase._result[rankIndex] : "") + sb_pageContents.toString();
			Kbase._resultCount++; 
		}
		else {//No results for the current searchPhrases:
			var currentStart = start + 0;//(+ 0) is for getting the value not the refrence
			var currentEnd = end + 0;
			var c = phrases.length;
			if(currentEnd == c){
				start = 0;//set the start to zero
				end = c - (currentStart + 1);
			}
			else {
				start = currentStart + 1;
				end = currentEnd + 1;
			}
			
			if(start == 0 && end == 1)//Its the first phrase only
				Kbase._searchPhrasesSeparated(phrases, phrases.length);//searching for single phrases separated, start with all phrases separated if not found search for phrases - 1
			else
				Kbase._searchPage(phrases, start, end);
		}
	}
};

Kbase._searchPhrasesSeparated = function(phrases, phrasesToSearchCount){
	var pageTitle = Kbase._currentPageToSearch.title;
	var pageContents = Kbase._currentPageToSearch.text;
	var firstFoundInTitleIndex = -1;
	var firstFoundInContentIndex = -1;
	var found = [];
	
	for (var i = 0, ci = phrases.length; i < ci; i++){
		var foundInTitleIndex = -1;
		if (Kbase._searchPartialWord){
			foundInTitleIndex = pageTitle.toLowerCase().indexOf(phrases[i]);
		} else {
			foundInTitleIndex = Kbase._findWord(pageTitle, phrases[i]);
		}

		if(foundInTitleIndex == -1){//not found in pageTitle
			var foundInContentIndex = -1;
			if (Kbase._searchPartialWord){
				foundInContentIndex = pageContents.toLowerCase().indexOf(phrases[i]);
			} else {
				foundInContentIndex = Kbase._findWord(pageContents, phrases[i]);
			}
		}
		
		if(foundInTitleIndex != -1){//phrase found in title
			found.push(phrases[i]);
			if(firstFoundInTitleIndex == -1)
				firstFoundInTitleIndex	= foundInTitleIndex;
		}
		else if(foundInContentIndex != -1){//phrase found in content
			found.push(phrases[i]);
			if(firstFoundInContentIndex == -1)
				firstFoundInContentIndex = foundInContentIndex;
		}
	}
	
	var foundCount = found.length;
	
	if(foundCount == phrasesToSearchCount){//All phrases separated found, add this page to the result 
		var index = firstFoundInTitleIndex != -1 ? firstFoundInTitleIndex : firstFoundInContentIndex;
		var sb = new StringBuilder();
		var contentUrl = Kbase._currentPageToSearch.url; 
		var topicUrl = "#" + contentUrl;//index.htm
		var searchPhrases = Kbase._constructSearchPhrases(phrases, 0, phrases.length);
		sb.append('<a href="'+ topicUrl +'" >' + Kbase._startSearch_highlightText(found[0], pageTitle) + "</a><br />" + Kbase._startSearch_highlightText(found[0], Kbase._trimText(pageContents, found[0], index))); 
		sb.append("<br /><br />");  
		
		var rankIndex = 1 + "" + phrases.length - foundCount;//1 because searching for phrases seperated
		var rankIndex = new Number(rankIndex);
		Kbase._result[rankIndex] = (Kbase._result[rankIndex] ? Kbase._result[rankIndex] : "") + sb.toString();
		Kbase._resultCount++; 
	}
	else{//All phrases separated NOT found, reduce the number of phrases by one 
		phrasesToSearchCount = phrasesToSearchCount - 1;
		if(phrasesToSearchCount > 0)
			Kbase._searchPhrasesSeparated(phrases, phrasesToSearchCount)
	}
};

Kbase._constructSearchPhrases = function(phrases, start, end){
	var searchPhrases = "";
	for (var i = start, ci = end; i < ci; i++){
		var space = "";
		if(i != (ci - 1))
			space = " ";
		searchPhrases += phrases[i] + space;
	}
	return searchPhrases;
};

Kbase._showSearchMsg = function (msg){
	var resultHtml = '<p><table class="searchResults"><tbody><tr><td class="srtd">' + "" + "</td></tr></tbody></table><p>";
	Ext.get('searchResults').update(resultHtml);
	var searchMessageEl = Ext.get('searchMessage');
	searchMessageEl.update("<p>" + Kbase.getLocalizedResource(msg) + "</p>");
	searchMessageEl.show();
	return;
};

Kbase._clearSearchAndSlideOut = function(){     
    //slide out the searsh panel if search performed and the west panel is collapsed
    var westPanel = Ext.getCmp('westPanelID');
    if(westPanel && westPanel.collapsed){
        //slideOut() is an internal EXTJS method so it needs to be checkd if supported -in case of EXTJS library upgrated-
        try{
            Kbase._layout.getLayout().west.slideOut();
        }catch (e){ 
            westPanel.expand(true); 
        } 
    } 
};

Kbase._startSearch_highlightText = function(searchTerm, textToHighlight){
    var regex = new RegExp(searchTerm, "gi");
    var result = textToHighlight.match(regex);
    var highlightedText = textToHighlight;
    
    if(result){
        var text = textToHighlight;
        highlightedText = "";
        var pos1 = 0;
        var pos2 = text.length;
        var temptext = "";
        for(var i = 0, ci = result.length; i < ci; i++){
            if(text.indexOf(result[i]) == -1 ) continue;
            pos2 = text.indexOf(result[i]) + result[i].length;
            temptext = text.substr(0, pos2);
            var temptextPlusOne;
            if(text.length > temptext.length)
                temptextPlusOne = text.substr(0, pos2 + 1);
            else temptextPlusOne = temptext;
            text = text.substr(pos2);
            pos1 = pos2;
            if(!Kbase._searchPartialWord){
                var rex = new RegExp("\\b" + result[i] + "\\b", "gi");
                var reslt = temptextPlusOne.match(rex);
                if(reslt)
                    temptext = temptext.replace(result[i], '<span class="searchword1" >'+result[i]+'</span>');
            }
            else {
                temptext = temptext.replace(result[i], '<span class="searchword1" >'+result[i]+'</span>');
            }

            highlightedText = highlightedText + temptext;
        }
        highlightedText += text;
    }
    return highlightedText;
};

Kbase._trimText = function (pageContents, firstWord, index){
    var textbefore = pageContents.substr(0, index);
    var text = "";
    var noOfCharToTrim = 50;
    if(textbefore.length > noOfCharToTrim){
        text = pageContents.substr( index - noOfCharToTrim, firstWord.length + noOfCharToTrim * 2 );
        text = "..." + text.substr(text.indexOf(" ") + 1);
    }else text = pageContents.substr( 0, textbefore.length + firstWord.length + noOfCharToTrim );

    text = text + "...";

    while( text.indexOf("<") > -1 || text.indexOf(">") > -1  ){
        text = text.replace("<","&lt;").replace(">","&gt;");
    }
    
    return text;
};

Kbase._onClick_searchPanel = function(e, t){
    if(t.tagName){
        if(t.tagName.toLowerCase() == "a"){
            Kbase._isSearch = true;
            Kbase._F_openTopicByUrl(t.href);
        }else if(t.parentNode.tagName){
            if(t.parentNode.tagName.toLowerCase() == "a"){
                Kbase._isSearch = true; 
                Kbase._F_openTopicByUrl(t.parentNode.href);
            }
        }
    }
};

Kbase._highlightSelectedNode = function() {
	var highlightColorEle = document.getElementById("treeNodeHighlightEffectColor");
	if(!highlightColorEle || !highlightColorEle.value)
		return;
	
	var eles = Kbase._tocTree.getView().getSelectedNodes();
	if(!eles || eles.length == 0) 
		return;
	
	var el = Ext.get(eles[0].firstChild.firstChild); //ext4 has !important on the background color of the td of the selected row, so we need to highlight over that or we never see it.
	el.highlight(highlightColorEle.value, { duration: 1000 });
};

Kbase._findWord = function(string, word){
	var reg = new RegExp("\\b" + word + "\\b", "gi");
	return string.search(reg);			
};
// --------- String Builder Class needed by search ---------- http://www.codeproject.com/KB/scripting/stringbuilder.aspx ---------
function StringBuilder(value){
    this.strings = new Array("");
    this.append(value);
};

// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function (value){
    if (value)
    {
        this.strings[this.strings.length] = value;
    }
};

// Clears the string buffer
StringBuilder.prototype.clear = function (){
   this.strings.length = 1;
};

// Converts this instance to a String.
StringBuilder.prototype.toString = function (){
    return this.strings.join("");
};
// ---------- End String Builder Class--------------------


Kbase._topOfPage = function(){
    var p = Ext.get(Ext.get('topic-content').dom.parentNode.id);
    p.scroll("top", 100000, true);
};

// ------------- Utility functions ------------------
Util = {
    // Scroll a container to the top of an element.
    scrollToTop: function(element, container){
		element.scrollIntoView(true);	
    },
    // Strips <style> and <link> stylesheets from html
    stripStyles: function(html){
        html = html.replace(/[<]link.+?[>]/g, "");
        html = html.replace(/\<style([^<]+)<[/]style>/gm, "");
        return html;
    },
    // gets the renderd element css style
    getStyle: function (oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
    },
    // remove multiple, leading or trailing spaces
    trim: function (s){
	    s = s.replace(/(^\s*)|(\s*$)/gi,"");
	    s = s.replace(/[ ]{2,}/gi," ");
	    s = s.replace(/\n /,"\n");
	    return s;
    },
	isRTL: function(locale) {
        return locale && locale == 'ar' || locale == 'fa' || locale == 'he'
    }
};
// -------------End Utility functions ------------------

//Override section gets WebHelp to run on local file systems.
/* Ext.override(Ext.data.Connection, {
    parseStatus: function(status) {
        if(status == 0)
			status = 200;
        return this.callOverridden([status]);
    },
	
	getXhrInstance: function(){
		if(Ext.isIE && document.location.protocol == 'file:')
			return new ActiveXObject('Microsoft.XMLHTTP');
        return this.callOverridden();
	}
}); */

//------ dhtml_popup.js overwrites ------
function togglePopup(id, hyperlinkId){
	var div = document.getElementById('d' + id);
	if (!div || !div.firstChild) return;

	var cmpName = 'popup' + id;
	var win = Ext.getCmp(cmpName);
	if(!win) {
		var container = Ext.getCmp('content-panel'),
			anchor = Ext.get(hyperlinkId),
			offsets = anchor.getOffsetsTo(container.body);
	
		win = Ext.create('Ext.window.Window', {
			id: cmpName,
			closeAction: 'hide',
			constrainHeader: true,
			autoScroll: true,
			items: { border: false },
			contentEl: div,
			x: offsets[0] + anchor.getWidth() + 5, //5 is offset distance from hyperlink to popup
			y: offsets[1] + anchor.getHeight() + 5,
			maxWidth: container.body.getWidth() * 0.8, //maximum popup size is 80% of body size.
			maxHeight: container.body.getHeight() * 0.8
		});
		win.on('show', function() { win.doConstrain(); });

		//remove old close button from content div
		var divEl = Ext.get(div);
		divEl.setStyle({display: '', 'background-color': 'transparent', border: 0, width: 'auto' });
		if(div.firstChild.tagName.toLowerCase() == 'a')
			div.removeChild(div.firstChild);
			
		win.setHeight(divEl.getHeight() + 40); //+40 to compensate for headers
		win.setWidth(divEl.getWidth() + 25); //+25 to compensate for borders

		container.add(win);
	}
	win.setVisible(!win.isVisible());
}

//Start application
Ext.onReady(Kbase.init, Kbase);
