function createLoaderCircle(
    loginName,type,
    width
  ) {
    var ss = document.styleSheets;
    var loader = document.createElement("div");
    loader.className = "circle_Container";
  
    document.body.appendChild(loader);
    var parent = document.createElement("div");
    parent.id = parentID;
    loader.appendChild(parent);
    var div = document.createElement("div");
    div.className = "loader";
    var newSizeRule = `{position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);width: ${width};height: ${height};}`;
  
    var nodes = new Array();
  
    var i = 0;
    var previousBorderSize = border;
    while (i < count) {
      nodes.push(createDivElement(i, previousBorderSize, ss, speed, count));
  
      i++;
    }
    for (var i = 1; i < nodes.length; i++) {
      nodes[i - 1].appendChild(nodes[i]);
    }
    parent.appendChild(nodes[0]);
    editCSSRule(rule2, newSizeRule, ss);
  }
  
  function createDivElement(i, borderWidth, ss, speed, count) {
    var div = document.createElement("div");
  
    var idNum = i + 1;
    speedFun = speed;
    div.id = "circle-" + idNum;
    var newAnimationRule = ` {width: calc(100% - 0px);height: calc(100% - 0px);border: ${borderWidth}px solid #585858;border-bottom-color: #09f;border-top-color: #09f;border-radius: 50%;animation: rotate-circle-${idNum} ${speedFun}s linear infinite;}`;
    var keyframe = ` rotate-circle-${idNum} {  0% {    border-width: ${borderWidth}px;   } 50% {    border-width: 0px;  border-color: #09f; border-bottom-color: #585858; border-top-color: #585858;}  100% {    transform: rotate(360deg);    border-width: ${borderWidth}px; border-color:#585858;border-bottom-color: #09f;border-top-color: #09f;  }}`;
    addCSSRule("#" + div.id, newAnimationRule, ss);
    addCSSRule("@keyframes", keyframe, ss);
    return div;
  }
  
  function addCSSRule(selector, newRule, ss) {
    var mysheet = ss[1];
    mysheet.insertRule(selector + newRule, mysheet.cssRules.length);
  }
  
  function editCSSRule(rule, newRule, ss) {
    //console.log("ss.length=" + ss.length);
    for (var i = 0; i < ss.length; ++i) {
      /* console.log("i1=" + i);
      console.log("ss[i].cssRules.length=" + ss[i].cssRules.length);
      */
      for (var j = 0; j < ss[i].cssRules.length; ++j) {
        /*console.log("j" + i + "=" + j);
        console.log("rule.name=" + ss[i].cssRules[j].selectorText);
        */
        if (ss[i].cssRules[j].selectorText == rule) {
          /*console.log("i2=" + i);
          console.log("ss[i].cssRules.length=" + ss[i].cssRules.length);
          console.log("j2=" + j);
          console.log("ss[i].cssRules[j]=" + ss[i].cssRules[j]);
                  */
          var ruleSelector = ss[i].cssRules[j].selectorText;
          ss[i].deleteRule(j);
          ss[i].insertRule(ruleSelector + newRule, j);
        }
      }
    }
  }