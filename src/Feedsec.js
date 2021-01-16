import React, { useState, useEffect } from "react";
import { db,auth } from "./firebase";
import Post from "./Post";
import TweetInput from "./TweetInput";
import "./styles.css";
import firebase from "firebase/app";


const Feedsec = () => {

      // Auth
      var user = firebase.auth().currentUser;
      var email, photoUrl, uid, emailVerified;
      
      if (user != null) {
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; }

    //firebaseに作成した項目を受け取るための変数＝useState（状態）
    const [posts, setPosts] = useState([
      {
        id: "",
        name: "",
        nametag: "",
        age: "",
        region: "",
        c1name: "",
        c1term: "",
        c1position: "",
        c1job: "",
        c2name: "",
        c2term: "",
        c2position: "",
        c2job: "",
        other: "",
        demand: "",
        uid: "",
        timestamp: null,
      },
    ]);

    useEffect(() => {
    const myData = db.collection("posts").where("uid", "==", uid)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        setPosts({
                            id: doc.id,
                            name: doc.data().name,
                            text: doc.data().text,
                            nametag: doc.data().nametag,
                            age: doc.data().age,
                            region: doc.data().region,
                            c1name: doc.data().c1name,
                            c1term: doc.data().c1term,
                            c1position: doc.data().c1position,
                            c1job: doc.data().c1job,
                            c2name: doc.data().c2name,
                            c2term: doc.data().c2term,
                            c2position: doc.data().c2position,
                            c2job: doc.data().c2job,
                            other: doc.data().other,
                            demand: doc.data().demand,
                            uid: doc.data().uid,
                            image: doc.data().image,
                            timestamp: doc.data().timestamp
                          })
                        console.log(doc.id, " => ", doc.data());
                    });
                })
                
              }, []);
              console.log("postsのデータ",posts);
    


  


  return (
    <div>
   <Post
              key={posts.id}
              name={posts.name}
              nametag={posts.nametag}
              age={posts.age}
              region={posts.region}
              c1name={posts.c1name}
              c1term={posts.c1term}
              c1position={posts.c1position}
              c1job={posts.c1job}
              c2name={posts.c2name}
              c2term={posts.c2term}
              c2position={posts.c2position}
              c2job={posts.c2job}
              other={posts.other}
              demand={posts.demand}
              uid={posts.uid}
              image={posts.image}
              timestamp={posts.timestamp}
              id={posts.id}
            />
</div>
  );
};

export default Feedsec;
