const { YearModel } = require("./schemas/Sales");

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

// Function to create a new year document if it doesn't exist
async function createNewYearDocument() {
    const currentYear = getCurrentYear();
    const existingYear = await YearModel.findOne({ year: currentYear });

    if (!existingYear) {
        const newYearDocument = new YearModel({
            year: currentYear,
            expected_target: 0, // Set the default expected target for the new year
            actual_sales: 0,
            months: []
        });
        await newYearDocument.save();
    }
}

// Function to create a new month document if it doesn't exist
async function createNewMonthDocument(year, month) {
    const existingMonth = await YearModel.findOne({ year: year, 'months.month_number': month });

    if (!existingMonth) {
        const newMonthDocument = {
            month: getMonthName(month),
            month_number: month,
            expected_target: 0, // Set the default expected target for the new month
            actual_sales: 0,
            days: []
        };
        await YearModel.findOneAndUpdate(
            { year: year },
            { $push: { months: newMonthDocument } },
            { upsert: true }
        );
    }
}

// Function to create a new day document if it's not existing
async function createNewDayDocument(year, month, day) {
    const newDate = new Date(year, month - 1, day); // Month is 0-indexed in Date constructor
    const dayName = getDayName(newDate);
    if (dayName !== 'Sunday') { // Check if it's not Sunday
        const existingDay = await YearModel.findOne({ year: year, 'months.month_number': month, 'months.days.date': newDate });

        if (!existingDay) {
            const newDayDocument = {
                date: newDate,
                day_name: dayName,
                target_sale: 0,
                actual_sale: 0 // Set the default target sale for the new day
            };
            await YearModel.findOneAndUpdate(
                { year: year, 'months.month_number': month },
                { $push: { 'months.$.days': newDayDocument } }
            );
        }
    }
}

// Utility function to get month name from month number
function getMonthName(monthNumber) {
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    return months[monthNumber - 1];
}

// Async function to handle initialization based on current date
async function initializeSalesData(amountToAdd) {
    const currentYear = getCurrentYear();
    const currentMonth = getCurrentMonth();
    const currentDay = getCurrentDay();

    await createNewYearDocument(); // Create new year if not exists
    await createNewMonthDocument(currentYear, currentMonth); // Create new month if not exists
    await createNewDayDocument(currentYear, currentMonth, currentDay); // Create new day if not Sunday and not exists
     // Find the Day document for the current date and update its actual_sale field
     const yearDocument = await YearModel.findOne({ year: currentYear });

     if (!yearDocument) {
         console.error("Year document not found.");
         return;
     }
 
     // Find the Month document within the Year
     const monthDocument = yearDocument.months.find(month => month.month_number === currentMonth);
 
     if (!monthDocument) {
         console.error("Month document not found.");
         return;
     }
 
     // Find the Day document within the Month
     const dayDocument = monthDocument.days.find(day => day.date.getDate() === currentDay);
 
     if (!dayDocument) {
         console.error("Day document not found.");
         return;
     }
 
     // Update the actual_sale field for the Day document
     dayDocument.actual_sale += Number(amountToAdd);
 
     // Save changes to the database
     await yearDocument.save();

   
}

module.exports = initializeSalesData;
