module.exports = function(limit){

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

    return ret;
};