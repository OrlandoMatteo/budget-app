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

  db.collection("movements")
    .add({
      title: $("#expenseTitle").val(),
      value: $("#expenseValue").val(),
      timestamp: firebase.firestore.Timestamp.now(),
      tag: $("#expenseTag").val(),
      income: false,
    })
    .then(function () {
      console.log("Document successfully written!");
      $("#addExpense").modal("hide");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}

function addIncome() {
  event.preventDefault();
  db.collection("incomes")
    .add({
      title: $("#incomeTitle").val(),
      value: $("#incomeValue").val(),
      timestamp: firebase.firestore.Timestamp.now(),
      tag: $("#incomeTag").val(),
    })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
  db.collection("movements")
    .add({
      title: $("#incomeTitle").val(),
      value: $("#incomeValue").val(),
      timestamp: firebase.firestore.Timestamp.now(),
      tag: $("#incomeTag").val(),
      income: true,
    })
    .then(function () {
      console.log("Document successfully written!");
      $("#addIncome").modal("hide");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}

function lastMonthExpenses() {
  totalExpenses = 0;
  var d = new Date();
  d.setDate(1);
  var lme = db
    .collection("expenses")
    .where("timestamp", ">", firebase.firestore.Timestamp.fromDate(d));
  lme.get().then((querySnapshot) => {
    totalExpenses = 0;
    querySnapshot.forEach((doc) => {
      totalExpenses += parseFloat(doc.data().value);
      balance = totalIncome - totalExpenses;
      $("#balance").html(balance.toString());
    });
  });
}

function lastMonthIncomes() {
  totalIncome = 0;
  var d = new Date();
  d.setDate(1);
  d.setHours(0);
  var lmi = db
    .collection("incomes")
    .where("timestamp", ">", firebase.firestore.Timestamp.fromDate(d));
  lmi.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      totalIncome += parseFloat(doc.data().value);
      balance = totalIncome - totalExpenses;
      $("#balance").html(balance.toString());
    });
  });
}
