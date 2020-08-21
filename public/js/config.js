// Initialize Cloud Firestore through Firebase


// db.collection("expenses")
//   .get()
//   .then((querySnapshot) => {
//     var tableContent = "";
//     querySnapshot.forEach((doc) => {
//       fullDate= new Date(doc.data().timestamp.toDate());
//       tableContent +=
//         "<tr><td>" +
//         doc.data().title +
//         "</td>" +
//         "<td>" +
//         doc.data().value +
//         "</td>" +
//         "<td>" +
//         fullDate.toDateString()+
//         "</td></tr>";
//     });
//     $("#recents").html(tableContent);
//   });
// var d=new Date()
// d.setDate(d.getDate()-1)
// .where("timestamp",">",firebase.firestore.Timestamp.fromDate(d))

var recents = db.collection("expenses");
recents
  .orderBy("timestamp", "desc")
  .limit(5)
  .get()
  .then((querySnapshot) => {
    var tableContent = "";
    querySnapshot.forEach((doc) => {
      fullDate = new Date(doc.data().timestamp.toDate());
      tableContent +=
        "<tr><td>" +
        doc.data().title +
        "</td>" +
        "<td>" +
        doc.data().value +
        "</td>" +
        "<td>" +
        fullDate.toDateString() +
        "</td>" +
        "<td>" +
        "<span class='badge badge-pill badge-primary'>" +
        doc.data().tag +
        "</span>" +
        "</td></tr>";
    });
    $("#recents").html(tableContent);
  });

var totalIncome = 0;
var totalExpenses = 0;
lastMonthIncomes();
lastMonthExpenses();
var balance=totalIncome-totalExpenses
$("#balance").html(balance.toString())