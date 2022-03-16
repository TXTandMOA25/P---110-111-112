//create empty variables

prediction_1 = "";

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

camera = document.getElementById("camera");

// webcam live view will be displayed by triggering camera
Webcam.attach('#camera');

 
//Webcam.snap() take images from a webcam
// data_uri shows preview of the image after snapshot.

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/fMNwajV_B/model.json',modelLoaded);
//classifier-variable
//imageClassifier()of ml5.js triggers image classification function.

  function modelLoaded() {
    console.log('Model Loaded!');
  }
  
  // define speechSynthesis API and store it inside a variable
  //utterThis variable stores the converted text to speech.
  //SpeechSynthesisUtterance() of an API converts text to speech.
//  new keyword to convert that text to speechfor every next result

function speak(){
  var synth = window.speechSynthesis;
  speak_data_1 = "We predict: " + prediction_1;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1);
  synth.speak(utterThis);
}

//////
//////
//////



  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }


function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    prediction_1 = results[0].label;
    speak();
    if(results[0].label == "Victory")
    {
	    document.getElementById("update_emoji").innerHTML = "&#9996;";
    }
    if(results[0].label == "Superb")
    {
	    document.getElementById("update_emoji").innerHTML = "&#128076;";
    }
    if(results[0].label == "Thumbs-up")
    {
	    document.getElementById("update_emoji").innerHTML = "&#128077;";
    }
  }
}

