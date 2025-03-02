const date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear();

var local_data = localStorage.getItem("challan_data");
var challandata = JSON.parse(local_data);

function getRandomTransactionId() {
  var min = 500000000;
  var max = 599999999;
  min = Math.ceil(min);
  max = Math.floor(max);
  random = Math.floor(Math.random() * (max - min)) + min;

  document.write(
    "* ನಿಮ್ಮ ವಹಿವಾಟನ್ನು ಸಂಸ್ಕರಿಸಲಾಗಿದೆ. ಮುಂದಿನ 	ಉಲ್ಲೇಖಕ್ಕಾಗಿ ದಯವಿಟ್ಟು ವಹಿವಾಟಿನ ಸಂಖ್ಯೆಯನ್ನು ಬರೆದಿಟ್ಟುಕೊಳ್ಳಿ. ವಹಿವಾಟು ಸಂಖ್ಯೆ <br> *Your Transaction has been processed. Please note the Transaction number for future reference. Transaction No." +
      random
  );

  return;
}

function generateChallanrefnumber() {
  var min = 200000;
  var max = 600000;
  min = Math.ceil(min);
  max = Math.floor(max);
  random = Math.floor(Math.random() * (max - min)) + min;
  let monthyear = `${month < 10 ? "0" + month : month}${year
    .toString()
    .slice(-2)}`;
  let random_challan_id = "CR" + monthyear + "003000" + random;
  document.getElementById("challan").value = random_challan_id;
  return;
}

function currentDate() {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;
  document.write(currentDate);
}

function printChallan1() {
  var prtContent = document.getElementById("printableRctDtl");

  var WinPrint = window.open(
    "",
    "",
    "left=0,top=0,width=800,height=800,toolbar=0,scrollbars=0,status=0"
  );
  WinPrint.document.write("Bank's copy");
  WinPrint.document.write(prtContent.innerHTML);
  // WinPrint.document.write("Remitter's copy");
  // WinPrint.document.write(prtContent.innerHTML);
  WinPrint.document.close();
  WinPrint.focus();
  WinPrint.print();
  // Defect_1465 Print Challan button not working, due to which this change is needed.
  // WinPrint.close();
}

//Added script to restrict inspect, print
// document.onkeydown = function (e) {
// 	// disable F12 key
// 	if (e.keyCode == 123) {
// 		return false;
// 	}
// 	// disable I key
// 	if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
// 		return false;
// 	}
// 	// disable J key
// 	if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
// 		return false;
// 	}
// 	// disable U key
// 	if (e.ctrlKey && e.keyCode == 85) {
// 		return false;
// 	}
// 	// disable P key
// 	if (e.ctrlKey && e.keyCode == 80) {
// 		return false;
// 	}
// }

//JSON Viewer

function jsonViewer(json, collapsible = false) {
  var TEMPLATES = {
    item: '<div class="json__item"><div class="json__key">%KEY%</div><div class="json__value json__value--%TYPE%">%VALUE%</div></div>',
    itemCollapsible:
      '<label class="json__item json__item--collapsible"><input type="checkbox" class="json__toggle"/><div class="json__key">%KEY%</div><div class="json__value json__value--type-%TYPE%">%VALUE%</div>%CHILDREN%</label>',
    itemCollapsibleOpen:
      '<label class="json__item json__item--collapsible"><input type="checkbox" checked class="json__toggle"/><div class="json__key">%KEY%</div><div class="json__value json__value--type-%TYPE%">%VALUE%</div>%CHILDREN%</label>'
  };

  function createItem(key, value, type) {
    var element = TEMPLATES.item.replace("%KEY%", key);

    if (type == "string") {
      element = element.replace("%VALUE%", '"' + value + '"');
    } else {
      element = element.replace("%VALUE%", value);
    }

    element = element.replace("%TYPE%", type);

    return element;
  }

  function createCollapsibleItem(key, value, type, children) {
    var tpl = "itemCollapsible";

    if (collapsible) {
      tpl = "itemCollapsibleOpen";
    }

    var element = TEMPLATES[tpl].replace("%KEY%", key);

    element = element.replace("%VALUE%", type);
    element = element.replace("%TYPE%", type);
    element = element.replace("%CHILDREN%", children);

    return element;
  }

  function handleChildren(key, value, type) {
    var html = "";

    for (var item in value) {
      var _key = item,
        _val = value[item];

      html += handleItem(_key, _val);
    }

    return createCollapsibleItem(key, value, type, html);
  }

  function handleItem(key, value) {
    var type = typeof value;

    if (typeof value === "object") {
      return handleChildren(key, value, type);
    }

    return createItem(key, value, type);
  }

  function parseObject(obj) {
    _result = '<div class="json">';

    for (var item in obj) {
      var key = item,
        value = obj[item];

      _result += handleItem(key, value);
    }

    _result += "</div>";

    return _result;
  }

  return parseObject(json);
}

