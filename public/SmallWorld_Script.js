var testTrips = [
  {
    "city" : "Loading",
    "image" : "http://www.wandererontheroad.com/wp-content/uploads/2015/12/bangalore.jpg",
    "total_budget" : 800
  },
  {
    "city" : "Loading",
    "image" : "https://lonelyplanetimages.imgix.net/a/g/hi/t/9d06864e1a551111cd5115d0310489a8-madrid.jpg?sharp=10&vib=20&w=1200",
    "total_budget" : 1300
  },
  {
    "city" : "Loading",
    "image" : "https://brightcove04pmdo-a.akamaihd.net/5104226627001/5104226627001_5230017886001_5219431537001-vs.jpg?pubId=5104226627001&videoId=5219431537001",
    "total_budget" : 1150
  },
  {
    "city" : "Loading",
    "image" : "https://images.unsplash.com/photo-1475688621402-4257c812d6db?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&dl=linh-nguyen-145766.jpg&s=afc6e5b6894e0647cc9ea87804f54a6c",
    "total_budget" : 800
  },
  {
    "city" : "Loading",
    "image" : "https://images.unsplash.com/photo-1415125721330-116ba2f81152?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&dl=joshua-earle-2521.jpg&s=460987e06015ed0cd1638943bd94479c",
    "total_budget" : 1300
  },
  {
    "city" : "Loading",
    "image" : "https://images.unsplash.com/photo-1484353371297-d8cfd2895020?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&dl=christopher-burns-189796.jpg&s=c93d97a6947d12cbd79d5420c82e7743",
    "total_budget" : 1150
  },
  {
    "city" : "Loading",
    "image" : "https://images.unsplash.com/photo-1481402492995-2e9e8d06ed45?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&dl=mihai-surdu-173794.jpg&s=ff9ca6da2fa754238ede0d3a2fe727ba",
    "total_budget": 800
  },
  {
    "city" : "Loading",
    "image" : "https://images.unsplash.com/photo-1469461084727-4bfb496cf55a?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&dl=sylwia-bartyzel-114124.jpg&s=2b67714f0ae5d4f4e21c4c2115992e21",
    "total_budget" : 1300
  },
  {
    "city" : "Loading",
    "image" : "https://images.unsplash.com/photo-1464038008305-ee8def75f234?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&dl=ashim-d-silva-95249.jpg&s=53a4039c19bf37f84de0e236f54d8d94",
    "total_budget" : 1150
  }
];
var trip = testTrips;

var newUser = function(){

  //document.write("Hi");

   var user = {
     "email" : "",
     "password" : "",
     "budget" : 0,
     "departureDate" : "",
     "leaveDate" : "",
     "airport" : "",
   };

   user.email = document.getElementById("email");
   user.password1 = document.getElementById("password1");
   user.budget = document.getElementById("budget");
   user.date = document.getElementById("date");
   user.end = document.getElementById("end");
   user.airport = document.getElementById("airport");

   generateURL(user);


   var x = JSON.stringify(user);
   var id  = "";
   /*$.post("https://journey365.herokuapp.com/api/users/",user, function(data){
      id = data.id;
   }
 );*/

 $.ajax({
      type: 'POST',
      url: 'https://journey365.herokuapp.com/api/users/',
      data: user,
      beforeSend: function()
      {
          alert('Fetching....');
      },
      success: function()
      {
          id = data.id;
      },
      error: function()
      {
          alert('Error');
      },
      complete: function()
      {
          alert('Complete')
      }
  });

   alert(id);

    /*TODO:
      get all the data as variables
      add them to the JSON

      var x = JSON.stringify(user);

      POST request

      JQuery/fetch

      https://localhost:3000/api/users/

      1. "post request\'is a universal term in full stack development\
      2. Ankith bhai  has built a program such that IF you can send a post request of ANY KIND, containing the JSON object with all the parameters,
        his code will return another JSON object that looks identical BUT has saved the user to the database, AND the new user object will ALSO have the attribute

      user.id
      */

   //window.location.href ="feed.html";
}

var loadFeed = function(trips, index){
  for(var i = index; i < index + 9; i++){
    if(i >= trips.length){
      break;
    }
      //console.log(trip[i])
      document.getElementsByName("city")[i].innerHTML = trips[i].city;
      document.getElementsByName("image")[i].src = testTrips[i].image
      document.getElementsByName("budget")[i].innerHTML = trips[i].total_budget;
      document.getElementsByName("budget")[i].onclick = sendTrip(i);

  }

}

var generateURL = function(user){
  url = "/api/usertrips/" + user.budget + "/" + user.airport + "/" + user.departureDate +  "/" + user.leaveDate + "/";
  sessionStorage.setItem("url", url);
  //alert(url);
}

var sendTrip = function(index){
  return function(){
    trip[index].city_image_link = testTrips[index].image;
    var saveTrip = JSON.stringify(trip[index]);
    //alert(saveTrip);
    sessionStorage.setItem("current_trip", saveTrip);
    window.location.href = "trip.html";
  }
}

var loadTrip = function(){
  var tripString = sessionStorage.getItem("current_trip");
  var trip = JSON.parse(tripString);
  //alert(tripString);

  document.getElementById("city").innerHTML = trip.city;
  document.getElementById("image").src = trip.city_image_link;
  document.getElementById("price").innerHTML = trip.total_budget;
  document.getElementById("daily").innerHTML = trip.daily_budget;
  document.getElementById("FlightText").innerHTML = "Airline: " + trip.flight_string + ", Flight Cost: $" + trip.flight_cost;
  document.getElementById("start").innerHTML = trip.from_date;
  document.getElementById("end").innerHTML = trip.to_date;
  document.getElementById("hotelName").innerHTML = trip.hotel_name;



}

var sendPrefs = function(){

  //document.write("Hi");

   var user = {

     "budget" : 0,
     "departureDate" : "",
     "leaveDate" : "",
     "airport" : "",
   };


   user.budget = document.getElementById("budget").value;
   user.departureDate = document.getElementById("date").value;
   user.leaveDate = document.getElementById("end").value;
   user.airport = document.getElementById("airport").value;

   console.log(user);
   generateURL(user);

   window.location.href = "feed.html";
 }
