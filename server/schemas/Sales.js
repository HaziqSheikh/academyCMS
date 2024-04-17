const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Function to get the current year
function getCurrentYear() {
    return new Date().getFullYear();
}

// Function to get the current month
function getCurrentMonth() {
    return new Date().getMonth() + 1; // Months are zero-indexed in JavaScript Date object
}

// Function to get the current day
function getCurrentDay() {
    return new Date().getDate();
}

// Function to get the day name from the date
function getDayName(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}
let getMonthName=()=>{
    var currentDate = new Date();

// Define an array with month names
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

// Get the month index from the current date
var monthIndex = currentDate.getMonth();

// Extract the month name using the month index
var currentMonthName = monthNames[monthIndex];
return currentMonthName
}

// Schema for Day
const DaySchema = new Schema({
    date: { type: Date, required: true },
    day_name: { type: String, required: true },
    target_sale: { type: Number, default: 0 },
    actual_sale:{ type: Number, default: 0 }
});

// Schema for Month
const MonthSchema = new Schema({
    month: { type: String, required: true },
    month_number: { type: Number, required: true },
    expected_target: { type: Number, required: true },
    actual_sales: { type: Number, default: 0 },
    days: [DaySchema]
});

// Schema for Year
const YearSchema = new Schema({
    year: { type: Number, required: true, default: getCurrentYear },
    expected_target: { type: Number, required: true },
    actual_sales: { type: Number, default: 0 },
    months: [MonthSchema]
});

// Model for Year
const YearModel = mongoose.model('Year', YearSchema);

// Function to create a new year document
// async function createNewYearDocument() {
//     const currentYear = getCurrentYear();
//     const existingYear = await YearModel.findOne({ year: currentYear });

//     if (!existingYear) {
//         const newYearDocument = new YearModel({
//             year: currentYear,
//             expected_target: 0, // Set the default expected target for the new year
//             actual_sales:0,
//             months: [
//                 {
//                     month:getMonthName(),
//                     month_number:getCurrentMonth(),
//                     expected_target:0,
//                     actual_sales:0,
//                     days:[
//                         {
//                             date: new Date(Date.now()).toLocaleDateString(),
//                             day_name:getDayName(),
//                             target_sale:0,
//                             actual_sale:0

//                         }
//                     ]
//                 }
               

//             ] // Initialize the months array for the new year
//         });
//         await newYearDocument.save();
//     }
// }

// // Function to create a new month document
// async function createNewMonthDocument(year, month) {
//     const existingMonth = await YearModel.findOne({ year: year, 'months.month_number': month });

//     if (!existingMonth) {
//         const newMonthDocument = {
//             month: getMonthName(month),
//             month_number: month,
//             expected_target: 0, // Set the default expected target for the new month
//             days: [{
//                 date: new Date(Date.now()).toLocaleDateString(),
//                 day_name:getDayName(new Date().getDate()),
//                 target_sale:0,
//                 actual_sale:0

//             }] // Initialize the days array for the new month
//         };
//         await YearModel.findOneAndUpdate(
//             { year: year },
//             { $push: { months: newMonthDocument } },
//             { upsert: true }
//         );
//     }
// }

// // Function to create a new day document if it's not Sunday
// async function createNewDayDocument(year, month, day) {
//     const newDate = new Date(year, month + 1, day);
//     if (newDate.getDay() !== 0) { // Check if it's not Sunday (Sunday is represented by 0)
//         const existingDay = await YearModel.findOne({ year: year, 'months.month_number': month, 'months.days.date': newDate });

//         if (!existingDay) {
//             const newDayDocument = {
//                 date: newDate,
//                 day_name: getDayName(newDate),
//                 target_sale: 0 ,
//                 actual_sale:0// Set the default target sale for the new day
//             };
//             await YearModel.findOneAndUpdate(
//                 { year: year, 'months.month_number': month },
//                 { $push: { 'months.$.days': newDayDocument } }
//             );
//         }
//     }
// }

// // Check and create new year, month, and day documents when the server starts
// createNewYearDocument();
// const currentYear = getCurrentYear();
// const currentMonth = getCurrentMonth();
// const currentDay = getCurrentDay();
// createNewMonthDocument(currentYear, currentMonth);
// createNewDayDocument(currentYear, currentMonth, currentDay);

module.exports = {YearModel};