var districts_json = {
  districts: ["BENGALURU RURAL", "BENGALURU URBAN", "CHIKKABALLAPUR"]
};

var taluk_json = {
  "BENGALURU RURAL": {
    1: "DEVANAHALLI, BANGALORE", //11683O
    2: "HOSAKOTE",
    3: "DODDABALLAPUR",
    4: "NELAMANGALA"
  },
  "BENGALURU URBAN": {
    1: "GANDHINAGARA",
    2: "MALLESHWARA",
    3: "GANGANAGARA",
    4: "HEBBALA",
    5: "KACHARAKANAHALLI",
    6: "BYATARAYANAPURA",
    7: "YELAHANKA",
    8: "JALA",
    9: "HESARAGHATTA",
    10: "SHANTINAGARA",
    11: "BTM LAYOUT",
    12: "KENGERI",
    13: "RAJARAJESHWARI NAGARA",
    14: "JP NAGARA",
    15: "BHOMMANAHALLI",
    16: "BEGURU",
    17: "TAVAREKERE"
  },
  CHIKKABALLAPUR: {
    1: "CHIKKABALLAPURA", //117010
    2: "GUDIBANDE",
    3: "BAGEPALLI",
    4: "CHINTAMANI",
    5: "SHIDLAGHATTA",
    6: "GOWRIBIDANURU"
  },
  CHIKKABALLAPUR: {
    1: { CHIKKABALLAPURA: "117010" },
    2: { GUDIBANDE: "117011" },
    3: { GUDIBANDE: "117012" },
    4: { GUDIBANDE: "117013" },
    5: { GUDIBANDE: "117014" },
    6: { GUDIBANDE: "117015" }
  }
};

var a = [];
function SaveDataToLocalStorage(data) {
  var receiveddata = JSON.stringify(data);
  console.log("Saving Data");
  console.log(receiveddata);
  a.push(receiveddata);
  localStorage.setItem("challan_data", a);
  sessionStorage.setItem("challan_data", a);
}

