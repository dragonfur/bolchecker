var currentURL
const allthestuff = []
function createEditableTable(name, url, address) {
	// Create a div element
	var divElement = document.createElement('div');
  
	// Create a table element
	var tableElement = document.createElement('table');
  
	// Create a table row
	var rowElement = document.createElement('tr');
  
	// Create three table cells (columns)
	var cellElement1 = document.createElement('td');
	var cellElement2 = document.createElement('td');
	var cellElement3 = document.createElement('td');
  
	// Create a contenteditable span for each cell
	var contentEditableSpan = document.createElement('span');
	contentEditableSpan.setAttribute('contenteditable', 'true');
	contentEditableSpan.textContent = `${name}^${url}`

	var contentEditableSpan1 = document.createElement('span');
	contentEditableSpan1.setAttribute('contenteditable', 'true');
	contentEditableSpan1.textContent = ``

	var contentEditableSpan2 = document.createElement('span');
	contentEditableSpan2.setAttribute('contenteditable', 'true');
	contentEditableSpan2.textContent = `${address}`
  
	// Append the span to the cell
	cellElement1.appendChild(contentEditableSpan);
	cellElement2.appendChild(contentEditableSpan1);
	cellElement3.appendChild(contentEditableSpan2);

	// Append the cell to the row
	rowElement.appendChild(cellElement1);
	rowElement.appendChild(cellElement2);
	rowElement.appendChild(cellElement3);
  
	// Append the row to the table
	tableElement.appendChild(rowElement);
  
	// Append the table to the div
	divElement.appendChild(tableElement);
  
	document.body.appendChild(divElement)
  }
// function checkIsImg(data) {
// 	if(data === "IMG") {
// 		return true
// 	} else {
// 		return false
// 	}
// }

// function checkIsLink(data){
// 	if(data === "A") {
// 		return true
// 	} else {
// 		return false
// 	}
// }

// fetch('https://craftlit.libsyn.com/640-chs-49-50-the-three-musketeers').then(function (response) {
// 	// The API call was successful!
// 	return response.text();
// }).then(function (data) {
// 	// This is the JSON from our response
// 	const parser = new DOMParser();
// 	const htmlDoc = parser.parseFromString(data, 'text/html')
// 	const div = document.getElementById('hello')
// 	const epName = htmlDoc.childNodes[1].childNodes[2].childNodes[21].childNodes[7].childNodes[0].childNodes[1].childNodes[2].textContent
// 	const epBookTalk = htmlDoc.childNodes[1].childNodes[2].childNodes[21].childNodes[7].childNodes[0].childNodes[1].childNodes[4].textContent
// 	const epDesc = htmlDoc.childNodes[1].childNodes[2].childNodes[21].childNodes[7].childNodes[0].childNodes[1].childNodes[6].textContent
// 	div.innerHTML = `${epName}<br><br>`;
// 	div.innerHTML += `${epBookTalk}<br><br>`;
// 	if(htmlDoc.childNodes[1].childNodes[2].childNodes[21].childNodes[7].childNodes[0].childNodes[1].childNodes[6].role === 'presentation') {
// 		div.innerHTML += `${epDesc}<br><br>`;
// 	}

