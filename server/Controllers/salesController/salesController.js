const { YearModel } = require("../../schemas/Sales");
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
function getDayName() {
  let date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}
let getMonthName = () => {
  var currentDate = new Date();

  // Define an array with month names
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month index from the current date
  var monthIndex = currentDate.getMonth();

  // Extract the month name using the month index
  var currentMonthName = monthNames[monthIndex];
  return currentMonthName;
};
// // Function to create a new month document
async function createNewMonthDocument(year, month) {
  const existingMonth = await YearModel.findOne({
    year: year,
    "months.month_number": month,
  });

  if (!existingMonth) {
    const newMonthDocument = {
      month: getMonthName(month),
      month_number: month,
      expected_target: 0, // Set the default expected target for the new month
      days: [
        {
          date: new Date(Date.now()).toLocaleDateString(),
          day_name: getDayName(new Date().getDate()),
          target_sale: 0,
          actual_sale: 0,
        },
      ], // Initialize the days array for the new month
    };
    await YearModel.findOneAndUpdate(
      { year: year },
      { $push: { months: newMonthDocument } },
      { upsert: true }
    );
  }
}
let getYearlySales = async (req, res) => {
  try {
    // genrtte current day
    // Get the current year and month
    const currentYear = getCurrentYear();
    const currentMonth = getCurrentMonth();

    // Find the year document for the current year
    const yearDocument = await YearModel.findOne({ year: currentYear });
    // console.log(yearDocument);
    if (yearDocument != null) {
      let currentMonthObj = yearDocument.months.find((monthObj) => {
        if (monthObj.month_number == currentMonth) {
          return true;
        }
      });
      //   console.log(currentMonthObj);
      if (currentMonthObj) {
        if (currentMonthObj.expected_target == 0) {
          res.json({
            success: false,
            data: yearDocument,
          });
        } else {
          res.json({
            success: true,
            data: yearDocument,
          });
        }

      
      } else {
        createNewMonthDocument(currentYear, currentMonth);
        res.json({
          success: false,
          data: yearDocument,
        });
      }
    }

    if (yearDocument == null) {
      // return res.status(404).json({ error: 'Year document not found' });
      const newYearDocument = new YearModel({
        year: currentYear,
        expected_target: 0, // Set the default expected target for the new year
        actual_sales: 0,
        months: [
          {
            month: getMonthName(),
            month_number: getCurrentMonth(),
            expected_target: 0,
            actual_sales: 0,
            days: [
              {
                date: new Date(Date.now()).toLocaleDateString(),
                day_name: getDayName(),
                target_sale: 0,
                actual_sale: 0,
              },
            ],
          },
        ], // Initialize the months array for the new year
      });
      let founded = await newYearDocument.save();
      res.json({
        success: false,
        data: founded,
      });
    }

    // Find the month document for the current month
    // const monthDocument = yearDocument.months.find(month => month.month_number === currentMonth);

    // if (!monthDocument) {
    //     return res.status(404).json({ error: 'Month document not found' });
    // }

    // // Send the month data to the client
    // res.json(monthDocument);
  } catch (error) {
    console.error("Error fetching current month data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { getYearlySales };
