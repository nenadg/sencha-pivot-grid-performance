/**
 * This view is an example list of people.
 */
Ext.define('PivotTest.view.grid.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'defaultlist',

    requires: [
        'PivotTest.store.Sales'
    ],

    title: 'Sales List (default grid)',

    store: {
        type: 'sales'
    },

    plugins: [
        {
            ptype: 'bufferedrenderer'
        }
    ],
    columns: [
        { text: 'company', dataIndex: 'company' },
        { text: 'country', dataIndex: 'country', flex: 1 },
        { text: 'person', dataIndex: 'person' },
        { text: 'person', dataIndex: 'person' },
        { text: 'date', dataIndex: 'date' },
        { text: 'value', dataIndex: 'value' },
        { text: 'quantity', dataIndex: 'quantity' }
    ],
    
    height: 800,
    width: '100%',

    testIterations: 13,

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
