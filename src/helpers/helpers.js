export const currentDate = () => {
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  var today = new Date()

  var dayName = days[today.getDay()]
  var monthName = months[today.getMonth()]
  var date = today.getDate()

  var time =
    dayName +
    ' ' +
    date +
    ' ' +
    monthName +
    ' ' +
    today.getHours() +
    ':' +
    today.getMinutes()

  return time
}