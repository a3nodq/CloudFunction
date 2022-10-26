const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import { doc, getDoc, set, update, db } from "firebase/firestore";

const autoRequest = () => {

    var docRef = db.collection("cities").document("riyadh").collection("roads");

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());


            function formatAMPM(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return strTime;
              }
              


            getCoordinates(document.documentID,formatAMPM(new Date))

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });


}

const getCoordinates = (roadID, currentTime) => {

    let getDoc = db.collection("cities").document("riyadh").collection("roads").document(roadID).collection("path")

    getDoc.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());

            // let lat = (arr["startCoordinates"]! as! Dictionary<String, Any>)["lat"]!

            // let lng = (arr["startCoordinates"]! as! Dictionary<String, Any>)["long"]!





            // self.fetchAPI(lat: lat as! Double, lng: lng as! Double , docID : document.documentID,currentTime:currentTime,roadID:roadID)

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });


}

const fetchAPI = (lat, lng, docID, currentTime, roadID) => {
    try {
        // const data await = 
        // "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point=\(lat),\(lng)&unit=KMPH&openLr=false&key=XKS31hluJMhb0FqUz8lDAiQ96fWMEEGK"


        // self?.getSpeedLimit(currentSpeed:  result.flowSegmentData.currentSpeed , docID:docID,currentTime:currentTime,roadID:roadID)

    } catch (err) {
        console.log("getting error", err)
    }


}

const getSpeedLimit = (currentSpeed, docID, currentTime, roadID) => {
    let speed = 0.0
    let roadID1 = ""
    console.log("from get speed", docID)
    let getSpeedLimit = db.collection("cities").document("riyadh").collection("roads")




    getSpeedLimit.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());

            //     self.speedLimit = document.data()["speedLimit"]! as! Double
            //     roadID1 = document.data()["roadId"]! as! String
            //    speed = self.speedLimit

            // self.getTrafficData(currentSpeed: currentSpeed, speedLimit:  self.speedLimit,docIntersectionID:docID ,roadID: roadID,currentTime:currentTime)


            // let addTimeDB =  getSpeedLimit.document(roadID)

            // addTimeDB.updateData(["time": FieldValue.arrayUnion(_:[self.convertTime(time: currentTime)])])  }


        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

const getTrafficData = (currentSpeed, speedLimit, docIntersectionID, roadID, currentTime) => {

    let speedOfCars = speedLimit - currentSpeed
    let level = 0

    if (speedOfCars <= 35) {

        level = 0

        let addTrafficLevelDB = db.collection("cities").document("riyadh").collection("roads").document(roadID).collection("path").document(docIntersectionID).collection("speeds").document()

        addTrafficLevelDB.set({ trafficLevel: 0, currentSpeed: currentSpeed, time: currentTime })

        let addTrafficLevelRoad = db.collection("cities").document("riyadh").collection("roads").document(roadID).collection("path").document(docIntersectionID)

        addTrafficLevelRoad.update({ trafficLevel: 0 })

    } else if (speedOfCars < 50) {

        let addTrafficLevelDB = db.collection("cities").document("riyadh").collection("roads").document(roadID).collection("path").document(docIntersectionID).collection("speeds").document()

        addTrafficLevelDB.set({ trafficLevel: 1, currentSpeed: currentSpeed, time: currentTime })
        let addTrafficLevelRoad = db.collection("cities").document("riyadh").collection("roads").document(roadID).collection("path").document(docIntersectionID)

        addTrafficLevelRoad.update({ trafficLevel: 1 })

    } else if (speedOfCars <= 75) {

        let addTrafficLevelDB = db.collection("cities").document("riyadh").collection("roads").document(roadID).collection("path").document(docIntersectionID).collection("speeds").document()

        addTrafficLevelDB.setData({ trafficLevel: 2, currentSpeed: currentSpeed, time: currentTime })
        let addTrafficLevelRoad = db.collection("cities").document("riyadh").collection("roads").document(roadID).collection("path").document(docIntersectionID)

        addTrafficLevelRoad.update({ trafficLevel: 2 })
    } else {

        let addTrafficLevelDB = db.collection("cities").document("riyadh").collection("roads").document(roadID).collection("path").document(docIntersectionID).collection("speeds").document()

        addTrafficLevelDB.set({ trafficLevel: 3, currentSpeed: currentSpeed, time: currentTime })
        let addTrafficLevelRoad = db.collection("cities").document("riyadh").collection("roads").document(roadID).collection("path").document(docIntersectionID)


        addTrafficLevelRoad.update({ trafficLevel: 3 })
    }

    totalTrafficLevel(roadID)
}

const totalTrafficLevel =(docRoadID)=>{
    let setTotalTrafficLevel = db.collection("cities").document("riyadh").collection("roads").document(docRoadID)
    
    var calculateTotalTrafficLevel = 0.0


    setTotalTrafficLevel.collection('path').get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());

            // let trafficLevel = data["trafficLevel"]!  as! Double

            // calculateTotalTrafficLevel = calculateTotalTrafficLevel + trafficLeve

            
        // calculateTotalTrafficLevel = calculateTotalTrafficLevel/Double(querySnapshot!.documents.count)

        calculateTotalTrafficLevel = floor(calculateTotalTrafficLevel)
          
              
        setTotalTrafficLevel.update({
         "trafficCondition":calculateTotalTrafficLevel,
        })

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
       
})
}
