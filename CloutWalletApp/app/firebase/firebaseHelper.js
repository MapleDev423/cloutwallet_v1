import firestore from '@react-native-firebase/firestore';

export const saveUsername = async username => {
  const newusername = username.toLowerCase();
  const dbresponse = firestore
    .collection('users')
    .where('username', '==', newusername);
  const data = await dbresponse.get();
  let d = new Date();
  if (data.size === 0) {
    firestore.collection('users').add({
      username: newusername,
      time: Date.now(),
      timezone: d.getTimezoneOffset(),
    });
  } else {
    let docId = 'brE35D0S75ij1IaJTRxW';
    data.docs.forEach(item => {
      docId = item.id;
    });

    firestore
      .collection('users')
      .doc(docId)
      .update({timezone: d.getTimezoneOffset()});
  }
  console.log(newusername);
};
