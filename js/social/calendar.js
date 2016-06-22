function getICAL(url, callback) {
        new ical_parser("js/test.php" + "?url="+encodeURIComponent(url), function(cal){
        events = cal.getEvents();
        console.log(events);
        var futureEvents = [];
        var numberOfEvents = events.length;
        var now = moment();
        var appendedEvents = 0
        for (var i in events) {
            var currentEvent = events[i];
            //console.log(currentEvent);
            var day = moment(currentEvent.start_date, "DD/MM/YYYY");
            if (day.isSameOrAfter(now) && appendedEvents<6) {
                console.log(currentEvent);
                var container = document.getElementById("social");
                var event = document.createElement("div");
                event.setAttribute("id", "event");
                event.style.color = "white";
                event.style.fontSize = "15px";
                 event.style.fontStyle = "oblique";
                 //event.style.overflow = "visible !important"
                 if (day.isSame(now)) {
                    event.style.fontWeight = "bold";
                 }
                 event.style.height = "30px";
                 event.style.width = "300px";
                 event.style.cssFloat = "left";
                 //event.style.visibility=  "hidden";
                 $(event).hide();
                 var eventName = currentEvent.SUMMARY;
                 var eventNameLength = eventName.length;
                 if (eventNameLength > 18) {
                    eventName =eventName.substring(0, 15);
                    eventName =eventName.concat("...");
                 }
                 
                 var rawDate = currentEvent.start_date.split('/');
                 var formattedDate = rawDate[1]+'-'+rawDate[0]+'-'+rawDate[2];
                 
                 var rawTime = currentEvent.start_time.split(":");
                 var hour = twelveHour(parseInt(rawTime[0]))

                 var formattedTime = hour+":"+rawTime[1];
                 if (parseInt(rawTime[0]) >=12) {
                    formattedTime = formattedTime + " PM"
                 }
                 else {formattedTime = formattedTime + " AM"}
                 event.innerHTML = "<p class=\"eventName\">"+eventName+"</p><p class=\"eventDate\">"+formattedDate + " " + formattedTime+"</p>"
                 //var event2 = event.cloneNode();
                container.appendChild(event);
                appendedEvents = appendedEvents +1;
                console.log(document.getElementById("event"))
                /*$(event).slideUp('slow',function(){
                        $(event).slideDown('slow');
                        console.log("TEST")
                        });*/
                /*$(event).slideDown('slow', function(){
                        console.log("done")
                        $(event).slideUp('slow');
                });*/
                //$(event).animate({width:'toggle'},2500);
            }
            
        }
    });
        callback();
}

function displayEvents() {
        //$('#container event')
        //$('#event').fadeIn();
        var nodes = jQuery("[id=event]") 
        console.log(nodes)


}


function calendar_init() {
    getICAL(config.googleCalendar.ical ,function(){
        displayEvents();
    })
    //displayEvents();
}