module.exports = function(limit){
    /*,
            { 
                'id': 2, 
                'company': 'Brocorp',
                'country': 'US',
                'person': 'Rajko',
                'date': '2015-07-07',
                'value': 202,
                'quantity': 301,
                'year': '2017',
                'month': '07',
                'continent': 'America'
            },
            { 
                'id': 3, 
                'company': 'Brocorp',
                'country': 'US',
                'person': 'Bosko',
                'date': '2015-07-07',
                'value': 3322,
                'quantity': 301,
                'year': '2017',
                'month': '07',
                'continent': 'America'
            }
        ] */
    //};
    var getrnd = function(){
        return Math.random().toString(36).substring(3)
    }
    var i = 0, ret = [];

    limit = limit ? limit : 10;

    while (i <= limit){

        var data =  
            { 
                'id': i, 
                'company': 'Brocorp',
                'country': 'US',
                'person': 'Bobo ' + i + ' ' + getrnd(),
                'date': new Date(),
                'value': Math.floor(Math.random() * 400),
                'quantity': Math.floor(Math.random() * 2000),
                'year': '2016',
                'month': '07',
                'continent': 'America'
            }
        
        ret.push(data);
       
        i++;
    }

    console.log('don')
    return ret;
};