window.onload = function () {
  changeSro();
  // console.log(Object.keys(taluk_json[document.getElementById("district").value]).length);
  generateChallanrefnumber();
  var mb = document.getElementById("registration_form");
  mb.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Event", e);
    for (i = 0; i < e.target.length; i++) {
      console.log(e.target[i].value);
    }
    if (e.target[9].value != "" && e.target[10].value != "") {
      const formData = new FormData(e.target);
      const data = Array.from(formData.entries()).reduce(
        (memo, [key, value]) => ({
          ...memo,
          [key]: value
        }),
        {}
      );
      SaveDataToLocalStorage(data);
      console.log(data);
      // var el = document.querySelector(".target");
      // el.innerHTML = jsonViewer(data, true);
    } else {
      alert("Please check Challan Amount");
    }
  });

  // console.log(challandata, challandata === null);

  // print button visibility
  if (challandata !== null) {
    document.getElementById("challan_print").style.display = "";
  } else {
    document.getElementById("challan_print").style.display = "none";
  }
};
function numberToEnglish(n) {
  var string = n.toString(),
    units,
    tens,
    scales,
    start,
    end,
    chunks,
    chunksLen,
    chunk,
    ints,
    i,
    word,
    words;
  // and = "and";

  /* Remove spaces and commas */
  string = string.replace(/[, ]/g, "");

  /* Is number zero? */
  if (parseInt(string) === 0) {
    return "zero";
  }

  /* Array of units as words */
  units = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen"
  ];

  /* Array of tens as words */
  tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety"
  ];

  /* Array of scales as words */
  scales = [
    "",
    "thousand",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
    "sextillion",
    "septillion",
    "octillion",
    "nonillion",
    "decillion",
    "undecillion",
    "duodecillion",
    "tredecillion",
    "quatttuor-decillion",
    "quindecillion",
    "sexdecillion",
    "septen-decillion",
    "octodecillion",
    "novemdecillion",
    "vigintillion",
    "centillion"
  ];

  /* Split user argument into 3 digit chunks from right to left */
  start = string.length;
  chunks = [];
  while (start > 0) {
    end = start;
    chunks.push(string.slice((start = Math.max(0, start - 3)), end));
  }

  /* Check if function has enough scale words to be able to stringify the user argument */
  chunksLen = chunks.length;
  if (chunksLen > scales.length) {
    return "";
  }

  /* Stringify each integer in each chunk */
  words = [];
  for (i = 0; i < chunksLen; i++) {
    chunk = parseInt(chunks[i]);

    if (chunk) {
      /* Split chunk into array of individual integers */
      ints = chunks[i].split("").reverse().map(parseFloat);

      /* If tens integer is 1, i.e. 10, then add 10 to units integer */
      if (ints[1] === 1) {
        ints[0] += 10;
      }

      /* Add scale word if chunk is not zero and array item exists */
      if ((word = scales[i])) {
        words.push(word);
      }

      /* Add unit word if array item exists */
      if ((word = units[ints[0]])) {
        words.push(word);
      }

      /* Add tens word if array item exists */
      if ((word = tens[ints[1]])) {
        words.push(word);
      }

      /* Add 'and' string after units or tens integer if: */
      // if (ints[0] || ints[1]) {
      //   /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
      //   if (ints[2] || (!i && chunksLen)) {
      //     words.push(and);
      //   }
      // }

      /* Add hundreds word if array item exists */
      if ((word = units[ints[2]])) {
        words.push(word + " hundred");
      }
    }
  }
  var words = words.reverse().join(" ");
  return toTitleCase(words) + " only";
  // return words.reverse().join( ' ' ) + " only";
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

function calculatestampdutyy(e) {
  var years = e.target.value;
  var units = document.getElementById("units").value;
  console.log(units);
  var stamp = (years * 10 + 30) * units;
  var amt = document.querySelector(".amountrs");
  amt.value = stamp.toFixed(2);
  var amt2words = document.querySelector(".amount_words");
  amt2words.value = numberToEnglish(stamp);
}

function closewindow(e) {
  e.preventDefault();
  document.getElementById(e.srcElement.parentElement.id).style.display = "none";
}

function viewdata() {
  var local_data = localStorage.getItem("challan_data");
  var challandata = JSON.parse(local_data);
  var el = document.querySelector(".target");
  el.innerHTML = jsonViewer(challandata, true);
  document.getElementById("viewitem").style.display = "";
}

function changeSro() {
  var elm = document.getElementById("sro");
  while (elm.firstChild) {
    elm.removeChild(elm.firstChild);
  }
  var df = document.createDocumentFragment();
  for (
    var i = 1;
    i <
    Object.keys(taluk_json[document.getElementById("district").value]).length +
      1;
    i++
  ) {
    // for (var i = 1; i < taluk_json[document.getElementById("district").value].Array.length; i++)
    var option = document.createElement("option"); // create the option element
    // console.log(taluk_json[document.getElementById("district").value][i]);
    option.appendChild(
      document.createTextNode(
        taluk_json[document.getElementById("district").value][i]
      )
    ); // set the textContent in a safe way.
    // option.appendChild(
    //   document.createTextNode(taluk_json["BENGALURU URBAN"][i])
    // );
    df.appendChild(option); // append the option to the document fragment
  }
  elm.appendChild(df);
}
