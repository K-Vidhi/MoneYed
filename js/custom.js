$(function () {
  "use strict"; // Start of use strict

  /*--------------------------
    scrollUp
---------------------------- */
  $.scrollUp({
    scrollText: '<i style="font-size:24px" class="fa">&#xf077;</i>',
    easingType: "linear",
    scrollSpeed: 900,
    animation: "fade",
  });

  /*--------------------------
    Reviews
---------------------------- */
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    nav: true,
    smartSpeed: 900,
    navText: [
      '<i class="fa fa-angle-double-left"></i>',
      '<i class="fa fa-angle-double-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });

  /*------------------------------------------------------------------
   mobile navbar click 
------------------------------------------------------------------*/
  var w = $(window).width();
  if (w <= 991) {
    $("#navbar .nav-item").on("click", function () {
      $(".navbar-toggler").trigger("click");
    });
  }
  //
  /*------------------------------------------------------------------
   Calculator
------------------------------------------------------------------*/
});

function addBreadCrumb(name){
  return `<nav aria-label="breadcrumb">
              <ol class="breadcrumbCustom" style="display: flex;">
                <li class="breadcrumb-item"><a href="#calculator"
                 onclick="document.location.reload();">Calculators</a></li>
                <li class="breadcrumb-item active" aria-current="page">${name}</li>
              </ol>
          </nav>`
}

const formData1 = () => {
  return {
    PRINCIPAL: document.getElementsByName("amountInput")[0].value,
    RATE: document.getElementsByName("interestInput")[0].value,
    TENURE: document.getElementsByName("tenureInput")[0].value,
  };
};

const statementTableGrid = (type) => {
  document.getElementById("statementSection").classList.remove("d-none");
  var tableDiv = document.getElementById("statementTable");
  tableDiv.innerHTML = "";
  document.querySelector("#statementSection .col-lg-8").firstChild.textContent = type;
  return tableDiv;
};

function valueUpdate(type, form) {
  var replica = "Range";
  var replicant = "Input";
  if (type.includes("Input")) {
    replica = "Input";
    replicant = "Range";
  }
  if (type !== "false") {
    var r = document.getElementsByName(type.replace("Input", "Range"))[0];
    var e = document.getElementsByName(type.replace(replica, replicant))[0];
    e.value = document.getElementsByName(type)[0].value;

    r.style.backgroundSize =
      ((r.value - r.min) * 99.65) / (r.max - r.min) + "% 100%";
  }

  switch (form) {
    case "emi":
      updateEMIData();
      break;

    case "future":
      updateFutureData();
      break;

    case "fd":
      updateFdData();
      break;
  }
}

let initialFutureValue = (formData) => {
  return Math.round(formData["PRINCIPAL"] / (1 + (formData["RATE"] / 1200)) ** (formData["TENURE"] * 12))
}


let updateFutureData = () => {
  var formData = formData1();
  var initialFuture = initialFutureValue(formData);

  updateFormData1Preview(
    initialFuture,
    formData["PRINCIPAL"] - initialFuture,
    formData["PRINCIPAL"]
  );

  futureDonutData.setData([
    { label: "Invested", value: initialFuture },
    {
      label: "Interest",
      value: formData["PRINCIPAL"] - initialFuture,
    },
  ]);
};

function fdMaturityValue(principal, rate, years, compoundingFreq) {
  return Math.round(
    principal * (1 + rate / (100 * compoundingFreq)) ** (compoundingFreq * years)
  );
}

let updateFdData = () => {
  var formData = formData1();
  var principal = parseFloat(formData["PRINCIPAL"]);
  var fdFinalValue = fdMaturityValue(
    principal,
    parseFloat(formData["RATE"]),
    parseFloat(formData["TENURE"]),
    4 // Quarterly compounding
  );

  updateFormData1Preview(
    formData["PRINCIPAL"],
    fdFinalValue - principal,
    fdFinalValue
  );

  fdDonutData.setData([
    { label: "Invested", value: principal },
    { label: "Interest", value: fdFinalValue - principal },
  ]);
};

let updateEMIData = () => {
  var formData = formData1();
  var monthlyInterestRate = formData["RATE"] / 1200;

  var emi = calculateEMI(
    parseFloat(formData["PRINCIPAL"]),
    parseFloat(monthlyInterestRate),
    parseFloat(formData["TENURE"])
  );

  var totalPayable = emi * (formData["TENURE"] * 12);
  updateFormData1Preview(
    emi,
    totalPayable - formData["PRINCIPAL"],
    totalPayable
  );
  emiDonutData.setData([
    { label: "Principal", value: formData["PRINCIPAL"] },
    { label: "Interest", value: totalPayable - formData["PRINCIPAL"] },
  ]);
};

function updateFormData1Preview(data1, data2, data3) {
  var emiPreview = document.getElementById("emi-amount");
  emiPreview.innerHTML = `$ ${data1}`;
  var totalInterestPreview = document.getElementById("total-interest");
  totalInterestPreview.innerHTML = `$ ${data2}`;
  var totalPaymentPreview = document.getElementById("total-payment");
  totalPaymentPreview.innerHTML = `$ ${data3}`;
}

function calculateEMI(loanAmount, monthlyInterestRate, numberOfYears) {
  var monthlyEMI =
    (loanAmount * monthlyInterestRate) /
    (1 - 1 / (1 + monthlyInterestRate) ** (numberOfYears * 12));
  return Math.round(monthlyEMI);
}

function initialDeposit(finalValue, annualInterest, numberOfYears){
  return Math.round(finalValue / (1 + (annualInterest / 1200)) ** (numberOfYears * 12)
  )
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

const breadcrumbItem = (name) =>{
  return document.querySelector('.breadcrumbCustom').childNodes.length < 6 ? 
        document.querySelector('.breadcrumbCustom').innerHTML += `<li class="breadcrumb-item"><a href="#statementSection">${name}</a></li>` : ''
}

function createColCell(dataType = "TD", data) {
  var td = document.createElement(dataType);
  td.appendChild(document.createTextNode(data));
  td.width = "300";
  return td;
}

function repaymentEMI() {
  var formData = formData1();
  var tableDiv = statementTableGrid("Amortization Schedule");
  breadcrumbItem('Amortization Schedule');
  var table = document.createElement("TABLE");
  table.classList.add("table", "table-striped");
  var tableBody = document.createElement("TBODY");
  table.appendChild(tableBody);

  var balance = formData["PRINCIPAL"];
  var monthlyInterestRate = formData["RATE"] / 1200;
  var monthlyEMI = calculateEMI(
    formData["PRINCIPAL"],
    monthlyInterestRate,
    formData["TENURE"]
  );

  document.getElementById("summaryTable").innerHTML = `
                    <tbody>
                      <tr>
                        <td class="border-0"><strong>Principal</strong></td>
                        <td class="border-0">$ ${formData["PRINCIPAL"]}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Annual Interest</strong>
                        </td>
                        <td>${formData["RATE"]} %</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Tenure (months)</strong>
                        </td>
                        <td>${formData["TENURE"] * 12}</td>
                      </tr>
                      <tr>
                        <td><strong>Total Interest</strong></td>
                        <td>${(
                          monthlyEMI * (formData["TENURE"] * 12)) -
                          formData["PRINCIPAL"]
                        }</td>
                      </tr>
                      <tr>
                        <td><strong>Total Payable</strong></td>
                        <td><strong>$ ${
                          monthlyEMI * (formData["TENURE"] * 12)
                        }</strong></td>
                      </tr>
                    </tbody>
    `;
  var th =document.createElement("THEAD")
  var tr = document.createElement("TR");
  tableBody.appendChild(tr);

  tr.appendChild(createColCell("TH", "Month"));
  tr.appendChild(createColCell("TH", "Opening Bal. (O)"));
  tr.appendChild(createColCell("TH", "Installment Amt. (I + P)"));
  tr.appendChild(createColCell("TH", "Interest (I)"));
  tr.appendChild(createColCell("TH", "Principal (P)"));
  tr.appendChild(createColCell("TH", "Closing Bal. (O - P)"));
  th.append(tr)
  table.appendChild(th);
  for (var i = 1; i <= formData["TENURE"] * 12; i++) {
    var interest = monthlyInterestRate * balance;
    var principal = monthlyEMI - interest;
    if (balance < 1) balance = 0;

    var tr = document.createElement("TR");
    tableBody.appendChild(tr);

    tr.appendChild(createColCell("TD", i));
    tr.appendChild(createColCell("TD", roundToTwo(balance).toFixed(2)));
    tr.appendChild(createColCell("TD", roundToTwo(monthlyEMI).toFixed(2)));
    tr.appendChild(createColCell("TD", roundToTwo(interest).toFixed(2)));
    tr.appendChild(createColCell("TD", roundToTwo(principal).toFixed(2)));

    balance -= principal;
    balance = balance < 1 ? 0 : balance;

    tr.appendChild(createColCell("TD", roundToTwo(balance).toFixed(2)));
  }
  tableDiv.appendChild(table);
}

const compoundStatementDataNoAddition = (formData, table, tableBody, period = 1, initialBal) => {
  var tr = document.createElement("TR");
  var th =document.createElement("THEAD")
  tableBody.appendChild(tr);

  tr.appendChild(createColCell("TH", "" + `${period == 1 ? 'Year' : 'Month'}`));
  tr.appendChild(createColCell("TH", "Opening Bal. (O)"));
  tr.appendChild(createColCell("TH", "Interest (I)"));
  tr.appendChild(createColCell("TH", "Closing Bal. (O + I)"));
  th.append(tr)
  
  for (var i = 1; i <= formData["TENURE"] * period; i++) {
    var tr = document.createElement("TR");
    tableBody.appendChild(tr);
    tr.appendChild(createColCell("TD", i));
    tr.appendChild(createColCell("TD", roundToTwo(initialBal).toFixed(2)));

    var interest = (formData["RATE"] / (100 * period)) * initialBal;
    initialBal += interest;

    tr.appendChild(createColCell("TD", roundToTwo(interest).toFixed(2)));
    tr.appendChild(createColCell("TD", roundToTwo(initialBal).toFixed(2)));
  }
  table.appendChild(th);
  return tr
}

const compoundStatementDataWithAddition = (formData, tableBody, period = 1) => {
  var princiaplBal = openingBalance = parseFloat(formData["PRINCIPAL"]);
  
  for (var i = 1; i <= formData["TENURE"] * period; i++) {

    var tr = document.createElement("TR");
    tableBody.appendChild(tr);
    
    tr.appendChild(createColCell("TD", i));
    tr.appendChild(createColCell("TD", (princiaplBal - formData["PRINCIPAL"]).toFixed(2)));
    tr.appendChild(createColCell("TD", roundToTwo(formData["PRINCIPAL"]).toFixed(2)));
    
    tr.appendChild(createColCell("TD", openingBalance.toFixed(2)));

    var interest = openingBalance * parseFloat(formData["RATE"] / (100 * period))
    openingBalance += parseFloat(interest)
    
    tr.appendChild(createColCell("TD", roundToTwo(interest).toFixed(2)));
    tr.appendChild(createColCell("TD", roundToTwo(openingBalance).toFixed(2))); 
    tr.appendChild(createColCell("TD", roundToTwo(princiaplBal).toFixed(2))); 

    openingBalance += parseFloat(formData["PRINCIPAL"]);
    princiaplBal += parseFloat(formData["PRINCIPAL"]);
    
           
  }

  return tr;
}

function futureStatement() {
  var formData = formData1();
  var tableDiv = statementTableGrid("Future Interest Schedule");
  breadcrumbItem('Interest Schedule');
  var table = document.createElement("TABLE");
  table.classList.add("table", "table-striped");
  var tableBody = document.createElement("TBODY");
  table.appendChild(tableBody);

  var initialBal = initialDeposit(
    formData["PRINCIPAL"],
    formData["RATE"],
    formData["TENURE"]
  );

  document.getElementById("summaryTable").innerHTML = `
                    <tbody>
                      <tr>
                        <td class="border-0"><strong>Required Balance</strong></td>
                        <td class="border-0">$ ${formData["PRINCIPAL"]}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Annual Interest</strong>
                        </td>
                        <td>${formData["RATE"]} %</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Tenure (Months)</strong>
                        </td>
                        <td>${formData["TENURE"] * 12}</td>
                      </tr>
                      <tr>
                        <td><strong>Initial Deposit</strong></td>
                        <td>$ ${initialBal}</td>
                      </tr>
                      <tr>
                        <td><strong>Estimated Return</strong></td>
                        <td><strong>$ ${
                          formData["PRINCIPAL"] - initialBal
                        }</strong></td>
                      </tr>
                    </tbody>
    `;
  
  compoundStatementDataNoAddition(formData, table, tableBody, 12, initialBal);
  tableDiv.appendChild(table);
}

function fdStatement() {
  var formData = formData1();
  var tableDiv = statementTableGrid("Fixed Deposit Interest Schedule");
  breadcrumbItem('Interest Schedule');
  var table = document.createElement("TABLE");
  table.classList.add("table", "table-striped");
  var tableBody = document.createElement("TBODY");
  table.appendChild(tableBody);

  var principal = parseFloat(formData["PRINCIPAL"]);
  var rate = parseFloat(formData["RATE"]);
  var years = parseFloat(formData["TENURE"]);
  var compoundingFreq = 4; // Quarterly compounding
  var fdFinalValue = fdMaturityValue(principal, rate, years, compoundingFreq);

  document.getElementById("summaryTable").innerHTML = `
                    <tbody>
                      <tr>
                        <td class="border-0"><strong>Deposit Amount</strong></td>
                        <td class="border-0">$ ${formData["PRINCIPAL"]}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Annual Interest</strong>
                        </td>
                        <td>${formData["RATE"]} %</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Tenure (Years)</strong>
                        </td>
                        <td>${formData["TENURE"]}</td>
                      </tr>
                      <tr>
                        <td><strong>Compounding Frequency</strong></td>
                        <td>Quarterly</td>
                      </tr>
                      <tr>
                        <td><strong>Estimated Return</strong></td>
                        <td><strong>$ ${
                          fdFinalValue - principal
                        }</strong></td>
                      </tr>
                      <tr>
                        <td><strong>Maturity Value</strong></td>
                        <td><strong>$ ${fdFinalValue}</strong></td>
                      </tr>
                    </tbody>
    `;
    var th = document.createElement("THEAD");
    var tr = document.createElement("TR");

    tr.appendChild(createColCell("TH", "Quarter"));
    tr.appendChild(createColCell("TH", "Opening Bal. (O)"));
    tr.appendChild(createColCell("TH", "Interest (I)"));
    tr.appendChild(createColCell("TH", "Closing Bal. (O + I)"));
    th.append(tr);
    table.appendChild(th);

    var openingBal = principal;
    var totalPeriods = Math.round(years * compoundingFreq);
    var periodicRate = rate / (100 * compoundingFreq);

    for (var i = 1; i <= totalPeriods; i++) {
      var tr = document.createElement("TR");
      tableBody.appendChild(tr);

      tr.appendChild(createColCell("TD", i));
      tr.appendChild(createColCell("TD", roundToTwo(openingBal).toFixed(2)));

      var interest = openingBal * periodicRate;
      openingBal += interest;

      tr.appendChild(createColCell("TD", roundToTwo(interest).toFixed(2)));
      tr.appendChild(createColCell("TD", roundToTwo(openingBal).toFixed(2)));
    }

  tableDiv.appendChild(table);
}

function pdfPrint(element, docName) {
  var divContents = $("#" + element).html();
  divContents = divContents.replace("alias-buttons", "d-none");
  var printWindow = window.open(
    "",
    "PRINT",
    "height=650,width=1200,top=100,left=150"
  );
  printWindow.document.write(
    "<html><head><title>" +
      docName +
      '</title><meta name="viewport" content="width=360, initial-scale=1" /><link href="css/style.css" rel="stylesheet" /><link href="css/plugins.css" rel="stylesheet" /><link href="css/jquery-ui.css" rel="stylesheet" />'
  );
  printWindow.document.write("</head><body >");
  printWindow.document.write(divContents);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();

  // var element = document.getElementById("loanAmortization");
  // html2pdf().from(element).save('download.pdf');
}

function addUtilityCalc(typeCalc) {
  document.getElementById("calOptions").classList.add("d-none");
  document.querySelector("#calculator .section-para").classList.add("d-none");
  setTimeout(() => {
    switch (typeCalc) {
      case "emiCalculatorSection":
        $("#calculator .col-lg-12").prepend(addBreadCrumb('EMI'));
        emiForm();
        break;

      
      case "futureCalculatorSection":
        $("#calculator .col-lg-12").prepend(addBreadCrumb('Future'));
        futureForm();
        break;  

      case "fdCalculatorSection":
        $("#calculator .col-lg-12").prepend(addBreadCrumb('FD'));
        fdForm();
        break;

    }
  }, 100);

  document.getElementById(typeCalc).style.height = "100%";
  window.location.hash = "calculator";
}
/*------------------------------------------------------------------
 Fixed Navigation 
------------------------------------------------------------------*/
$(window).scroll(function () {
  if ($(this).scrollTop() > 20) {
    $("#navbar").addClass("header-scrolled");
  } else {
    $("#navbar").removeClass("header-scrolled");
  }
});

/*------------------------------------------------------------------
 Loader 
------------------------------------------------------------------*/
jQuery(window).on("load scroll", function () {
  "use strict"; // Start of use strict
  // Loader
  $("#dvLoading").fadeOut("slow", function () {
    $(this).remove();
  });
});

/*------------------------------------------------------------------
 Email Handler 
------------------------------------------------------------------*/
function sendMail(emailType){
  window.location.href.includes('contact') ? window.location.hash = '' : window.location.hash = "contact";

  document.getElementsByName('message')[0].value = `Inquiry type: ${emailType}
Inquiry sent via: MoneYed`

  document.querySelector('#contactForm button').click();
}