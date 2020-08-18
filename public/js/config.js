// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyAQC3-F84W_p2Nq-TPdIAhZhYLAHGDXjGY',
    authDomain: 'https://budget-app-95126.firebaseapp.com/',
    projectId: 'budget-app-95126'
  });
  
  var db = firebase.firestore();

  db.collection("expenses").get().then((querySnapshot) => {
    var tableContent='';
    querySnapshot.forEach((doc) => {

        tableContent+='<td>'+doc.data().title+'</td>'+'<td>'+doc.data().value+'</td>'+'<td>'+ new Date(doc.data().timestamp.toDate()).toDateString()+'</td>';
    });
    $('#recents').html(tableContent);
});