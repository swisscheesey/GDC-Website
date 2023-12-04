// debug
//localStorage.clear();

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
const calendar = document.querySelector(".calendar-dates");
const current = document.querySelector(".calendar-current-date");
const navigationIcons = document.querySelectorAll(".calendar-navigation span");
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

//Configuration
const offsetX = -160;
const offsetY = 20;
const ecOffsetX = offsetX + 50;
const ecOffsetY = offsetY;

//Tooltip Handles
const tooltip = document.getElementById("tooltip");
const tooltip_date = document.getElementById("selected-date");
const tooltip_event_name = document.getElementById("event-name");
const tooltip_event_time = document.getElementById("event-time");
const tooltip_event_description = document.getElementById("event-description");
const tooltip_next_button = document.getElementById("next-event");
const tooltip_prev_button = document.getElementById("prev-event");
const tooltip_event_number = document.getElementById("count");

//Event Creator Handles
const eventCreator = document.getElementById("new-event");
const eventTitle = document.getElementById("name");
const eventStartTime = document.getElementById("start-time");
const eventEndTime = document.getElementById("end-time");
function getEventTime(){
    return convertTimeMeridian(eventStartTime.value) + " ~ " + convertTimeMeridian(eventEndTime.value);
};
function convertTimeMeridian(time){
    var hour, minute
    var meridian = 'pm';
    split = time.split(':');
    hour = split[0];
    minute = split[1];
    if(hour > 12){
        hour -= 12;
    }
    else if(hour < 12){
        meridian = 'am';
        if(hour == 0) hour = 12;
    }
    return `${parseInt(hour)}:${minute}${meridian}`;
}
const eventDescription = document.getElementById("desc");

var tooltip_event_index = 0;
var lastX;
var lastY;
var eventDay = -999;
var tooltipEvents = [];
var tooltipIndex = 0;

var localStorageLocation = "events-" + year + "-" + month;
var monthEvents = [];

//Draw Calendar
const draw = () => {
    var firstDay = new Date(year, month, 1).getDay();
    var lastDate = new Date(year, month +1, 0).getDate();
    var lastDay  = new Date(year, month, lastDate).getDay();
    var endOfLastMonth = new Date(year, month, 0).getDate();
    var newHTML = "";
    loadStoredEvents();
    for(let i = firstDay; i > 0; i--){ //Fill days before this month
        newHTML += `<li class="inactive">${endOfLastMonth - i + 1}</li>`;
    }
    for (let day = 1; day <= lastDate; day++){ //Draw current month
        let isToday = (day == date.getDate()) && (month == new Date().getMonth()) && (year == new Date().getFullYear());
        var dayClass = (isToday) ? "active" : "in-month";
        
        var isEvent = false;
        for(let i = 0; i < monthEvents.length; i++){
            if(parseInt(monthEvents[i].day) === day){
                isEvent = true;
                break;
            }
        }
        var eventIndicator = (isEvent) ? '*' : '';
        newHTML += `<li class="${dayClass}">${day}${eventIndicator}</li>`;
    }

    for(let day = lastDay; day < 6; day++){ //Draw after current month
        newHTML += `<li class="inactive">${day - lastDay + 1}</li>`;
    }

    current.innerText = `${months[month]} ${year}`;
    calendar.innerHTML = newHTML;
}
draw();

navigationIcons.forEach(icon => {
    icon.addEventListener("click", ()=> {
        month = icon.id === "calendar-prev" ? month - 1 : month + 1;
        if (month < 0 || month > 11){ //move to previous or next year
            date = new Date(year, month, new Date().getDate());
            year = date.getFullYear();
            month = date.getMonth();
        }
        else{
            date = new Date();
        }
        draw();
    })
})

//Manage Events

