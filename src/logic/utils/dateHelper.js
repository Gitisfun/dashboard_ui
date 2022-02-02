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
      return [
          {
            id: 2022,
            name: "2022",
          },
          {
              id: 2021,
              name: "2021",
          },
          {
              id: 2020,
              name: "2020",
          },
      ];
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

    static getStartAndEndOfMonth(month, year){
      let startDate = moment();
      let endDate = moment();
      if (month != null || year != null) {
        startDate = moment({ year: year, month: month, day: 1 });
        endDate = startDate.clone().endOf("month")
      }
      else {
        startDate = moment({ year: this.getCurrentYear(), month: this.getCurrentMonth(), day: 1 });
        endDate = startDate.clone().endOf("month")
      }
      return {
        "start_date": startDate.format("YYYY-MM-DD"),
        "end_date": endDate.format("YYYY-MM-DD")
    }
    }

}

export default DateHelper