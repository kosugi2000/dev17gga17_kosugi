import React, { useState, useEffect } from "react";
import { db,auth } from "./firebase";
import Post from "./Post";
import TweetInput from "./TweetInput";
import "./styles.css";
import firebase from "firebase/app";


const Feed = () => {
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

  //useEffectの処理

  useEffect(() => {
    const firebaseData = db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
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
          }))
        )
      );
    return () => {
      firebaseData();
    };
  }, []);
  console.log(posts);

  return (
    <div>
        {/* TweetInput読み込み */}
        <TweetInput/>
      {/* 記述3. Postコンポーネントを表示するロジックを書きます */}
      <div id="a">
      {posts && (
        <>
          {posts.map((postItem) => (
            <Post
              key={postItem.id}
              name={postItem.name}
              nametag={postItem.nametag}
              age={postItem.age}
              region={postItem.region}
              c1name={postItem.c1name}
              c1term={postItem.c1term}
              c1position={postItem.c1position}
              c1job={postItem.c1job}
              c2name={postItem.c2name}
              c2term={postItem.c2term}
              c2position={postItem.c2position}
              c2job={postItem.c2job}
              other={postItem.other}
              demand={postItem.demand}
              uid={postItem.uid}
              image={postItem.image}
              timestamp={postItem.timestamp}
              id={postItem.id}
            />
          ))}
        </>
      )}
      </div>
    </div>
  );
};

export default Feed;
