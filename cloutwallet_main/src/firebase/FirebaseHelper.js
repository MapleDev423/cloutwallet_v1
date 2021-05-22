import db from "./firebaseconfig";

export const saveUsername = async (userpublickey) => {
  const dbresponse = db
    .collection(`users`)
    .where("userpublickey", "==", userpublickey);
  const data = await dbresponse.get();
  let d = new Date();
  if (data.size == 0) {
    db.collection("users").add({
      userpublickey: userpublickey,
      time: Date.now(),
      timezone: d.getTimezoneOffset(),
    });
  } else {
    let docId = "brE35D0S75ij1IaJTRxW";
    data.docs.forEach((item) => {
      docId = item.id;
    });

    db.collection("users")
      .doc(docId)
      .update({ timezone: d.getTimezoneOffset() });
  }
};
export const getTotalPriceChange = async (userpublickey) => {
  const dbresponse = db
    .collection(`userwallet`)
    .where("userpublickey", "==", userpublickey);
  // .where("username", "==", 'nyko');

  const data = await dbresponse.get();
  let totalpricehistory = [];
  data.docs.forEach((item) => {
    totalpricehistory = [...totalpricehistory, item.data()];
  });
  return totalpricehistory;
};
