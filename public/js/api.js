// $("#addExpense-form").submit(function (event) {
//    event.preventDefault();
// //   db.collection("employees")
// //     .add({
// //       name: $("#employee-name").val(),
// //       email: $("#employee-email").val(),
// //       address: $("#employee-address").val(),
// //       phone: $("#employee-phone").val(),
// //     })
// //     .then(function () {
// //       console.log("Document successfully written!");
// //       $("#addEmployeeModal").modal("hide");
// //     })
// //     .catch(function (error) {
// //       console.error("Error writing document: ", error);
// //     });
// console.log("submitted");
// });

function addExpense() {
    event.preventDefault();
    db.collection("expenses")
      .add({
        title: $("#expenseTitle").val(),
        value: $("#expenseValue").val(),
        timestamp: firebase.firestore.Timestamp.now(),
        tag: $("#expenseTag").val(),
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }