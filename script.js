function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("db.json", function(text){
    var data = JSON.parse(text);
    for (let i = 0; i < data.length - 1; i++) {
        let gr = document.createElement("div");
        gr.setAttribute("class", "group");
        for (let j = 0; j < data[i].length; j++) {
            let row = document.createElement("div");
            row.setAttribute("class", "row");

            let name = document.createElement("p");
            name.setAttribute("class", "name");
            name.innerHTML = data[i][j].name + ("credits" in data[i][j] ? "<p class=\"normal\"> - Số tín chỉ: " + data[i][j].credits +"</p>" : "");

            let desc = document.createElement("p");
            desc.setAttribute("class", "description");
            desc.innerHTML = "<strong>" + data[i][j].name + "</strong> " + (data[i][j].description == "" ? "updating..." : data[i][j].description);
            
            let ulist = document.createElement("ul");
            if ("ref" in data[i][j]){
                // console.log(data[i][j].ref.length);                
                for (let t = 0; t < data[i][j].ref.length; t++) {
                    let item = document.createElement("li");
                    item.innerHTML = "<a href='"+ data[i][j].ref[t].link + "'>" + data[i][j].ref[t].name + "</a> - " + data[i][j].ref[t].info;
                    ulist.appendChild(item);
                }
            }            

            row.appendChild(name);
            row.appendChild(desc);
            row.appendChild(ulist);

            gr.appendChild(row);
        }
        document.getElementById("preview").appendChild(gr);
    }

    // ref page
    let gr = document.createElement("div");
    gr.setAttribute("class", "group");

    let row = document.createElement("div");
    row.setAttribute("class", "row");

    let ulist = document.createElement("ul");
    for (let j = 0; j < data[data.length - 1].length; j++) {
        let item = document.createElement("li");
        item.innerHTML = "<a href='"+ data[data.length - 1][j].link + "'>" + data[data.length - 1][j].name + "</a> - " + data[data.length - 1][j].theme;
        ulist.appendChild(item);
    }

    row.appendChild(ulist);
    gr.appendChild(row);    
    document.getElementById("sp-web").appendChild(gr);
    // console.log(data.length);
});