//Loads event data for date into tooltipEvents
//and then displays the first one, if it exists.
function updateTooltip(date){
    tooltip_date.innerHTML = date.toDateString();
    tooltipEvents = [];
    tooltipIndex=0;
    var found = false;
    for(let i = 0; i < monthEvents.length; i++){
        if(monthEvents[i].day == eventDay){
            tooltipEvents.push(monthEvents[i]);
            found = true;
            //break;
        }
    }
    if(found){
        console.log(tooltipEvents);
        drawEvent(0);
        if(tooltipEvents.length > 1){
            tooltip_next_button.className = "tooltip-next";
            tooltip_prev_button.className = "tooltip-prev";
        }
    }
    if(!found){
        tooltip_event_name.innerHTML = "No events";
        tooltip_event_time.innerHTML = '';
        tooltip_event_description.innerHTML = '';
        tooltip_next_button.className = "tooltip-nav-inactive";
        tooltip_prev_button.className = "tooltip-nav-inactive";
        tooltip_event_number.innerHTML = `-`;
    }
}
//Fills the data from the tooltipEvents[index] into the tooltip
function drawEvent(index){
    if(tooltipEvents.length === 0) return;
    //console.log(`${index}%${tooltipEvents.length}`);
    index = index % tooltipEvents.length;
    //console.log(index);
    tooltip_event_name.innerHTML = tooltipEvents[index].title;
    tooltip_event_time.innerHTML = tooltipEvents[index].time;
    tooltip_event_description.innerHTML = tooltipEvents[index].desc;
    tooltip_event_number.innerHTML = `(${index+1}/${tooltipEvents.length})`

}
//Self-explanatory
function moveTooltip(x, y){
    x += offsetX;
    y += offsetY;
    //console.log(`left:${x} top:${y}`);
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}
//Self-explanatory
function showTooltip(){
    tooltip.style.display = "block";
}
//Self-explanatory
function hideTooltip(){
    tooltip.style.display = "none";
}
//Self-explanatory
function showEventCreator(){
    eventCreator.style.display="block";
}
//Self-explanatory
function hideEventCreator(){
    eventCreator.style.display="none";
    eventTitle.value = "";
    eventStartTime.value = "";
    eventEndTime.value = "";
    eventDescription.value = "";
    eventTitle.style.backgroundColor = "whitesmoke";
    eventDescription.style.backgroundColor = "whitesmoke";
    eventStartTime.style.backgroundColor = "whitesmoke";
    eventEndTime.style.backgroundColor = "whitesmoke";
}
//Self-explanatory
function moveEventCreator(x, y){
    x += ecOffsetX;
    y += ecOffsetY;
    //console.log(`left:${x} top:${y}`);
    eventCreator.style.left = `${x}px`;
    eventCreator.style.top = `${y}px`;
}
//Finds the localStorage location for the current month/year
function getLocalStorageLocation(){
    localStorageLocation = "events-" + year + "-" + month;
}
//Converts event information into string for localStorage
function buildStoredEvent(title,day,time,desc){
    return (title+'|'+day+'|'+time+'|'+desc+'\0');
}
//Appends event to localStorage
function storeEvent(eventString){
    getLocalStorageLocation();
    eventString = (localStorage.getItem(localStorageLocation) != null) ? (localStorage.getItem(localStorageLocation) + eventString) : eventString;
    localStorage.setItem(localStorageLocation, eventString);
}
//Pulls events from localStorage
function loadStoredEvents(){
    monthEvents = [];
    getLocalStorageLocation();

    var pre = localStorage.getItem(localStorageLocation);
    if(pre===null) return;
    pre = pre.split('\0');
    pre = pre.slice(0,-1);
    pre.forEach((e)=>{
        var items = e.split('|');
        var title = items[0];
        var day = items[1];
        var time = items[2];
        var desc = items[3];
        monthEvents.push({
            title:title,
            day:day,
            time:time,
            desc:desc
        })
    })
}

//User interaction hooks
//Shows tooltip under clicked day
document.addEventListener("click", (mouseEvent) =>{
    let type = mouseEvent.target.className;
    console.log(type);
    if(type === "in-month" || type === "active"){
        eventDay = mouseEvent.target.innerText.split('*')[0];
        let clickedDate = new Date(year, month, eventDay);
        //console.log(clickedDate);
        updateTooltip(clickedDate);
        lastX = mouseEvent.clientX;
        lastY = mouseEvent.clientY;
        moveTooltip(lastX, lastY);
        hideEventCreator();
        showTooltip();
    }
    else if(type === "tooltip" || type === "tooltip-nav-inactive"){
        //do nothing
    }
    else if(type === "tooltip-next"){
        tooltipIndex++;
        drawEvent(tooltipIndex);
    }
    else if(type === "tooltip-prev"){
        //console.log(monthEvents.length);
        tooltipIndex = (tooltipEvents.length + tooltipIndex) - 1;
        drawEvent(tooltipIndex);
    }
    else{
        hideTooltip();
    }
})
//Shows event creator
document.getElementById("add-event").addEventListener("click", (e) =>{
    hideTooltip();
    moveEventCreator(lastX, lastY);
    showEventCreator();
})
//Removes event creator
document.getElementById("cancel").addEventListener("click", (e) =>{
    hideEventCreator();
})
//Adds event
document.getElementById("post").addEventListener("click", (e) => {
    if(!validateInput()){return};
    var newEvent = buildStoredEvent(eventTitle.value,eventDay,getEventTime(),eventDescription.value);
    console.log(newEvent);
    storeEvent(newEvent);
    //loadStoredEvents();//replace with 
    draw();
    console.log(monthEvents);
    hideEventCreator();
})

function validateInput(){
    var valid = true;
    if(eventTitle.value == ""){
        eventTitle.style.backgroundColor = "#ffcccc";
        valid = false;
    } else eventTitle.style.backgroundColor = "#ccffcc";
    if(eventDescription.value == ""){
        eventDescription.style.backgroundColor = "#ffcccc";
        valid = false;
    } else eventDescription.style.backgroundColor = "#ccffcc";
    if(eventStartTime.value == ""){
        eventStartTime.style.backgroundColor = "#ffcccc";
        valid = false;
    } else eventStartTime.style.backgroundColor = "#ccffcc";
    if(eventEndTime.value == ""){
        eventEndTime.style.backgroundColor = "#ffcccc";
        valid = false;
    } else eventEndTime.style.backgroundColor = "#ccffcc";
    if(eventStartTime.value > eventEndTime.value){
        eventStartTime.style.backgroundColor = "#ffcccc";
        eventEndTime.style.backgroundColor = "#ffcccc";
        valid = false;
    }
    console.log(eventStartTime.value + " - " + eventEndTime.value);
    return valid;   
}

//Debug: purge ls
document.getElementById('purgeLS').addEventListener('click', (ev)=>{localStorage.clear(); history.go(0);});