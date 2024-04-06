// Your code here
// helpers.js

// Create an employee record from an array
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Create employee records from an array of arrays
  function createEmployeeRecords(arrOfArrs) {
    return arrOfArrs.map(createEmployeeRecord);
  }
  
  // Add a timeIn event to an employee's record
  function createTimeInEvent(employee, dateTime) {
    const [date, time] = dateTime.split(" ");
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(time, 10),
      date: date
    };
    employee.timeInEvents.push(timeInEvent);
    return employee;
  }
  // Create a timeOut event for an employee
function createTimeOutEvent(employee, dateTime) {
  const [date, time] = dateTime.split(" ");
  const timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(time, 10),
    date: date
  };
  employee.timeOutEvents.push(timeOutEvent);
  return employee;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(event => event.date === date);
  const timeOut = employee.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}
// Calculate total wages for an employee across all dates
function allWagesFor(employee) {
  const dates = employee.timeInEvents.map(event => event.date);
  return dates.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
}

// Calculate total payroll for an array of employees
function calculatePayroll(employees) {
  return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}

  // Example usage:
  const moe = createEmployeeRecord(["Moe", "Sizlak", "Barkeep", 2]);
  const bart = createEmployeeRecord(["Bartholomew", "Simpson", "Scamp", 3]);
  
  const employees = createEmployeeRecords([
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    // ... other employee data ...
  ]);
  
  const updatedMoe = createTimeInEvent(moe, "2014-02-28 1400");
  // ... other timeIn events ...
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
    
  };
  