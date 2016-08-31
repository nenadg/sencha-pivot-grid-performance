/**
 * This view is an example list of people.
 */
Ext.define('PivotTest.view.main.List', {
    extend: 'Ext.pivot.Grid',
    xtype: 'mainlist',

    requires: [
        'PivotTest.store.Sales',
        'Ext.pivot.plugin.Exporter',
        'Ext.pivot.plugin.RangeEditor'
    ],

    collapsible: true,
    multiSelect: true,
    height: 350,

    title: 'Sales List',

    store: {
        type: 'sales'
    },

    selModel: {
        type: 'spreadsheet',
        pruneRemoved: false
    },

    plugins: [
        {
            ptype: 'bufferedrenderer'
        },
        {
            ptype:      'pivotconfigurator',
            pluginId:   'configurator',
            // It is possible to configure a list of fields that can be used to configure the pivot grid
            // If no fields list is supplied then all fields from the Store model are fetched automatically
            fields: [{
                dataIndex:  'country',
                header:     'Country'
        }, {
            dataIndex:  'quantity',
            header:     'Qty',
            // You can even provide a default aggregator function to be used when this field is dropped
            // on the agg dimensions
            aggregator: 'min'
        }, {
            dataIndex:  'month',
            header:     'Month',
            renderer: function(v, meta){
                // This field can be dragged onto leftAxis or topAxis.
                // When added to the topAxis the renderer is used to generate the column text, which
                // means that only the value is passed to the function.
                // When added to the leftAxis the renderer is called twice, once to generate the
                // row labels and once by the grid panel so you can style the cell.
                // To style an aggregated cell you need to add the renderer to the aggregate dimension.
                return meta ? v : Ext.Date.monthNames[v];
            }
        }
        ]
    },
    {
        ptype: 'pivotexporter',
        pluginId: 'exporter'
    },
    {
        ptype: 'pivotrangeeditor'
    },
    ],

    aggregate: [{
        dataIndex:  'value',
        header:     'Value',
        aggregator: 'sum',

    }],

    leftAxis: [{
        dataIndex:  'person',
        header:     'Person'
    },{
        dataIndex:  'company',
        header:     'Company',
        sortable:   false
    }],

    topAxis: [{
        dataIndex:  'year',
        header:     'Year'
    }],

    header: {
        itemPosition: 1, // after title before collapse tool
        items: [{
            ui: 'default-toolbar',
            xtype: 'button',
            text: 'Export to Excel',
            handler: 'exportToExcel'
        }]
    },

    testIterations: 6,

    listeners: {
        afterrender: function(){
            var me = this,
                limit = me.store.getPageSize(),
                view = me.getView();
            
            window.startTime = Date.now();
            
            view.on('refresh', function(view){

                if(me.store.count() >= limit){
                    console.log(me.store.count() + ' records loaded for ' + (Date.now() - window.startTime) + 'ms');
                   
                    me.store.setPageSize(limit * 2);
                    
                    if(me.testIterations > 0){
                      
                        window.startTime = Date.now();
                        
                        me.testIterations--;
                        limit *= 2;

                        me.getStore().reload({
                            limit: limit,
                            callback: function(){

                                view.refresh();
                            }
                        });
                    }
                }
            });    
        }
    }
});
