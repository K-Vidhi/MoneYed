const emiForm = () => {
  document.querySelector("#emiCalculatorSection .row .col-lg-4").innerHTML = `
          <form class="form-calculator">
                  <div class="form-group">
                    <label for="amount">Loan Amount :</label>
                    <div class="input-group mb-4">
                      <div class="input-group-prepend">
                        <div class="input-group-text">$</div>
                      </div>
                      <input
                        name="amountInput"
                        type="number"
                        min="100000"
                        max="5000000"
                        class="form-control"
                        value="500000"
                        step="50000"
                        oninput="valueUpdate(name , 'emi');"
                      />
                    </div>
                    <input
                      name="amountRange"
                      type="range"
                      step="50000"
                      value="500000"
                      min="100000"
                      max="5000000"
                      oninput="valueUpdate(name, 'emi');"
                      style="background-size: 8.16327% 100%"
                    />
                  </div>
    
                  <div class="form-group">
                    <label for="amount">Interest Rate :</label>
                    <div class="input-group mb-4">
                      <div class="input-group-prepend">
                        <div class="input-group-text">%</div>
                      </div>
                      <input
                        name="interestInput"
                        type="number"
                        min="1"
                        max="30"
                        class="form-control"
                        value="7.5"
                        step="0.25"
                        oninput="valueUpdate(name, 'emi');"
                      />
                    </div>
                    <input
                      name="interestRange"
                      type="range"
                      min="1"
                      max="30"
                      value="7.5"
                      step="0.25"
                      oninput="valueUpdate(name, 'emi');"
                      style="background-size: 22.414% 100%"
                    />
                  </div>
    
                  <div class="form-group">
                    <label for="amount">Loan Tenure :</label>
                    <div class="input-group mb-4">
                      <div class="input-group-prepend">
                        <div class="input-group-text">Years</div>
                      </div>
                      <input
                        name="tenureInput"
                        type="number"
                        min="1"
                        max="30"
                        class="form-control"
                        value="5"
                        step="1"
                        oninput="valueUpdate(name, 'emi');"
                      />
                    </div>
                    <input
                      name="tenureRange"
                      type="range"
                      min="1"
                      max="30"
                      value="5"
                      step="1"
                      oninput="valueUpdate(name, 'emi');"
                      style="background-size: 14% 100%"
                    />
                  </div>
                </form>
          `;
  document.querySelector(
    "#calculator .section-heading"
  ).innerHTML = `EMI Calculator`;
  document.querySelector(
    "#emiCalculatorSection .row .col-lg-4 .emi-details"
  ).innerHTML = `
              <div class="emi-details-head">
              <h3>Your EMI Details</h3>
            </div>
            <div class="emi-details-box">
              <p>Loan EMI</p>
              <h5 id="emi-amount">$ 10019</h5>
            </div>
            <div class="emi-details-box">
              <p>Total Interest</p>
              <h5 id="total-interest">$ 101140</h5>
            </div>
            <div class="emi-details-box">
              <p>Total Payment</p>
              <h5 id="total-payment">$ 601140</h5>
            </div>
            <div class="emi-details-box no-bottom-border">
              <a class="btn btn-sm btn-success" href="#statementSection" onclick="repaymentEMI();"
                ><i class="fa fa-paper-plane mr-1"></i> Generate Repayment
                Schedule</a
              >
            </div>
          `;
};



const futureForm = () => {
  document.querySelector(
    "#futureCalculatorSection .row .col-lg-4"
  ).innerHTML = `
          <form class="form-calculator">
                  <div class="form-group">
                    <label for="amount">Required Balance :</label>
                    <div class="input-group mb-4">
                      <div class="input-group-prepend">
                        <div class="input-group-text">$</div>
                      </div>
                      <input
                        name="amountInput"
                        type="number"
                        min="100000"
                        max="5000000"
                        class="form-control"
                        value="500000"
                        step="10000"
                        oninput="valueUpdate(name , 'future');"
                      />
                    </div>
                    <input
                      name="amountRange"
                      type="range"
                      step="10000"
                      value="500000"
                      min="100000"
                      max="5000000"
                      oninput="valueUpdate(name, 'future');"
                      style="background-size: 8.16327% 100%"
                    />
                  </div>
    
                  <div class="form-group">
                    <label for="amount">Interest Rate :</label>
                    <div class="input-group mb-4">
                      <div class="input-group-prepend">
                        <div class="input-group-text">%</div>
                      </div>
                      <input
                        name="interestInput"
                        type="number"
                        min="1"
                        max="30"
                        class="form-control"
                        value="8.25"
                        step="0.25"
                        oninput="valueUpdate(name, 'future');"
                      />
                    </div>
                    <input
                      name="interestRange"
                      type="range"
                      min="1"
                      max="30"
                      value="8.25"
                      step="0.25"
                      oninput="valueUpdate(name, 'future');"
                      style="background-size: 25.7716% 100%;"
                    />
                  </div>
    
                  <div class="form-group">
                    <label for="amount">Investment Tenure :</label>
                    <div class="input-group mb-4">
                      <div class="input-group-prepend">
                        <div class="input-group-text">Years</div>
                      </div>
                      <input
                        name="tenureInput"
                        type="number"
                        min="1"
                        max="30"
                        class="form-control"
                        value="8"
                        step="1"
                        oninput="valueUpdate(name, 'future');"
                      />
                    </div>
                    <input
                      name="tenureRange"
                      type="range"
                      min="1"
                      max="30"
                      value="8"
                      step="1"
                      oninput="valueUpdate(name, 'future');"
                      style="background-size: 24.0534% 100%;"
                    />
                  </div>
                </form>
          `;
  document.querySelector(
    "#calculator .section-heading"
  ).innerHTML = `Future Value Calculator`;
  document.querySelector(
    "#futureCalculatorSection .row .col-lg-4 .emi-details"
  ).innerHTML = `
                  <div class="emi-details-head">
                    <h3>Investment Future Value</h3>
                  </div>
                  <div class="emi-details-box">
                    <p>Initial Deposit Value</p>
                    <h5 id="emi-amount">$ 259010</h5>
                  </div>
                  <div class="emi-details-box">
                    <p>Estimated Return</p>
                    <h5 id="total-interest">$ 240990</h5>
                  </div>
                  <div class="emi-details-box">
                    <p>Future Value</p>
                    <h5 id="total-payment">$ 500000</h5>
                  </div>
                  <div class="emi-details-box no-bottom-border">
                    <a class="btn btn-sm btn-success" href="#statementSection" onclick="futureStatement();"
                      ><i class="fa fa-paper-plane mr-1"></i> Generate Interest
                      Schedule</a
                    >
                  </div>
          `;
};

