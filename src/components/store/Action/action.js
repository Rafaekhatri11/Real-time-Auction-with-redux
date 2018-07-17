import ActionTypes from '../constant/constant'
import firebase from 'firebase';
export function userAuth(user, pass) {
    return dispatch => {
        console.log(user, pass);
        dispatch({
            type: ActionTypes.users, payload: [{ username: user, password: pass }]
        })
    }
}

export function userAuthSignUp(userDetails) {
    return dispatch => {


        firebase.auth().createUserWithEmailAndPassword(userDetails.user, userDetails.password)
            .then((user) => {

                user.uid = firebase.auth().currentUser.uid;
                firebase.database().ref(`/Users/${user.uid}`).set({
                    nameOfUser: userDetails.uname,
                    emailOfUser: userDetails.user,
                    passwordOfUser: userDetails.password
                })
                    .then(() => {
                        // history.push('/mainpage');
                        dispatch({ type: ActionTypes.userSignUp, payload: 'true' });
                    });

            })
            .catch((err) => {
                alert(err);
                dispatch({ type: ActionTypes.error, payload: err })

            })


    }
}


export function userSignIn(userInfo) {
    return dispatch => {
        console.log(userInfo);
        firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
            .then(() => {
                let userUid = firebase.auth().currentUser.uid;
                firebase.database().ref(`/Users/${userUid}/`).once('value')
                    .then((userdata) => {
                        if (userdata.val() === null) {
                            alert('User has been deleted by admin');
                            firebase.auth().currentUser.delete();

                        }
                        else {
                            console.log(userdata.key);
                            //  history.push('/mainpage');
                            dispatch({ type: ActionTypes.userSignIn, payload: 'true' });
                        }
                    })
            })

            .catch((err) => {
                alert(err);
                dispatch({ type: ActionTypes.error, payload: err });
            })
    }
}


export function falseTheFlag(flag) {
    return dispatch => {
        dispatch({ type: ActionTypes.userSignIn, payload: flag })
        dispatch({ type: ActionTypes.userSignUp, payload: flag })

    }
}



export function sendProductDetails(fullDetail, myfile) {
    return () => {
        console.log(fullDetail, myfile);

        // let UID = firebase.auth().currentUser.uid;
        var url;

        let storage = firebase.storage().ref(`/images/${fullDetail.UID}/${new Date().getTime()}`)
        let task = storage.put(myfile)
        task.on('state_changed',
            function progress(snapshot) {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(percentage);
                storage.getDownloadURL().then((snap) => {
                    console.log(snap);
                    url = snap;
                    firebase.database().ref().child(`/auctioneer/${fullDetail.categoryType}/${fullDetail.UID}/`).push().set({
                        image: true,
                        imageURL: url,
                        categoryType: fullDetail.categoryType,
                        description: fullDetail.productDescription,
                        name: fullDetail.productName,
                        date: fullDetail.date,
                        time: fullDetail.time,
                        bidamount: fullDetail.bidamount
                    })

                })
            })
        alert('Bid posted Successfully');

    }
}


export function fetchTheData(product) {
    return (dispatch) => {

        // console.log(product);
        let UID = firebase.auth().currentUser.uid;
        let mydate = new Date();
        let day = mydate.getDate();
        let month = mydate.getMonth() + 1;
        let year = mydate.getFullYear();
        console.log(year + "-0" + month + "-" + day);
        let currentDate = year + "-0" + month + "-" + day;

        let currentHour = mydate.getHours();
        let currentMinute = mydate.getMinutes();
        let hour = currentHour * 60 * 60 * 1000 + currentMinute * 60 * 1000;
        console.log("This is user time " + hour);
        let auctioneer = firebase.database().ref("auctioneer")
        if (auctioneer) {
            firebase.database().ref('auctioneer').on('value', item => {
                let data = item.val();
                let array = [];
                for (var key in data) {
                    if (key === product) {
                        let newdata = data[key];
                        for (var key1 in newdata) {
                            //  console.log(key1)
                            let mydata = newdata[key1];
                            for (var key2 in mydata) {
                                // console.log(key2)
                                //    console.log(mydata[key2]);
                                if (currentDate === mydata[key2].date) {
                                    if (hour > mydata[key2].time) {
                                        // console.log(mydata[key2]);
                                        if (mydata[key2].Bidder) {
                                            console.log('true');
                                            let alldata = mydata[key2].Bidder;
                                            let productMaxamount = [];
                                            for (var key3 in alldata) {
                                                console.log(key3, alldata[key3]);
                                                //    let amountData = alldata[key3];
                                                //    for(var key4 in amountData){

                                                productMaxamount.push(alldata[key3].Amount);
                                                console.log(productMaxamount);
                                                //  }
                                            }
                                            for (var key3 in alldata) {
                                                if (Number(alldata[key3].Amount) === Math.max(...productMaxamount)) {
                                                    console.log(key3, alldata[key3], mydata[key2].imageURL);
                                                    firebase.database().ref().child(`/purchaseproduct/${UID}`).push().set({
                                                        amount: alldata[key3].Amount,
                                                        Description: alldata[key3].Description,
                                                        email: alldata[key3].Email,
                                                        imageurl: mydata[key2].imageURL,
                                                        type: mydata[key2].categoryType,
                                                        date: mydata[key2].date
                                                    })

                                                    firebase.database().ref().child(`/soldproduct/${key1}`).push().set({
                                                        amount: alldata[key3].Amount,
                                                        Description: alldata[key3].Description,
                                                        email: alldata[key3].Email,
                                                        imageurl: mydata[key2].imageURL,
                                                        type: mydata[key2].categoryType,
                                                        date: mydata[key2].date
                                                    })

                                                    console.log(key1, key2);
                                                    firebase.database().ref(`/auctioneer/${key}/${key1}/${key2}`).remove();
                                                }
                                            }
                                            // console.log(Math.max(...productMaxamount));
                                        }

                                        else {
                                            console.log("*****");
                                            firebase.database().ref(`/auctioneer/${key}/${key1}/${key2}`).remove();
                                        }


                                        //then((detail) =>{
                                        //     console.log(detail);
                                        // }).catch((err) => {console.log(err)})
                                        // console.log(bidder.orderByCalled_);
                                        // if(bidder.orderByCalled_ === true){


                                    }

                                    else {
                                        array.push({
                                            UID: key1,
                                            ProductID: key2,
                                            Amount: mydata[key2].bidamount,
                                            Category: mydata[key2].categoryType,
                                            Date: mydata[key2].date,
                                            Description: mydata[key2].description,
                                            ImageFlag: mydata[key2].image,
                                            ImageURL: mydata[key2].imageURL,
                                            Name: mydata[key2].name,
                                            Time: mydata[key2].time
                                        })
                                    }
                                }

                                else {
                                    array.push({
                                        UID: key1,
                                        ProductID: key2,
                                        Amount: mydata[key2].bidamount,
                                        Category: mydata[key2].categoryType,
                                        Date: mydata[key2].date,
                                        Description: mydata[key2].description,
                                        ImageFlag: mydata[key2].image,
                                        ImageURL: mydata[key2].imageURL,
                                        Name: mydata[key2].name,
                                        Time: mydata[key2].time
                                    })
                                }

                            }
                        }
                    }

                }

                //  console.log(array);
                dispatch({ type: ActionTypes.productData, payload: array });
            });

        }

    }

}

