function addCSSRule(selector, newRule, ss) {
  var mysheet = ss[0];
  mysheet.insertRule(selector + newRule, mysheet.cssRules.length);
}
    // Replaces the animation based on the percent
    // when activated and other hard coded 
    // specifications
    function changeProgressBar(anim,percent,size) {
      var ss = document.styleSheets;
      for (var i = 0; i < ss.length; ++i) {
        console.log(i);
      }
      var newAnimationRule = ` {animation: show-hours-${anim}-${size} .8s linear forwards;}`;
      var keyframe = ` show-hours-${anim}-${size} {0%{-webkit-transform: rotate(0deg);transform: rotate(0deg);} 100%{-webkit-transform: rotate(${percent}deg);transform: rotate(${percent}deg);}}`;
      addCSSRule(`#${anim}-${size}`, newAnimationRule, ss);
      addCSSRule("@keyframes", keyframe, ss);

      console.log("100% { --webkit-transform: rotate(" + percent + "deg); transform: rotate(" + percent + "deg); }")
    
    };

    