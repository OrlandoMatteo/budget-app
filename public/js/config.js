// Initialize Cloud Firestore through Firebase

var db = firebase.firestore();

db.collection("expenses")
  .get()
  .then((querySnapshot) => {
    var tableContent = "";
    querySnapshot.forEach((doc) => {
      fullDate= new Date(doc.data().timestamp.toDate());
      tableContent +=
        "<tr><td>" +
        doc.data().title +
        "</td>" +
        "<td>" +
        doc.data().value +
        "</td>" +
        "<td>" +
        fullDate.toDateString()+
        "</td></tr>";
    });
    $("#recents").html(tableContent);
  });


