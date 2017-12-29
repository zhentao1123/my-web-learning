/*
notebook record
*/
function Record(id, title, content, time){
    this.id = id;
    this.title = title;
    this.content = content;
    this.time = time;
}

/*
notebook dao
*/
function NotebookDao(storage, key)
{
    this.storage = storage;
    this.key = key;

    //getAll
    this.getAll = function()
    {
        var redordArr = [];
        if(typeof(this.storage)!=="undefined")
        {
            if(this.storage.getItem(this.key))
            {
                var redordArr_str = this.storage.getItem(this.key);
                redordArr = JSON.parse(redordArr_str);
                redordArr.sort(function(a, b)
                {
                    var c = a.id - b.id;
                    if(c>0){
                        return 1;
                    }else if(c<0){
                        return -1;
                    }else{
                        return 0;
                    }
                });
            }
        }
        return redordArr;
    };

    //create
    this.create = function(record)
    {
        if(typeof(this.storage)!=="undefined")
        {
            record.time = new Date().Datetime();
            var redordArr = [];
            if(this.storage.getItem(this.key)){
                var redordArr_str = this.storage.getItem(this.key);
                redordArr = JSON.parse(redordArr_str);
            }
            redordArr.push(record);
            this.storage.setItem(this.key, JSON.stringify(redordArr));
        }
    };

    //modify
    this.modify = function(id, record)
    {
        if(typeof(this.storage)!=="undefined")
        {
            if(this.storage.getItem(this.key))
            {
                var redordArr_str = this.storage.getItem(this.key);
                var redordArr = JSON.parse(redordArr_str);
                redordArr.forEach(function(value, index, data){
                    if(data[index].id == id){
                        data[index].title = record.title;
                        data[index].content = record.content;
                        data[index].time = new Date().Datetime();
                    }
                });
                this.storage.setItem(this.key, JSON.stringify(redordArr));
            }
        }
    };

    //delete
    this.delete = function(id)
    {
        if(typeof(this.storage)!=="undefined")
        {
            if(this.storage.getItem(this.key))
            {
                var redordArr_str = this.storage.getItem(this.key);
                var redordArr = JSON.parse(redordArr_str);
                var redordArrNew = redordArr.filter(function(value){
                    return value.id !== id;
                });
                this.storage.setItem(this.key, JSON.stringify(redordArrNew));
            }
        }
    };

    //maxId
    this.maxId = function(){
        var mid = 0;
        if(typeof(this.storage)!=="undefined")
        {
            if(this.storage.getItem(this.key))
            {
                var redordArr_str = this.storage.getItem(this.key);
                var redordArr = JSON.parse(redordArr_str);
                redordArr.forEach(function(value){
                    if(value.id>mid){
                        mid = value.id;
                    }
                });
            }
        }
        return mid;
    };

    //clear
    this.clear = function(){
        if(typeof(this.storage)!=="undefined")
        {
            this.storage.setItem(this.key, "[]");
        }
    };

    //test
    this.test = function(){
        if(typeof(this.storage)!=="undefined")
        {
            var nbrArr = new Array();
            var nbr2 = new Record(2, "title2", "content2");
            nbrArr.push(nbr2);

            var json_str = JSON.stringify(nbrArr);
            this.storage.setItem(this.key, json_str);

            var json_obj = JSON.parse(this.storage.getItem(this.key));

            alert(json_obj[0].id);
        }
    };
}
