/* global jsPDF */
function demoTwoPageDocument() {
  var doc = new jsPDF();
  doc.text(20, 20, "Hello world!");
  doc.text(20, 30, "This is client-side Javascript, pumping out a PDF.");
  doc.addPage();
  doc.text(20, 20, "Do you like that?");

  // Save the PDF
  doc.save("Test.pdf");
}

function demoLandscape() {
  var doc = new jsPDF("landscape");
  doc.text(20, 20, "Hello landscape world!");

  // Save the PDF
  doc.save("Test.pdf");
}

function demoFontSizes() {
  var doc = new jsPDF();
  doc.setFontSize(22);
  doc.text(20, 20, "This is a title");

  doc.setFontSize(16);
  doc.text(20, 30, "This is some normal sized text underneath.");

  doc.save("Test.pdf");
}

function demoFontTypes() {
  var doc = new jsPDF();

  doc.text(20, 20, "This is the default font.");

  doc.setFont("courier");
  doc.setFontType("normal");
  doc.text(20, 30, "This is courier normal.");

  doc.setFont("times");
  doc.setFontType("italic");
  doc.text(20, 40, "This is times italic.");

  doc.setFont("helvetica");
  doc.setFontType("bold");
  doc.text(20, 50, "This is helvetica bold.");

  doc.setFont("courier");
  doc.setFontType("bolditalic");
  doc.text(20, 60, "This is courier bolditalic.");

  doc.save("Test.pdf");
}

function demoTextColors() {
  var doc = new jsPDF();

  doc.setTextColor(100);
  doc.text(20, 20, "This is gray.");

  doc.setTextColor(150);
  doc.text(20, 30, "This is light gray.");

  doc.setTextColor(255, 0, 0);
  doc.text(20, 40, "This is red.");

  doc.setTextColor(0, 255, 0);
  doc.text(20, 50, "This is green.");

  doc.setTextColor(0, 0, 255);
  doc.text(20, 60, "This is blue.");

  // Output as Data URI
  doc.output("datauri");
}

function demoMetadata() {
  var doc = new jsPDF();
  doc.text(
    20,
    20,
    "This PDF has a title, subject, author, keywords and a creator."
  );

  // Optional - set properties on the document
  doc.setProperties({
    title: "Title",
    subject: "This is the subject",
    author: "James Hall",
    keywords: "generated, javascript, web 2.0, ajax",
    creator: "MEEE"
  });

  doc.save("Test.pdf");
}

function demoUserInput() {
  var name = prompt("What is your name?");
  var multiplier = prompt("Enter a number:");
  multiplier = parseInt(multiplier);

  var doc = new jsPDF();
  doc.setFontSize(22);
  doc.text(20, 20, "Questions");
  doc.setFontSize(16);
  doc.text(20, 30, "This belongs to: " + name);

  for (var i = 1; i <= 12; i++) {
    doc.text(20, 30 + i * 10, i + " x " + multiplier + " = ___");
  }

  doc.addPage();
  doc.setFontSize(22);
  doc.text(20, 20, "Answers");
  doc.setFontSize(16);

  for (i = 1; i <= 12; i++) {
    doc.text(20, 30 + i * 10, i + " x " + multiplier + " = " + i * multiplier);
  }
  doc.save("Test.pdf");
}

function demoRectangles() {
  var doc = new jsPDF();

  doc.rect(20, 20, 10, 10); // empty square

  doc.rect(40, 20, 10, 10, "F"); // filled square

  doc.setDrawColor(255, 0, 0);
  doc.rect(60, 20, 10, 10); // empty red square

  doc.setDrawColor(255, 0, 0);
  doc.rect(80, 20, 10, 10, "FD"); // filled square with red borders

  doc.setDrawColor(0);
  doc.setFillColor(255, 0, 0);
  doc.rect(100, 20, 10, 10, "F"); // filled red square

  doc.setDrawColor(0);
  doc.setFillColor(255, 0, 0);
  doc.rect(120, 20, 10, 10, "FD"); // filled red square with black borders

  doc.setDrawColor(0);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(140, 20, 10, 10, 3, 3, "FD"); //  Black square with rounded corners

  doc.save("Test.pdf");
}

function demoLines() {
  var doc = new jsPDF();

  doc.line(20, 20, 60, 20); // horizontal line

  doc.setLineWidth(0.5);
  doc.line(20, 25, 60, 25);

  doc.setLineWidth(1);
  doc.line(20, 30, 60, 30);

  doc.setLineWidth(1.5);
  doc.line(20, 35, 60, 35);

  doc.setDrawColor(255, 0, 0); // draw red lines

  doc.setLineWidth(0.1);
  doc.line(100, 20, 100, 60); // vertical line

  doc.setLineWidth(0.5);
  doc.line(105, 20, 105, 60);

  doc.setLineWidth(1);
  doc.line(110, 20, 110, 60);

  doc.setLineWidth(1.5);
  doc.line(115, 20, 115, 60);

  // Output as Data URI
  doc.output("datauri");
}

function demoCircles() {
  var doc = new jsPDF();

  doc.ellipse(40, 20, 10, 5);

  doc.setFillColor(0, 0, 255);
  doc.ellipse(80, 20, 10, 5, "F");

  doc.setLineWidth(1);
  doc.setDrawColor(0);
  doc.setFillColor(255, 0, 0);
  doc.circle(120, 20, 5, "FD");

  doc.save("Test.pdf");
}

function demoTriangles() {
  var doc = new jsPDF();

  doc.triangle(60, 100, 60, 120, 80, 110, "FD");

  doc.setLineWidth(1);
  doc.setDrawColor(255, 0, 0);
  doc.setFillColor(0, 0, 255);
  doc.triangle(100, 100, 110, 100, 120, 130, "FD");

  doc.save("Test.pdf");
}

function demoImages() {
  // Because of security restrictions, getImageFromUrl will
  // not load images from other domains.  Chrome has added
  // security restrictions that prevent it from loading images
  // when running local files.  Run with: chromium --allow-file-access-from-files --allow-file-access
  // to temporarily get around this issue.
  var getImageFromUrl = function(url, callback) {
    var img = new Image(),
      data,
      ret = {
        data: null,
        pending: true
      };

    img.onError = function() {
      throw new Error('Cannot load image: "' + url + '"');
    };
    img.onload = function() {
      var canvas = document.createElement("canvas");
      document.body.appendChild(canvas);
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      // Grab the image as a jpeg encoded in base64, but only the data
      data = canvas
        .toDataURL("image/jpeg")
        .slice("data:image/jpeg;base64,".length);
      // Convert the data to binary form
      data = atob(data);
      document.body.removeChild(canvas);

      ret["data"] = data;
      ret["pending"] = false;
      if (typeof callback === "function") {
        callback(data);
      }
    };
    img.src = url;

    return ret;
  };

  // Since images are loaded asyncronously, we must wait to create
  // the pdf until we actually have the image data.
  // If we already had the jpeg image binary data loaded into
  // a string, we create the pdf without delay.
  var createPDF = function(imgData) {
    var doc = new jsPDF();

    doc.addImage(imgData, "JPEG", 10, 10, 50, 50);
    doc.addImage(imgData, "JPEG", 70, 10, 100, 120);

    doc.save("output.pdf");
  };

  getImageFromUrl("thinking-monkey.jpg", createPDF);
}

function demoStringSplitting() {
  var pdf = new jsPDF("p", "in", "letter"),
    sizes = [12, 16, 20],
    fonts = [["Times", "Roman"], ["Helvetica", ""], ["Times", "Italic"]],
    font,
    size,
    lines,
    margin = 0.5, // inches on a 8.5 x 11 inch sheet.
    verticalOffset = margin,
    loremipsum =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id eros turpis. Vivamus tempor urna vitae sapien mollis molestie. Vestibulum in lectus non enim bibendum laoreet at at libero. Etiam malesuada erat sed sem blandit in varius orci porttitor. Sed at sapien urna. Fusce augue ipsum, molestie et adipiscing at, varius quis enim. Morbi sed magna est, vel vestibulum urna. Sed tempor ipsum vel mi pretium at elementum urna tempor. Nulla faucibus consectetur felis, elementum venenatis mi mollis gravida. Aliquam mi ante, accumsan eu tempus vitae, viverra quis justo.\n\nProin feugiat augue in augue rhoncus eu cursus tellus laoreet. Pellentesque eu sapien at diam porttitor venenatis nec vitae velit. Donec ultrices volutpat lectus eget vehicula. Nam eu erat mi, in pulvinar eros. Mauris viverra porta orci, et vehicula lectus sagittis id. Nullam at magna vitae nunc fringilla posuere. Duis volutpat malesuada ornare. Nulla in eros metus. Vivamus a posuere libero.";

  // Margins:
  pdf
    .setDrawColor(0, 255, 0)
    .setLineWidth(1 / 72)
    .line(margin, margin, margin, 11 - margin)
    .line(8.5 - margin, margin, 8.5 - margin, 11 - margin);

  // the 3 blocks of text
  for (var i in fonts) {
    if (fonts.hasOwnProperty(i)) {
      font = fonts[i];
      size = sizes[i];

      lines = pdf
        .setFont(font[0], font[1])
        .setFontSize(size)
        .splitTextToSize(loremipsum, 7.5);
      // Don't want to preset font, size to calculate the lines?
      // .splitTextToSize(text, maxsize, options)
      // allows you to pass an object with any of the following:
      // {
      // 	'fontSize': 12
      // 	, 'fontStyle': 'Italic'
      // 	, 'fontName': 'Times'
      // }
      // Without these, .splitTextToSize will use current / default
      // font Family, Style, Size.
      pdf.text(0.5, verticalOffset + size / 72, lines);

      verticalOffset += ((lines.length + 0.5) * size) / 72;
    }
  }

  pdf.save("Test.pdf");
}

function demoFromHTML() {
  var pdf = new jsPDF("p", "pt", "letter"),
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    source = document.getElementById("fromHTMLtestdiv"),
    // we support special element handlers. Register them with jQuery-style
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors
    // (class, of compound) at this time.
    specialElementHandlers = {
      // element with id of "bypass" - jQuery style selector
      "#bypassme": function(element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true;
      },
      ".hide": function(element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true;
      }
    };

  var margins = {
    top: 80,
    bottom: 60,
    left: 40,
    width: 522
  };
  // all coords and widths are in jsPDF instance's declared units
  // 'inches' in this case
  pdf.fromHTML(
    source, // HTML string or DOM elem ref.
    margins.left, // x coord
    margins.top, // y coord
    {
      width: margins.width, // max width of content on PDF
      elementHandlers: specialElementHandlers
    },
    function(dispose) {
      // dispose: object with X, Y of the last line add to the PDF
      //          this allow the insertion of new lines after html
      pdf.save("Test.pdf");
    },
    margins
  );
}

function demoTextAlign() {
  var pdf = new jsPDF("p", "pt", "letter");

  pdf.setFillColor(0);
  pdf.circle(140, 50, 2, "F");
  pdf.text("This text is normally\raligned.", 140, 50);

  pdf.circle(140, 120, 2, "F");
  pdf.text("This text is centered\raround\rthis point.", 140, 120, "center");

  pdf.circle(140, 300, 2, "F");
  pdf.text(
    "This text is rotated\rand centered around\rthis point.",
    140,
    300,
    45,
    "center"
  );

  pdf.circle(140, 400, 2, "F");
  pdf.text("This text is\raligned to the\rright.", 140, 400, "right");

  pdf.circle(140, 550, 2, "F");
  pdf.text("This text is\raligned to the\rright.", 140, 550, 45, "right");

  pdf.circle(460, 50, 2, "F");
  pdf.text("This single line is centered", 460, 50, "center");

  pdf.circle(460, 200, 2, "F");
  pdf.text("This right aligned text\r\rhas an empty line.", 460, 200, "right");

  pdf.save("Test.pdf");
}

