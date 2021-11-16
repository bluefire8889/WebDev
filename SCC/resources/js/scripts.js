/*
var heart = document.getElementsByClassName('heart')[1],
    pfx = ["webkit", "moz", "MS", "o", ""],
    hovered = false;

function AnimationListener() {
    if(hovered)
    { 
      heart.classList.remove('animated'); 
      heart.style.webkitTransform = 'scale(2)';
      heart.style.MozTransform = 'scale(2)';
      heart.style.msTransform = 'scale(2)';
      heart.style.OTransform = 'scale(2)';
      heart.style.transform = 'scale(2)';
    }
}

function TransitionListener() {
  if(!hovered)
  {
    heart.classList.add('animated');
  }
}

function PrefixedEvent(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p]+type, callback, false);
    }
}

PrefixedEvent(heart, "AnimationIteration", AnimationListener);

heart.onmouseover = function() {
  hovered = true;
}
heart.onmouseout = function() {
  setTimeout(function() { hovered = false; }, 500);
  PrefixedEvent(heart, "TransitionEnd", TransitionListener);
  heart.style.webkitTransform = 'scale(1)';
  heart.style.MozTransform = 'scale(1)';
  heart.style.msTransform = 'scale(1)';
  heart.style.OTransform = 'scale(1)';
  heart.style.transform = 'scale(1)';  
}


// NOTE: The change to red signifies the start of 
// the animation

        // Allows elements to be accessed in a clean way
        var circle = document.getElementById('circle'), 
        button = document.getElementById('button');
    
        // Gets element to show current percentage
    var result = document.getElementById('result'),
        // Current position of circle around its path
        // in percent in reference to the original
        totalCurrentPercent = 0,
        // Percent of circle around its path in
        // percent in reference to the latest origin
        currentPercent = 0;
    
    // Updates the percent change from the latest origin
    var showPercent = window.setInterval(function() {
      if(currentPercent < 100)
      {
        currentPercent += 1;
      }
      else {
        currentPercent = 0;
      }
      result.innerHTML = currentPercent;
    }, 39); // Runs at a rate based on the animation's
            // duration (milliseconds / 100)
    
    
    
    // Checks to see if the specified rule is within 
    // any of the stylesheets found in the document;
    // returns the animation object if so
    function findKeyframesRule(rule) {
        var ss = document.styleSheets;
        console.log(ss.length)
        for (var i = 0; i < ss.length; ++i) {
            
            for (var j = 0; j < ss[i].cssRules.length; ++j) {
    
                if (ss[i].cssRules[j].type == window.CSSRule.KEYFRAMES_RULE && ss[i].cssRules[j].name == rule) {
                    console.log(i);
                    console.log(ss[i].cssRules.length);
                    console.log(j);
                    console.log(ss[i].cssRules.length);
                    console.log(ss[i].cssRules[j]);
    
                    return ss[i].cssRules[j]; 
                }
            }
        }
        return null;
    }
    
    // Replaces the animation based on the percent
    // when activated and other hard coded 
    // specifications
    function change(anim) {
      // Obtains the animation object of the specified
      // animation
      var keyframes = findKeyframesRule(anim),
            length = keyframes.cssRules.length;
    
          
      
      // Makes an array of the current percent values
      // in the animation
      var keyframeString = [];  
      for(var i = 0; i < length; i ++)
      {
        keyframeString.push(keyframes[i].keyText);
      }
      
        
      // Removes all the % values from the array so
      // the getClosest function can perform calculations
      var keys = keyframeString.map(function(str) {
        return str.replace('%', '');
      });
      
      // Updates the current position of the circle to
      // be used in the calculations
      totalCurrentPercent += currentPercent;
      if(totalCurrentPercent > 100)
      {
        totalCurrentPercent -= 100;
      }
      // Self explanatory variables if you read the
      // description of getClosest
      var closest = getClosest(keys);
      
      var position = keys.indexOf(closest), 
          firstPercent = keys[position];
      
      // Removes the current rules of the specified 
      // animation
      for(var i = 0, j = keyframeString.length; i < j; i ++)
      {
        keyframes.deleteRule(keyframeString[i]);
      }
      
      // Turns the percent when activated into the
      // corresponding degree of a circle
      var multiplier = firstPercent * 3.6;
      
      // Essentially this creates the rules to set a new 
      // origin for the path based on the approximated
      // percent of the animation when activated and
      // increases the diameter of the new circular path  
      keyframes.appendRule("0% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 0) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 0) + "deg); background-color:red; }");
      keyframes.appendRule("13% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 45) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 45) + "deg); }");
      keyframes.appendRule("25% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 90) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 90) + "deg); }");
      keyframes.appendRule("38% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 135) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 135) + "deg); }");
      keyframes.appendRule("50% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 180) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 180) + "deg); }");
      keyframes.appendRule("63% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 225) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 225) + "deg); }");
      keyframes.appendRule("75% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 270) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 270) + "deg); }");
      keyframes.appendRule("88% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 315) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 315) + "deg); }");
      keyframes.appendRule("100% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 360) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 360) + "deg); }");
      
      // Shows the circle again
      circle.style.display = "inherit";
      // Sets the animation to the newly specified rules 
      circle.style.webkitAnimationName = anim; 
      
      // Resets the approximate animation percent counter
      window.clearInterval(showPercent);
      currentPercent = 0;
      showPercent = self.setInterval(function() {
        if(currentPercent < 100)
        {
          currentPercent += 1;
        }
        else {
          currentPercent = 0;
        }
        result.innerHTML = currentPercent;
      }, 39);
    }
    
    // Attatches the change function to the button's
    // onclick function
    button.onclick = function() {
      // Removes the animation so a new one can be set
      circle.style.webkitAnimationName = "none";
      // Temporarily hides the circle
      circle.style.display = "none";
      // Initializes change function
      setTimeout(function () { 
        change("rotate");
      }, 0);
    }
    
    // Gets the animation's closest % value based on
    // the approximated % found below
    function getClosest(keyframe) {
      var curr = keyframe[0];
      var diff = Math.abs (totalCurrentPercent - curr);
      for (var val = 0, j = keyframe.length; val < j; val++) {
        var newdiff = Math.abs(totalCurrentPercent - keyframe[val]);
        if (newdiff < diff) {
          diff = newdiff;
          curr = keyframe[val];
         }
      }
      return curr;
    }*/
