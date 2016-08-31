Ext.define('PivotTest.store.Sales', {
    extend: 'Ext.data.Store',
    alias: 'store.sales',

    model: 'PivotTest.model.Sale',

    proxy: {
        // load using HTTP
        type: 'ajax',
        limitParam: 'limit',
        limit: 12,
        url: 'SalesData',
        // the return will be JSON, so lets set up a reader
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: true
});