// 	console.log(htmlDoc.childNodes[1].childNodes[2].childNodes[21].childNodes[7].childNodes[0].childNodes[1].childNodes)
// 	if(checkIsImg(htmlDoc.childNodes[1].childNodes[2].childNodes[21].childNodes[7].childNodes[0].childNodes[1].childNodes[6].childNodes[3].lastChild.tagName)){
// 		div.innerHTML += `• ${htmlDoc.childNodes[1].childNodes[2].childNodes[21].childNodes[7].childNodes[0].childNodes[1].childNodes[6].childNodes[3].textContent} <br>`
// 	}
// 	if(checkIsLink(htmlDoc.childNodes[1].childNodes[2].childNodes[21].childNodes[7].childNodes[0].childNodes[1].childNodes[6].childNodes[1].lastChild.tagName)) {
// 		div.innerHTML += `• ${htmlDoc.childNodes[1].childNodes[2].childNodes[21].childNodes[7].childNodes[0].childNodes[1].childNodes[6].childNodes[1].textContent}: ${htmlDoc.childNodes[1].childNodes[2].childNodes[21].childNodes[7].childNodes[0].childNodes[1].childNodes[6].childNodes[1].lastChild.href} <br>`
// 	}
// 	console.log(checkIsLink(htmlDoc.childNodes[1].childNodes[2].childNodes[21].childNodes[7].childNodes[0].childNodes[1].childNodes[6].childNodes[1].lastChild.tagName))
// 	console.log(data);
// }).catch(function (err) {
// 	// There was an error
// 	console.warn('Something went wrong.', err);
// });

function fetchData() {
	// Get the link from the input field
	const linkInput = document.getElementById('linkInput');
	const link = linkInput.value;

	// Check if a link is provided
	if (!link) {
	  alert('Please enter a link before fetching data.');
	  return;
	}

fetch(`https://corsproxy.io/?${link}`).then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (data) {
	// This is the JSON from our response
	const parser = new DOMParser();
	const htmlDoc = parser.parseFromString(data, 'text/html')
	const theUL = htmlDoc.body.childNodes[11].childNodes[11].childNodes[5].childNodes[1].childNodes[3].childNodes[5].childNodes[5].childNodes[3].childNodes[1].childNodes[7].childNodes[1].childNodes[1]
	console.log(theUL)
	function delayedLoop() {
		let i = 1;
	  
		function iterate() {
		  checkIfBolIsNotSeller(theUL.childNodes[i])
	  
		  if (i < 63) {
			i += 2;
			setTimeout(iterate, 1000); // 5000 milliseconds = 5 seconds
		  }
		}
	  
		iterate();
	  }
	  
	delayedLoop();
	// console.log(data);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
}

function checkIfBolIsNotSeller(data) {
	console.log(data)
	if (data.nodeName === "SECTION") {
		return
	} else if (data.childNodes[3].childNodes[3].childNodes[5].className === "product-delivery") {
		return
	} else if (data.childNodes[3].childNodes[3].childNodes[5].nodeName === '#text') {
		return
	} else if (data.childNodes[3].childNodes[3].childNodes[5].childNodes[0].textContent === "\n  \n    Verkoop door bol.com\n  \n") {
		return
	} else {
	currentURL = `https://www.bol.com/${data.childNodes[3].childNodes[3].childNodes[5].childNodes[1].childNodes[1].pathname}${data.childNodes[3].childNodes[3].childNodes[5].childNodes[1].childNodes[1].search}`
	fetch(`https://corsproxy.io/?https://www.bol.com/${data.childNodes[3].childNodes[3].childNodes[5].childNodes[1].childNodes[1].pathname}`).then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (data) {
	// This is the JSON from our response
	const parser = new DOMParser();
	const htmlDoc = parser.parseFromString(data, 'text/html')
	const companyInfo = htmlDoc.body.childNodes[11].childNodes[11].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[13].childNodes[3]
	if (allthestuff.includes(companyInfo.childNodes[3].textContent)) {
		return
	} else {
		allthestuff.push(companyInfo.childNodes[3].textContent)
		createEditableTable(companyInfo.childNodes[3].textContent, currentURL, companyInfo.childNodes[7].childNodes[1].textContent)
	}
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
	}
}

function clearTable() {
    // Remove all table elements from the page
    var tableElements = document.querySelectorAll('table');
    tableElements.forEach(function(table) {
      table.parentNode.removeChild(table);
    });
  }

  // Create a "Clear" button and add an event listener to it
  var clearButton = document.createElement('button');
  clearButton.textContent = 'Clear Table';
  clearButton.addEventListener('click', clearTable);

  // Append the button to the body
  document.body.appendChild(clearButton);


