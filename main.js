status=""

objects=[]

function preload()
{
    img=loadImage("horse.jpg")
}

function setup()
{
    canvas=createCanvas(425,250)
    canvas.position(900,20)

    video=createCapture(VIDEO)
    video.hide()

    objectDetector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="Status:Detecting Objects"
}

function modelLoaded()
{
    console.log("modelLoaded")
    status=true
    
}

function draw()
{
    image(video,0,0,425,250)
   
    if(status!="")
    {
        r=random(255)
        b=random(255)
        g=random(255)

        objectDetector.detect(video,gotResult)

        for(var i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status:Objects Detected"
            document.getElementById("numberofobjects").innerHTML="Number Of Objects Are: "+objects.length
            fill("#000080")
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y)
            noFill()
            stroke("#000080")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}

function gotResult(error,result)
{
    if(error)
    {
        console.error(error)
    }
    else{
        console.log(result)
        objects=result
    }
}