function demoUsingTTFFont() {
  const AmiriRegular =
    "AAEAAAASAQAABAAgRFNJRwAAAAEACYzwAAAACEZGVE0YhN+1AAb9lAAAABxHREVGHFkyMQAG/bAAAAIyR1BPUxGln+4ABv/kAAHbfEdTVUK0w6wyAAjbYAAAsY5PUy8ywf2NMgAAAagAAABgY21hcDKTsj8AAGtQAAAIwmN2dCAARAURAAB0HAAAAARnYXNwAAAAEAAG/YwAAAAIZ2x5Zr8HEfMAAN3AAAQApGhlYWRTzdmgAAABLAAAADZoaGVhYBYduQAAAWQAAAAkaG10eK7rcuIAAAIIAABpRmxvY2E8mi8gAAB0IAAAaaBtYXhwGwkFcwAAAYgAAAAgbmFtZR1MjqoABN5kAAAIkXBvc3TA5wxZAATm+AACFpNwcmVwaAaMhQAAdBQAAAAHAAEAAAAAG+ep3oMzXw889QALCAAAAAAAyAoxsQAAAADVjj+4+1r4zVu9DoUAAAAIAAIAAQAAAAAAAQAACPz67AAAW3z7Wq0UW70AAQAAAAAAAAAAAAAAAAAAGjwAAQAAGmcBrAATA8MAKwACAAAAAQABAAAAQAAAACIAAQAEBYkBkAAFAAAFMwWZAAABHgUzBZkAAAPXAGYCEgAAAAAFAAAAAAAAAKAAIG+CACBCAAAACAAAAABCTFEgAMAAIP//CPz67AAAFGENDwAAANMACAAAA2kFNgAAACAADwLsAEQAAAAAAqoAAAJYAAAB4gCCAjAATgPAAGUD5ABmBTYAUAVWAGoBQABOA6wBLAOsAFoDdgBBBDwAPgGSACIC8gB0AZ4AYALCAB8EQgBsBEIBJARCAIgEQgCoBEIAZARCAKgEQgCSBEIAfARCAKgEQgCUAcQAdAHQAEwD2AA8BGoAhwPaAGACyABwBdgAYgTm/+QEqABUBUQAYAWMAFQElgBUBC4AVAWgAGAFrABUAogAVAJy/zAFIgBUBGgAVAcWADAGEABDBdgAYgRIAFMF1gBiBNoAUwPsAGIE5AAYBaYANAT8//AHCP/0BTj/7QSs/+QE8gBAAuQBLALCAD4C5ABaAwwAegPyABwCrADoA14ASgPkAAgDTgBOBAYATgNcAFACaAAyA6QALgQIACQCHABAAd7/3AQMACQB/gAkBiwAQAQoAEAD+gBSA/wAHAPiAE4C/gBAAuIAUgJuACgEBgAbA7L/+QWiAAADuAATA6oAAAN+AEQDLgEiAZoAmgMuAQUEdABwAa4AagN8AFoDugBYBHwAnAVAADQBmgCUA3IATALyAGQFJgBwArIAXgNSAGQElgBaAvQAdgUmAHACpABgAiQATARIAEQCzABMAnwATgIIAGQEOgCcA8gARAHAAGwBzgBkAkgATgMIAEwDUgBeBXYARAXcAEoFeABGArIAUgTm/+QE5v/kBOb/5ATm/+QE5v/kBOb/5AcC/+AFRABiBJYAVASWAFQElgBUBJYAVAKIAEsCiABUAogAVAKIADgFjABUBhAAQwXYAGIF2ABiBdgAYgXYAGIF2ABiA6AAbgXYAGIFpgA0BaYANAWmADQFpgA0BKz/5ARIAFQEMgAyA14ASgNeAEoDXgBKA14ASgNeAEoDXgBKBRoASgNOAE4DXABQA1wAUANcAFADXABQAhwAKQIcAEACHABAAiAAEAQKAFAEKABAA/oAUgP6AFID+gBSA/oAUgP6AFIErgB4A/oAVAQGABsEBgAbBAYAGwQGABsDqgAAA94AAAOqAAAE5v/kA14ASgTm/+QDXgBKBOb/5ANeAEoFRABgA04ATgVEAGADTgBOBUQAYANOAE4FRABgA04ATgWMAFQEKABOBYwAVAQGAE4ElgBUA1wAUASWAFQDXABQBJYAVANcAFAElgBUA14AUASWAFQDXABQBaAAYAOkAC4FoABgA6QALgWgAGADpAAuBaAAYAOkAC4FrABUBAgAFAWsAFQECAAkAogAQQIcADcCiABMAhwAHQKIAFQCHABPApAAVAIYADgCiABUAhwAQAR2AFIDsgBAAnL/MAHe/+IFIgBUBAwAJAQqAEAEaABUAf4AJARoAFQB/gAiBIwAVAIiACQEaABUAwQAJARoAD4B/gAiBhAAQwQoAEAGEABDBCgAPgYQAEMEKABABCj/ngYQAEMEEgBABdgAYgP6AFIF2ABiA/oAUgXYAGID+gBSB/IAYgYUAFIE2gBTAv4AQATaAFMC/gA+BNoAUwL+AEAD7ABiAuIAUgPsAGIC4gBSA+wAYgLiAFQD7ABiAuIAUgTkABoCbgAqBOQAGAJuACgE5AAYAm4AKAWmADQEBgAbBaYANAQGABsFpgA0BAYAGwWmADQEBgAbBaYANAQGABsFpgA0A/YAFgcI//QFogAABKz/5AOqAAAErP/kBPIAQAN+AEQE8gBAA34ARATyAEADfgBE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AUAAYgIgAGIDUgC0AmoAPAJoAFYGwgEKBtoAQQD8/zoFiAA/BMYAiQSsAHwECP/qBXAAWgRgADAEKAAyBFQAMgZeADQGggA2Ab7/vgI6//oHaQBVBxIAaAGG/8UB9P/PB2kAVQcSAGgBhv/FAfT/zwdpAFUHEgBoAYb/xQH0/88HaQBVBxIAaAGG/8UB9P/PB2kAVQcSAGgBhv+TAfT/zwdpAFUHEgBoAYb/kwH0/88H3wB9CAwAggJd/84DB//RB98AfQgMAIICXf/OAwf/0QVLADsFHgBuBT//0wTi/8QFSwA7BR4AbgU//9ME4v/EBUsAOwUeAG4FP//TBOL/xAVLADsFHgBuBT//0wTi/8QDmwB9A8UASwObAH0DxQBLA5sAfQPFAEsDmwB9A8UASwMz/1YCv/9SAzP/VgK//1IJnwB9CQ8AfQVG/8gEtv/ICZ8AfQkPAH0FRv/IBLb/yAmfAH0JDwB9BUb/yAS2/8gJnwB9CQ8AfQVG/2gEtv9oBJUAeQTsAHkElQB5BOwAeQGG/5MB9P/PAvQAbQMJAH4C9ABtA0QAkgOe/6MDsP/PBN4ANwQuACoDnv+yAyD/wglHAHsEkgB7CUcAewQkAHsBcQAvAXEALwJGAC8CRgAvAjIALwIyAC8CMgAuAjIALgJlAC8CZQAvAcwAMAGZAC8BmQAvAXUAJgKSAC4CkgAuBUMAfwaVAIEFRv/IBLb/yAM1/1MCxP9fAzX/UwLE/18DNf9TAsT/XwP9//gDNf9TAsT/XwM1/1MCxP9fAzX/UwLE/18GHgBuBLAAdAGG/8UB9P/PAYb/xQH0/88DXABQA8oAUASPAH4E/QB+BEr/XwS4/18ESv9fBLj/XwRK/18EuP9fBEr/XwS4/18F4ABlBdYAcAPF/70F4ABlBdYAcAPF/70GHgBuBLAAdAGG/8UB9P/PBS8AYQUvAGEEwQAtBeAAZQXgAGUFLwBhBS8AYQUvAGEEwQAtBeAAZQXgAGUFLwBhBS8AYQUvAGEEwQAtBeAAZQXgAGUFLwBhBMEALQXgAGUF4ABlBq8AYQltAGIGrwBhCW0AYgavAGEGrwBhCW0AYgY1AF8GNQBfBjUAXwdIAJ8HoABbCMoAnwegAFsHoABbB6AAWwjKAJ8JqQBuCLkAYgi5AGIFcwBhCAAAYgVzAGEIAABiBcgAYQXIAGEFyABhBosAYgW2AGUFtgBlBcgAYQaLAGIFtgBlBbYAZQY1AC0GfwBhBn8AYQZ/AGEJhQBsBkUALQfaAGUH2gBlBZUAYQWVAGEFlQBhA4gALQXAAGUFwABlBVAAYQVQAGEFUABhB0sAYgbmAGUG5gBlBS8AYQUvAGEFLwBhBMEALQXgAGUF4ABlBZMAYQfMAGIIOwBlCDsAZQUvAGEFLwBhBS8AYQTBAC0F4ABlBeAAZQObAH0DM/9WBh4AbgJYAIACWACAAlgAgAJYAIACWACAAlgAgARo/1QEaP9UBH0AnwYXAFkF1gBwBdYAcARo/1QEaP9UBH0AnwYXAFkF1gBwBdYAcARo/1QEaP9UBH0AnwYXAFkF1gBwBdYAcARo/1QEaP9UBH0AnwYXAFkF1gBwBdYAcAc4AGUHOABlBzgAZQc4AGUFvQAtCQ0AbAWMAE0HrgA1B64ANQPeAHMFUv/+BVL//gWMAFAH5ABiBGj/VARo/1QEfQCfBhcAWQXWAHAF1gBwBLAAdARo/1QEaP9UBH0AnwYXAFkF1gBwBdYAcAUl/8EFJf/BBSX/wQOD/8oEQf/PBSX/wQUl/8EFJf/BA4P/ygRB/88FJf/BBSX/wQUl/8EDg//KBEH/zwOD/8oFq//BBdr/rgWr/8EF2v+uBav/wQXa/64FmP/BBZj/wQWY/8EFmf/KBun/wQbp/8EGmP/KBun/wQbp/8EG6f/BBpj/yglt/8QIQf/JBM7/wQWp/64Ezv/BBan/rgVC/8EFQv/BBUL/wQMk/64FQv/BAyT/rgX5/8EF+f/BBfn/wQY9/3cGEv+uBQ//wQUP/8EFD//BAtv/swO5/7IE2P/BBNj/wQTY/8EDo//KBSX/wQUl/8EFJf/BA4P/ygRB/88FL//BBVn/rgOe/6MFJf/BBSX/wQUl/8EDg//KBEH/zwWq/8kDrP/PBar/yQOs/88Fqv/JA6z/zwWq/8kDrP/PCEP/yQa8/88IQ//JBrz/zwXF/3cGQf+uA8L/zgWq/8kDrP/PBar/yQOs/88BfP+TAXz/kwF8/5MJOwB0CTsAdAiUAGUIlABlCJQAZQiUAGUImgBwCJoAcAiaAHAImgBwCL4AZQi+AGUIvgBlCL4AZQi+AGUIvgBlChwAcAocAHAKHABwChwAcAY1AF8GNQBfBjUAXwdIAJ8HMP9QBzD/UAiy/1AIsv9QCRoAdAkaAHQHDwA1Bw8ANQcPADUHDwA1COQAcAjkAHAI5ABwCOQAcAmSAHQJkgB0CZIAdAmSAHQJkgB0CZIAdAnuAHAJ7gBwCe4AcAnuAHAJqwBuCasAbgmrAG4HkgCfB3r/UAd6/1AIhP9QCIT/UAWY/8EFmP/BBZj/wQWZ/8oGcv/PBnL/zwhB/8kJb//ECW//xAlv/8QJb//ECW//xAlv/8QIIP/JCCD/yQHW/z8Bvv+jBbcBKAW3AF8GP/+uC/QAbgoH/8QGP/+uBj//rgU8/8EFPP/BBTz/wQ22AG4KvP/EDUgAdA1IAHQKev/ECnr/xA4fAHQNYQBuCnv/xAp7/8QMcQBiCU//yQ/IAG4Ly//EDawAYg2dAGIJTv/JDh8AdA1hAG4Ke//EDHEAYglP/8kPWgB0DtgAYgqf/8kNPgBuDSP/xAv3/8kM0AB0C/4AYgrSAGIJX//JC1QAdArSAGILVAB0C1QAdAwXAGII+P/JC9sAbgrrAGIKpQBiCycAdAsnAHQFYP+rC5UAbgqlAGIFNP/LCOAAbgUU/8EJuv/EBdv/rg1IAHQJuv/EBdv/rgm6/8QF2/+uCbr/xAo7/8QJD//JBj//rguGAHQLBABiBj//rguGAHQKWgB0CloAdAnYAGIHOf/JC4YAdAuGAHQLhgB0C4YAdAuGAHQKWgB0CloAdA1IAHQOdAB0DUgAdA4fAHQPWgB0Dh8AdA9aAHQLJwB0CHIAdAuGAHQLhgB0CloAdAwcAHQLbQB0C4YAdAgG/8QFNP/LC1QAdArxAHQKB//EDUgAdAU0/8sKbwBiCqUAYgv0AG4OdAB0DnQAdA1IAHQLbQB0C4YAdAnI/8kIhP/JCk7/yQ4fAHQLhgB0C70AewiEAHsHpwBxC2z/VAmgAEsORwBiD1cAfwmyAH4LnwBzCuj//ghx//gHbv/4C2MAf1t8AJICWADsAXz/mQJYAQoCWADsAlgBBgF8/58CWAD+AXz/gwJYAQYBfP+7AlgAgAF8/5MCWACvAXz/uwMOAHQBvv7OAp7/bgHg//4CUQBEAzX/UwLE/18BvgBXAdYABwYeAG4EsABXAYb/vAH0/88BvgB3AdYAUAdpAFUHEgBoAYb/xQH0/88C9ABtAwkAKQdpAFUHEgBoAYb/sgH0/88HaQBVBxIAaAGG/74B9P/PBUsAOwUeAG4FP//TBOL/xAVLADsFHgBuBT//0wTi/8QFSwA7BR4AbgU//9ME4v/EA5sAfQPFAEsDmwB9A8UASwMz/1YCv/9SAzP/VgK//1IH8AB1CKIAdgSM/8wEjf/NB/AAdQiiAHYEjP/MBI3/zQm0AHgJdABiBZb/yQXI/8UJtAB4CXQAYgWW/8kFyP/FBlcAcgYEAHkEi//OBGr/uAZXAHIGBAB5BIv/zgRq/7gEUwB0A/IAPAPS/7IC7v+vBFMAdAPyADwD0v+yAu7/rwffAH0IDACCAl3/zgMH/9EFfwB3BN0AWQJd/84DB//RBUMAfwaVAIEFRv/IBLb/yATUAH8FKABsAWj/3AGV/7cDngB0BC4AYgMd/7QDtv/JBJUAeQTsAHkBhv/FAfT/zwL0AG0DCQB+A57/owMg/8IDNf9TAsT/XwYeAG4EsAB0Bh4AbgSwAHQBhv/FAfT/zwUl/zsFif8/BSX/7gWJ/+wFJQB8BYn/6gUlAHwFiQCCAagAagdVAEoGfQAxA9MAeARNAHUETAB4Bn0AMQZDAGgGDwBmBS8AdQS/AHUDiQBpBIAAbgfcAGoGOQBpB8wAcwmgAG8FbABtBEwAeAfcAGsHVQBKB1UASgZ9ADID0wB4CaAAbwZDAGgGOQBpB1UASgSAAG4HzABzBWwAbQN4AGoHlABkBMoATgeUAGQDjQB/BfIAeAOGAGoDuwBbA3gAagUiAGwEggBqBCwAagYzAG0ELABqBSIAbAN4AGoDeABqB5QAZAYzAG4EggBqBnkARgZ5AEYGwwB2BawAdgWKAHYI1AB2BnkAaQpwAHYGLwB2CNQAdgZ5AEYKcAB2BnkAaQWKAHYGLwB2A30AdAbOAHQFjwB0Bs4AdAZ7AHQDfQB0BzwAdAUNAHQDfQB0BnwAdAUmAHQETQB0B4gAdARNAHQGfAB0A30AdAN9AHQGzgB0B4gAdAZ7AHQFJgB0A30AdARNAHQC3wBvB1UASgX/AEwDmQByBbQAcwR0AHAEdABvBf8ATQayAHMGEABpBL8AdQPIAG8EgABtB9wAawXuAHYHzAByCaMAUAVsAG0EdABwB9wAawdVAEoHVQBKBf8ATQOZAHIJowBQBrIAcwXuAHYHdABNBpUAYgOCAGwEhgB1BIMAawaVAGMGmABxBkUAagTxAHgDzQBnBKcAdAgEAGoGdwAuB+oAcgnPAF0FlAA7BIMAawgEAGoHdABNB3QATQaVAGMDggBsCc8AXQaYAHEGdwAuC7QAaQ6jAEAGTQCBAdYAUAG+AHcD8gA8A9L/sgRTAHQC7v+vBxIAaAGG/8UHaQBVAfT/zwPFAEsDmwB9CAwAggJd/84H3wB9Awf/0QUeAG4FP//TBUsAOwTi/8QDCQB+A57/owL0AG0DIP/CBpUAgQ0S/7wFRv/IBUMAfwS2/8gFKABsAWj/3ATUAH8Blf+3Aq0AcQQuAGIDHf+0A54AdAO2/8kMywCBBOwAeQ3gAHsElQB5BN0AWQV/AHcELgB2A+sAfgMz/1YJdABiBZb/yQm0AHgFyP/FCKIAdgSM/8wH8AB1BI3/zQYEAHkEi//OBlcAcgRq/7gD8ACLBGEAfwSwAHQGHgBuAgn/qwHVAHMB+f+nA5EAgAII/9UDvAB9BHr/agNp/5wDzwBlAZ//ugLi/4MAif/BArT/ywHJAJ8Gy/+GAYf/xAEg/18BZP/KAV3/gwPaAFYCfP9wAhT/uACs/8EBof/EAt3/vAOpAIEBkf/GA8H//gLL/YMBwf/NAaz/SwEv/7MCa/+tAroAfAPG/9AAP/+BAS//ywFZ/70DSf+7Asb/2gQuAHYErf91AJX/wQU6/+4COv/YBNwAYgVg/4oEZ/+sAWr/kgSAAIUDvv63Ac4ATQHB/+AD8P+bAhL/wgOCAIADGP7wA2EAfwHN/24B7P+yAo/9wwGQ/yECH/9bAWT/ygUn/6YElv7UA1cAgARd/8MD6P6dA8YANQI8/5kCYv/JAHb/wQH2/YUDkwCCAd3/hwHl/84BP/+eAdn/tQLRAHEBSv/QA5z/kACI/8EBvv9gAWT/ygH6/5YGLwBoAU3/zgF1/28BZP/KA0r92gFv/8YBv//NBFgAWQSj/6oDkQB6BL7/cAG8/7oDgQB+Bnj/bQBx/8ECdv++A2AAcAHB/+ACVv/NBZoAfAXYAHAEWv/gBLT/wwLV/bABrv8hANUAYQPq/zoA5/9hAI//qwMg/80E2v/7BEf/0wLC/8sDDP+wBET/pwQW/7sBLv/mAAD/dgAA/wcAAP8TAAD/dgAA/wsAAP8VDzIAdgz4/7YAAP8MAAD8gA9BAHYAAP8WAAD/FgAA/bQB9P/JAAD+5AAA/04AAP92AAD/cgexAGIEhgCfAQT/vQAA/3YAAP4ZAAD93AJJ/78Acf/BAHH/wQJE/7wEvv/ABdr/qwRd/8MBGwBhBHv/3wVk/1wAAP7oAAD+6AAA/rYAAP66AAD+8wAA/fIAAP9EAAD/UAAA/uQAAP+JAAAAxgKKAIwAAP9KAAD/SAAAAM8AAP8yAAD/GAAA/xwAAP85AAD9lgAA/4oAAP+fAooA0gAA/IAAAP92AAD/CwAA/xUAAP8WAAD/dgAA/ugAAP66AAD/UAAA/wYAAP9oAAD/OgAA/1IAAP9SBLAArQSwALwEsADABLT/PQajAEABif93Ai//cAQ8/14BNf/GAYb/xgG7/VUE0QBsAYEALQSw/zQEZf9AAEz/tQGF/6YE+wDOAWIAUQXYAGIFZv9cA7b/HwKxAHIDOwB0ASH/hQGA/7sDPABzA+gAcwSF/rcEVv65A+3/UQFo/xUEHv9pA53/nQG8/64ENf9lBTT/YwI//04BZP/KBAv+bgIR/4oE7/+4Axf/zwHn/4wExf/IAfH/lARs/8oDzwBlBKX+uAHo/4YDIf+NAaAALQDZ/3UB4/+hAGT/dQJH/3UBjgBOAxP/xwJ+/8ABLv/PA7D/zwH//6sBRf+7Acb/wAHG/WcGxAB1BPYAYwHS/54Bmf+0AbD9ZwGd/8AGggBjBL0AYwJI/3ABYv/HAbf/xgIe/3ABNP/HAYb/xgHWAAcB1gBQAqn/9QKoACICUQBEAp7/bgHWAFAB1v5wAdb+7AI6//oD8gA8A/IAPAPyADwD8gA8A/IAPAPyADwD8gA8A9L/sgPS/7ID0v+yA9L/sgPS/7ID0v+yA9L/sgLu/68C7v+vAu7/rwLu/68C7v+vAu7/rwLu/68HEgBoBxIAaAcSAGgHEgBoBxIAaAcSAGgHEgBoBxIAaAcSAGgHEgBoBxIAaAcSAGgHEgBoBxIAaAcSAGgHEgBoBxIAaAcSAGgHEgBoAYb/xQGG/8UBhv/FAYb/xQGG/zIBhv/FAYb/YQGG/8UBhv/FAYb/xQGG/7wBhv/FAYb/xQGG/8UBhv+TAYb/kwGG/8UBhv/BAYb/xQGG/8UBhv/FAYb/xQGG/74Bhv/FAYb/sgGG/8UBhv+yAYb/xQGG/8UBhv++AYb/kwGG/8UBhv/BAYb/xQGG/7IBhv/FAYb/xQGG/8UBhv/FAYb/xQGG/8UB9P/PAfT/zwH0/88B9P/PAfT/WgH0/88B9P+sAfT/zwH0/88B9P/PAfT/zwH0/88B9P/PAfT/zwH0/88B9P/PAfT/zwH0/88B9P/PAfT/zwH0/88B9P/PAfT/zwH0/88B9P/PAfT/zwH0/88B9P/PAfT/zwH0/88B9P/PAfT/zwH0/88B9P/PAfT/zwH0/88B9P/PAfT/zwH0/88B9P/PAfT/zwPFAEsDxQBLA8UASwPFAEsDxQBLA8UASwPFAEsDxQBLA8UASwPFAEsDxQBLA8UASwPFAEsDxQBLCAwAgggMAIIIDACCCAwAgggMAIIIDACCCAwAgggMAIIIDACCAl3/zgJd/84CXf/OAl3/zgJd/84CXf/OAl3/zgJd/84CXf/OAl3/zgJd/84CXf/OAl3/zgMH/9EDB//RAwf/0QMH/9EDB//RAwf/0QMH/9EDB//RAwf/0QMH/9EDB//RAwf/0QMH/9EFHgBuBR4AbgUeAG4FHgBuBR4AbgUeAG4FHgBuBR4AbgUeAG4FHgBuBR4AbgUeAG4FHgBuBR4AbgUeAG4FHgBuBR4AbgU//9MFP//TBT//0wU//9MFP//TBT//0wU//9MFP//TBT//0wU//9MFP//TBT//0wU//9MFP//TBT//0wU//9MFP//TBOL/xATi/8QE4v/EBOL/xATi/8QE4v/EBOL/xATi/8QE4v/EBOL/xATi/8QE4v/EBOL/xATi/8QE4v/EBOL/xATi/8QDCQB+A0QAkgNEAJIDCQB+AwkAKQOe/6MDnv+jAyD/wgOw/88JDwB9CQ8AfQaVAIEJDwB9BpUAgQkPAH0JDwB9CQ8AfQaVAIEGlQCBBpUAgQaVAIEJDwB9CQ8AfQkPAH0JDwB9CQ8AfQkPAH0FRv/IBUb/yAVG/8gFRv/IBUb/yAVG/8gFRv/IBUb/yAVG/8gFRv/IBUb/yAVG/8gFRv/IBUb/yAVG/3kFRv/IBUb/yAVG/2gEtv/IBLb/yAS2/8gEtv/IBLb/yAS2/8gEtv/IBLb/yAS2/8gEtv/IBLb/yAS2/8gEtv/IBLb/yAS2/3kEtv/IBLb/yAS2/2gFKABsBSgAbAUoAGwFKABsBSgAbAUoAGwBaP+UAWj/WgFo/9wBaP/ZAWj/xgFo/34Blf+3AZX/jAGV/7cBlf+3AZX/twGV/64ELgBiBC4AYgQuAGIDHf+0Ax3/tAMd/7QDtv/JA7b/yQO2/8kE7AB5BOwAeQTsAHkE7AB5BOwAeQTsAHkE7AB5BOwAeQTsAHkE3QBZBN0AWQTdAFkE3QBZAr//UgK//1ICv/9SAr//UgK//1ICv/9SAr//UgK//1ICv/9SAr//UgK//1ICv/9SAr//UgK//1ICv/9SAr//Ugl0AGIJdABiCXQAYgl0AGIJdABiBZb/yQWW/8kFlv/JBZb/yQWW/8kFyP/FBcj/xQXI/8UFyP/FBcj/xQiiAHYIogB2CKIAdgiiAHYIogB2CKIAdgiiAHYIogB2CKIAdgiiAHYIogB2BIz/zASM/8wEjP/MBIz/zASM/8wEjP/MBIz/zASM/8wEjP/MBIz/zASM/8wEjf/NBI3/zQSN/80Ejf/NBI3/zQSN/80Ejf/NBI3/zQSN/80Ejf/NBI3/zQYEAHkGBAB5BgQAeQSL/84Ei//OBIv/zgRq/7gEav+4BGr/uALE/18CxP9fAsT/XwLE/18CxP9fAsT/XwLE/18CxP9fAsT/XwLE/18DjP/xAsT/XwLE/18CxP9fAsT/XwSwAHQEsAB0BLAAdASwAHQEsAB0BLAAdASwAHQEsAB0BLAAdASwAHQEsP+NBLAAdASwAFcEsAB0BLAAdASwAHQCCf+rAgn/qwIJ/6sCCf+rAgn/qwIJ/6sB1QBzAWr/pwFq/6cCU/+nAfb/pwFq/14CLP+nAlb/pgJT/6cCU/+nAWr/pwJS/6cBav+nAaf/pwFq/6cCiP+nAnz/pwFq/6cCeP+nAWr/pwFq/6cBav+nAfb/pwJ0/6cB9v+nAnv/pwFq/6cCfP+nAxr/pwJn/6cCdP+nAoj/pwHe/6cB+v+nAWr/pwJ8/6cB4f+nAWr/pwFq/6cBav+nAWr/pwHT/6cCZf9UAmX/VAJl/1QCZf9UAmX/VAJl/1QCZf9UAmX/VAJl/1QCZf9UAmX/VAJl/1QCZf9UAmX/VAJl/1QCZf9UAgj/1QII/9UCCP/VAgj/1QII/9UCCP/VApD/UQKQ/1ECkP9RApD/UQKQ/1ECkP9RApD/UQKQ/1ECkP9RApD/UQNY//MCkP9RApD/UQKQ/1ECkP9RBHr/agR6/2oEev9qBHr/agR6/2oEev9qA2n/nANp/5wDaf+cA2n/nANp/5wDaf+cA2n/nANp/5wDaf+cA2n/nANp/5wDaf+cA2n/nAPPAGUDzwBlA88AZQPPAGUDzwBlA88AZQPPAGUDzwBlA88AZQPPAGUDz/+WA88AZQPPABsDzwBlA88AZQPPAGUBn/9NAZ//EwGf/7oBn/+6AZ//fwGf/z0C4v+DAuL/gwLi/4MC4v+DAuL/gwLi/4MAif/BAIn/wQCJ/3EAif/BAIn/ggCJ/8EAif/BAIn/dgCJ/8EAif/BAIn/wQCJ/8EAif/BAIn/wQCJ/8EAif+OAIn/wQK0/8sCtP/LArT/ywK0/8sCtP/LArT/ywK0/8sCtP/LArT/ywK0/8sCtP/LArT/ywK0/8sCtP/LArT/ywK0/8sCtP/LArT/ywK0/8sCtP/LArT/ywK0/8sCtP/LArT/ywK0/8sCtP/LArT/ywK0/8sCtP/LArT/ywK0/8sCtP/LArT/ywK0/8sCtP/LArT/ywK0/8sCtP/LArT/ywK0/8sCtP/LAckAnwbL/4YGy/+GBsv/hgbL/4YGy/+GAYf/xAGH/4wBh//EAYf/xAGH/8QBh//EASD/XwEg/18BIP9LASD/XwEg/1cBIP9VASD+wwEg/1UBIP9fASD/XwEg/x4BIP9fASD/XwEg/18BIP6RASD++QEg/18BIP8nASD/XwEg/18BIP9fASD/XwEg/yQBIP9fASD/GAEg/18BIP8YASD/XwEg/18BIP8kASD+kQEg/18BIP8jASD/XwEg/xgBIP9fASD/XwEg/18BIP9fASD/XwEg/18BZP/KAV3/gwFd/yQBXf8pAV3/gwFd/mkBXf+DAV3/TQFd/ykBXf8pAV3/OAFd/3sBXf+DAV3/gwFd/ykBXf9/AV3/gwFd/3gBXf+DAV3/OAFd/4MBXf+DAV3/gwFd/4MBXf+DAV3/MwFd/zMBXf+DAV3/gwFd/ykBXf+DAV3/fwFd/4MBXf+DAV3/gwFd/4MBXf8pAV3/OAFd/4MBXf+DAV3/KQFd/ykD2gBWA9oAVgPaAFYD2gBWA9oAVgPaAFYD2gBWA9oAVgPaAFYD2gBWA9oAVgPaAFYD2gBWA9oAVgJ8/3ACfP9wAnz/cAJ8/3ACfP9wAnz/cAJ8/w0CfP9wAnz/cAJ8/3ACfP9oAnz/cAJ8/3ACfP9wAnz/PwJ8/0MCfP9wAnz/cAJ8/3ACfP9wAnz/cAJ8/3ACfP9uAnz/cAJ8/2ICfP9wAnz/YgJ8/3ACfP9wAnz/bgJ8/z8CfP9wAnz/bQJ8/3ACfP9iAnz/cAJ8/3ACfP9wAnz/cAJ8/3ACfP9wAhT/uACs/8EArP/BAKz/wQCs/8EArP/BAKz/wQCs/8EArP/BAKz/wQCs/8EArP/BAKz/wQCs/8EArP/BAKz/wQCs/5oArP/BAaH/xAGh/4EBof+GAaH/xAGh/sYBof/EAaH/MwGh/4YBof+GAaH/lQGh/44Bof/EAaH/xAGh/4YBof9lAaH/SwGh/7sBof95AaH/lQGh/8QBof/EAaH/xAGh/3YBof/EAaH/agGh/5ABof9qAaH/xAGh/4YBof92AaH/ZQGh/8QBof+TAaH/xAGh/2oBof+GAaH/lQGh/8QBof/EAaH/hgGh/4YC3f+8At3/vALd/7wC3f+8At3/vALd/7wC3f84At3/vALd/7wC3f+8At3/kwLd/7wC3f+8At3/vALd/2oC3f9VAt3/vALd/4MC3f+8At3/vALd/7wC3f+8At3/gALd/7wC3f90At3/vALd/3QC3f+8At3/vALd/4AC3f9qAt3/vALd/5gC3f+8At3/dALd/7wC3f+8At3/vALd/7wC3f+8At3/vAOpAIEDqQCBA6kAgQOpAIEDqQCBA6kAgQOpAIEDqQCBA6kAgQOpAIEDqf+AA6kAgQOpAFMDqQCBA6kAgQOpAIEBkf9yAZH/OAGR/8YBkf/GAZH/pAGR/0kDwf/+A8H//gPB//4Dwf/+A8H//gPB//4Dwf/+A8H//gPB//4Dwf/+A8H/wAPB//4Dwf/+A8H//gPB//4Dwf/+Asv9gwLL/YMCy/2DAsv9gwLL/YMCy/2DAsv9gwLL/YMCy/2DAsv9gwLL/YMCy/2DAsv9gwLL/YMCy/2DAsv9gwLL/YMCy/2DAcH/zQHB/8cBwf9sAcH/qAHB/wwBwf+UAcH+5AHB/5QBwf+aAcH/zQHB/6MBwf/NAcH/zQHB/8wBwf+YAcH/iQHB/80Bwf+3AcH/zQHB/80Bwf/NAcH/gAHB/7QBwf+oAcH/qAHB/80Bwf+oAcH/zQHB/6ABwf+0AcH/mAHB/6gBwf9EAcH/zQHB/6gBwf+oAcH/zQHB/80Bwf/NAcH/zAHB/6gBrP7XAaz+nQGs/0sBrP9LAaz/CQGs/rMBL/+zAmv/rQJr/60Ca/+tAmv/rQJr/60Ca/+tAroAfAK6AHwDCv+8Awn/6QK6/+4Cuv87AroAfAK6/0ECugAbArr/nwPG/9ADxv9yA8b/0APG/9ADxv/QA8b/wQA//4EAP/+BAD//gQA//4EAP/+BAD//gQA//4EAP/+BAD//gQA//4EAP/+BAD//gQA//4EAP/+BAD//gQA//4EAP/+BAS//ywFZ/7YBWf+9AVn/vQFZ/70BWf8eAVn/vQFZ/6wBWf+9AVn/vQFZ/70BWf+9AVn/vQFZ/70BWf+9AVn/vQFZ/70BWf+MAVn/vQFZ/70BWf+9AVn/vQFZ/70BWf+9AVn/vQFZ/70BWf+9AVn/vQFZ/70BWf+9AVn/vQFZ/70BWf+9AVn/vQFZ/70BWf+9AVn/vQFZ/70BWf+9AVn/vQFZ/70BWf+9A0n/uwNJ/7sDSf+7A0n/uwNJ/7sDSf+7A0n/uwLG/9oCxv/aAsb/2gPKABIDygASA8oAEgPKABIDygASA8oAEgPKABIDygASA8oAEgPKABIDygASA8oAEgPKABIDygASA8oAEgPKABIErf91BK3/dQSt/3UErf9nBK3/dQSt/3MErf91BK3/dQSt/3UErf9zBK3/dQSt/0gErf91AJX/wQCV/8EAlf/BAJX/wQCV/8EAlf/BAJX/wQCV/8EAlf/BAJX/wQCV/8EAlf/BAJX/wQCV/8EAlf/BAJX/wQCV/8EFOv/uBTr/7gU6/+4FOv/uBTr/7gU6/+4FOv/uBTr/7gU6/+4FOv/uBTr/7gU6/+4FOv/uBTr/7gU6/+4FOv/uBTr/7gI6/9gCOv/YAjr/2AI6/9gCOv/YAjr/2ATcAGIE3ABiBNwAYgTcAGIFYP+KBWD/igVg/4oFYP+KBWD/igVg/4oFYP+KBWD/igVg/4oFYP+KBWD/igRn/6wBff+SASv/kgIn/5IBzf+SASz/HwIE/5ICLv9+AhP/kgIT/5IBLP+SAir/kgFU/5IBuP+SASv/kgJg/5ICNP+SAXv/kgIx/5IBLP+SAXz/kgF7/5IBzf+SAiz/kgHN/5ICNf+SASv/kgI0/5IC8v+SAif/kgIs/5ICYP+SAb3/kgHS/5IBVP+SAjT/kgGi/5IBLP+SAXz/kgFU/5IBK/+SAZT/kgSAAIUEgACFBIAAhQSAAIUEgACFBIAAhQSAAIUEgACFBIAAhQO+/nIDvv63A77+cgO+/rcDvv63A77+twO+/rcDvv63A77+twO+/rcDvv5+A77+twO+/rcDvv63A77+fgO+/n4Dvv63A77+cgHOAE0Bwf/gAcH/4AHB/7IBwf/gAcH/fgHB/7wBwf8qAcH/vAHB/+ABwf/gAcH/hQHB/+ABwf/gAcH/4AHB/1wBwf9gAcH/4AHB/44Bwf/gAcH/4AHB/+ABwf/GAcH/iwHB/+ABwf9/AcH/4AHB/38Bwf/gAcH/yAHB/4sBwf9cAcH/4AHB/4oBwf/gAcH/fwHB/+ABwf/gAcH/4AHB/+ABwf/gAcH/4APw/5sD8P+bA/D/mwPw/5sD8P+bA/D/mwPw/5sD8P+bA/D/mwPw/5sD8P+bAhL/wgIS/8ICEv/CAhL/wgIS/7MCEv/CAhL/wgIS/8ICEv/CAhL/wgIS/8ICEv/CAhL/wgIS/8ICEv/CAhL/wgIS/8ICEv/CAhL/wgIS/8ICEv/CAhL/wgIS/8ICEv/CAhL/wgIS/8ICEv/CAhL/wgIS/8ICEv/CAhL/wgIS/8ICEv/CAhL/wgIS/8ICEv/CAhL/wgIS/8ICEv/CAhL/wgIS/8ICVv9UAlb/VAJW/1QCVv9UAlb/VAJW/1QCVv9UAlb/VAJW/1QCVv9UAlb/VAJW/1QCVv9UAlb/VAJW/1QCVv9UAxj+NgMY/vADGP42Axj+8AMY/vADGP7wAxj+8AMY/vADGP7wAxj+pAMY/kIDGP7wAxj+8AMY/vADGP5CAxj+QgMY/qQDGP42AjX+5AI1/1MCNf9TAjX/UwI1/1MCNf9TAjX/UwI1/1MCNf9TAjX/UwI1/1MCNf9TAjX/UwI1/1MCNf9TAjX/UwHN/v4Bzf7EAc3/bgHN/24Bzf8wAc3+vQHs/7IB7P+yAo/9wwGQ/yEBkP8hAZD/IQGQ/yEBkP8hAZD/IQGQ/yEBkP8hAZD/IQGQ/yEBkP8hAZD/IQGQ/yEBkP8hAZD/IQGQ/wIBkP8hAh//WwIf/1sCH/9bAh//WwIf/1sCH/9bAh//NgIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sBZP/KBSf/pgUn/6YFJ/+mBSf/pgUn/6YFJ/+mBSf/pgUn/6YFJ/+mBSf/pgUn/6YElv5ABJb+1ASW/kAElv7UBJb+1ASW/tQElv7UBJb+1ASW/tQElv6uBJb+TASW/tQElv7UBJb+1ASW/kwElv5MBJb+rgSW/kACK/7kAiv/VAIr/1QCK/9UAiv/VAIr/1QCK/9UAiv/VAIr/1QCK/9UAiv/VAIr/1QCK/9UAiv/VAIr/1QCK/9UBF3/wwRd/8MEXf/DBF3/wwRd/8MEXf/DBF3/wwPo/oED6P6dA+j+gQPo/p0D6P6dA+j+nQPo/p0D6P6dA+j+nQPo/p0D6P6NA+j+nQPo/p0D6P6dA+j+jQPo/o0D6P6dA+j+gQPGADUDxgA1A8YANQPGADUDxgA1A8YANQPGADUDxgA1A8YANQPGADUDxv9qA8YANQPGADUDxgA1A8YANQPGADUCPP8eAjz+5AI8/5kCPP+ZAjz/UAI8/wYCYv/JAHb/wQB2/8EAdv/BAHb/wQB2/8EAdv/BAHb/wQB2/8EAdv/BAHb/wQB2/8EAdv/BAHb/wQB2/8EAdv/BAHb/wQB2/8EB9v2FAfb9hQH2/YUB9v2FAfb9hQH2/YUDk//qA5MAggP1/7kD9P/mA5P/7AOT/z8DkwCCA5P/CQOT/s8Dk/+WAd3++QHd/r8B3f+HAd3/hwHd/ysB3f+HAeX/zgHl/84B5f/OAUr/sQFK/9ABSv/QAUr/0AFK/xgBSv/QAUr/dQFK/9ABSv/QAUr/0AFK/9ABSv/QAUr/0AFK/9ABSv+nAUr/tQFK/4cBSv/QAUr/0AFK/9ABSv/QAUr/0AFK/9ABSv/QAUr/0AFK/9ABSv/QAUr/0AFK/9ABSv/QAUr/pwFK/9ABSv/QAUr/0AFK/9ABSv/QAUr/0AFK/9ABSv/QAUr/0AFK/9ADnP+QA5z/kAOc/5ADnP+QA5z/kAOc/5ADnP+QA5z/kAOc/5ADnP+QA5z/kAOc/5ADnP+QA5z/kAOc/5ADnP+QA5z/kAOc/5ADnP+QA5z/kAOc/5ADnP+QA5z/kAOc/5ADnP+QA5z/kAOc/5ADnP+QA5z/kAOc/5ADnP+QA5z/kAOc/5ADnP+QA5z/kAOc/5ADnP+QA5z/kAOc/5ADnP+QA5z/kACI/8EAiP/BAIj/qQCI/8EAiP+vAIj/wQCI/8EAiP+jAIj/wQCI/8EAiP/BAIj/wQCI/8EAiP/BAIj/wQCI/4AAiP/BAb7/YAG+/2ABvv7SAb7/DgG+/2ABvv7cAb7+SgG+/twBvv8AAb7/YAG+/qUBvv9gAb7/YAG+/2ABvv58Ab7+gAG+/2ABvv6uAb7/YAG+/2ABvv9gAb7+5gG+/qsBvv8OAb7+nwG+/2ABvv6fAb7/CQG+/ugBvv6rAb7+fAG+/w4Bvv6qAb7/YAG+/p8Bvv8OAb7/YAG+/2ABvv9gAb7/YAG+/w4BZP/KAiP/lgJ4/5YCvf+WAjL/lgJN/zwCRv+WApD/lgJe/5YCZf+WAln/lgJs/5YB+/+WAfv/lgJe/5YCwv+WAo7/lgH7/5YCif+WAln/lgIR/5YB+/+WAjL/lgKG/5YCMv+WAo7/lgJU/5YCjv+WAzT/lgJe/5YChv+WAsL/lgIy/5YCNf+WAfv/lgKO/5YCXv+WAln/lgIR/5YB+/+WAl7/lgJe/5YGLwBoBi8AaAYvAGgGLwBoBi8AaAYvAGgGLwBoBi8AaAYvAGgGLwBoBi8AaAYvAGgGLwBoBi8AaAYvAGgGLwBoBi8AaAYvAGgGLwBoAU3/zgFN/7cBTf+8AU3/zgFN/vwBTf/OAU3/bQFN/7wBTf+8AU3/ywFN/8gBTf/OAU3/zgFN/7wBTf+fAU3/owFN/84BTf/OAU3/ywFN/84BTf/OAU3/zgFN/84BTf/OAU3/wgFN/8YBTf/CAU3/zgFN/7wBTf/OAU3/nwFN/84BTf/NAU3/zgFN/8IBTf+8AU3/ywFN/84BTf/OAU3/vAFN/7wBdf9vAXX/UgF1/voBdf82AXX+lwF1/wQBdf5yAXX/BAF1/ygBdf9mAXX+zQF1/28Bdf9vAXX/VwF1/qQBdf6oAXX/bwF1/tYBdf9mAXX/bwF1/28Bdf8OAXX+0wF1/zYBdf7HAXX/YQF1/scBdf8xAXX/EAF1/tMBdf6kAXX/NgF1/tIBdf9vAXX+xwF1/zYBdf9mAXX/bwF1/28Bdf9XAXX/NgFk/8oDSv3aA0r92gNK/doDSv3aA0r92gNK/doDSv3aA0r92gNK/doDSv3aA0r92gNK/doDSv3aA0r92gNK/doDSv3aA0r92gNK/doBb//GAW//xgFv/2wBb/+oAW//FgFv/5QBb/7kAW//lAFv/5oBb//GAW//owFv/8YBb//GAW//xgFv/5gBb/+JAW//xgFv/7cBb//GAW//xgFv/8YBb/+AAW//tAFv/6gBb/+oAW//xgFv/6gBb//GAW//oAFv/7QBb/+YAW//qAFv/0QBb//GAW//qAFv/6gBb//GAW//xgFv/8YBb//GAW//qAG//80Bv/+lAb//qgG//80Bv/7qAb//zQG//1sBv/+qAb//qgG//7kBv/+2Ab//zQG//80Bv/+qAb//jQG//5EBv//HAb//vwG//7kBv//NAb//zQG//80Bv/+8Ab//zQG//7ABv/+0Ab//sAG//80Bv/+qAb//vAG//40Bv//NAb//uwG//80Bv/+wAb//qgG//7kBv//NAb//zQG//6oBv/+qBFgAWQRYAFkEWABZBFgAWQRYAFkEWABZBFgAWQRYAFkEWABZBKP/qgSj/6oEo/+qBKP/qgSj/6oEo/+qBKP/qgSj/6oEo/+qBKP/qgSj/6oEo/+qBKP/qgSj/6oEo/+qBKP/qgSj/6oCZf9OAmX/TgJl/04CZf9OAmX/TgJl/04CZf9OAmX/TgJl/04CZf9OAmX/TgJl/04CZf9OAmX/TgJl/04CZf9OBL7/cAS+/3ABvP+6Abz/lAG8/7oBvP+6Abz/ugG8/7oCWP9SAlj/UgJY/1ICWP9SAlj/UgJY/1ICWP9SAlj/UgJY/1ICWP9SAlj/UgJY/1ICWP9SAlj/UgJY/1ICWP9SBnj/bQZ4/20GeP9tBnj/bQZ4/20Acf/BAHH/wQBx/8EAcf/BAHH/wQBx/8EAcf/BAHH/wQBx/8EAcf/BAHH/wQBx/8EAcf/BAHH/wQBx/8EAcf+YAHH/wQJ2/74Cdv++Anb/vgJ2/74Cdv++Anb/vgJ2/3oCdv++Anb/vgJ2/74Cdv++Anb/vgJ2/74Cdv++Anb/rAJ2/7sCdv++Anb/vgJ2/74Cdv++Anb/vgJ2/74Cdv++Anb/vgJ2/74Cdv++Anb/vgJ2/74Cdv++Anb/vgJ2/6wCdv++Anb/vgJ2/74Cdv++Anb/vgJ2/74Cdv++Anb/vgJ2/74Cdv++A2AAcANgAHADYABwA2AAcANgAHADYABwA2AAcANgAHADYABwA2AAcANg/6kDYABwA2AAcANgAHADYABwA2AAcAHB/+ABwf/gAcH/sgHB/+ABwf9+AcH/vAHB/yoBwf+8AcH/4AHB/+ABwf+FAcH/4AHB/+ABwf/gAcH/XAHB/2ABwf/gAcH/jgHB/+ABwf/gAcH/4AHB/8YBwf+LAcH/4AHB/38Bwf/gAcH/fwHB/+ABwf/IAcH/iwHB/1wBwf/gAcH/vAHB/+ABwf9/AcH/4AHB/+ABwf/gAcH/4AHB/+ABwf/gAlb/zQJW/80CVv/NAlb/zQJW/80CVv/NAlb/sQJW/8kCVv/NAlb/zQJW/80Ebv9QBG7/UARu/1AEbv9QBG7/UARu/1AEbv9QBG7/UARu/1AEbv9QBG7/UARu/1AEbv9QBG7/UARu/1AEbv9QBdgAcAXYAHAF2ABwBdgAcAXYAHAF2ABwBdgAcAXYAHAF2ABwBdgAcAXY/6kF2ABwBdgAcAXYAHAF2ABwBdgAcARa/+AEWv/gBFr/4ARa/+AEWv/gBFr/4ARa/+AEWv/gBFr/4ARa/+AEWv/gBFr/4ARa/+AEWv/gBFr/4ARa/+AEWv/gBFr/4ARa/+AEWv/gBFr/4ARa/+AEWv/gBFr/4ARa/+AEWv/gBFr/4ARa/+AEWv/gBFr/4ARa/+AEWv/gBFr/4ARa/+AEWv/gBFr/4ARa/+AEWv/gBFr/4ARa/+AEWv/gBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sAGu/yEBrv8hAa7+wwGu/yEBrv7UAa7/IQGu/wQBrv7IAa7/IQGu/yEBrv8hAa7/IQGu/yEBrv8hAa7/IQGu/poBrv8hANUAYQDVAGEA1QBUANUAYQDVAGEA1QBhANUAYQDVAFkA1QBhANUAYQDVAGEA1QBhANUAYQDVAGEA1QBhANUAKwDVAGED6v86A+r/OgPq/zoD6v86A+r/OgPq/zoDIP/NAyD/zQMg/80DIP/NAyD/zQMg/80DIP/NBNr/+wTa//sE2v/7BNr/+wTa//sE2v/7BNr/+wTa//sE2v/7BNr/+wTa//sE2v/7BNr/+wTa//sE2v/7BNr/+wTa//sER//TBEf/0wRH/9MER//TBEf/0wRH/9MER//TBEf/0wRH/9MER//TBEf/0wRH/9MER//TBEf/0wRH/9MER//TBEf/0wLC/8sCwv/LAsL/ywLC/8sCwv/LAsL/ywLC/60Cwv/FAsL/ywLC/8sCwv/LAwz/sAMM/7ADDP+wAwz/sAMM/7ADDP+wAwz/sAMM/7ADDP+wAwz/sAMM/7AERP+nBET/pwRE/6cERP+nBET/pwQW/7sEFv+7BBb/uwQW/7sEFv+7Ahn/5gKf/+YChf+ZAYP/1QJ0/2QByf/VAcD/EQKF/9UChf/HAoH/5gHv/54BL//mAef/5gKF/+YB8v9DAf//fwHs/+YB+/+tAoH/5gIG/+YB3v/mAWH/rQH3/6oBYf/VAnv/ngJ7/+YB//+eArf/5gKF/+EB9/+qAfL/QwHe/9UBZf9xAS//5gH//54Chf/VAoH/5gIG/+YBL//mAoX/5gKF/9UB9P/JAfT/yQH0/8kB9P/JAfT/YAH0/8kB9P91AfT/yQH0/8kB9P/JAfT/yQH0/8kB9P/JAfT/yQH0/6cB9P+rAfT/yQH0/8kB9P/JAfT/yQH0/8kB9P/JAfT/yQH0/8kB9P/JAfT/yQH0/8kB9P/JAfT/yQH0/8kB9P+nAfT/yQH0/8kB9P/JAfT/yQH0/8kB9P/JAfT/yQH0/8kB9P/JAfT/yQexAGIHsQBiB7EAYgexAGIHsQBiB7EAYgexAGIHsQBiB7EAYgexAGIHsQBiBIYAnwKA/78CqP+/Aqj/vwKA/78DGv+/Akf/vwJM/50CqP+/Aqj/vwKo/78CSf+/Akn/vwJJ/78CqP+/AoD/vwKA/78CSf+/AoD/vwKo/78CSf+/Akn/vwJJ/78CgP+/Akn/vwKo/78CqP+/AoD/vwMR/78CqP+/AoD/vwKA/78CSf+/Akn/vwJG/78CgP+/Aqj/vwKo/78CSf+/Akn/vwKo/78CqP+/AHH/wQBx/8EAcf9fAHH/wQBx/2UAcf/BAHH/oABx/1kAcf/BAHH/wQBx/8EAcf/BAHH/wQBx/8EAcf/BAHH/NgBx/8EAcf/BAHH/wQBx/0kAcf/BAHH/WgBx/8EAcf+oAHH/TgBx/8EAcf/BAHH/wQBx/8EAcf/BAHH/wQBx/8EAcf8+AHH/wQJE/7wEvv/ABL7/wAXa/6sF2v+rBdr/qwXa/6sF2v+rBdr/qwXa/6sF2v+rBdr/qwXa/6sF2v+rBdr/qwXa/6sF2v+rBdr/qwXa/6sF2v+rBF3/wwRd/8MEXf/DBF3/wwRd/8MEXf/DBF3/wwEbAGEBGwBhARsAYQEbAGEBGwBhARsAYQEbAGEBGwBhARsAYQEbAGEBGwBhARsAYQEbAGEBGwBhARsAYQEbAGEBGwBhBHv/3wVk/ugFZP35BWT+6AVk/fQFZP9cBWT/XAVk/eYFZP3qBWT/XAVk/1YFZP70BWT9+QVk/1wFZP9cBWT+9AVk/vQFZP9WBWT+6AS0/ykEtP89BLT/KQS0/z0EtP89BLT/PQS0/z0EtP89BLT/PQS0/z0EtP81BLT/PQS0/z0EtP89BLT/NQS0/zUEtP89BLT/KQajAEAGowBABqMAQAajAEAGowBABqMAQAajAEAGowBABqMAQAajAEAGowBABqMAQAajAEAGowBABqMAQAajAEAGowBABqMAQAGJ/3cBif93AYn/dwGJ/3cBif93AYn/dwIv/1ACL/8WAi//cAIv/3ACL/9wAi//cAQ8/0cEPP9eBDz/RwQ8/14EPP9eBDz/XgQ8/14EPP9eBDz/XgQ8/14EPP9TBDz/XgQ8/14EPP9eBDz/UwQ8/1MEPP9eBDz/RwE1/08BNf8VATX/xgE1/8YBNf+BATX/JwGG/8IBhv+IAYb/xgGG/8YBhv/GAYb/lwG7/VUBu/1VAbv9VQG7/VUBu/1VAbv9VQTRAGwE0QBsBNEAbATRAGwE0QBsBNEAbAGBAC0BgQAtAlP/9AJTACICGAAjAkn/bgGBAC0Bgf5wAYH/UAH5//oEsP8UBLD/NASw/xQEsP80BLD/NASw/zQEsP80BLD/NASw/zQEsP80BLD/IASw/zQEsP80BLD/NASw/yAEsP8gBLD/NASw/xQEZf8UBGX/QARl/xQEZf9ABGX/QARl/0AEZf9ABGX/QARl/0AEZf9ABGX/IARl/0AEZf9ABGX/QARl/yAEZf8gBGX/QARl/xQATP+1AYX/pgGF/4IBhf+mAYX/pgGF/6YBhf+FBPsAzgT7AM4E+wDOBPsAzgT7AM4E+wDOAWIAEQFiAFECJv/1AiUAIgIeAEMCLv9oAWIAUQFi/moBYv72AdT/+gVm/uoFZv9cBWb+6gVm/1wFZv9cBWb/XAVm/1wFZv9cBWb/XAVm/1gFZv72BWb/XAVm/1wFZv9cBWb+9gVm/vYFZv9YBWb+6gO2/okDtv8fA7b+iQO2/x8Dtv8fA7b/HwO2/x8Dtv8fA7b/HwO2/vcDtv6VA7b/HwO2/x8Dtv8fA7b+lQO2/pUDtv73A7b+iQKxAHICsQCvArEAdAKxAHICsf+xAzsAdAM7AHQDOwB0AzsADAM7AHQDOwB0AzsAdAM7AAwDOwB0AzsADAM7AHQDOwB0AzsAdAM7AHQBIf75ASH+vwEh/4UBIf+FASH/KwEh/wUBgP89AYD/AwGA/7sBgP+7AYD/bwGA/xoDPABzAzwAkgM8AGUDPABzAzz/rgPoAHMD6ABzA+gAcwPoAHMD6ABzA+gAcwPoAHMD6ABzA+gAcwPoAHMD6ABzA+gAcwPoAHMD6ABzBIX+KwSF/rcEhf4rBIX+twSF/rcEhf63BIX+twSF/rcEhf63BIX+mQSF/jcEhf63BIX+twSF/rcEhf43BIX+NwSF/pkEhf4rBFb+SARW/rkEVv5IBFb+uQRW/rkEVv65BFb+uQRW/rkEVv65BFb+tgRW/lQEVv65BFb+uQRW/rkEVv5UBFb+VARW/rYEVv5IA+3/UQPt/1ED7f9RA+3/UQPt/1ED7f9RA+3/UQFo/xUBaP8VAWj/FQFo/wwBaP8VAWj/FQFo/xUBaP8VAWj/FQFo/xUBaP8VAWj+7QFo/xUEHv9pBB7/aQQe/2kEHv9pBB7/aQQe/2kEHv9pBB7/aQQe/2kEHv9pBB7/aQQe/2kEHv9pBB7/aQQe/2kEHv9pBB7/aQOd/50Dnf+dAbz/rgQ1/2UENf9lBDX/ZQQ1/2UENf9lBDX/ZQQ1/2UENf9lBDX/ZQQ1/2UENf9lBTT/YwU0/2MFNP9jBTT/YwU0/2MCP/9OAWT/ygQL/hYEC/5uBAv+FgQL/m4EC/5uBAv+bgQL/m4EC/5uBAv+bgQL/m4EC/4iBAv+bgQL/m4EC/5uBAv90gQL/iIEC/5uBAv9xgIR/4oCEf+KAhH/igIR/4oCEf+KAhH/igIR/y0CEf+KAhH/igIR/4oCEf+IAhH/igIR/4oCEf+KAhH/XwIR/zwCEf+KAhH/agIR/4oCEf+KAhH/igIR/4oCEf9nAhH/igIR/1sCEf+KAhH/WwIR/4oCEf+KAhH/ZwIR/18CEf+KAhH/igIR/4oCEf9bAhH/igIR/4oCEf+KAhH/igIR/4oCEf+KBO//uATv/7gE7/+4BO//uATv/7gE7/+4BO//uATv/7gE7/+4BO//uATv/7gE7/+4BO//uATv/7gE7/+4BO//uATv/7gDF//PAxf/zwMX/88B5/+MAef/jAHn/4wB5/8GAef/dQHn/xIB5/+MAef/jAHn/3UB5/8SAef/jAHn/ucB5/91BMX/yATF/8gExf/IBMX/yATF/8gExf/IBMX/yAHx/zcB8f79AfH/lAHx/5QB8f9pAfH/FwRs/8oEbP/KA88AZQPPAGUDzwBlA88AZQPPAGUDzwBlA88AZQPPAGUDzwBlA88AZQPP/5YDzwBlA88AGwPPAGUDzwBlA88AZQSl/hAEpf64BKX+EASl/rgEpf64BKX+uASl/rgEpf64BKX+uASl/n4Epf4cBKX+uASl/rgEpf64BKX+HASl/hwEpf5+BKX+EAHo/2IB6P8oAej/hgHo/4YB6P+GAej/UwMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAaAALQDZ/3UB4/+hAeP/oQHj/6EB4/+hAeP/bgHj/6EB4/97AeP/oQHj/6EB4/+hAeP/oQHj/6EB4/+hAeP/oQHj/6EB4/+hAeP/oQHj/6EB4/+hAeP/oQHj/6EB4/+hAeP/oQHj/6EB4/+hAeP/oQHj/6EB4/+hAeP/oQHj/6EB4/+hAeP/oQHj/6EB4/+hAeP/oQHj/6EB4/+hAeP/oQHj/6EB4/+hAeP/oQBk/3UCR/91AY4AGwGOAE4CXf/1AlwAIgJdAEECVv9UAY4ATgGO/lYBjv8AAfz/+gMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAn7/wAJ+/8ACfv/AAn7/wAJ+/5sCfv/AAn7/wAJ+/8ACfv/AAn7/wAJ+/8ACfv/AAn7/wAJ+/8ACfv/AAn7/wAJ+/8ACfv/AAn7/wAJ+/8ACfv/AAn7/wAJ+/8ACfv/AAn7/wAJ+/8ACfv/AAn7/wAJ+/8ACfv/AAn7/wAJ+/8ACfv/AAn7/wAJ+/8ACfv/AAn7/wAJ+/8ACfv/AAn7/wAJ+/8ABLv/PAS7/zwOw/88DsP/PAf//qwH//6sB//+rAf//qwH//6sB//+rAUX/jwFF/1UBRf+7AUX/tgFF/7sBRf+AAcb/wAHG/5ABxv/AAcb/wAHG/8ABxv+3Acb9ZwHG/WcBxv1nAcb9ZwHG/WcBxv1nBsQAdQbEAHUGxAB1BsQAdQbEAHUGxAB1BsQAdQbEAHUGxAB1BsQAdQbEAHUGxAB1BsQAdQbEAHUGxAB1BsQAdQbEAHUGxAB1BPYAYwT2AGME9gBjBPYAYwT2AGME9gBjAZn/lAGZ/1oBmf+0AZn/tAGZ/7QBmf9xAbD9ZwGw/WcBsP1nAbD9ZwGw/WcBsP1nAZ3/wAGd/5ABnf/AAZ3/wAGd/8ABnf+rBoIAYwaCAGMGggBjBoIAYwaCAGMGggBjBoIAYwaCAGMGggBjBoIAYwaCAGMGggBjBoIAYwaCAGMGggBjBoIAYwaCAGMGggBjBL0AYwS9AGMEvQBjBL0AYwS9AGMEvQBjAkj/UAJI/xYCSP9wAkj/cAJI/3ACSP9wAWL/TwFi/xUBYv/HAWL/xwFi/4EBYv88Abf/xgG3/5IBt//GAbf/xgG3/8YBt/+SAh7/UAIe/xYCHv9wAh7/cAIe/3ACHv9wATT/TwE0/xUBNP/HATT/xwE0/4EBNP9GAYb/xgGG/5IBhv/GAYb/xgGG/8YBhv+WAOf/YQDn/2EA5/9hAOf/YQDn/2EA5/9hAOf/YQDn/2EA5/9hAOf/YQDn/2EA5/9hAOf/YQDn/2EA5/9hAOf/YQDn/2EAj/+rAI//qwCP/10Aj/+mAI//YwCP/6sAj/+eAI//VwCP/6sAj/+rAI//qwCP/6sAj/+rAI//qwCP/6sAj/80AI//qw0S/7wM+P+2D0EAdgG+AFQBvv85AYb/pwGG/7sBhv+7AYb/xQGG/8UBhv+sAYb/rAGG/7YBhv+sAYb/rAGG/6wBhv+sAYb/rAGG/7kBhv7sAYb/rQGG/7YBhv+MAYb/rAGG/8UBhv+7AYb/xQFq/6cBav+nAWr/pwFq/6cBav+nAWr/pwFq/6cBav+nAWr/pwFq/6cBav+nAWr/pwFq/6cBav+nAWr/DgFq/6cBav+nAWr/pwFq/6cBav+nAWr/pwFq/6cBXf9WAV3/agFd/2oBXf+DAV3/gwFd/1sBXf9bAV3/gwFd/1sBXf9bAV3/WwFd/1sBXf9bAV3/gwFd/psBXf9lAV3/ZQFd/3gBXf9bAV3/gwFd/2oBXf+DAnz/cAJ8/3ACfP9wAnz/cAJ8/3ACfP9wAnz/cAJ8/3ACfP9wAnz/cAJ8/3ACfP9wAnz/cAJ8/24CfP9wAnz/YgJ8/3ACfP9wAnz/cAJ8/3ACfP9wAnz/cAGh/4EBof+VAaH/lQGh/8QBof/EAaH/hgGh/4YBof/EAaH/hgGh/4YBof+GAaH/hgGh/4YBof92AaH+xgGh/2oBof+QAaH/uwGh/4YBof/EAaH/lQGh/8QBav+SAWr/kgFq/5IBav+SAWr/kgFq/5IBav+SAWr/kgFq/5IBav+SAWr/kgFq/5IBav+SAWr/kgFq/x8Bav+SAWr/kgFq/5IBav+SAWr/kgFq/5IBav+SAcH/4AHB/+ABwf/gAcH/4AHB/+ABwf/gAcH/yAHB/+ABwf+yAcH/4AHB/+ABwf/gAcH/vAHB/4sBwf9+AcH/fwHB/+ABwf/gAcH/4AHB/+ABwf/gAcH/4AIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sCH/9bAh//WwIf/1sBSv/QAUr/0AFK/9ABSv/QAUr/0AFK/9ABSv/QAUr/sAFK/9ABSv/QAUr/0AFK/9ABSv/QAUr/0AFK/xkBSv/QAUr/0AFK/4YBSv/QAUr/0AFK/9ABSv/QAfr/lgH6/5YB+v+WAfr/lgH6/5YB+v+WAfr/lgH6/5YB+v+WAfr/lgH6/5YB+v+WAfr/lgH6/5YB+v8yAfr/lgH6/5YB+v+WAfr/lgH6/5YB+v+WAfr/lgFN/7cBTf/LAU3/ywFN/84BTf/OAU3/vAFN/7wBTf/OAU3/vAFN/7wBTf+8AU3/vAFN/7wBTf/OAU3+/AFN/8IBTf/GAU3/zgFN/7wBTf/OAU3/ywFN/84Bwf/gAcH/4AHB/+ABwf/gAcH/4AHB/+ABwf/fAcH/4AHB/8kBwf/gAcH/4AHB/+ABwf/TAcH/ogHB/1IBwf+WAcH/4AHB/+ABwf/gAcH/4AHB/+ABwf/gBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwS0/8MEtP/DBLT/wwLV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bAC1f2wAtX9sALV/bABLv/mAS7/5gEu/+YBLv/mAS7/5gEu/9UBLv/hAS7/5gEu/5kBLv/HAS7/5gEu/+YBLv/VAS7/qgEu/2QBLv+eAS7/5gEu/+YBLv/VAS7/1QEu/+YBLv/mAkn/vwJJ/78CSf+/Akn/vwJJ/78CSf+/Akn/vwJJ/78CSf+/Akn/vwJJ/78CSf+/Akn/vwJJ/78CSf+XAkn/vwJJ/78CSf+/Akn/vwJJ/78CSf+/Akn/vwIR/4oCEf+KAhH/igIR/4oCEf+KAhH/igIR/4oCEf+KAhH/igIR/4oCEf+KAhH/igIR/4oCEf9nAhH/igIR/1sCEf+KAhH/igIR/4oCEf+KAhH/igIR/4oDIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAyH/jQMh/40DIf+NAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwMT/8cDE//HAxP/xwGG/8UB+f+nAV3/gwJ8/3ABof/EAWr/kgHB/+ACH/9bAUr/0AH6/5YBTf/OAdr/4AS0/8MC1f2wAS7/5gJJ/78CEf+KAyH/jQMT/8cDDP/xAwz/8QMM//EDDP/xAaoAXwJY/7oCWP+6AAD/lwJY/7oCWADAAlgAvgJYAEgCWAASAlgAbQJYAFsCWAA0AlgAIQJYACICWABWAlgAwAJYAL4CWABIAlgAEgJYAEYCWAAtAlgAFAJYACECWAAiAlgAVgJYACsCWAA0AlgANwAA/0oAAP77AAABmgJY/7oCWP+6BAgAOAVKA7kCv//dA8MAjgP7AI4D+wCOA94AjgF8/7sGTQCBArz/uwXc/7oJxP/IBIz/zASM/8wEjP/MBIz/zASM/8wEjP/MBIz/zASM/8wEjP/MBIz/zASM/8wFlv/JBZb/yQWW/8kFlv/JBZb/yQlHAHsEkgB7A2sAewXc/9MF3P/PBJIAewNrAHsEkgB7A2sAewSSAHsDawB7Bdz/0wXc/9MF3P/TBdz/0wXc/9MF3P/TBdz/0wXc/9MF3P/TBdz/0wXc/9MF3P/PBdz/zwXc/88F3P/PBdz/zwLzAHsDAgBQBlT+9QZU/k4B9P/4BlT/TgZU/YEGVP0pBlT9gQZU/SkGVP2BBlT9gQZU/YEGVP2BBlT9gQZU/YEGVP2BBlT9NQZU/YEGVP2BBlT9gQZU/O8GVP01BlT9gQZU/OMGVP71BlT+9QZU/hEGVP5NBlT+9QZU/hsGVP2JBlT+GwZU/j8GVP71BlT95AZU/vUGVP71BlT+9QZU/bsGVP2/BlT+9QZU/e0GVP71BlT+9QZU/vUGVP4lBlT96gZU/k0GVP3eBlT+9QZU/d4GVP6sBlT+JwZU/eoGVP27BlT+TQZU/ekGVP71BlT93gZU/k0GVP71BlT+9QZU/vUGVP71BlT+TQLz/8IC8//wAvMAewZU/tMGVP6ZBlT/TgZU/04GVP8FBlT+swZU/k4GVP5OBlT+TgZU/cgGVP43BlT91AZU/k4GVP5OBlT+NwZU/dQGVP5OBlT9qQZU/jcBBQB8CEP/swhD/54IQ/+1AQX/wgEF//ABBQB8CEP/tQhD/7UIQ/+1CEP/swhD/7MIQ/+zCEP/swhD/7MIQ/+zCEP/swhD/7MIQ/+zCEP/swhD/7MIQ/+zCEP/swhD/7MIQ/+zCEP/swhD/7MIQ/+eCEP/nghD/54IQ/+eCEP/nghD/54IQ/+eCEP/uAhD/7gIQ/+4CEP/sghD/7IIQ/+yCEP/sgTeADcDnv+yA57/sgQuACoELgAqAyD/wgMg/8IELgAqA4L/0AOC/9ADgv/QBgr/0AYK/9AAAP8NA4QBMgOEATADhACSA4QASgOEAMQDhACrA4QAeAOEAF4DhABgA4QApQOEATIDhAEwA4QAkgOEAEoDhACPA4QAbgOEAE0DhABeA4QAYAOEAKUDhABsA4QAeAOEAHsBcgBQAjr/bgHtAEQBcgAHAXIAUAHW//oBcv5wAXL+7AFyAFACRAAiAkX/9QAA/0QIQ/+4CEP/uAcSAGgBhv/FAfT/zwFq/6cCtP/LASD/XwFd/2wCfP9wAaH/rwLd/7wBwf/NAVn/gAFq/5IBwf/gAhL/wgIf/1sBSv97A5z/kAG+/2AB+v+WBi8AaAFN/80Bdf9oAW//xgG//7sCdv++AcH/4ARa/+AEtP/DAtX9sAEu/+YB9P/JAkn/vwIR/4oDIf+NAeP/oQMT/8cCfv/AAYb/xQFq/6cBXf9sAnz/cAGh/68Bav+SAcH/4AIf/1sBSv96Afr/lgFN/80Bwf/gBLT/wwLV/bABLv/mAkn/vwIR/4oDIf+NAxP/xwZU/vUAAP9ED4AAPAAA/1AC5QC+A0kAvQOwAFwEYwBcA1MAkAP0AJQD8gBeBDkAYAQ5AGMDgQBdAuUAvgNJAL0DsABcBGMAXAO2AFwDygA+A/sAKwQ5AGAEOQBjA4EAXQPeAEQD8gBeA9kAVQN9AEQDZv/6Ad7/wgHe/8IB3v+zAd7/uAHe/8IB3v74Ad7/wgHe/5cB3v+4Ad7/uAHe/8IB3v/BAd7/wgHe/8IB3v+4Ad7/lwHe/4kB3v/CAd7/twHe/8IB3v/CAd7/wgHe/8IB3v+0Ad7/wgHe/6gB3v/CAd7/qAHe/8IB3v+4Ad7/tAHe/5cB3v/CAd7/wgHe/8IB3v+oAd7/uAHe/8IB3v/CAd7/wgHe/7gB3v+4Ad7/swHe/8IB3v/CAd7/wgHe/8IB3v+4Ad7/uAHe/8IB3v+4Ad7/uAHe/7gB3v+4Ad7/uAHe/7QB3v74Ad7/qAHe/8IB3v/CAd7/uAHe/8IB3v/CAd7/wgVDAH8GlQCBBUMAfwaVAIEFQwB/BpUAgQVDAH8GlQCBBUMAfwaVAIEFQwB/BpUAgQVDAH8GlQCBBUMAfwaVAIEFQwB/BpUAgQVDAH8GlQCBBUMAfwaVAIEFQwB/BpUAgQmfAH0JDwB9C/wAPAz6ADwAvv+2AoAAewGkAL8BpP/oAaT/pwGk/4oBpP/GAaT+7AGk/5QBpP8CAaT/lAGk/6wBpP+7AaT/XQGkAL8BpP+4AaT/rAGk/zQBpP8lAaT/WgGk/1MBpP+7AaT/qAGk/6gBpP+eAaT/UAGk/8YBpP9EAaT/tgGk/0QBpP9dAaT/oAGk/1ABpP80AaT/qAGk/2IBpAC/AaT/RAGk/6wBpP+7AaT/qAGkAL8BpP+sAaT/rAKAAHsCgAB7AoAAewGk/04FI//CBSP/wgUj/8IFI//CBSP/wgUj/38FI//CBSP/wgUj/8IFI//CBSP/wgUj/8IFI//CBSP/wgUj/8IFI//CBSP/wgUj/8IFI//CBSP/wgUj/8IFI//CBSP/wgUj/8IFI//CBSP/wgUj/8IFI//CBSP/wgUj/8IFI//CBSP/wgUj/8IFI//CBSP/wgUj/8IFI//CBSP/wgUj/8IFI//CBSP/wgUj/8IFI//CBT//0wU//9MFP//TBT//0wU//9MFP//TBT//0wU//9MFP//TBT//0wU//9MB3v/CAd7/wgHe/8IAAAGgAAD/ZwAA/0gAAP9KAlgAAwJYAG4CWAAlAlgANgJYABwCWAAyAlgAKgJYABgCWABIAlgAMAGG/7IBhv++AfT/zwH0/88CZ/+nAmf/pwK0/8sCtP/LASD/GAEg/yQBXf8pAV3/KQJ8/2ICfP9uAaH/agGh/3YC3f90At3/gAHB/6gBwf+0AVn/vQFZ/70CJ/+SAif/kgHB/38Bwf+LAhL/wgIS/8ICH/9bAh//WwFK/9ABSv/QA5z/kAOc/5ABvv6fAb7+qwJe/5YCXv+WAU3/vAFN/7wBdf7HAXX+0wFv/6gBb/+0Ab//qgG//6oCdv++Anb/vgHB/38Bwf+LBFr/4ARa/+AEtP/DBLT/wwLV/bAC1f2wAoX/ngKF/6oB9P/JAfT/yQKo/78CqP+/AhH/WwIR/2cDIf+NAyH/jQHj/6EB4/+hAxP/xwMT/8cCfv/AAn7/wAGG/6wBhv+sAWr/pwFq/6cBXf9bAV3/WwJ8/2ICfP9uAaH/agGh/3YBav+SAWr/kgHB/38Bwf+LAh//WwIf/1sBSv/QAUr/0AH6/5YB+v+WAU3/vAFN/7wBwf9/AcH/iwS0/8MEtP/DAtX9sALV/bABLv+eAS7/qgJJ/78CSf+/AhH/WwIR/2cDIf+N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AACMTAAAjGQAAIzoAACNIAAAjWAAAI28AACOQAAAjtQAAI80AACPjAAAj/QAAJBcAACQyAAAkOgAAJE0AACRgAAAkbQAAJHEAACR1AAAkgwAAJIkAACSPAAAklQAAJJkAACSfAAAkpgAAJK4AACS0AAAkugAAJMAAACTGAAAkzgAAJNQAACTaAAAk4AAAJOYAACTsAAAk8gAAJPgAACT+AAAlBAAAJQoAACUQAAAlFgAAJRwAACUiAAAlKgAAJTAAACU2AAAlPAAAJUIAACVIAAAlTgAAJVQAACVaAAAlYAAAJWYAACVuAAAldAAAJXoAACWAAAAliAAAJY4AACWWAAAlnAAAJaIAACWoAAAlrgAAJbIAACW4AAAlwAAAJcYAACXMAAAl0gAAJdgAACXeAAAl4gAAJeYAACXuAAAl9gAAJf4AACYGAAAmDAAAJhQAACYcAAAmJAAAJiwAACY0AAAmOgAAJkAAACZGAAAmTAAAJlQAACZYAAAmXgAAJmYAACZsAAAmcAAAJngAACZ+AAAmggAAJogAACaOAAAmlQAAJpwAACajAAAmqgAAJrEAACa4AAAmvwAAJsYAACbKAAAm0AAAJtYAACbdAAAm4wAAJukAACbtAAAm9QAAJwIAACcGAAAnQAAAJ4YAACeXAAAnxQAAJ/IAACgWAAAoRQAAKO8AACkZAAApLgAAKUgAACliAAApewAAKYAAACmQAAAprgAAKcsAACnQAAAp9AAAKucAACr0AAAq+QAAKwcAACsMAAArEgAAKxgAACscAAArIAAAKyQAACsoAAArTAAAK3EAACuYAAArnAAAK6AAACukAAArrAAAK7QAACu8AAArwgAAK8gAACvOAAAr1AAAK9wAACviAAAr6gAAK/IAACv4AAAr/gAALAQAACwKAAAsEgAALBgAACweAAAsJAAALCoAACwwAAAsNgAALDwAACxCAAAsSAAALE4AACxUAAAsWgAALGAAACxoAAAscAAALHgAACx+AAAshAAALIoAACyQAAAslgAALJ4AACymAAAsrgAALLQAACy7AAAswgAALMkAACzQAAAs1wAALN4AACzlAAAs7AAALPMAACz6AAAtAQAALQcAAC0PAAAtFQAALRsAAC0wAAAtVAAALVkAAC1fAAAtZgAALW0AAC16AAAtgAAALagAAC2tAAAttAAALbkAAC3RAAAt2AAALd0AAC3iAAAuBgAALgwAAC4SAAAuHwAALisAAC4wAAAuNQAALjsAAC5DAAAuSQAALk8AAC5VAAAuWwAALmEAAC5nAAAubQAALnMAAC55AAAufwAALoUAAC6LAAAukQAALpcAAC6dAAAuowAALqkAAC6vAAAutQAALrsAAC7BAAAuxwAALs0AAC7TAAAu2QAALt8AAC7lAAAu6wAALvEAAC73AAAu/QAALwMAAC8JAAAvDwAALxUAAC8bAAAvIQAALycAAC8tAAAvMwAALzkAAC8/AAAvRQAAL0sAAC9RAAAvVwAAL1cAAC9XAAAvVwAAL1cAAC9XAAAvVwAAL1cAAC9XAAAvVwAAL1cAAC9XAAAvVwAAL14AAC9uAAAvewAAL4kAAC+YAAAvpgAAL7UAAC/EAAAv0wAAL+IAAC/0AAAv+QAAL/4AADARAAAwFwAAMB8AADAnAAAwSQAAMHQAADC4AAAwwQAAMMsAADDgAAAw4AAAMOAAADDsAAAw+AAAMQQAADEVAAAxJgAAMSYAADFtAAAxfQAAMZkAADGwAAAxygAAMeUAADHqAAAx8wAAMgQAADJAAAAyTAAAMoAAADKZAAAzHwAAM2sAADOuAAAz7wAANF4AADTIAAA0zgAANNQAADTaAAA04AAANOYAADTsAAA08gAANPgAADT+AAA1BAAANQoAADUQAAA1FgAANRwAADUiAAA1KAAANS4AADU0AAA1OgAANUAAADVGAAA1TAAANVIAADVYAAA1XgAANWQAADVqAAA1cAAANXYAADV8AAA1ggAANYgAADWOAAA1lAAANZoAADWgAAA1pgAANawAADWyAAA1uAAANb4AADXEAAA1ygAANdAAADXWAAA13AAANeIAADXoAAA17gAANfQAADX6AAA2AAAANgYAADYMAAA2EgAANhgAADYeAAA2JAAANioAADYxAAA2NwAANj4AADZCAAA2RgAANkoAADZOAAA2VAAANloAADZgAAA2ZgAANm4AADZ2AAA2fgAANoYAADaOAAA2lgAANp4AADamAAA2qgAANq4AADa0AAA2ugAANsAAADbGAAA2zAAANtIAADbWAAA22gAANt4AADbkAAA26AAANuwAADbwAAA29AAANvgAADb8AAA3BAAANw0AADcSAAA3FwAANxwAADchAAA3JgAANys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AAEcJAABHFwAARyUAAEcxAABHPwAAR0sAAEdXAABHYQAAR20AAEd3AABHgQAAR4sAAEeVAABHoQAAR60AAEe5AABHwwAAR88AAEfdAABH6QAAR/MAAEf/AABICwAASBUAAEgdAABIJwAASDEAAEg9AABISQAASFMAAEhbAABIZQAASHEAAEh9AABIiQAASJUAAEihAABIrQAASLUAAEi/AABIxwAASNMAAEjhAABI6QAASPMAAEkBAABJDgAASRgAAEkiAABJLAAASTgAAElDAABJSwAASpQAAEtoAABLdAAAS7oAAEu+AABLxAAAS8gAAEvNAABL0QAAS9cAAEvbAABL4QAAS+YAAEvsAABL8AAAS/YAAEv6AABMAAAATAQAAEwKAABMEQAATBcAAEwdAABMJAAATCsAAEwxAABMNwAATD0AAExDAABMSQAATE8AAExTAABMVwAATF0AAExjAABMaQAATG8AAEx1AABMewAATIEAAEyHAABMjQAATJMAAEyZAABMnwAATKUAAEyrAABMsQAATLcAAEy9AABMwwAATMcAAEzLAABMzwAATNMAAEzZAABM3wAATOUAAEzrAABM7wAATPMAAEz5AABM/wAATQMAAE0IAABNDgAATRUAAE0ZAABNHQAATSEAAE0lAABNKwAATTEAAE03AABNPQAATUEAAE1FAABNSQAATU0AAE1TAABNWQAATV8AAE1lAABNaQAATW0AAE1xAABNdQAATXsAAE2BAABNhwAATY0AAE2RAABNlQAATZkAAE2dAABNowAATakAAE2vAABNtQAATbsAAE3BAABNxwAATc0AAE3TAABN2QAATd8AAE3lAABN6wAATfEAAE31AABN+QAATf0AAE4BAABOBQAATgkAAE4NAABOEQAAThUAAE4ZAABOHwAATiUAAE4rAABOMQAATjUAAE45AABOPQAATkEAAE5GAABOSwAATk8AAE5TAABOWQAATl8AAE5lAABOawAATnMAAE57AABOgwAATosAAE6TAABOmwAATqEAAE6nAABOrQAATrMAAE66AABO3AAATuEAAE7oAABO7QAATvEAAE74AABO/gAATwIAAE8HAABPDQAATxIAAE8XAABPHQAATyIAAE8pAABPLgAATzUAAE87AABPQQAAT0gAAE9OAABPVQAAT1sAAE9iAABPZgAAT2oAAE9uAABPcwAAT3wAAE+CAABPqwAAT8wAAE/VAABP2gAAT+EAAE/mAABP7wAAT/QAAE/5AABQAgAAUAcAAFAQAABQFwAAUCAAAFApAABQLwAAUDYAAFA9AABQQwAAUGsAAFB0AABQewAAUIQAAFCLAABQugAAUMEAAFDKAABQ0wAAUNkAAFDiAABQ6AAAUO8AAFD2AABQ/gAAUQYAAFEMAABREgAAURgAAFEgAABRJgAAUSwAAFE0AABROgAAUUAAAFFIAABRTgAAUVYAAFFeAABRZgAAUW4AAFF2AABRfgAAUYYAAFGOAABRlAAAUZoAAFHDAABRyQAAUc8AAFH7AABSNwAAUmYAAFJsAABSogAAUt0AAFLjAABTGAAAU1QAAFNaAABTmwAAU9YAAFPcAABUGgAAVCAAAFRNAABUUwAAVFkAAFRfAABUZQAAVGsAAFRxAABUdwAAVH0AAFTHAABUzQAAVP0AAFU5AABVPwAAVYYAAFXdAABWTAAAVo4AAFbIAABXEgAAV3cAAFfHAABYKQAAWIUAAFjwAABZIAAAWSYAAFmDAABZ8QAAWfcAAFn9AABaAwAAWgkAAFoPAABaFQAAWksAAFppAABafgAAWo8AAFq4AABa1gAAWwEAAFsZAABbNgAAW0gAAFtjAABbeAAAW5kAAFuzAABb2QAAW/cAAFwgAABcQgAAXHEAAFyMAABcsAAAXNsAAFz+AABdJQAAXTwAAF1pAABdjwAAXb4AAF3gAABeAAAAXicAAF5GAABeXwAAXoEAAF6cAABevgAAXt4AAF73AABfFwAAXzsAAF9eAABffAAAX50AAF+4AABf4AAAYAQAAGAiAABgPgAAYFgAAGCPAABguAAAYOkAAGEWAABhTgAAYW8AAGGhAABhxwAAYfcAAGImAABiTwAAYn4AAGKkAABivwAAYuEAAGMHAABjIgAAYycAAGM3AABjTwAAY20AAGOJAABjpAAAY8QAAGPJAABj3gAAY/wAAGQAAABkEgAAZBcAAGQ7AABkVwAAZG4AAGSGAABkmQAAZLgAAGTOAABk4gAAZOYAAGTzAABlCQAAZS4AAGVJAABlZgAAZYcAAGWZAABlrwAAZcUAAGXbAABl+AAAZg4AAGYpAABmPgAAZlAAAGZtAABmhAAAZogAAGamAABmqgAAZsMAAGbhAABnBgAAZzAAAGdGAABnSwAAZ2gAAGeQAABnlQAAZ6sAAGfRAABn6QAAaAEAAGgnAABoQwAAaF4AAGiDAABomQAAaJ0AAGiyAABotgAAaN4AAGj8AABpFQAAaTMAAGldAABpewAAaZAAAGmhAABppQAAacQAAGnYAABp8gAAag0AAGofAABqOgAAalsAAGppAABqggAAaoYAAGqdAABqoQAAarYAAGrWAABq5AAAavoAAGr+AABrKAAAazoAAGtOAABrbAAAa4gAAGufAABrygAAa+YAAGv9AABsIwAAbEEAAGxUAABsdgAAbHsAAGyZAABsuwAAbMEAAGzXAABs7gAAbQQAAG0aAABtPgAAbVUAAG1uAABtiAAAbaoAAG3IAABt7AAAbgcAAG4pAABuRwAAbm4AAG5+AABujAAAbqEAAG7BAABuxQAAbskAAG7OAABu/wAAbzYAAG9TAABvYwAAb50AAG+8AABvwAAAb84AAG/pAABwBQAAcBoAAHAfAABwMgAAcGgAAHBvAABwfAAAcIAAAHCOAABwnAAAcLAAAHC0AABwuAAAcM4AAHDSAABw7gAAcPIAAHD2AABxDAAAcS0AAHFQAABxVAAAcXEAAHF1AABxgwAAcYgAAHGNAABxkgAAcZYAAHGwAABxzAAAcdkAAHHzAAByAQAAcjEAAHJLAAByXgAAcm0AAHJyAAByeAAAcn0AAHKGAAByjwAAcpUAAHKZAABynQAAcqIAAHKmAAByqwAAcq8AAHKzAAByuAAAcsQAAHLJAAByzgAActMAAHLYAABy9wAAcvsAAHMRAABzMAAAc1YAAHNxAABzkAAAc7YAAHPRAABz5gAAdAoAAHQpAAB0PwAAdGQAAHSQAAB0ogAAdLoAAHTfAAB09AAAdSgAAHVLAAB1dAAAdZMAAHW2AAB1zgAAdekAAHYJAAB2JwAAdkwAAHZtAAB2jAAAdqoAAHbEAAB28QAAdwwAAHcyAAB3VgAAd2wAAHdwAAB3lQAAd6kAAHfDAAB32QAAd/kAAHgXAAB4MQAAeF4AAHh7AAB4nQAAeLgAAHjLAAB46gAAeQAAAHkSAAB5JgAAeSwAAHk/AAB5UwAAeWcAAHmFAAB5iwAAeaYAAHnBAAB52QAAefgAAHoeAAB6PgAAelYAAHpuAAB6jQAAeqgAAHrKAAB67gAAew4AAHsqAAB7QwAAe2QAAHuAAAB7mAAAe54AAHuiAAB7qQAAe7AAAHu2AAB7vQAAe8MAAHvJAAB7zwAAe9UAAHvdAAB74wAAe+kAAHvvAAB79QAAe/sAAHv/AAB8BwAAfA0AAHwTAAB8GQAAfB8AAHwlAAB8KQAAfDEAAHw3AAB8PQAAfEMAAHxJAAB8TwAAfFMAAHxbAAB8YQAAfGkAAHxvAAB8dQAAfH0AAHyDAAB8iQAAfJEAAHyXAAB8nQAAfKEAAHynAAB8rQAAfLMAAHy5AAB8vwAAfMUAAHzLAAB80gAAfNgAAHzhAAB86QAAfO8AAHz1AAB8/QAAfQUAAH0OAAB9FAAAfRoAAH0eAAB9JAAAfSoAAH0wAAB9NgAAfTwAAH1CAAB9SAAAfU4AAH1UAAB9WgAAfWIAAH1oAAB9cAAAfXYAAH18AAB9ggAAfYoAAH2QAAB9lgAAfZ4AAH2mAAB9qgAAfbIAAH26AAB9wAAAfcYAAH3KAAB90AAAfdgAAH3fAAB95QAAfe4AAH32AAB9/AAAfgIAAH4KAAB+EgAAfhsAAH4hAAB+JwAAfisAAH4xAAB+NwAAfj0AAH5DAAB+SQAAfk8AAH5VAAB+WwAAfmEAAH5nAAB+bwAAfnUAAH59AAB+gwAAfokAAH6PAAB+lwAAfp0AAH6jAAB+qwAAfrMAAH63AAB+vwAAfscAAH7NAAB+0wAAftcAAH7dAAB+5QAAfusAAH7xAAB+9wAAfv0AAH8DAAB/CQAAfw0AAH8VAAB/GwAAfyMAAH8pAAB/LwAAfzUAAH87AAB/QQAAf0cAAH9NAAB/UQAAf1cAAH9fAAB/ZQAAf2sAAH9xAAB/dQAAf3sAAH+BAAB/hwAAf40AAH+TAAB/lwAAf50AAH+lAAB/qwAAf7EAAH+3AAB/vQAAf8EAAH/HAAB/zQAAf9MAAH/ZAAB/3wAAf+MAAH/pAAB/8QAAf/cAAH/9AACAAwAAgAkAAIAPAACAEwAAgBkAAIAfAACAJQAAgCsAAIAxAACANwAAgD0AAIBFAACASwAAgFEAAIBZAACAYAAAgGYAAIBsAACAcgAAgHgAAIB8AACAggAAgIgAAICOAACAlAAAgJoAAICgAACApgAAgK4AAIC0AACAugAAgMIAAIDJAACAzwAAgNUAAIDbAACA4QAAgOUAAIDrAACA8QAAgPcAAID9AACBAwAAgQkAAIEPAACBFwAAgR0AAIEjAACBKwAAgTIAAIE4AACBPgAAgUQAAIFIAACBYQAAgWcAAIFrAACBcQAAgXUAAIF5AACBfQAAgYMAAIGJAACBjwAAgZcAAIGdAACBowAAgasAAIGzAACBuwAAgcMAAIHLAACB0wAAgdsAAIHhAACB5QAAge0AAIHzAACB+QAAggEAAIIHAACCDQAAghMAAIIZAACCHQAAgiUAAIItAACCNQAAgjsAAIJBAACCRwAAgk0AAIJTAACCVwAAgl8AAIJlAACCawAAgnMAAIJ5AACCfwAAgoUAAIKLAACCjwAAgpcAAIKfAACCpwAAgq0AAIKzAACCuQAAgr8AAILFAACCyQAAgtEAAILXAACC3QAAguUAAILrAACC8QAAgvUAAIL7AACDAQAAgwcAAIMNAACDEwAAgxcAAIMdAACDIwAAgykAAIMvAACDNQAAgzkAAIM/AACDRQAAg0sAAINRAACDVQAAg1sAAINhAACDZQAAg2sAAINxAACDdQAAg3sAAIOBAACDiQAAg40AAIOVAACDmwAAg6MAAIOrAACDswAAg7kAAIO/AACDxQAAg8sAAIPPAACD1gAAg90AAIPkAACD6wAAg/IAAIP7AACEAgAAhAkAAIQQAACEFwAAhB4AAIQlAACELgAAhDMAAIQ6AACEQQAAhEcAAIRPAACEVQAAhFsAAIRfAACEZQAAhG0AAIRzAACEeQAAhH0AAISDAACEiwAAhJEAAISXAACEmwAAhKMAAISpAACErQAAhLMAAIS6AACEwAAAhMgAAITOAACE1gAAhNwAAITkAACE7AAAhPIAAIT2AACE/AAAhQMAAIUJAACFEQAAhRcAAIUfAACFJQAAhS0AAIU1AACFOwAAhT8AAIVFAACFTAAAhVIAAIVaAACFYAAAhWgAAIVuAACFdgAAhXwAAIWAAACFhgAAhYwAAIWQAACFlgAAhZwAAIWgAACFpgAAha0AAIW0AACFuwAAhcIAAIXJAACF0AAAhdcAAIXeAACF5QAAhewAAIX0AACF+wAAhgIAAIYJAACGDgAAhhUAAIYbAACGIgAAhigAAIYuAACGNAAAhjoAAIZAAACGRAAAhksAAIZRAACGVQAAhlsAAIZhAACGZwAAhm0AAIZzAACGeQAAhn0AAIaDAACGiQAAho8AAIaUAACGmwAAhqEAAIaqAACGsgAAhrgAAIa+AACGxgAAhs4AAIbXAACG3QAAhuMAAIbnAACG7QAAhvMAAIb5AACG/wAAhwUAAIcLAACHEQAAhxcAAIcdAACHIwAAhysAAIcxAACHOQAAhz8AAIdFAACHSwAAh1MAAIdZAACHXwAAh2cAAIdvAACHcwAAh3sAAIeDAACHiQAAh48AAIeTAACHmQAAh6EAAIeoAACHrwAAh7YAAIe9AACHxAAAh80AAIfUAACH2wAAh+IAAIfpAACH8AAAh/cAAIgAAACIBQAAiAwAAIgTAACIGQAAiB8AAIgjAACIKQAAiC8AAIg1AACIPAAAiEMAAIhKAACIUQAAiFgAAIhfAACIZgAAiG0AAIh0AACIewAAiIMAAIiKAACIkQAAiJgAAIidAACIowAAiKkAAIitAACIswAAiLkAAIi/AACIwwAAiMkAAIjPAACI1QAAiNsAAIjhAACI5QAAiOsAAIjzAACI+QAAiP8AAIkFAACJCwAAiRIAAIkZAACJIAAAiScAAIkuAACJNQAAiTwAAIlDAACJSAAAiU8AAIlWAACJWwAAiWIAAIlpAACJcAAAiXcAAIl9AACJgwAAiYcAAImNAACJkwAAiZkAAImfAACJpQAAiakAAImvAACJtQAAibsAAInBAACJxQAAicsAAInRAACJ1wAAid0AAInjAACJ6QAAie8AAIn3AACJ/QAAigMAAIoLAACKEgAAihgAAIoeAACKJAAAiisAAIoxAACKOgAAikIAAIpIAACKTgAAilYAAIpeAACKZwAAim0AAIpzAACKdwAAin0AAIqDAACKiQAAio8AAIqVAACKmwAAiqEAAIqnAACKrQAAirMAAIq7AACKwQAAiskAAIrPAACK1QAAitsAAIrjAACK6QAAiu8AAIr3AACK/wAAiwMAAIsLAACLEwAAixkAAIsfAACLIwAAiykAAIsxAACLNgAAizwAAItEAACLSgAAi1AAAItUAACLWgAAi2AAAItkAACLagAAi3AAAIt2AACLfQAAi4MAAIuMAACLlAAAi5oAAIugAACLqAAAi7AAAIu5AACLvwAAi8UAAIvJAACLzwAAi9UAAIvbAACL4QAAi+cAAIvtAACL8wAAi/kAAIv/AACMBQAAjA0AAIwTAACMGwAAjCEAAIwnAACMLQAAjDUAAIw7AACMQQAAjEkAAIxRAACMVQAAjF0AAIxlAACMawAAjHEAAIx1AACMewAAjIMAAIyHAACMjgAAjJQAAIydAACMpQAAjKsAAIyxAACMuQAAjMEAAIzKAACM0AAAjNYAAIzaAACM4AAAjOYAAIzsAACM8gAAjPgAAIz+AACNBAAAjQoAAI0QAACNFgAAjR4AAI0kAACNLAAAjTIAAI04AACNPgAAjUYAAI1MAACNUgAAjVoAAI1iAACNZgAAjW4AAI12AACNfAAAjYIAAI2GAACNjAAAjZQAAI2aAACNoAAAjaYAAI2sAACNsgAAjbgAAI28AACNxAAAjcoAAI3SAACN2AAAjd4AAI3kAACN6gAAj