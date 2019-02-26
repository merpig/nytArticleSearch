$(document).ready(function() {
    
    $(".glyphicon-search").on("click", function(){

        
        var apikey = "zQ9iCSsfL4gSho5QqMsWmtBWwZeoPWp7";
        var term = $("#srch").val();
        var numDocs = $("#records").val();
        var startYear = parseInt($("#start").val());
        var endYear = parseInt($("#end").val());

        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + term + "&api-key=" + apikey;
        
        if(startYear!== NaN) queryURL += "&start_date=" + startYear + "";
        if(endYear!== NaN) queryURL += "&start_date=" + endYear + "";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            $("#topArticles").empty();
            
            for(var i = 0; i < response.response.docs.length; i++){
                if(i===numDocs) break;
                console.log(response.response.docs[i]);
                var title = response.response.docs[i].headline.main;
                var author = response.response.docs[i].byline.original;
                var pubYear = response.response.docs[i].pub_date.substring(0,4);
                if(author === null) author = "";
                var panel = "<div class='panel panel-default panel-primary'>";
                var panelHeading = "<div class='panel-heading'><span class='glyphicon glyphicon-book'></span> " + title + "</div>"
                var panelBody = '<div class="panel-body" id="topArcticles">';
                var panelB1 = "<h5 class='panel-title'>" + author + "</h5><br>";
                var panelB2 = "<p class='panel-text'>" + pubYear + "</p><hr>"
                var panelB3 = "<p class='panel-text'>" + response.response.docs[i].snippet + "</p>"
                var panelButton = "<a href='" + response.response.docs[i].web_url + "' class='btn btn-primary'>Go to article</a>"
                var panelEnd = '</div></div>';
                
                $("#topArticles").append(panel + panelHeading + panelBody + panelB1 + panelB2 + panelB3 + panelButton + panelEnd);
            }
            
        });
          
    
    });
})