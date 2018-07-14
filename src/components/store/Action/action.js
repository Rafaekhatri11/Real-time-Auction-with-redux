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
                                        console.log(mydata[key2]);
                                        let bidder = firebase.database().ref(`/auctioneer/${key}/${key1}/${key2}/Bidder/`);
                                        if(bidder){
                                            let alldata= mydata[key2].Bidder;
                                           for(var key2 in alldata){
                                               console.log(key2, alldata[key2]);
                                           }
                                        }
                                        
                                     
                                        // Object.keys(mydata[key2].Bidder).map((text,index) =>{
                                        //     console.log("==============",text,index);
                                        // })
                                        // firebase.database().ref(`/soldproduct/${}`)
                                        //  firebase.database().ref(`/auctioneer/${key}/${key1}/${key2}/`).remove()
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
        // console.log(bidDetials);
        let bidder = firebase.database().ref(`/auctioneer/${bidDetials.productName}/${bidDetials.UID}/${bidDetials.productKey}/Bidder/`);
        console.log(bidder);

        firebase.database().ref(`/auctioneer/${bidDetials.productName}/${bidDetials.UID}/${bidDetials.productKey}/`)
            .once('value', snap => {
                let data = snap.val();
                // let mybid = data.Bidder
                console.log(data.Bidder);
                if (Number(bidDetials.Amount) <= Number(data.bidamount)) {
                    alert('Your selected ammount is less please select higher amount');

                }
                else {

                    if (data.Bidder) {
                        let array = [];
                        //Object.keys(data.Bidder).map((key) => {
                        for (var key in data.Bidder) {
                            let newdata = data.Bidder[key];

                            array.push(Number(newdata.Amount));
                            console.log(array);


                            // if (Number(bidDetials.Amount) > Number(data.Bidder[key].Amount)) {
                            //     console.log("=====" + bidDetials.Amount);
                            //     firebase.database().ref(`/auctioneer/${bidDetials.productName}/${bidDetials.UID}/${bidDetials.productKey}/Bidder/${bidDetials.UserUID}/`)
                            //         .set({
                            //             Description: bidDetials.Description,
                            //             Amount: bidDetials.Amount,
                            //             Email: bidDetials.Email,
                            //         })

                            //         alert('Bid applied successfully');
                            //         break;
                            // }

                            // else {
                            //     console.log("========" + data.Bidder[key].Amount);
                            //     alert('please select higher amount');
                            // }


                        }
                        console.log(Math.max(...array));
                        var maxamount = Math.max(...array);
                        if (Number(bidDetials.Amount) > maxamount) {
                            firebase.database().ref(`/auctioneer/${bidDetials.productName}/${bidDetials.UID}/${bidDetials.productKey}/Bidder/${bidDetials.UserUID}/`)
                                .set({
                                    Description: bidDetials.Description,
                                    Amount: bidDetials.Amount,
                                    Email: bidDetials.Email,
                                })

                            alert('Bid applied successfully');
                        }
                        else {
                            // console.log("========" + data.Bidder[key].Amount);
                            alert('please select higher amount');
                        }
                    }

                    else {
                        firebase.database().ref(`/auctioneer/${bidDetials.productName}/${bidDetials.UID}/${bidDetials.productKey}/Bidder/${bidDetials.UserUID}/`)
                            .set({
                                Description: bidDetials.Description,
                                Amount: bidDetials.Amount,
                                Email: bidDetials.Email,
                            })
                        alert('successfully');
                    }
                    // : 

                }

            })



        //else {
        // firebase.database().ref(`/auctioneer/${bidDetials.productName}/${bidDetials.UID}/${bidDetials.productKey}/Bidder/${bidDetials.UserUID}/`).set({
        //     Description: bidDetials.Description,
        //     Amount : bidDetials.Amount,
        //     Email: bidDetials.Email,
        // })
        //   alert('Bid apply successfully');
        //  }

    }
}


export function ApplicantPerson(data) {
    return dispatch => {
        console.log(data)
        dispatch({ type: ActionTypes.ApplicantsData, payload: data })
    }
}