export function appliedToJobs(bidDetials) {
    return dispatch => {
        let bidder = firebase.database().ref(`/auctioneer/${bidDetials.productName}/${bidDetials.UID}/${bidDetials.productKey}/Bidder/`);
        console.log(bidder);

        firebase.database().ref(`/auctioneer/${bidDetials.productName}/${bidDetials.UID}/`)
            .once('value', snap => {
                let data = snap.val();
                console.log(snap.key, data);
                if (snap.key === bidDetials.UserUID) {
                    alert('You cannot apply on your own product')
                }
                else {
                    for (var key in data) {
                        // console.log(key , data[key]);
                        if (key === bidDetials.productKey) {
                            if (Number(bidDetials.Amount) <= Number(data[key].bidamount)) {
                                alert('Your selected ammount is less please select higher amount');
                            }

                            else {
                                if (data[key].Bidder) {
                                    let array = [];
                                    let mydata = data[key].Bidder;
                                    for (var key in mydata) {
                                        let newdata = mydata[key];
                                        array.push(Number(newdata.Amount));
                                        console.log(array);
                                    }
                                    var maxamount = Math.max(...array);
                                    if (Number(bidDetials.Amount) > maxamount) {
                                        console.log(bidDetials);
                                        firebase.database().ref(`/auctioneer/${bidDetials.productName}/${bidDetials.UID}/${bidDetials.productKey}/Bidder/${bidDetials.UserUID}/`)
                                            .set({
                                                Description: bidDetials.Description,
                                                Amount: bidDetials.Amount,
                                                Email: bidDetials.Email,
                                                Image: bidDetials.imageURL
                                            })

                                        alert('Bid applied successfully');
                                    }
                                    else {
                                        alert('please select higher amount');
                                    }
                                }
                                else {
                                     console.log(bidDetials);
                                    firebase.database().ref(`/auctioneer/${bidDetials.productName}/${bidDetials.UID}/${bidDetials.productKey}/Bidder/${bidDetials.UserUID}/`)
                                        .set({
                                            Description: bidDetials.Description,
                                            Amount: bidDetials.Amount,
                                            Email: bidDetials.Email,
                                        })
                                    alert('successfully');
                                }
                            }
                        }
                    }
                }

                // if (Number(bidDetials.Amount) <= Number(data.bidamount)) {
                //     alert('Your selected ammount is less please select higher amount');
                // }
                // else {
                //     if (data.Bidder) {
                //         let array = [];
                //         for (var key in data.Bidder) {
                //             let newdata = data.Bidder[key];
                //             array.push(Number(newdata.Amount));
                //             console.log(array);
                //         }
                //         console.log(Math.max(...array));
                //         var maxamount = Math.max(...array);
                //         if (Number(bidDetials.Amount) > maxamount) {
                //             firebase.database().ref(`/auctioneer/${bidDetials.productName}/${bidDetials.UID}/${bidDetials.productKey}/Bidder/${bidDetials.UserUID}/`)
                //                 .set({
                //                     Description: bidDetials.Description,
                //                     Amount: bidDetials.Amount,
                //                     Email: bidDetials.Email,
                //                     Image: bidDetials.imageURL
                //                 })

                //             alert('Bid applied successfully');
                //         }
                //         else {
                //             alert('please select higher amount');
                //         }
                //     }
                //     else {
                //         firebase.database().ref(`/auctioneer/${bidDetials.productName}/${bidDetials.UID}/${bidDetials.productKey}/Bidder/${bidDetials.UserUID}/`)
                //             .set({
                //                 Description: bidDetials.Description,
                //                 Amount: bidDetials.Amount,
                //                 Email: bidDetials.Email,
                //             })
                //         alert('successfully');
                //     }
                // }
            })
    }
}


export function ApplicantPerson(data) {
    return dispatch => {
        console.log(data)
        dispatch({ type: ActionTypes.ApplicantsData, payload: data })
    }
}