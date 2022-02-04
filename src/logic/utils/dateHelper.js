import moment from "moment";


class DateHelper {
    

    static getCurrentDay(){
      return moment().day();
    }

    static getCurrentMonth() {
      return moment().month()
    }
      
    static getCurrentYear() {
      return moment().year()
    }

    static getAllDaysInWeek() {
      return [
          {
              id: 1,
              name: "Maandag",
            },
            {
              id: 2,
              name: "Dinsdag",
            },
            {
              id: 3,
              name: "Woensdag",
            },
            {
              id: 4,
              name: "Donderdag",
            },
            {
              id: 5,
              name: "Vrijdag",
            },
            {
              id: 6,
              name: "Zaterdag",
            },
            {
              id: 7,
              name: "Zondag",
            },
      ]
    }

    static getAllMonthsInYear() {
      return ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
    }

    static getAllMonths() {
      return [
        {
          id: 0,
          name: "Januari",
        },
        {
          id: 1,
          name: "Februari",
        },
        {
          id: 2,
          name: "Maart",
        },
        {
          id: 3,
          name: "April",
        },
        {
          id: 4,
          name: "Mei",
        },
        {
          id: 5,
          name: "Juni",
        },
        {
          id: 6,
          name: "Juli",
        },
        {
          id: 7,
          name: "Augustus",
        },
        {
          id: 8,
          name: "September",
        },
        {
          id: 9,
          name: "Oktober",
        },
        {
          id: 10,
          name: "November",
        },
        {
          id: 11,
          name: "December",
        },
      ];
    }

    static getYears() {
      const startYear = 2020
      let currentYear = moment().year()
      let temp = []
      while(startYear <= currentYear){
        temp.push(          {
          id: currentYear,
          name: `${currentYear}`,
        })
        currentYear--
      }
      return temp
    }  

    static genericStartOf(period){
      return moment()
        .clone()
        .startOf(period)
        .toDate()
    }

    static genericEndOf(period){
      return moment()
        .clone()
        .endOf(period)
        .toDate()
    }

    static getAllDaysInMonth(month, year) {
      let date = moment();
      if (month != null || year != null) {
        date = moment({ year: year, month: month, day: 1 });
      }
      else {
        date = moment({ year: this.getCurrentYear(), month: this.getCurrentMonth(), day: 1 });
      }
    
      const lengthOfMonth = date.daysInMonth();
      let dayIndex = date.startOf("month");
    
      let temp = [];
      for (let i = 0; i < lengthOfMonth; i++) {
        temp.push(dayIndex.format("YYYY-MM-DD"));
        dayIndex = dayIndex.add(1, "days");
      }
      const tempObj = {
        days: temp,
        daysInMonth: lengthOfMonth,
      };
    
      return tempObj;
    }

    static getAllDaysInPeriod(period){
      let tempDate = moment(period.start_date)
      const tempEndDate = moment(period.end_date)
      let temp = []
      
      while(tempDate.isBefore(tempEndDate, "day")){
        temp.push(tempDate.format("YYYY-MM-DD"));
        tempDate = tempDate.add(1, "days");
      }
      temp.push(tempDate.format("YYYY-MM-DD"));
      const tempObj = {
        days: temp,
        daysInMonth: temp.length,
      };
    
      return tempObj;    
    }

    static getStartAndEndOfMonth(month, year){
      let start_date = moment();
      let end_date = moment();
      if (month != null || year != null) {
        start_date = moment({ year: year, month: month, day: 1 });
        end_date = start_date.clone().endOf("month")
      }
      else {
        start_date = moment({ year: this.getCurrentYear(), month: this.getCurrentMonth(), day: 1 });
        end_date = start_date.clone().endOf("month")
      }
      return {
        "start_date": start_date.format("YYYY-MM-DD"),
        "end_date": end_date.format("YYYY-MM-DD")
      }
    }

    static getStartAndEndOfMonthDate(month, year){
      let start_date = moment();
      let end_date = moment();
      if (month != null || year != null) {
        start_date = moment({ year: year, month: month, day: 1 });
        end_date = start_date.clone().endOf("month")
      }
      else {
        start_date = moment({ year: this.getCurrentYear(), month: this.getCurrentMonth(), day: 1 });
        end_date = start_date.clone().endOf("month")
      }
      return {
        "start_date": start_date.format("DD-MM-YYYY"),
        "end_date": end_date.format("DD-MM-YYYY")
      }
    }

    static getStartAndEndOfYearDate(year){
      let start_date = moment();
      let end_date = moment();
      if (year != null) {
        start_date = moment({ year: year, month: 0, day: 1 });
        end_date = start_date.clone().endOf("year")
      }
      else {
        start_date = moment({ year: this.getCurrentYear(), month: 0, day: 1 });
        end_date = start_date.clone().endOf("year")
      }
      return {
        "start_date": start_date.format("DD-MM-YYYY"),
        "end_date": end_date.format("DD-MM-YYYY")
      }
    }

    static getStartAndEndOfYearDateApi(year){
      let start_date = moment();
      let end_date = moment();
      if (year != null) {
        start_date = moment({ year: year, month: 0, day: 1 });
        end_date = start_date.clone().endOf("year")
      }
      else {
        start_date = moment({ year: this.getCurrentYear(), month: 0, day: 1 });
        end_date = start_date.clone().endOf("year")
      }
      return {
        "start_date": start_date.format("YYYY-MM-DD"),
        "end_date": end_date.format("YYYY-MM-DD")
      }
    }

    static formatPeriodToRead(period){
      return { 
        start_date: moment(period.start_date).format("DD-MM-YYYY"),
        end_date: moment(period.end_date).format("DD-MM-YYYY")
      }
    }

    static isBefore(start_date, end_date){
      const start = moment(start_date)
      const end = moment(end_date)
      if(start.isBefore(end, "day")) return true
      return false
    }
}


export default DateHelper