const fdForm = () => {
    document.querySelector(
      "#fdCalculatorSection .row .col-lg-4"
    ).innerHTML = `
            <form class="form-calculator">
                    <div class="form-group">
                      <label for="amount">Deposit Amount :</label>
                      <div class="input-group mb-4">
                        <div class="input-group-prepend">
                          <div class="input-group-text">$</div>
                        </div>
                        <input
                          name="amountInput"
                          type="number"
                          min="5000"
                          max="1000000"
                          class="form-control"
                          value="100000"
                          step="5000"
                          oninput="valueUpdate(name , 'fd');"
                        />
                      </div>
                      <input
                        name="amountRange"
                        type="range"
                        step="5000"
                        value="100000"
                        min="5000"
                        max="1000000"
                        oninput="valueUpdate(name, 'fd');"
                        style="background-size: 9.51432% 100%;"
                      />
                    </div>
      
                    <div class="form-group">
                      <label for="amount">Interest Rate (p.a) :</label>
                      <div class="input-group mb-4">
                        <div class="input-group-prepend">
                          <div class="input-group-text">%</div>
                        </div>
                        <input
                          name="interestInput"
                          type="number"
                          min="1"
                          max="15"
                          class="form-control"
                          value="7"
                          step="0.25"
                          oninput="valueUpdate(name, 'fd');"
                        />
                      </div>
                      <input
                        name="interestRange"
                        type="range"
                        min="1"
                        max="15"
                        value="7"
                        step="0.25"
                        oninput="valueUpdate(name, 'fd');"
                        style="background-size: 42.7071% 100%;"
                      />
                    </div>
      
                    <div class="form-group">
                      <label for="amount">Investment Tenure :</label>
                      <div class="input-group mb-4">
                        <div class="input-group-prepend">
                          <div class="input-group-text">Years</div>
                        </div>
                        <input
                          name="tenureInput"
                          type="number"
                          min="1"
                          max="10"
                          class="form-control"
                          value="5"
                          step="1"
                          oninput="valueUpdate(name, 'fd');"
                        />
                      </div>
                      <input
                        name="tenureRange"
                        type="range"
                        min="1"
                        max="10"
                        value="5"
                        step="1"
                        oninput="valueUpdate(name, 'fd');"
                        style="background-size: 44.2889% 100%;"
                      />
                    </div>
                  </form>
            `;
    document.querySelector(
      "#calculator .section-heading"
    ).innerHTML = `FD Calculator`;
    document.querySelector(
      "#fdCalculatorSection .row .col-lg-4 .emi-details"
    ).innerHTML = `
                    <div class="emi-details-head">
                      <h3>Fixed Deposit</h3>
                    </div>
                    <div class="emi-details-box">
                      <p>Deposit Amount</p>
                      <h5 id="emi-amount">$ 100000</h5>
                    </div>
                    <div class="emi-details-box">
                      <p>Estimated Return</p>
                      <h5 id="total-interest">$ 41478</h5>
                    </div>
                    <div class="emi-details-box">
                      <p>Maturity Value</p>
                      <h5 id="total-payment">$ 141478</h5>
                    </div>
                    <div class="emi-details-box no-bottom-border">
                      <a class="btn btn-sm btn-success" href="#statementSection" onclick="fdStatement();"
                        ><i class="fa fa-paper-plane mr-1"></i> Generate Interest
                        Schedule</a
                      >
                    </div>
            `;
  };