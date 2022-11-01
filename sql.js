var db = window.openDatabase("itemDB","1.0","itemDB",65535);


        $(function(){
            $("#create").click(function(){
                db.transaction(function(transaction){
                    var sql = "CREATE TABLE items"+
                    "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, item VARCHAR(100) NOT NULL, quantity INT(5) NOT NULL)";
                    transaction.executeSql(sql,undefined,function(){
                        alert("Rendelés sikeresen létrehozva!");
                    },function(){
                        alert("A rendelés már létrehozva!");
                    })
                });
            });
            $("#remove").click(function(){
                if(!confirm("Biztosan törlöd a rendelést?","")) return;;
                db.transaction(function(transaction){
                    var sql = "DROP TABLE items";
                    transaction.executeSql(sql,undefined,function(){
                        alert("Rendelés sikeresen törölve!");
                    },function(){
                        alert("Hiba a rendelés törlése közben!");
                    })
                });
            });
            $("#insert").click(function(){ 
                const etlap = ["Lafi Friss", "Sajtburesz", "Low budget burgir", "Lafi Menü", "Burgir + niga", "Olcsóbb Lafi Menü", "Mekdánelces menü", "1 adag ramen", "Tányér", "1 kiló kenyér", "Fekete burgir", "Falusi Burgir"];
                var item = $("#item").val();
                var qty = $("#quantity").val();
                if (etlap.includes(item)){
                    db.transaction(function(transaction){
                        var sql = "INSERT INTO items(item, quantity) VALUES(?,?)";
                        transaction.executeSql(sql,[kaja,qty],function(){
                            alert("Új cucc sikeresen hozzáadva a rendeéshez!");
                        },function(){
                            alert("Nem sikerült hozzáadni!");
                        })
                    })
                }
            });
            $("#list").click(function(){
                $("#itemlist").children().remove();
                db.transaction(function(transaction){
                    var sql = "SELECT * FROM items ORDER BY id DESC";
                    transaction.executeSql(sql,undefined,function(transaction,result){
                        if(result.rows.length){
                            for(var i=0; i<result.rows.length; i++){
                                var row = result.rows.item(i);
                                var item = row.item;    
                                var id = row.id;
                                var quantity = row.quantity;
                                $("#itemlist").append('<tr><td>'+id+'</td><td>'+item+'</td><td>'+quantity+'</td></tr>');

                            }
                        }else{
                            $("#itemlist").append('<tr><td colspan="3" align="center">Nincs cucc</td></tr>');

                        }
                    },function(transaction,err){
                        alert(err.message);
                    })
                })
            })
    })